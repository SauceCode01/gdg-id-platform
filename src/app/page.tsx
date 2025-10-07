"use client";

import Image from "next/image";
import Grid from "@/components/GridBackground";
import Button from "@/components/Button";
import { DiscAlbum, Download, Search, VectorSquare } from "lucide-react";
import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import GlowBlobs from "@/components/GlowBlobs";

export default function Home() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.current) return;
    const email = inputRef.current.value;
    const newRoute = `/ids?email=${email}`;
    console.log(newRoute);
    router.push(newRoute);
  };

  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
        {/* grid background */}
        <div className="absolute inset-0">
          <Grid />
        </div>

        {/* glow blobs layer — hidden on mobile */}
        <div className="hidden md:block absolute inset-0">
          <GlowBlobs layout="home" />
        </div>

        <div className="w-[62.87px] h-[62.87px] relative rounded-[37.65px] mt-6 md:my-10 lg:hidden">
          <div className="w-[62.87px] h-[62.87px] absolute left-0 top-0 bg-[#f0f0f3] rounded-[36px] shadow-[0.9908041656px_0.9908041656px_1.9816083312px_0px_rgba(174,174,192,0.40),_-0.6605361254px_-0.6605361254px_4.0953236818px_0px_rgba(255,255,255,1)]" />

          <div className="w-[57.62px] h-[57.62px] absolute left-[2.63px] top-[2.63px] bg-[#eeeeee] rounded-[32.36px] shadow-[inset_0.9908041656px_0.9908041656px_0.6605361254px_0px_rgba(174,174,192,0.20),_inset_-0.6605361254px_-0.6605361254px_0.6605361254px_0px_rgba(255,255,255,0.70)]" />
          <img
            src="/sites/landing/stickerBrackets.gif"
            alt="stickerBrackets"
            className="w-18 aspect-auto absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
          />
        </div>

        {/* content container */}
        <div className=" relative flex flex-col my-4 px-4 max-w-7xl mx-auto w-full ">
          {/* heading  */}
          <div className="w-full font-bold flex justify-center lg:mb-5 min-h-[60px] max-w-[400px] sm:max-w-[400px] sm:min-h-[80px] md:max-w-[600px] lg:max-w-[900px] md:min-h-[120px] lg:min-h-[140px] mx-auto lg:mt-20">
            <TypeAnimation
              sequence={[
                "B",
                100, // Waits 0.1s
                "Bridging the gap between theory and practice.",
                1000, // Waits 1s
              ]}
              wrapper="span"
              preRenderFirstString={true}
              cursor={true}
              speed={1}
              repeat={Infinity}
              className="blue-cursor text-center text-[25px] md:text-[45px] lg:text-[69px] font-bold leading-[29px] sm:leading-[38px] md:leading-[52px] lg:leading-[64px] xl:leading-[70.76px] tracking-wide [text-shadow:_0px_4px_15px_rgb(0_0_0_/_0.35)] dark:[text-shadow:_0px_4px_15px_rgb(255_255_255_/_0.35)]"
            />
          </div>

          {/* subheading/description */}
          <div className="w-full text-center my-4 text-[14px] sm:text-[16px] md:text-[17px] lg:text-xl text-zinc-400 dark:text-zinc-400 leading-tight">
            {/* condensed text on mobile */}
            <div className="flex flex-col md:hidden gap-1">
              <div className="inline-block">
                GDG PUP helps student developers grow through real
              </div>
              <div className="inline-block">
                projects, events, and mentorship connecting classroom
              </div>
              <div className="inline-block">learning to industry practice.</div>
            </div>

            {/* full text on large screens */}
            <div className="hidden md:flex flex-col gap-1">
              <div className="inline-block">
                GDG PUP helps student developers grow through real projects,
                events, and mentorship
              </div>
              <div className="inline-block">
                connecting classroom learning to industry practice.
              </div>
            </div>
          </div>

          {/* input & button */}
          <form
            className="w-full px-4 flex flex-row max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl mx-auto relative"
            onSubmit={handleSubmit}
          >
            <Search className="absolute top-1/2 -translate-y-1/2 left-7 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px] text-neutral-400 z-20" />
            <input
              type="email"
              ref={inputRef}
              required
              placeholder="Enter your email to find your Digital ID"
              className="w-full z-10 py-2 px-4 pl-8 sm:py-2.5 sm:pl-10 md:py-3 md:pl-11 border border-gray-300 bg-white rounded-[7.09px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05),inset_0px_2px_4px_0px_rgba(0,0,0,0.25)] text-neutral-500 text-[12px] sm:text-[13px] md:text-[15px] lg:text-lg font-normal leading-[15px] sm:leading-[16px] md:leading-[18px] placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            />
            <Button type="submit" className="relative z-10">
              <BsStars />
              <span className="ml-2 whitespace-nowrap text-[13px] md:text-[15px] lg:text-[17px]">Search ID</span>
            </Button>

            {/* vector design - light mode */}
            <img
              src="/sites/landing/Vector-left.svg"
              alt="Vector Left"
              className="hidden xl:block dark:xl:hidden absolute -top-19 -left-40 "
            />
            <img
              src="/sites/landing/Vector-right.svg"
              alt="Vector right"
              className="hidden xl:block dark:xl:hidden absolute -right-30 -top-18"
            />
            <img
              src="/sites/landing/Vector-left.svg"
              alt="Vector Left"
              className="hidden xl:block dark:xl:hidden absolute top-20 left-18 scale-x-[1] scale-y-[-1] rotate-270 "
            />
            <img
              src="/sites/landing/Vector-left.svg"
              alt="Vector Left"
              className="hidden xl:block dark:xl:hidden absolute top-20 right-15 scale-x-[1]  rotate-270 "
            />

            {/* vector design - dark mode */}
            <img
              src="/sites/landing/Vector-left-dark.svg"
              alt="Vector Left"
              className="hidden dark:xl:block absolute -top-19 -left-40 "
            />
            <img
              src="/sites/landing/Vector-right-dark.svg"
              alt="Vector right"
              className="hidden dark:xl:block absolute -right-30 -top-18"
            />
            <img
              src="/sites/landing/Vector-left-dark.svg"
              alt="Vector Left"
              className="hidden dark:xl:block absolute top-20 left-18 scale-x-[1] scale-y-[-1] rotate-270 "
            />
            <img
              src="/sites/landing/Vector-left-dark.svg"
              alt="Vector Left"
              className="hidden dark:xl:block absolute top-20 right-15 scale-x-[1]  rotate-270 "
            />

            {/* floating stickers — only show on large screens */}
            <div
              className="hidden xl:flex absolute -right-55 -top-[70px] -translate-y-1/2 
                  w-[105px] h-[105px] items-center justify-center rounded-full bg-white/90 
                  backdrop-blur-sm 
                  shadow-[0_0_20px_5px_rgba(255,255,255,0.6)] border-4 border-white/60 z-20 -rotate-16"
            >
              <img
                src="/sites/about/stickerBrackets.gif"
                alt="Sticker Brackets"
                className="w-full h-full object-contain"
              />
            </div>

            <div
              className="hidden xl:flex absolute -left-55 -top-32 -translate-y-1/2 
                  w-[105px] h-[105px] items-center justify-center rounded-full bg-white/90 
                  backdrop-blur-sm 
                  shadow-[0_0_20px_5px_rgba(255,255,255,0.6)] border-4 border-white/60 z-20"
            >
              <img
                src="/sites/about/stickerBrackets.gif"
                alt="Sticker Brackets"
                className="w-full h-full object-contain"
              />
            </div>
          </form>

          {/* sparky image */}
          <img
            src="/sites/landing/SparkyPose.svg"
            alt="sparky"
            className="mx-auto aspect-auto mt-4 mb-[100px] z-20"
          />
        </div>
      </div>
    </>
  );
}
