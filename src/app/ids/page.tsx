"use client";

import Grid from "@/components/GridBackground";
import Image from "next/image";
import Button from "@/components/Button";
import { Download } from "lucide-react";
import { useSearchParams } from "next/navigation";
import GlowBlobs from "@/components/GlowBlobs";
import { Suspense, useEffect, useState } from "react";
import jsPDF from "jspdf";

export default function TrueIdPageWithSuspenseBoundary() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IDPage />
    </Suspense>
  );
}


const IDPage = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch server-generated ID image
  useEffect(() => {
    const email = searchParams.get("email");
    if (!email) {
      setError("No email provided.");
      setLoading(false);
      return;
    }

    const fetchImage = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/generateId?email=${encodeURIComponent(email)}`);
        if (!res.ok) throw new Error("Failed to generate ID");
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (err) {
        console.error("Image fetch error:", err);
        setError("Failed to load ID image.");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [searchParams]);

  const handleDownloadPNG = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "GDG_PUP_ID.png";
    link.click();
  };

  const handleDownloadPDF = async () => {
    if (!imageUrl) return;
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [img.width, img.height],
      });
      pdf.addImage(img, "PNG", 0, 0, img.width, img.height);
      pdf.save("GDG_PUP_ID.pdf");
    };
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
          <h1
            className="
    text-3xl font-bold mb-4 
    text-slate-800 
    drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]
    dark:text-transparent dark:bg-clip-text
    dark:bg-[linear-gradient(to_bottom,rgba(147,197,253,1)_0%,rgba(255,255,255,1)_50%,rgba(147,197,253,1)_100%)]
    dark:drop-shadow-[0_0_20px_rgba(147,197,253,0.8)]
  "
          >
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
                    {/* BACK IMAGE */}
                    <Image
                      src="/cards/back.png"
                      alt="GDG ID Back"
                      width={300}
                      height={300}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
                      unoptimized
                    />
                    {/* FRONT (GENERATED) IMAGE */}
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
        <div className="hidden lg:flex relative z-10 text-center  items-center">
          <div className="h-screen relative flex justify-center w-1/2 ">
            {loading ? (
              <div className="w-[950px] h-[950px] bg-gray-200 animate-pulse rounded-lg" />
            ) : error ? (
              <p className="text-red-500 italic">{error}</p>
            ) : (
              imageUrl && (
                <div className="relative w-[950px] h-[950px] flex justify-center items-center">
                  <div className="relative w-[300px] h-[300px]">
                    {/* BACK IMAGE */}
                    <Image
                      src="/cards/back.png"
                      alt="GDG ID Back"
                      width={520}
                      height={520}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
                    />
                    {/* FRONT (GENERATED) IMAGE */}
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

          <div className="h-screen  flex flex-col justify-center">
            <h1
              className="
    text-7xl font-bold mb-4 
    text-slate-800 
    drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]
    dark:text-transparent dark:bg-clip-text
    dark:bg-[linear-gradient(to_bottom,rgba(147,197,253,1)_0%,rgba(255,255,255,1)_50%,rgba(147,197,253,1)_100%)]
    dark:drop-shadow-[0_0_20px_rgba(147,197,253,0.8)]
  "
            >
              OFFICIAL GDG PUP<br />DIGITAL ID
            </h1>

            <Image
              src="/GDGLogo.png"
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
      </section>
    </div>
  );
};
 