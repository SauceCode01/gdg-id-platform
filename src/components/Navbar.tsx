"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between bg-white/0 sticky top-0 left-0 z-50 h-14 md:h-20 outline-1 outline-offset-[1px] outline-[#a6a4a5]/30 backdrop-blur-[6px] overflow-hidden w-full ">
        <div className="max-w-7xl mx-auto w-full flex px-6 md:px-8">
          <div className="flex justify-between items-center h-full w-full">
            {/* Logo - left side */}
            <Link href="/" className="flex items-center">
              {/* Mobile logo - visible on small screens */}
              <img
                src="/sites/navbar/logo-mobile-light.png"
                alt="GDG PUP Logo"
                className="block md:hidden"
              />
              {/* Desktop logo - visible on medium screens and up */}
              <img
                src="/sites/navbar/logo-light.png"
                alt="GDG PUP Logo"
                className="hidden md:block"
              />
            </Link>

            {/* Navlinks & dark/light mode toogle - right side */}
            <div className="flex items-center gap-3 md:gap-8 lg:gap-15">
              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-1.5 md:gap-6 lg:gap-15 h-full">
                <Link
                  href="/about"
                  className="text-[#1e1e1e] text-base font-normal transition-all duration-200 hover:text-[#4285f4] hover:[filter:drop-shadow(0_0_6px_rgba(174,205,253,1))]"
                >
                  About
                </Link>

                <Link
                  href="/faqs"
                  className="text-[#1e1e1e] text-base font-normal transition-all duration-200 hover:text-[#4285f4] hover:[filter:drop-shadow(0_0_6px_rgba(174,205,253,1))]"
                >
                  FAQs
                </Link>

                <Link
                  href="/contacts"
                  className="text-[#1e1e1e] text-base font-normal transition-all duration-200 hover:text-[#4285f4] hover:[filter:drop-shadow(0_0_6px_rgba(174,205,253,1))]"
                >
                  Contact
                </Link>

                <Link
                  href="/comingsoon"
                  className="text-[#1e1e1e] text-base font-normal transition-all duration-200 hover:text-[#4285f4] hover:[filter:drop-shadow(0_0_6px_rgba(174,205,253,1))]"
                >
                  Coming Soon
                </Link>
              </div>

              {/* Dark/Light Mode Toggle */}
              <ThemeToggle />

              {/* burger menu visible below md */}
              <div
                className="flex md:hidden p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <IoMenuSharp className="text-3xl " />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* overlay */}
      <div
        className={cn(
          "fixed top-0 left-0 transition-all duration-200 bg-black/20 w-[100vw] h-[100vh]",
          open ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setOpen(!open)}
      ></div>

      {/* dropdown  */}
      <div
        className={cn(
          open ? "translate-y-0" : " translate-y-[-100%]",
          "w-full fixed top-0 left-0 bg-white  transition duration-500 ease-in-out z-100 p-8"
        )}
      >
        <div className="w-full bg-amber-200" onClick={() => setOpen(!open)}>
          close
        </div>
        <div className="flex flex-col items-center gap-4">
          <Link href="/about" onClick={() => setOpen(!open)}>
            About
          </Link>
          <Link href="/faqs" onClick={() => setOpen(!open)}>
            FAQs
          </Link>
          <Link href="/contacts" onClick={() => setOpen(!open)}>
            Contact
          </Link>
          <Link href="/comingsoon" onClick={() => setOpen(!open)}>
            Coming Soon
          </Link>
        </div>
      </div>
    </>
  );
}
