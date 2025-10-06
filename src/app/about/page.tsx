"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { BsStars } from "react-icons/bs";

const AboutPage = () => {
  const router = useRouter();
  const handleCta = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen ">
      {/* content container */}
      <div className="w-full flex flex-col my-10 px-4 gap-8">
        {/* heading  */}
        <div className="w-full px-4 font-bold text-6xl text-blue-400 text-center">
          Project Vision
        </div>

        {/* subheading/description */}
        <div className="w-full px-4 font-bold text-2xl text-center">
          Digital ID Platform
        </div>

        {/* sparky image */}
        <img
          src="/sites/about/cardStack.png"
          alt="sparky "
          className="mx-auto w-100 aspect-auto"
        />

        {/* about card */}
        <div className="w-full max-w-lg mx-auto p-8 shadow text-center rounded-2xl bg-gradient-to-b from-gray-50 to-gray-200  ">
          GDG PUP helps student developers grow through real projects, events,
          and mentorship connecting classroom learning to industry practice.
        </div>

        {/* cta */}
        <div className="w-full">
          <Button onClick={handleCta} className="w-fit mx-auto">
            <BsStars />
            <span className="ml-2 whitespace-nowrap">Get My Digital ID</span>
          </Button>
        </div>
        {/* input & button */}
        {/* <form className="w-full px-4 flex flex-row" onSubmit={handleSubmit}>
                <input
                  type="email"
                  ref={inputRef}
                  required
                  placeholder="Enter your email"
                  className="w-full py-2 px-4 border border-gray-300 rounded-l-lg"
                />
                
              </form> */}
      </div>
    </div>
  );
};

export default AboutPage;