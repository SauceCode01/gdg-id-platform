"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { BsStars } from "react-icons/bs";
import Button from "./Button";
import { cn } from "@/lib/utils";

interface SearchFormProps {
  className?: string;
}

interface UserResult {
  displayName: string;
  gdgId: string;
  name: string;
  email: string;
  course: string;
}

export default function SearchForm({ className }: SearchFormProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userResult, setUserResult] = useState<UserResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.current) return;

    const email = inputRef.current.value.trim();
    if (!email) return;
    setSearchQuery(email);
    setLoading(true);

    try {
      const res = await fetch(
        `/api/getUser?email=${encodeURIComponent(email)}`
      );
      if (!res.ok) {
        const errorData = await res.json();
        console.error("User not found:", errorData);
        setUserResult(null);
        setLoading(false);
        return;
      }

      // User found, set the result
      const user = await res.json();
      setUserResult(user);
      console.log("User found:", user);
    } catch (err) {
      console.error("Error querying user:", err);
      setUserResult(null);
    } finally {
      setLoading(false);
    }
  };

  const goToID = () => {
    if (userResult) {
      // User found, redirect to /ids
      router.push(`/testing?email=${encodeURIComponent(userResult.email)}`);
    }
  };

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setSearchQuery("");
      }
    }

    // Only add listener if search results are showing
    if (searchQuery) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchQuery]);

  return (
    <form
      ref={formRef}
      className={`w-full px-4 flex max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto relative ${
        className || ""
      }`}
      onSubmit={handleSubmit}
    >
      {searchQuery && (
        <div className="absolute px-4 left-0 top-13 md:top-15 lg:top-17 z-30">
          <div className="w-[248px] sm:w-[361px] md:w-[497px] lg:w-xl p-5 bg-[#a6a4a5]/25 rounded-[10.14px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25),inset_0px_1px_1px_0px_rgba(0,0,0,0.25),inset_0px_0px_1px_1px_rgba(0,0,0,0.25)] backdrop-blur-[25px] inline-flex flex-col justify-start items-start gap-[18px] overflow-hidden">
            <div className="text-[#4285f4] text-normal md:text-md lg:text-lg font-bold leading-normal">
              Your Digital ID Result
            </div>

            <div
              className={cn(
                "px-[19px] w-full py-4 bg-[#fffafa] rounded-[10.14px] shadow-[0px_2px_2px_1px_rgba(0,0,0,0.25)]  outline-1 outline-offset-[-1px] outline-black/50 inline-flex flex-col justify-start items-start gap-2 overflow-hidden",
                userResult ? "cursor-pointer hover:bg-slate-200" : ""
              )}
              onClick={userResult ? goToID : undefined}
            >
              <div className="flex-1 flex justify-start items-center gap-[18px]">
                <img
                  className="w-[38.88px] h-[38.88px]"
                  src="/sites/landing/ResultSparky.svg"
                  alt="User Avatar"
                />

                {loading ? (
                  <div className="text-zinc-800 text-normal md:text-md lg:text-lg font-medium">
                    Loading...
                  </div>
                ) : userResult ? (
                  <div className="text-zinc-800 text-normal md:text-md lg:text-lg font-bold leading-normal">
                    {userResult.name}
                  </div>
                ) : (
                  <div className="text-zinc-800 text-normal md:text-md lg:text-lg font-medium">
                    No user found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Search className="absolute top-1/2 -translate-y-1/2 left-7 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-[18px] md:h-[18px] text-neutral-400 z-20" />
      <input
        type="email"
        ref={inputRef}
        required
        placeholder="Enter your email to find your Digital ID"
        className="w-sm sm:w-md md:w-lg lg:w-xl z-10 py-2 px-4 pl-8 sm:py-2.5 sm:pl-10 md:py-3 md:pl-11 border border-gray-300 bg-white rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05),inset_0px_2px_4px_0px_rgba(0,0,0,0.25)] text-neutral-500 text-[12px] sm:text-[13px] md:text-[15px] lg:text-lg font-normal leading-[15px] sm:leading-[16px] md:leading-[18px] placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
      />
      <Button type="submit" className="relative z-10 ml-2">
        <BsStars />
        <span className="ml-2 whitespace-nowrap text-[13px] md:text-[15px] lg:text-[17px]">
          Search ID
        </span>
      </Button>

      {/* vector design - light mode */}
      <img
        src="/sites/landing/Vector-left.svg"
        alt="Vector Left"
        className="hidden xl:block dark:xl:hidden absolute top-[-76px] left-[-160px] "
      />
      <img
        src="/sites/landing/Vector-right.svg"
        alt="Vector right"
        className="hidden xl:block dark:xl:hidden absolute right-[-120px] top-[-72px]"
      />
      <img
        src="/sites/landing/Vector-left.svg"
        alt="Vector Left"
        className="hidden xl:block dark:xl:hidden absolute top-20 left-[72px] scale-x-[1] scale-y-[-1] rotate-270 "
      />
      <img
        src="/sites/landing/Vector-left.svg"
        alt="Vector Left"
        className="hidden xl:block dark:xl:hidden absolute top-20 right-[60px] scale-x-[1]  rotate-270 "
      />

      {/* vector design - dark mode */}
      <img
        src="/sites/landing/Vector-left-dark.svg"
        alt="Vector Left"
        className="hidden dark:xl:block absolute top-[-76px] left-[-160px] "
      />
      <img
        src="/sites/landing/Vector-right-dark.svg"
        alt="Vector right"
        className="hidden dark:xl:block absolute -right-30 -top-18"
      />
      <img
        src="/sites/landing/Vector-left-dark.svg"
        alt="Vector Left"
        className="hidden dark:xl:block absolute top-20 left-18 scale-x-[1] scale-y-[-1] rotate-270 "
      />
      <img
        src="/sites/landing/Vector-left-dark.svg"
        alt="Vector Left"
        className="hidden dark:xl:block absolute top-20 right-15 scale-x-[1]  rotate-270 "
      />

      {/* floating stickers — only show on large screens */}
      <div
        className="hidden xl:flex absolute -right-55 -top-[70px] -translate-y-1/2 
            w-[105px] h-[105px] items-center justify-center rounded-full bg-white/90 
            backdrop-blur-sm 
            shadow-[0_0_20px_5px_rgba(255,255,255,0.6)] border-4 border-white/60 z-20 -rotate-16"
      >
        <img
          src="/sites/about/stickerBrackets.gif"
          alt="Sticker Brackets"
          className="w-full h-full object-contain"
        />
      </div>

      <div
        className="hidden xl:flex absolute -left-55 -top-32 -translate-y-1/2 
            w-[105px] h-[105px] items-center justify-center rounded-full bg-white/90 
            backdrop-blur-sm 
            shadow-[0_0_20px_5px_rgba(255,255,255,0.6)] border-4 border-white/60 z-20"
      >
        <img
          src="/sites/about/stickerBrackets.gif"
          alt="Sticker Brackets"
          className="w-full h-full object-contain"
        />
      </div>
    </form>
  );
}
