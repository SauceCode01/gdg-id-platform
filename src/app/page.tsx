"use client";

import Image from "next/image";
import Grid from "@/components/GridBackground";
import Button from "@/components/Button";
import { DiscAlbum, Download } from "lucide-react";
import Link from "next/link";
import { BsStars } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useRef } from "react";

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
      <div className="min-h-screen ">
        <Grid />
        {/* content container */}
        <div className="w-full relative  flex flex-col my-10 px-4 gap-8">
          {/* logo part */}
          <div className="w-full flex flex-row justify-center">
            <img
              src="/pinkRedLogo.png"
              alt="sparky "
              className="w-20 aspect-auto"
            />
          </div>

          {/* heading  */}
          <div className="w-full px-4 font-bold text-3xl text-center">
            Bridging the gap between one two three idk
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
              className="w-full py-2 px-4 border border-gray-300 rounded-l-lg"
            />
            <Button type="submit">
              <BsStars />
              <span className="ml-2 whitespace-nowrap">Search ID</span>
            </Button>
          </form>

          {/* sparky image */}
          <img
            src="/sites/landing/SparkyClassicPose.png"
            alt="sparky "
            className="mx-auto w-100 aspect-auto"
          />
        </div>
      </div>
    </>
  );
}
