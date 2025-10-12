"use client";

import { ButtonHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

// Button variant configurations
const buttonVariants = {
  blue: {
    base: "bg-gradient-to-r from-[#4285f4] via-[#659df8] to-[#196cef]",
    hover: "bg-gradient-to-r from-[#298843] via-[#42c864] to-[#298843]",
    hoverGlow: "rgba(134,224,155,1.00)",

  },
  green: {
    base: "bg-gradient-to-r from-[#298843] via-[#42c864] to-[#298843]",
    hover: "bg-gradient-to-r from-[#f9ab00] via-[#ffc756] to-[#f9ab00]",
    hoverGlow: "rgba(255,213,132,1.00)",

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
  const [isHovered, setIsHovered] = useState(false);

  const variantConfig = buttonVariants[variant];
  const currentBg = isHovered ? variantConfig.hover : variantConfig.base;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <button
      {...rest}
      type={htmlType}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={cn(
        "relative min-w-[70px] sm:min-w-[100px] px-8 py-2.5 rounded-lg inline-flex flex-row justify-center items-center gap-1 md:gap-2 transition-all duration-300 ease-out cursor-pointer overflow-hidden active:opacity-80",
        currentBg,
        className
      )}
      style={{
        boxShadow: isHovered
          ? `0px 0px 180px 0px ${variantConfig.hoverGlow}, inset 0px 1px 0px 0px rgba(255,255,255,0.40), inset 0px -3px 0px 0px rgba(0,0,0,0.20), inset 0px 4px 4px 0px rgba(0,0,0,0.15)`
          : "inset 0px 1px 0px 0px rgba(255,255,255,0.40), inset 0px -3px 0px 0px rgba(0,0,0,0.20)",
      }}
    >
      {/* Icon */}

      {icon && <span className="flex items-center justify-center">{icon}</span>}

      {/* Children */}
      <div className="text-neutral-50 text-base font-medium leading-normal flex items-center justify-center">
        {children}
      </div>
    </button>
  );
}
