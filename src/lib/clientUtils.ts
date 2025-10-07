"use client";

import { useEffect, useState } from "react";

// 👇 match Tailwind's default breakpoints
const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

type BreakpointKey = keyof typeof breakpoints;

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<BreakpointKey>("xs");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      // find the largest breakpoint smaller than width
      const current = (Object.keys(breakpoints) as BreakpointKey[])
        .reverse()
        .find((key) => width >= breakpoints[key]) as BreakpointKey;

      setBreakpoint(current || "xs");
    };

    handleResize(); // run once
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const is2xl = breakpoint === "2xl";
  const isXl = breakpoint === "xl" || is2xl;
  const isLg = breakpoint === "lg" || isXl;
  const isMd = breakpoint === "md" || isLg;
  const isSm = breakpoint === "sm" || isMd;
  const isXs = breakpoint === "xs" || isSm;

  return { breakpoint, isXs, isSm, isMd, isLg, isXl, is2xl };
}
