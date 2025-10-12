import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Grid from "@/components/GridBackground";
import {
  GlobalContextProvider,
  useGlobalContext,
} from "@/providers/GlobalContextProvider";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/Layout";
import { QueryProvider } from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GDG PUP Digital ID Platform",
  description: "The official Digital ID Platform of GDG PUP, built to streamline member identity, event participation, and community engagement. Designed as the foundation for future NFC-enabled IDs and gamified experiences for the 2026 cohort and beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} antialiased`
        )}
      >
        <QueryProvider>
          <GlobalContextProvider>
            <Layout>{children}</Layout>
          </GlobalContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
