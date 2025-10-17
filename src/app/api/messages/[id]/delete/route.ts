import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/firebaseAdmin";
import { getUserData } from "@/lib/server/serverUtils";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Verify user
    const userData = await getUserData(req);
    if (!userData)
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    if (!userData.roles.includes("admin"))
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    // Extract message ID
    const { id } = await context.params;

    // Check if message exists
    const docRef = adminDb.collection("messages").doc(id);
    const doc = await docRef.get();
    if (!doc.exists)
      return NextResponse.json({ error: "Message not found" }, { status: 404 });

    // Delete the document
    await docRef.delete();

    return NextResponse.json({ success: true, id }, { status: 200 });
  } catch (err) {
    console.error("Error deleting message:", err);
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 }
    );
  }
}
