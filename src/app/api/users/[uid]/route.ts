import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase/firebaseAdmin";
import { User } from "@/types/user";
import { extractUid, getUserData, getUserDataWithUid } from "@/lib/serverUtils";

import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 10, // 5 requests
  duration: 60, // per 60 seconds by IP
});

function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim(); // first IP in list
  }
  return req.headers.get("x-real-ip") || "unknown";
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ uid: string }> }
) {
  const ip = getClientIp(req);

  try {
    await rateLimiter.consume(ip);
  } catch {
    return NextResponse.json(
      { error: "Too many requests. Try again later. (api/users/[uid])" },
      { status: 429 }
    );
  }

  try {
    const { uid } = await context.params;
    const userData = await getUserDataWithUid(uid);

    return NextResponse.json(userData, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
