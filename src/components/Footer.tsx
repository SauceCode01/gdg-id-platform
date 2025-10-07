"use client";

import Button from "@/components/Button";
import { useGlobalContext } from "@/providers/GlobalContextProvider";

const Footer = () => {
  const { isDarkMode } = useGlobalContext();

  return (
    <footer
      className="relative overflow-hidden py-6 px-4 mt-8"
      style={{
        background: `
          linear-gradient(
            to bottom,
            rgba(var(--color-background-rgb), 0) 0%,
            var(--color-background-variant) 100%
          )
        `,
      }}
    >
      <div className="w-full max-w-7xl mx-auto overflow-x-hidden px-0">
        <img
          src="/sites/contacts/border.png"
          alt="Footer border"
          className="w-full h-auto object-contain block"
        />
      </div>

      {/* footer content */}
      <div
        className="
          w-full max-w-6xl mx-auto 
          flex flex-col lg:flex-row lg:flex-wrap
          items-center lg:items-start
          justify-center lg:justify-between 
          mt-10 gap-6 sm:gap-8 md:gap-10 pb-6 
          text-center lg:text-left
        "
      >
        <div className="flex items-center justify-center lg:justify-start w-full lg:w-auto">
          <img
            src={
              isDarkMode
                ? "/sites/footer/darkGdgFooter.svg"
                : "/sites/footer/gdgFooter.svg"
            }
            alt="GDG Footer Logo"
            className="h-6 w-auto object-contain"
          />
        </div>

        {/* footer links */}
        <div
          className="
            flex flex-wrap justify-center lg:justify-center 
            items-center gap-4 sm:gap-8 lg:gap-14 
            text-[var(--foreground)] 
            text-sm sm:text-base font-normal 
            w-full lg:w-auto mt-2 lg:mt-0
          "
        >
          <a href="#" className="hover:text-[var(--color-gdg-blue-light)] transition-colors duration-200">Privacy</a>
          <a href="#" className="hover:text-[var(--color-gdg-blue-light)] transition-colors duration-200">Terms</a>
          <a href="#" className="hover:text-[var(--color-gdg-blue-light)] transition-colors duration-200">About Event</a>
          <a href="#" className="hover:text-[var(--color-gdg-blue-light)] transition-colors duration-200">Code of Conduct</a>
          <a href="#" className="hover:text-[var(--color-gdg-blue-light)] transition-colors duration-200">Contact Us</a>
        </div>

        {/* partner button */}
        <div className="w-full lg:w-auto flex justify-center lg:justify-end mt-3 lg:mt-0">
          <Button
            bgColor="bg-[var(--color-gdg-green)]"
            className="!text-white text-xs sm:text-sm px-5 py-2 sm:px-6 sm:py-2.5 hover:opacity-90 transition"
          >
            Partner with Us
          </Button>
        </div>
      </div>

      {/* divider */}
      <div
        className="w-full max-w-6xl mx-auto border-t mt-6 mb-6"
        style={{ borderColor: "var(--color-text-muted)" }}
      ></div>

      {/* bottom section */}
      <div
        className="
          w-full max-w-6xl mx-auto 
          flex flex-col sm:flex-row 
          items-center justify-between 
          gap-3 pb-6 text-center sm:text-left
        "
      >
        {/* copyright */}
        <p className="text-xs sm:text-sm text-[var(--foreground)] order-2 sm:order-1">
          © 2025 GDG PUP | All Rights Reserved.
        </p>

        {/* social icons */}
        <div className="flex justify-center sm:justify-end items-center gap-4 sm:gap-3 order-1 sm:order-2">
          <a href="https://www.facebook.com/gdg.pupmnl" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <img
              src="/sites/footer/f-facebook.svg"
              alt="Facebook"
              className="h-5 w-5 object-contain hover:opacity-80 transition"
            />
          </a>
          <a href="https://www.instagram.com/gdg.pupmnl/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img
              src="/sites/footer/f-instagram.svg"
              alt="Instagram"
              className="h-5 w-5 object-contain hover:opacity-80 transition"
            />
          </a>
          <a href="#" aria-label="Discord">
            <img
              src="/sites/footer/f-discord.svg"
              alt="Discord"
              className="h-5 w-5 object-contain hover:opacity-80 transition"
            />
          </a>
          <a href="https://www.linkedin.com/company/gdgpup/posts/?feedView=all" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <img
              src="/sites/footer/f-linkedin.svg"
              alt="LinkedIn"
              className="h-5 w-5 object-contain hover:opacity-80 transition"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
