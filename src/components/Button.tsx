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

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  onClick?: () => void;
  bgColor?: string; // Can be Tailwind, hex, or CSS variable
  type?: "button" | "submit" | "reset" | undefined;
}

export default function Button({
  children = "Button",
  onClick,
  bgColor = "#3b82f6", // default Tailwind blue-500 equivalent
  type,
  className,
  ...rest
}: Props) {
  const [baseColor, setBaseColor] = useState<string>(bgColor);
  const [shadowColor, setShadowColor] = useState<string>(
    bgColor.startsWith("#") ? darkenColor(bgColor, 35) : "black"
  );

  const handleMouseEnter = () => {
    // Example hover logic: slightly lightens or changes color
    const hover =
      Math.random() > 0.5 ? "#ef4444" /* red-500 */ : "#facc15" /* yellow-400 */;
    setBaseColor(hover);
  };

  const handleMouseLeave = () => {
    setBaseColor(bgColor);
  };

  useEffect(() => {
    // When base color changes, update shadow accordingly
    if (baseColor.startsWith("#")) {
      setShadowColor(darkenColor(baseColor, 35));
    } else {
      // For Tailwind or CSS variable colors, use a solid fallback shadow
      setShadowColor("rgba(0,0,0,0.2)");
    }
  }, [baseColor]);

  const handleOnClick = () => {
    if (onClick) onClick();
  };

  const isHex = baseColor.startsWith("#");
  const isTailwind = baseColor.startsWith("bg-") || baseColor.startsWith("bg[");

  return (
    <button
      {...rest}
      type={type}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleOnClick}
      className={cn(
        "group relative flex items-center justify-center rounded-[8px] px-6 py-2.5 font-medium text-white transition-all duration-300 ease-out select-none overflow-hidden text-sm cursor-pointer",
        isTailwind ? baseColor : "",
        className
      )}
      style={{
        backgroundColor: isHex ? baseColor : undefined,
        boxShadow: `inset 0 1px 1px #ffffff, 0 4px 0 ${shadowColor}`, // solid shadow preserved
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Radial sheen */}
      <div className="absolute inset-0 rounded-[8px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.55)_0%,rgba(0,0,0,0.15)_100%)] pointer-events-none mix-blend-overlay" />

      <AnimatedGradientText className="font-semibold tracking-wide text-white flex flex-row items-center justify-center">
        {children}
      </AnimatedGradientText>

      {/* Gloss overlay */}
      <div className="absolute inset-0 rounded-[8px] bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
    </button>
  );
}
