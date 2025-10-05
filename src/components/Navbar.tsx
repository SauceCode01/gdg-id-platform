"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 left-0 w-full z-50">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600">GDG PUP</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6 ">
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                About
              </Link>

              <Link
                href="/faqs"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                FAQs
              </Link>

              <Link
                href="/contacts"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Contact
              </Link>

              <Link
                href="/comingsoon"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Coming Soon
              </Link>
            </div>

            {/* burger menu visible below md */}
            <div className="flex md:hidden p-2 hover:bg-gray-200 cursor-pointer" 
          onClick={() => setOpen(!open)}>
              <IoMenuSharp className="text-3xl " />
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
          <Link href="/about" onClick={() => setOpen(!open)}>About</Link>
          <Link href="/faqs" onClick={() => setOpen(!open)}>FAQs</Link>
          <Link href="/contacts" onClick={() => setOpen(!open)}>Contact</Link>
          <Link href="/comingsoon" onClick={() => setOpen(!open)}>Coming Soon</Link>
        </div>
      </div>
    </>
  );
}
