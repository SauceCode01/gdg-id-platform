import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/firebaseAdmin";
import { getUserData } from "@/lib/server/serverUtils";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // 👈 updated type
) {
  try {
    // Check if user is admin
    const userData = await getUserData(req);
    if (!userData)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    if (!userData.roles.includes("admin"))
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Read query params
    const { id } = await context.params;

    // Update Firestore doc
    await adminDb.collection("messages").doc(id).update({
      done: true,
      doneAt: Date.now(),
      doneBy: userData.uid,
    });

    return NextResponse.json(
      { success: true, id, done: true },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to mark message as done" },
      { status: 500 }
    );
  }
}
