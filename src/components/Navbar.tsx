"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IoMenu, IoClose } from "react-icons/io5";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showShadow, setShowShadow] = useState(true);
  const [showBackdropBlur, setShowBackdropBlur] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      // Immediately remove shadow and backdrop blur when opening
      setShowShadow(false);
      const blurTimer = setTimeout(() => {
        setShowBackdropBlur(false);
      }, 200); // Delay backdrop blur removal by 250ms
      return () => clearTimeout(blurTimer);
    } else {
      // Immediately restore backdrop blur when closing
      setShowBackdropBlur(true);
      // Delay adding shadow back when closing (wait for animation to finish)
      const shadowTimer = setTimeout(() => {
        setShowShadow(true);
      }, 200);
      return () => clearTimeout(shadowTimer);
    }
  }, [open]);

  return (
    <>
      <nav
        className={cn(
          "flex items-center justify-between sticky top-0 left-0 h-14 md:h-20 bg-white/0 md:border-[0.50px] md:backdrop-blur-[6px] md:border-b-[#a6a4a5]/30 overflow-hidden w-full z-100 transition-all duration-300",
          showShadow ? "shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]" : "shadow-none",
          showBackdropBlur ? "backdrop-blur-[6px]" : "backdrop-blur-none"
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
            <div className="flex items-center gap-3 md:gap-5 lg:gap-15">
              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-1.5 md:gap-5 lg:gap-15 h-full">
                <Link
                  href="/about"
                  className={cn(
                    "text-base font-normal transition-all duration-200",
                    pathname === "/about"
                      ? "text-[#4285f4] [filter:drop-shadow(0_0_6px_rgba(174,205,253,1))]"
                      : "text-[#1e1e1e] hover:text-[#4285f4] hover:[filter:drop-shadow(0_0_6px_rgba(174,205,253,1))]"
                  )}
                >
                  About
                </Link>

                <Link
                  href="/faqs"
                  className={cn(
                    "text-base font-normal transition-all duration-200",
                    pathname === "/faqs"
                      ? "text-[#4285f4] [filter:drop-shadow(0_0_6px_rgba(174,205,253,1))]"
                      : "text-[#1e1e1e] hover:text-[#4285f4] hover:[filter:drop-shadow(0_0_6px_rgba(174,205,253,1))]"
                  )}
                >
                  FAQs
                </Link>

                <Link
                  href="/contacts"
                  className={cn(
                    "text-base font-normal transition-all duration-200",
                    pathname === "/contacts"
                      ? "text-[#4285f4] [filter:drop-shadow(0_0_6px_rgba(174,205,253,1))]"
                      : "text-[#1e1e1e] hover:text-[#4285f4] hover:[filter:drop-shadow(0_0_6px_rgba(174,205,253,1))]"
                  )}
                >
                  Contact
                </Link>

                <Link
                  href="/comingsoon"
                  className={cn(
                    "text-base font-normal transition-all duration-200",
                    pathname === "/comingsoon"
                      ? "text-[#4285f4] [filter:drop-shadow(0_0_6px_rgba(174,205,253,1))]"
                      : "text-[#1e1e1e] hover:text-[#4285f4] hover:[filter:drop-shadow(0_0_6px_rgba(174,205,253,1))]"
                  )}
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
            className={cn(
              "w-full text-center text-xl font-bold leading-[30px] tracking-wide",
              pathname === "/about" ? "text-[#4285f4]" : "text-[#1e2939]"
            )}
          >
            About
          </Link>
          <Link
            href="/faqs"
            onClick={() => setOpen(!open)}
            className={cn(
              "w-full text-center text-xl font-bold leading-[30px] tracking-wide",
              pathname === "/faqs" ? "text-[#4285f4]" : "text-[#1e2939]"
            )}
          >
            FAQs
          </Link>
          <Link
            href="/contacts"
            onClick={() => setOpen(!open)}
            className={cn(
              "w-full text-center text-xl font-bold leading-[30px] tracking-wide",
              pathname === "/contacts" ? "text-[#4285f4]" : "text-[#1e2939]"
            )}
          >
            Contact
          </Link>
          <Link
            href="/comingsoon"
            onClick={() => setOpen(!open)}
            className={cn(
              "w-full text-center text-xl font-bold leading-[30px] tracking-wide",
              pathname === "/comingsoon" ? "text-[#4285f4]" : "text-[#1e2939]"
            )}
          >
            Coming Soon
          </Link>
        </div>
      </div>
    </>
  );
}
