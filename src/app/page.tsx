import Image from "next/image";
import Grid from "@/components/GridBackground";
import Button from "@/components/Button";
import { DiscAlbum, Download } from "lucide-react";
import Link from "next/link";
import { BsStars } from "react-icons/bs";

export default function Home() {
  return (
    <div className="min-h-screen ">
      {/* content container */}
      <div className="w-full flex flex-col my-10 px-4 gap-8">
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
        <div className="w-full px-4 flex flex-row">
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full py-2 px-4 border border-gray-300 rounded-l-lg"
          />
          <Button>
            <BsStars />
            <span className="ml-2 whitespace-nowrap">Search ID</span>
          </Button>
        </div>

        {/* sparky image */}
        <img
          src="/sites/landing/SparkyClassicPose.png"
          alt="sparky "
          className="mx-auto w-100 aspect-auto"
        />
      </div>
    </div>
  );
}
