"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { BsStars } from "react-icons/bs";
import Grid from "@/components/GridBackground";
import GlowBlobs from "@/components/GlowBlobs";
import { cn } from "@/lib/utils";
import { useGlobalContext } from "@/providers/GlobalContextProvider";

const AboutPage = () => {
  const router = useRouter();
  const handleCta = () => router.push("/");

  const {isDarkMode} = useGlobalContext();

  return (
    <div className="relative overflow-hidden ">
      {/* background grid */}
      <Grid />

      {/* glow blobs — only show on large screens */}
      <div className="hidden lg:block">
        <GlowBlobs layout="about" />
      </div>

      {/* floating stickers — only show on large screens */}
      <div
        className="hidden lg:flex absolute left-[100px] top-[60%] -translate-y-1/2 
        w-[105px] h-[105px] items-center justify-center rounded-full bg-white/90 
          backdrop-blur-sm 
         shadow-[0_0_20px_5px_rgba(255,255,255,0.6)] border-4 border-white/60 z-20 rotate-20"
      >
        <img
          src="/sites/about/stickerBrackets.gif"
          alt="Sticker Brackets"
          className="w-full h-full object-contain"
        />
      </div>

      <div
        className="hidden lg:flex absolute right-[100px] top-[60px]
        w-[105px] h-[105px] items-center justify-center rounded-full bg-white/90 
       shadow-[0_0_20px_5px_rgba(255,255,255,0.6)] border-4 border-white/60 backdrop-blur-sm 
         z-20 -rotate-12"
      >
        <img
          src="/sites/about/stickerBrackets.gif"
          alt="Sticker Brackets"
          className="w-full h-full object-contain"
        />
      </div>

      {/* content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-10 pt-10 pb-10 -translate-y-4 lg:-translate-y-10">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl gap-0 relative lg:my-16">
          {/* Mobile Layout — Titles above Image */}
          <div className="block lg:hidden text-center">
            <h1
              className={cn(
                "font-bold  text-4xl xs:text-5xl sm:text-6xl leading-none mb-1 text-gdg-blue mt-8",
                "drop-shadow-[0_0_2px_var(--color-gdg-blue)]",
              )}
               
            >
              Project Vision
            </h1>
            <h2 className="font-semibold text-lg sm:text-xl text-text leading-tight ">
              Digital ID Platform
            </h2>
          </div>

          {/* Left: Sparky image */}
          <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center lg:justify-end relative z-20 lg:translate-x-10">
            <img
              src="/sites/about/animatedCardStack.gif"
              alt="sparky"
              className="w-[90%] sm:w-[80%] lg:w-full max-w-[620px] aspect-auto 
              -mr-0 sm:-mr-8 lg:-mr-14 -mb-10 lg:-mb-20"
            />
          </div>

          {/* Right: text & CTA */}
          <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 text-center lg:text-left relative z-10 mt-6 lg:mt-0">
            {/* (hidden on mobile) */}
            <div className="hidden lg:block group">
              <h1
                className={cn(
                  "font-bold text-6xl leading-none mb-0 text-[#4285F4] hover:scale-x-105 transition-all duration-200 text-center",
                "drop-shadow-[0_0_2px_var(--color-gdg-blue)]",
                )}
              >
                Project Vision
              </h1>
              <h2 className="font-semibold text-xl lg:text-2xl text-text leading-tight mt-4 mb-8 lg:translate-x-22">
                Digital ID Platform
              </h2>
            </div>

            {/* about card */}
            <div
              className={cn(
                "p-5 lg:p-6 rounded-2xl bg-surface backdrop-blur-sm  max-w-md lg:max-w-lg mt-4 mb-3 text-base sm:text-lg lg:text-xl leading-[1.6]  text-justify tracking-[0.01em]  shadow-[0_4px_20px_rgba(0,0,0,0.08),_0_8px_30px_rgba(0,0,0,0.05)] lg:-translate-x-12 ",
                isDarkMode && "border-outline border-2"
              )}
            >
              Designed to connect, engage, and empower the community, GDG PUP’s
              flagship project for the 2026 cohort sets the stage for a smarter
              and more connected member experience.
            </div>

            {/* CTA button */}
            <div className="mt-6 lg:translate-x-22">
              <Button
                onClick={handleCta}
                className="w-fit flex items-center text-sm sm:text-base lg:text-lg px-5 py-2"
              >
                <BsStars />
                <span className="ml-2 whitespace-nowrap">
                  Get My Digital ID
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
