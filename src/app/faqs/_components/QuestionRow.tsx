"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

export type Question = {
  question: string;
  answer: string;
};

export const QuestionRow = ({ question }: { question: Question }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn(
      "w-full flex flex-col p-4 rounded-2xl  shadow py-6 gap-8",
      isOpen ? "bg-gradient-to-b front-white to-amber-100" : "bg-white"
    )}>
      {/* head part */}
      <div className="flex flex-row items-center">
        {/* question */}
        <div className="flex-1 font-bold">{question.question}</div>
        <div className="" onClick={() => setIsOpen(!isOpen)}>
          <FaPlus />
        </div>
      </div>

      {/* answer part */}
      {isOpen && <div className="">{question.answer}</div>}
    </div>
  );
};
