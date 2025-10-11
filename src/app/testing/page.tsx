"use client";

import Grid from "@/components/GridBackground";
import Image from "next/image";
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
  const searchParams = useSearchParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch member data
  useEffect(() => {
    const fetchMember = async () => {
      const email = searchParams.get("email");
      if (!email) {
        setError("No email provided.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const fetchedMember = (await getMember(email)) as Member;
        if (!fetchedMember) throw new Error("Member not found");
        setMember(fetchedMember);
      } catch (err) {
        console.error(err);
        setError("Failed to load member data.");
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [searchParams]);

  // Draw ID on canvas (client-side)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !member) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const template = new window.Image();
    template.src = "/cards/front_empty.png"; // your base template image
    template.onload = () => {
      canvas.width = template.width;
      canvas.height = template.height;

      // Draw base template
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(template, 0, 0);

      // --- Draw texts ---
      ctx.textAlign = "center";
      ctx.fillStyle = "#1a1a1a";

      // Display name (Arky)
      ctx.font = "bold 26px Arial";
      ctx.fillText(member.displayName || "", canvas.width / 2, 330);

      // GDG ID
      ctx.font = "12px Arial";
      ctx.fillText(member.gdgId || "", canvas.width / 2, 350);

      // Bottom section
      ctx.textAlign = "left";
      ctx.fillStyle = "#ffffff";
      ctx.font = "12px Arial";

      // Full name
      ctx.fillText(`Name: ${member.name || ""}`, 50, 410);

      // Email
      ctx.fillText(`Email: ${member.email || ""}`, 50, 440);

      // Course
      ctx.fillText(`Course: ${member.course || ""}`, 50, 470);

      // Export preview image
      setImageUrl(canvas.toDataURL("image/png"));
    };
  }, [member]);

  const handleDownloadPNG = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.href = canvasRef.current.toDataURL("image/png");
    link.download = `${member?.displayName || "GDG_PUP"}_ID.png`;
    link.click();
  };

  const handleDownloadPDF = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${member?.displayName || "GDG_PUP"}_ID.pdf`);
  };

  return (
    <div className="min-h-screen">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Grid />
        <div className="hidden lg:block">
          <GlowBlobs layout="home" />
        </div>

        {/* MOBILE VIEW */}
        <div className="relative z-10 text-center px-6 lg:hidden">
          <h1 className="text-3xl font-bold mb-4 text-slate-800 drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
            OFFICIAL GDG PUP DIGITAL ID
          </h1>

          <div className="relative flex justify-center mb-6">
            {loading ? (
              <div className="w-80 h-[500px] bg-gray-200 animate-pulse rounded-lg" />
            ) : error ? (
              <p className="text-red-500 italic">{error}</p>
            ) : (
              imageUrl && (
                <div className="relative w-80 h-[500px] flex justify-center items-center">
                  <div className="relative w-[300px] h-[300px]">
                    <Image
                      src="/cards/back.png"
                      alt="GDG ID Back"
                      width={300}
                      height={300}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
                      unoptimized
                    />
                    <Image
                      src={imageUrl}
                      alt="Generated GDG ID"
                      width={300}
                      height={300}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              )
            )}
          </div>

          <div className="flex justify-center gap-3">
            <Button bgColor="bg-blue-600" onClick={handleDownloadPNG}>
              <Download className="mr-2 size-5 stroke-white" />
              <span>Download as PNG</span>
            </Button>
            <Button bgColor="bg-green-600" onClick={handleDownloadPDF}>
              <Download className="mr-2 size-5 stroke-white" />
              <span>Download as PDF</span>
            </Button>
          </div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden lg:flex relative z-10 text-center items-center">
          <div className="h-screen relative flex justify-center w-1/2">
            {loading ? (
              <div className="w-[950px] h-[950px] bg-gray-200 animate-pulse rounded-lg" />
            ) : error ? (
              <p className="text-red-500 italic">{error}</p>
            ) : (
              imageUrl && (
                <div className="relative w-[950px] h-[950px] flex justify-center items-center">
                  <div className="relative w-[500px] h-[500px]">
                    <Image
                      src="/cards/back.png"
                      alt="GDG ID Back"
                      width={520}
                      height={520}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
                    />
                    <Image
                      src={imageUrl}
                      alt="Generated GDG ID"
                      width={500}
                      height={500}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
                    />
                  </div>
                </div>
              )
            )}
          </div>

          <div className="h-screen flex flex-col justify-center">
            <h1 className="text-7xl font-bold mb-4 text-slate-800 drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
              OFFICIAL GDG PUP<br />DIGITAL ID
            </h1>
            <Image
              src="/sites/idgenerate/GDGLogo_Light.png"
              alt="GDG Logo"
              width={500}
              height={500}
              className="h-auto w-full max-w-xs object-contain mx-auto mb-4"
            />
            <div className="flex justify-center gap-3">
              <Button bgColor="bg-blue-600" onClick={handleDownloadPNG}>
                <Download className="mr-2 size-5 stroke-white" />
                <span>Download as PNG</span>
              </Button>
              <Button bgColor="bg-green-600" onClick={handleDownloadPDF}>
                <Download className="mr-2 size-5 stroke-white" />
                <span>Download as PDF</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Hidden canvas for generation */}
        <canvas ref={canvasRef} className="hidden" />
      </section>
    </div>
  );
};
