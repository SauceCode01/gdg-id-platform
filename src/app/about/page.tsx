"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { BsStars } from "react-icons/bs";
import Grid from "@/components/GridBackground";
import GlowBlobs from "@/components/GlowBlobs";

const AboutPage = () => {
  const router = useRouter();
  const handleCta = () => router.push("/");

  return (
    <div className="relative min-h-screen overflow-hidden bg-white font-[var(--font-google-sans)]">
      {/* background grid */}
      <Grid />

      {/* glow blobs — only show on large screens */}
      <div className="hidden lg:block">
        <GlowBlobs layout="about" />
      </div>

      {/* floating stickers — only show on large screens */}
      <div
        className="hidden lg:flex absolute left-[100px] top-[60%] -translate-y-1/2 
        w-[105px] h-[105px] items-center justify-center rounded-full bg-white/80 
        shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm 
        border border-white/60 z-20 rotate-20"
      >
        <img
          src="/sites/about/stickerBrackets.gif"
          alt="Sticker Brackets"
          className="w-full h-full object-contain"
        />
      </div>

      <div
        className="hidden lg:flex absolute right-[100px] top-[60px]
        w-[105px] h-[105px] items-center justify-center rounded-full bg-white/80 
        shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm 
        border border-white/60 z-20 -rotate-12"
      >
        <img
          src="/sites/about/stickerBrackets.gif"
          alt="Sticker Brackets"
          className="w-full h-full object-contain"
        />
      </div>

      {/* content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-10 pt-10 pb-10 -translate-y-4 lg:-translate-y-10">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl gap-0 relative">
          
          {/* Mobile Layout — Titles above Image */}
          <div className="block lg:hidden text-center">
            <h1
              className="font-bold text-4xl sm:text-5xl leading-none mb-1 text-[#4285F4]"
              style={{
                textShadow: `
                  0 0 8px #c3ecf6,
                  0 0 16px #c3ecf6,
                  0 0 24px #c3ecf6
                `,
              }}
            >
              Project Vision
            </h1>
            <h2 className="font-semibold text-lg sm:text-xl text-gray-700 leading-tight mb-6">
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
            <div className="hidden lg:block">
              <h1
                className="font-bold text-5xl lg:text-6xl leading-none mb-0 text-[#4285F4]"
                style={{
                  textShadow: `
                    0 0 8px #c3ecf6,
                    0 0 16px #c3ecf6,
                    0 0 24px #c3ecf6
                  `,
                }}
              >
                Project Vision
              </h1>
              <h2 className="font-semibold text-xl lg:text-2xl text-gray-700 leading-tight mt-4 mb-8 lg:translate-x-22">
                Digital ID Platform
              </h2>
            </div>

            {/* about card */}
            <div
              className="p-5 lg:p-6 rounded-2xl bg-white/70 backdrop-blur-sm text-gray-700 
              max-w-md lg:max-w-lg mt-4 mb-3 text-base sm:text-lg lg:text-xl leading-[1.6] 
              text-justify tracking-[0.01em] 
              shadow-[0_4px_20px_rgba(0,0,0,0.08),_0_8px_30px_rgba(0,0,0,0.05)]
              lg:-translate-x-12"
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
                <span className="ml-2 whitespace-nowrap">Get My Digital ID</span>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;
