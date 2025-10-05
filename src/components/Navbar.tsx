"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">GDG PUP</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
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
        </div>
      </div>
    </nav>
  );
}
