import { adminDb } from "@/lib/firebase/firebaseAdmin";
import { generateId } from "@/lib/serverUtils";
import { Message } from "@/types/message";
import { FieldValue } from "firebase-admin/firestore";
import { customAlphabet } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 2, // 5 requests
  duration: 60, // per 60 seconds by IP
});

function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim(); // first IP in list
  }
  return req.headers.get("x-real-ip") || "unknown";
}






export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  try {
    await rateLimiter.consume(ip);
  } catch {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429 }
    );
  }

  try {
    const message: Message = await req.json();

    const messageId = generateId();

    const completeMessage = {
      ...message,
      id: messageId,
      createdAt: Date.now(),
    };
    await adminDb.collection("messages").doc(messageId).set(completeMessage);

    return NextResponse.json(completeMessage, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Read query params
    const limit = parseInt(searchParams.get("limit") || "10") || 10;
    const last = searchParams.get("last") || null;

    console.log("server", limit, last);

    let query: FirebaseFirestore.Query = adminDb.collection("messages");

    // Apply limit
    query = query.orderBy("createdAt", "desc").limit(limit);

    // Apply pagination (if last doc provided)
    if (last) {
      const lastDoc = await adminDb.collection("messages").doc(last).get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    const snapshot = await query.get();

    // Map documents
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(data, { status: 200 });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
