import { NextRequest, NextResponse } from "next/server";  
import { getUserData, getUserDataWithUid } from "@/lib/server/serverUtils";

import { RateLimiterMemory } from "rate-limiter-flexible";
import { consumeLimiter } from "@/lib/server/rateLimiter";

const rateLimiter = new RateLimiterMemory({
  points: 10, // 5 requests
  duration: 60, // per 60 seconds by IP
});

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ uid: string }> }
) {
  try {
    // RATE LIMITER
    const limitResult = await consumeLimiter(rateLimiter, req);
    if (limitResult) return limitResult;

    // check authorization
    const requestingUserData = await getUserData(req);
    if (!requestingUserData)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    if (!requestingUserData.roles.includes("admin"))
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // get the requested user datap
    const { uid } = await context.params;
    const userData = await getUserDataWithUid(uid);

    return NextResponse.json(userData, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to get user data" },
      { status: 500 }
    );
  }
}
