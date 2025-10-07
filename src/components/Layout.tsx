"use client";

import { useGlobalContext } from "@/providers/GlobalContextProvider";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { cn } from "@/lib/utils";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isDarkMode } = useGlobalContext();

  return (
    <div className={cn("  bg-background text-text", isDarkMode ? "dark" : "")}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
