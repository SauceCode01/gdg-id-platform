import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { auth } from "../firebase/firebaseClient";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * wrapper for the fetch function
 * automatically inserts the auth token to the request
 */
export const wrappedFetch = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const token = await auth.currentUser?.getIdToken();

  return fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

/**
 * Helper function that checks if the user is authenticated
 */
export const isAuthenticated = async () =>
  (await getAuth().currentUser) !== null;

/**
 * Checks if two arrays share at least one element
 */
export const arrayIntersecting = (
  arr1: unknown[],
  arr2: unknown[]
): boolean => {
  return arr1.some((item) => arr2.includes(item));
};

/**
 * Helper function that returns the current breakpoint based on default tailwind breakpoints.
 */
export function useBreakpoint() {
  const breakpoints = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  };
  type BreakpointKey = keyof typeof breakpoints;
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
