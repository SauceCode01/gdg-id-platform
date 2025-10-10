import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase/firebaseAdmin";
import { User } from "@/types/user";
import { extractUid, getUserData, getUserDataWithUid } from "@/lib/serverUtils";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ uid: string }> }
) {
  try {
    const { uid } = await context.params;
    const userData = await getUserDataWithUid(uid);

    return NextResponse.json(userData, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
