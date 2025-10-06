"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showShadow, setShowShadow] = useState(true);

  useEffect(() => {
    if (open) {
      // Immediately remove shadow when opening
      setShowShadow(false);
    } else {
      // Delay adding shadow back when closing (wait for animation to finish)
      const timer = setTimeout(() => {
        setShowShadow(true);
      }, 100); // 300ms matches the dropdown transition duration
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <>
      <nav
        className={cn(
          "flex items-center justify-between  sticky top-0 left-0 h-14 md:h-20  md:outline-[#a6a4a5]/30 overflow-hidden w-full z-100 transition-shadow",
          showShadow
            ? "shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] backdrop-blur-[6px] bg-white/75"
            : "bg-none"
        )}
      >
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
                className="flex md:hidden hover:bg-gray-200 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <div
                  className={cn(
                    "transition-transform duration-300 ease-in-out",
                    open ? "rotate-90" : "rotate-0"
                  )}
                >
                  {open ? (
                    <IoClose className="text-3xl" />
                  ) : (
                    <IoMenu className="text-3xl" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* overlay */}
      <div
        className={cn(
          "fixed top-0 left-0 transition-all duration-200 w-[100vw] h-[100vh] md:hidden",
          open ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setOpen(!open)}
      />

      {/* dropdown  */}
      <div
        className={cn(
          open ? "translate-y-0" : "translate-y-[-150%]",
          "w-full fixed top-0 left-0 transition duration-500 ease-in-out z-50 md:hidden"
        )}
      >
        <div className="py-6 bg-white/75 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[6px] flex flex-col justify-start items-start gap-6 pt-20">
          <Link
            href="/about"
            onClick={() => setOpen(!open)}
            className="w-full text-center text-[#1e2939] text-xl font-bold leading-[30px] tracking-wide"
          >
            About
          </Link>
          <Link
            href="/faqs"
            onClick={() => setOpen(!open)}
            className="w-full text-center text-[#1e2939] text-xl font-bold leading-[30px] tracking-wide"
          >
            FAQs
          </Link>
          <Link
            href="/contacts"
            onClick={() => setOpen(!open)}
            className="w-full text-center text-[#1e2939] text-xl font-bold leading-[30px] tracking-wide"
          >
            Contact
          </Link>
          <Link
            href="/comingsoon"
            onClick={() => setOpen(!open)}
            className="w-full text-center text-[#1e2939] text-xl font-bold leading-[30px] tracking-wide"
          >
            Coming Soon
          </Link>
        </div>
      </div>
    </>
  );
}
