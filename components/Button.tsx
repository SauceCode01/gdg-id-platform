'use client';

import { useState } from "react";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "./ui/animated-gradient-text";

interface AnimatedGradientTextDemoProps {
    bgColor?: string; // Tailwind or hex background color
    label?: string;   // Button label
}

export default function AnimatedGradientTextDemo({
    bgColor = "bg-blue-500",
    label = "Download as PNG",
}: AnimatedGradientTextDemoProps) {
    const [hoverColor, setHoverColor] = useState<string | null>(null);

    // Determine if bgColor is a hex or Tailwind color
    const isHex = bgColor.startsWith("#");
    const darkShadow = isHex ? `${bgColor}80` : "rgba(0,0,0,0.3)";

    const handleMouseEnter = () => {
        const random = Math.random() > 0.5 ? "red" : "yellow";
        setHoverColor(random);
    };

    const handleMouseLeave = () => {
        setHoverColor(null);
    };

    // Compute dynamic hover background color
    const hoverStyle =
        hoverColor === "red"
            ? { backgroundColor: "#ef4444" } // Tailwind red-500
            : hoverColor === "yellow"
                ? { backgroundColor: "#facc15" } // Tailwind yellow-400
                : {};

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "group relative mx-2 flex items-center justify-center rounded-lg px-6 py-2.5 font-medium text-white transition-all duration-300 ease-out select-none overflow-hidden",
                bgColor,
                "shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]",
                "active:translate-y-[2px]"
            )}
            style={{
                boxShadow: `inset 0 1px 1px rgba(255,255,255,0.6), 0 4px 0 ${darkShadow}`,
                ...hoverStyle,
                transition: "background-color 0.4s ease",
            }}
        >
            {/* Radial sheen, 0.55 */}
            <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.55)_0%,rgba(0,0,0,0.15)_100%)] pointer-events-none mix-blend-overlay" />

            <Download className="mr-2 size-5 stroke-white" />
            <AnimatedGradientText className="text-sm font-semibold tracking-wide text-white">
                {label}
            </AnimatedGradientText>

            {/* Subtle gloss overlay */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
        </div>
    );
}
