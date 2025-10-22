"use client";

import Grid from "@/components/GridBackground";
import Image from "next/image";
import Button from "@/components/Button";
import { Download } from "lucide-react";
import { useSearchParams } from "next/navigation";
import GlowBlobs from "@/components/GlowBlobs";
import { Suspense, useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import { getMember } from "@/lib/client/apiEndpoints/memberEndpoints";
import { Member } from "@/types/member";
import { useGlobalContext } from "@/providers/GlobalContextProvider";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMemberQuery } from "@/lib/client/apiQueries/memberQueries";
import { CardImage } from "./_components/CardImage";

export default function TrueIdPageWithSuspenseBoundary() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IDPage />
    </Suspense>
  );
}

const IDPage = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string | undefined>(undefined);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { member, isLoading, isError, error } = useMemberQuery(email);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Fetch member data
  useEffect(() => {
    const email = searchParams.get("email") || undefined;
    if (email) setEmail(email);
  }, [searchParams]);

  // Draw ID on canvas (client-side)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !member) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const template = new window.Image();
    template.src = "/cards/front_empty_skeleton_updated.svg"; // your base template image
    template.onload = () => {
      // High-resolution multiplier for crisp downloads
      const downloadScale = 2;

      // CSS/logical dimensions
      const cssWidth = template.width;
      const cssHeight = template.height;

      // Helper function to draw ID card content
      const drawCard = (context: CanvasRenderingContext2D, scale: number) => {
        const width = cssWidth;
        const height = cssHeight;

        // Clear and draw template
        context.clearRect(0, 0, width, height);
        context.drawImage(template, 0, 0, width, height);

        // Enable high-quality rendering
        context.imageSmoothingEnabled = true;

        // Extend the CanvasRenderingContext2D type safely
        const extendedCtx = context as CanvasRenderingContext2D & {
          imageSmoothingQuality: "low" | "medium" | "high";
        };

        extendedCtx.imageSmoothingQuality = "high";

        // --- Draw texts (all coordinates in CSS pixels) ---
        context.textAlign = "center";
        context.fillStyle = "#1a1a1a";

        // Display name
        context.font = "bold 32px Arial";
        context.fillText(member.displayName || "", width / 2, 465);

        // GDG ID
        context.font = "20px Arial";
        context.fillText(member.gdgId || "", width / 2, 495);

        // Bottom section labels
        context.textAlign = "left";
        context.fillStyle = "#ffffff";
        context.font = "16px Arial";

        context.fillText(`Name:`, 70, 575);
        context.fillText(`Email:`, 70, 605);
        context.fillText(`Course:`, 70, 635);
        context.fillText(`Department:`, 70, 665);

        // Bottom section values
        context.font = "bold 16px Arial";
        context.fillText(`${member.name || ""}`, 140, 575);
        context.fillText(`${member.email || ""}`, 140, 605);
        context.fillText(`${member.course || ""}`, 140, 635);
        context.fillText(`Technology - Web Development`, 170, 665);
      };

      // Render high-res canvas for downloads (hidden, 4x resolution)
      canvas.width = cssWidth * downloadScale;
      canvas.height = cssHeight * downloadScale;
      canvas.style.width = cssWidth + "px";
      canvas.style.height = cssHeight + "px";

      ctx.scale(downloadScale, downloadScale);
      drawCard(ctx, downloadScale);

      // Create a preview canvas at 2-3x resolution for sharp display even when CSS scales
      const previewScale = 3; // Higher resolution preview to stay sharp when CSS scales it
      const previewCanvas = document.createElement("canvas");
      previewCanvas.width = cssWidth * previewScale;
      previewCanvas.height = cssHeight * previewScale;

      const previewCtx = previewCanvas.getContext("2d");
      if (previewCtx) {
        previewCtx.scale(previewScale, previewScale);
        drawCard(previewCtx, previewScale);

        // Use preview canvas for the image URL - CSS will scale but image has headroom
        setImageUrl(previewCanvas.toDataURL("image/png"));
      } else {
        // Fallback to main canvas
        setImageUrl(canvas.toDataURL("image/png"));
      }
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

  const { isDarkMode } = useGlobalContext();

  return (
    <div className="min-h-screen">
      <section className="relative flex flex-row min-h-screen items-center justify-center overflow-hidden">
        <Grid />
        <div className="hidden lg:block">
          <GlowBlobs layout="home" />
        </div>

        {/* MOBILE VIEW */}

        {/* DESKTOP VIEW */}
        <div className=" flex flex-col lg:flex-row relative z-10 text-center items-center px-8">
          <h1
            className="
                font-bold  
                text-slate-800 
                drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]
                dark:text-transparent dark:bg-clip-text
                dark:bg-[linear-gradient(to_bottom,rgba(147,197,253,1)_0%,rgba(255,255,255,1)_50%,rgba(147,197,253,1)_100%)]
                dark:drop-shadow-[0_0_20px_rgba(147,197,253,0.8)]
                lg:hidden
                my-8 text-4xl

                flex flex-row flex-wrap justify-center
              "
          >
            OFFICIAL GDG&nbsp;PUP DIGITAL ID
          </h1>

          <div className="flex-1">
            <div className="w-[17rem] xs:w-sm sm:w-md xl:w-lg ">
              <CardImage
                imageUrl={imageUrl}
                isLoading={isLoading}
                isError={isError}
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center px-5 max-w-2xl ">
            <h1
              className="
                text-6xl font-bold  
                text-slate-800 
                drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]
                dark:text-transparent dark:bg-clip-text
                dark:bg-[linear-gradient(to_bottom,rgba(147,197,253,1)_0%,rgba(255,255,255,1)_50%,rgba(147,197,253,1)_100%)]
                dark:drop-shadow-[0_0_20px_rgba(147,197,253,0.8)]
                hidden lg:flex

                
                 flex-row flex-wrap justify-center w-full
              "
            >
              OFFICIAL GDG&nbsp;PUP DIGITAL ID
            </h1>

            {/* GDG Logo (light/dark mode for desktop) */}
            <div className="h-auto w-full max-w-sm scale-140 mx-auto hidden lg:flex">
              {/* Light mode logo */}
              <img
                src={
                  isDarkMode
                    ? "/sites/idgenerate/GDGLogo_Dark.png"
                    : "/sites/idgenerate/GDGLogo_Light.png"
                }
                alt="GDG Logo Light"
                className="  h-auto w-full object-contain mx-auto"
              />
            </div>

            <div className="flex justify-center gap-3 mt-16 lg:mt-0 flex-col xs:flex-row">
              <Button variant="blue" onClick={handleDownloadPNG}>
                <Download className="mr-2 size-5 stroke-white" />
                <span>Download as PNG</span>
              </Button>
              <Button variant="green" onClick={handleDownloadPDF}>
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
