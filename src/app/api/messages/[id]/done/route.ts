import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/firebaseAdmin";
import { isAdmin } from "@/lib/serverUtils";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } } // 👈 use id, not uid
) {
  try {
    const authorized = await isAdmin(req);

    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = context.params; // e.g. message ID from /message/[id]/done

    // Update Firestore doc
    await adminDb.collection("messages").doc(id).update({
      done: true,
      doneAt: Date.now(), // optional: track when it was marked done
      doneBy: authorized.uid,
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
