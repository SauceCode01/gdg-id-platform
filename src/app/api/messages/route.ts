 
import { adminDb } from "@/lib/firebase/firebaseAdmin";   
import { Message } from "@/types/message";
import { FieldValue } from "firebase-admin/firestore";
import { customAlphabet } from "nanoid";
import { NextRequest, NextResponse } from "next/server"; 


export async function POST(req: NextRequest) {
  try {  

    const message: Message = await req.json();

    const completeMessage = {
      ...message, 
      createdAt: Date.now(),
    }; 
    await adminDb.collection("messages").add(completeMessage);

    return NextResponse.json(completeMessage, { status: 200 });
  } catch (err ) {
    return NextResponse.json(
      { error: err  },
      { status: 500 }
    );
  }
}


