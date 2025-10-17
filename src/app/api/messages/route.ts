import { adminDb } from "@/lib/firebase/firebaseAdmin";
import { sendEmail, sendEmailToAdmin } from "@/lib/server/gcpApi";
import {
  generateId,
  getUserData, 
  isRole,
} from "@/lib/server/serverUtils";
import { Message } from "@/types/message";
import { User } from "@/types/user";
import { FieldValue } from "firebase-admin/firestore";
import { customAlphabet } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

import { RateLimiterMemory } from "rate-limiter-flexible";
import { consumeLimiter, getClientIp } from "@/lib/server/rateLimiter";

const rateLimiter = new RateLimiterMemory({
  points: 4, // 5 requests
  duration: 120, // per 60 seconds by IP
});

export async function POST(req: NextRequest) {
  try {
    // RATE LIMITER
    const limitResult = await consumeLimiter(rateLimiter, req);
    if (limitResult) return limitResult;

    // POSTING MESSAGE ON THE DATABASE
    const messageId = await generateId();
    const message: Message = await req.json();
    const completeMessage = {
      ...message,
      id: messageId,
      createdAt: Date.now(),
    };
    await adminDb.collection("messages").doc(messageId).set(completeMessage);

    // POSTING MESSAGE ON GDG EMAIL
    await sendEmailToAdmin(completeMessage);

    return NextResponse.json(completeMessage, { status: 200 });
  } catch (err : unknown) {
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Check if user is admin
    const userData = await getUserData(req);
    if (!userData)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    if (!userData.roles.includes("admin"))
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Read query params
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10") || 10;
    const last = searchParams.get("last") || null;

    let query: FirebaseFirestore.Query = adminDb.collection("messages");
    query = query.orderBy("createdAt", "desc").limit(limit);

    if (last) {
      const lastDoc = await adminDb.collection("messages").doc(last).get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    const snapshot = await query.get();
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(data, { status: 200 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
