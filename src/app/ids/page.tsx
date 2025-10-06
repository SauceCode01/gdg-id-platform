"use client";

import Grid from "@/components/GridBackground";
import Image from "next/image";
import Button from "@/components/Button";
import { Download } from "lucide-react";
import { useSearchParams } from "next/navigation";

const IDPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f6f8fa]">
        <Grid />

        {/* ===== MOBILE VIEW ===== */}
        <div className="relative z-10 text-center px-6 lg:hidden">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            OFFICIAL GDG PUP DIGITAL ID
          </h1>
          <p className="text-slate-600 mb-4">
            email: {email || "no email entered"}
          </p>

          <div className="flex justify-center mb-4">
            <Image
              src="/IDCard.png"
              alt="GDG ID"
              width={450}
              height={450}
              className="h-auto w-full max-w-sm object-contain"
            />
          </div>

          <div className="flex justify-center gap-3">
            <Button bgColor="bg-blue-600">
              <Download className="mr-2 size-5 stroke-white" />
              <span>Download as PNG</span>
            </Button>

            <Button bgColor="bg-green-600">
              <Download className="mr-2 size-5 stroke-white" />
              <span>Download as PDF</span>
            </Button>
          </div>
        </div>

        {/* ===== DESKTOP VIEW ===== */}
        <div className="hidden lg:flex relative z-10 text-center px-6 gap-x-20 items-center">
          <div>
            <Image
              src="/IDCard.png"
              alt="GDG ID"
              width={450}
              height={450}
              className="h-auto w-full max-w-md object-contain"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              OFFICIAL GDG PUP DIGITAL ID
            </h1>
            <p className="text-slate-600 mb-4">
              email: {email || "no email entered"}
            </p>

            <Image
              src="/GDGLogo.png"
              alt="GDG Logo"
              width={300}
              height={300}
              className="h-auto w-full max-w-xs object-contain mx-auto mb-4"
            />

            <div className="flex justify-center gap-3">
              <Button bgColor="bg-blue-600">
                <Download className="mr-2 size-5 stroke-white" />
                <span>Download as PNG</span>
              </Button>

              <Button bgColor="bg-green-600">
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

export default IDPage;
