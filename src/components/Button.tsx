"use client";

import { ButtonHTMLAttributes, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "./ui/animated-gradient-text";

// Utility to darken a hex color slightly (for shadow)
function darkenColor(hex: string, amount: number = 20): string {
  let usePound = false;

  if (hex[0] === "#") {
    hex = hex.slice(1);
    usePound = true;
  }

  const num = parseInt(hex, 16);
  let r = (num >> 16) - amount;
  let g = ((num >> 8) & 0x00ff) - amount;
  let b = (num & 0x0000ff) - amount;

  r = r < 0 ? 0 : r;
  g = g < 0 ? 0 : g;
  b = b < 0 ? 0 : b;

  return (
    (usePound ? "#" : "") +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0")
  );
}

const buttonVariants = {
  blue: {
    base: "#4285f4",
    hover: "#298843", 
  },
  green: {
    base: "#298843",
    hover: "#F9AB00", 
  },
} as const;

type ButtonVariant = keyof typeof buttonVariants;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  htmlType?: "button" | "submit" | "reset" | undefined;
}

export default function Button({
  children = "Button",
  onClick,
  variant = "blue",
  icon,
  htmlType = "button",
  className,
  ...rest
}: Props) {
  const [baseColor, setBaseColor] = useState<string>(buttonVariants[variant].base);
 

  const handleMouseEnter = () => { 
    setBaseColor(buttonVariants[variant].hover);
  };
  const handleMouseLeave = () => {
    setBaseColor(buttonVariants[variant].base);
  };

  const handleOnClick = () => {
    if (onClick) onClick();
  };

  return (
    <button
      {...rest}
      type={htmlType}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleOnClick}
      className={cn(
        "group relative flex items-center justify-center rounded-[8px] px-4 py-2.5 font-medium text-white transition-all duration-300 ease-out select-none overflow-hidden text-sm cursor-pointer",
        className
      )}
      style={{
        backgroundColor: baseColor,
        boxShadow: `  inset 0px 1px 0px 0px rgba(255,255,255,0.40), inset 0px -3px 0px 0px rgba(0,0,0,0.20), inset 0px 4px 4px 0px rgba(0,0,0,0.05)`,
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
      }}
 
    >
      {/* Radial sheen */}
      <div className="absolute inset-0 rounded-[8px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.45)_0%,rgba(0,0,0,0.10)_100%)] pointer-events-none mix-blend-overlay" />

      <AnimatedGradientText className="font-semibold tracking-wide text-white flex flex-row items-center justify-center">
        {children}
      </AnimatedGradientText>

      {/* Gloss overlay */}
      <div className="absolute inset-0 rounded-[8px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
    </button>
  );
}
