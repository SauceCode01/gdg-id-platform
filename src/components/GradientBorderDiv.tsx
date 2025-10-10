import { cn } from "@/lib/utils";
import React from "react";

type CornerSides =
  | "all"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

type Props = React.ComponentProps<"div"> & {
  children?: React.ReactNode;
  cornerRadius?: string; // e.g. "16px"
  borderThickness?: string; // e.g. "2px"
  roundedSides?: CornerSides | CornerSides[]; // specify which corners
  innerDivClassName?: string;
};

export const GradientBorderDiv = ({
  children,
  cornerRadius = "12px",
  borderThickness = "2px",
  roundedSides = "all",
  className = "",
  innerDivClassName = "",
  ...props
}: Props) => {
  // Normalize to array
  const sides = Array.isArray(roundedSides) ? roundedSides : [roundedSides];

  // Build individual border-radius values dynamically
  const radius = {
    topLeft:
      sides.includes("all") ||
      sides.includes("top") ||
      sides.includes("left") ||
      sides.includes("top-left")
        ? cornerRadius
        : "0px",
    topRight:
      sides.includes("all") ||
      sides.includes("top") ||
      sides.includes("right") ||
      sides.includes("top-right")
        ? cornerRadius
        : "0px",
    bottomLeft:
      sides.includes("all") ||
      sides.includes("bottom") ||
      sides.includes("left") ||
      sides.includes("bottom-left")
        ? cornerRadius
        : "0px",
    bottomRight:
      sides.includes("all") ||
      sides.includes("bottom") ||
      sides.includes("right") ||
      sides.includes("bottom-right")
        ? cornerRadius
        : "0px",
  };

  return (
    <div
      style={{
        borderRadius: `${radius.topLeft} ${radius.topRight} ${radius.bottomRight} ${radius.bottomLeft}`,
        padding: borderThickness,
      }}
      className={`bg-[linear-gradient(to_bottom,var(--gdg-blue),var(--gdg-green),var(--gdg-orange),var(--gdg-red))] ${className}`}
      {...props}
    >
      <div
        style={{
          borderRadius: `calc(${radius.topLeft} - ${borderThickness}) calc(${radius.topRight} - ${borderThickness}) calc(${radius.bottomRight} - ${borderThickness}) calc(${radius.bottomLeft} - ${borderThickness})`,
        }}
        className={cn("bg-white overflow-hidden ", innerDivClassName)}
      >
        {children}
      </div>
    </div>
  );
};
