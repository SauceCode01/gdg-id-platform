"use client";

import Image from "next/image";
import Grid from "@/components/GridBackground";
import Button from "@/components/Button";
import { DiscAlbum, Download } from "lucide-react";
import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { TypeAnimation } from "react-type-animation";

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
        <div className="fixed inset-0 -z-1">
          <Grid />
        </div>

        <div className="w-[62.87px] h-[62.87px] relative rounded-[37.65px] mt-6 md:hidden">
          <div className="w-[62.87px] h-[62.87px] absolute left-0 top-0 bg-[#f0f0f3] rounded-[36px] shadow-[0.9908041656px_0.9908041656px_1.9816083312px_0px_rgba(174,174,192,0.40),_-0.6605361254px_-0.6605361254px_4.0953236818px_0px_rgba(255,255,255,1)]" />

          <div className="w-[57.62px] h-[57.62px] absolute left-[2.63px] top-[2.63px] bg-[#eeeeee] rounded-[32.36px] shadow-[inset_0.9908041656px_0.9908041656px_0.6605361254px_0px_rgba(174,174,192,0.20),_inset_-0.6605361254px_-0.6605361254px_0.6605361254px_0px_rgba(255,255,255,0.70)]" />
          <img
            src="/sites/landing/stickerBrackets.gif"
            alt="stickerBrackets"
            className="w-18 aspect-auto absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
          />
        </div>

        {/* content container */}
        <div className=" relative flex flex-col my-4 px-4 gap-8">
          {/* logo part */}
          {/* heading  */}
          <div className="w-full font-bold flex justify-center min-h-[66px]">
            <TypeAnimation
              sequence={[
                "B",
                1000, // Waits 1s
                "Bridging the gap between\ntheory and practice",
                1000, // Waits 1s
              ]}
              wrapper="span"
              cursor={true}
              speed={1}
              repeat={Infinity}
              className="blue-cursor text-[#1e2939] text-center text-[25px] font-bold leading-[29px] tracking-wide [text-shadow:_0px_4px_15px_rgb(0_0_0_/_0.35)]"
            />
          </div>

          {/* subheading/description */}
          <div className="w-full px-4 text-center">
            GDG PUP helps student developers grow through real projects, events,
            and mentorship connecting classroom learning to industry practice.
          </div>

          {/* input & button */}
          <form
            className="w-full px-4 flex flex-row max-w-lg mx-auto"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              ref={inputRef}
              required
              placeholder="Enter your email"
              className="w-full py-2 px-4 border border-gray-300 rounded-lg   bg-white text-text-muted"
            />
            <Button type="submit">
              <BsStars />
              <span className="ml-2 whitespace-nowrap">Search ID</span>
            </Button>
          </form>

          {/* sparky image */}
          <img
            src="/sites/landing/SparkyPose.svg"
            alt="sparky"
            className="mx-auto w-100 aspect-auto"
          />
        </div>
      </div>
    </>
  );
}
