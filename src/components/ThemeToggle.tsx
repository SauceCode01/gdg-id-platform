"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    // Placeholder alert - will implement dark mode later
    setIsDark(!isDark);
  };

  return (
    <div
      onClick={toggleTheme}
      className={cn(
        "relative transition-all flex justify-center items-center duration-300",
        "w-[50px] h-[30px]"
      )}
      aria-label="Toggle dark mode"
    >
      {/* Background Track */}
      <div
        className={cn(
          "w-[50px] h-[25px] absolute rounded-[100px] border-[0.3px] border-[#0d0e11]/10 transition-colors duration-300 ease-in-out flex justify-center items-center top-1/2 -translate-y-1/2",
          isDark ? "bg-stone-800" : "bg-[#ffd86d]"
        )}
      />

      {/* Sliding Circle */}
      <div
        className={cn(
          "absolute rounded-full transition-all duration-300 ease-in-out flex items-center justify-end top-1/2 -translate-y-1/2",
          isDark
            ? "w-[18.81px] h-[18.81px] left-[29px] bg-[#ffd86d]"
            : "w-[18.81px] h-[18.81px] left-[2.5px] bg-[#fffadf]"
        )}
      >
        {/* Inner dark circle - only visible in dark mode */}
        {isDark && (
          <div className="w-[13.15px] h-[13.15px] bg-stone-800 rounded-full " />
        )}
      </div>
    </div>
  );
}
