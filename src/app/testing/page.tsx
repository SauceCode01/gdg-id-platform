"use client";

import Grid from "@/components/GridBackground";  
import Button from "@/components/Button";
import { Download } from "lucide-react";
import { useSearchParams } from "next/navigation";
import GlowBlobs from "@/components/GlowBlobs";
import { Suspense, useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import { getMember } from "@/lib/api/endpoints/membersEndpoints";
import { Member } from "@/types/member";

export default function TrueIdPageWithSuspenseBoundary() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IDPage />
    </Suspense>
  );
}

const IDPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const searchParams = useSearchParams();

  const [member, setMember] = useState<Member | null>(null);

  // Fetch server-generated ID image
  useEffect(() => {
    const stuff = async () => {
      console.log("fetching member");
      const email = searchParams.get("email");
      if (!email) return;
      const fetchedmember = (await getMember(email)) as Member;
      console.log(fetchedmember);
      setMember(fetchedmember);
    };

    stuff();
  }, [searchParams]);

  const handleEdit = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!member) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load your base template image from public folder
    const template = new Image();
    template.src = "/cards/front_empty.png";
    template.onload = () => {
      // Resize canvas to match image size
      canvas.width = template.width;
      canvas.height = template.height;

      // Draw the image template first
      ctx.drawImage(template, 0, 0);

      // Draw text on top
      ctx.font = "24px Arial";
      ctx.fillStyle = "#000";
      ctx.fillText(member.displayName, 100, 190);
      ctx.fillText(member.displayName, 100, 220);
      ctx.fillText(member.gdgId, 100, 250);
      ctx.fillText(member.course, 100, 280);
      ctx.fillText(member.email, 100, 310);
    };
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {member && <>{JSON.stringify(member, null, 2)}</>}

        {!member && <>loading member</>}

        <div className="flex flex-col items-center gap-4">
          <canvas
            ref={canvasRef}
            className=" "
          />
          <div className="flex gap-3">
            <button
              onClick={handleEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Render Image
            </button>
            <button
              onClick={handleDownload}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Download
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
