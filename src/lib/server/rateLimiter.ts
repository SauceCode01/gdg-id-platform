import { NextRequest, NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

export const getClientIp = async (req: NextRequest) => {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim(); // first IP in list
  }
  return req.headers.get("x-real-ip") || "unknown";
};


export const consumeLimiter = async (
  limiter: RateLimiterMemory,
  req: NextRequest
) => {
  try {
    const ip = await getClientIp(req);
    try {
      await limiter.consume(ip);
    } catch {
      return NextResponse.json(
        { error: "Too many requests. Try again later." },
        { status: 429 }
      );
    }
  } catch (err) {
    throw new Error("An error occurred while consuming rate limiter.");
  }
};
