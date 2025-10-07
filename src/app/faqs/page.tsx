"use client";

import { FaPlus } from "react-icons/fa6";
import Grid from "@/components/GridBackground";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useGlobalContext } from "@/providers/GlobalContextProvider";
import GlowBlobs from "@/components/GlowBlobs";
import { FaMinus } from "react-icons/fa";

const FAQsPage = () => {
  return (
    <div className="min-h-screen ">
      <Grid />
      <div className="hidden lg:block">
        <GlowBlobs layout="about" />
      </div>
      {/* content container */}
      <div className="w-full flex flex-col px-8 z-10 relative">
        {/* heading part */}
        <div className="flex flex-row justify-center items-center w-full mx-auto  relative max-w-lg py-8 group">
          {/* sparky image */}
          <img
            src="/sites/faqs/SittingSparky.png"
            alt="sparky "
            className="w-[40%] group-hover:rotate-3 transition-all duration-200 max-w-50 aspect-auto "
          />
          <div className="flex flex-col gap-2">
            <h1
              className={cn(
                "text-8xl  md:text-9xl font-bold leading-none",
                // gradient text
                "bg-gradient-to-br from-gdg-green-light to-gdg-green-dark bg-clip-text text-transparent",
                // glow effect using drop-shadow
                "drop-shadow-[0_0_5px_var(--color-gdg-green-light)]",
                "group-hover:tracking-wide transition-all duration-200"
              )}
            >
              FAQs
            </h1>

            <p className="ml-4 sm:ml-8 md:ml-12 text-sm sm:text-lg md:text-xl ">
              Frequently Asked Questions
            </p>
          </div>
        </div>

        {/* question rows */}
        <div className="flex flex-col gap-8 mx-auto max-w-5xl w-full">
          {QUESTIONS.map((question, index) => (
            <QuestionRow key={index} question={question}></QuestionRow>
          ))}
        </div>
      </div>
    </div>
  );
};

export type Question = {
  question: string;
  answer: string;
};

export const QuestionRow = ({ question }: { question: Question }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { isDarkMode } = useGlobalContext();

  return (
    <div
      className={cn(
        "w-full flex flex-col p-4 rounded-2xl  shadow-[inset_0_-6px_6px_rgba(0,0,0,1)] py-6 gap-4 group   transition-all duration-150",
        !isDarkMode &&
          (isOpen
            ? "bg-gradient-to-b  from-surface-low  to-[#FED0CF]"
            : "bg-gradient-to-b from-surface to-background-variant"),
        isDarkMode &&
          (isOpen
            ? "bg-gradient-to-b  from-surface  to-[#0D3772] hover:inset-shadow-sm  inset-shadow-white/20"
            : "bg-gradient-to-b from-surface to-background-variant"),
        isDarkMode && "shadow-[0px_0px_5px_1px_rgba(255,255,255,1)]",
        !isDarkMode && "shadow-shadow shadow-lg "
      )}
    >
      {/* head part */}
      <div
        className="flex flex-row items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* question */}
        <div
          className={cn(
            "flex-1 font-bold w-full",
            "transition-all, duration-150",
            " group-hover:text-gdg-blue-light"
          )}
        >
          {question.question}
        </div>
        <div
          className={cn(
            "ml-4 text-gdg-blue transition-all duration-200 group-hover:scale-130",
            isOpen ? "rotate-0" : "rotate-180"
          )}
        >
          {isOpen ? <FaMinus className="text-[0.8em]" /> : <FaPlus />}
        </div>
      </div>

      {/* answer part */}
      {isOpen && <div className="">{question.answer}</div>}
    </div>
  );
};

const QUESTIONS: Question[] = [
  {
    question: "What is the GDG PUP Digital ID Platform?",
    answer:
      "Enter your registered email address in the lookup field. If your email isin the database, your digital ID will be generated instantly.",
  },
  {
    question: "How do I get my digital ID?",
    answer:
      "Enter your registered email address in the lookup field. If you email is in the database, your digital ID will be generated instantly.",
  },
  {
    question: "What information appears on the Digital ID?",
    answer:
      "Your name, GDG ID number, college & program, and a QR code linked to your member record.",
  },
  {
    question: "Can I download my Digital ID?",
    answer:
      "Yes, you can download it as a PNG image or PDF file directly from the platform.",
  },
  {
    question: "Will more features be added in the future?",
    answer:
      "Some features may require internet, but you can still open your Digital ID if it has already been saved on your device.",
  },
  {
    question: "What should I do if I encounter problems using the site?",
    answer:
      "Yes! Future updates may include event-based QR/NFC scanning, real-time leaderboards, and NFC-enabled physical cards.",
  },
];

export default FAQsPage;
