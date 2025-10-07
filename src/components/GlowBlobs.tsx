"use client";

import React from "react";
import clsx from "clsx";

interface BlobPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  color: string;
  size?: string;
  blur?: string;
  opacity?: string;
  filter?: string;
}

interface GlowBlobsProps {
  layout?: "about" | "home" | "custom";

  blobs?: BlobPosition[];

  className?: string;
}

const GlowBlobs: React.FC<GlowBlobsProps> = ({
  layout = "about",
  blobs = [],
  className,
}) => {
  //   Feel free to tweak or add new layout keys here (e.g. "contact", "events", etc.)
  const presetBlobs: BlobPosition[] =
    layout === "about"
      ? [
          // bottom-right (red)
          {
            bottom: "0px",
            right: "120px",
            color: "rgba(234,67,53,0.95)",
          },
          // upper-right (green)
          {
            top: "40px",
            right: "100px",
            color: "rgba(52,168,83,0.9)",
          },
          // upper-left (yellow)
          {
            top: "60px",
            left: "100px",
            color: "rgba(255,191,0,0.9)",
          },
          // bottom-left (blue)
          {
            bottom: "40px",
            left: "160px",
            color: "rgba(66,133,244,0.9)",
          },
        ]
      : layout === "home"
      ? [
          // First blob - Green (top-left)
          {
            top: "30px",
            left: "-200px",
            color:
              "radial-gradient(ellipse 50.00% 50.00% at 50.00% 50.00%, rgba(52, 168, 83, 0.70) 0%, rgba(20.43, 66, 32.61, 0) 100%)",
            size: "412px",
            blur: "53.40px",
          },
          // Second blob - Red (top-right)
          {
            top: "30px",
            right: "-200px",
            color:
              "radial-gradient(ellipse 50.00% 50.00% at 50.00% 50.00%, rgba(234, 67, 53, 0.70) 0%, rgba(132, 37.79, 29.90, 0) 100%)",
            size: "412px",
            blur: "53.40px",
          },
          // Third blob - Yellow (bottom-left)
          {
            bottom: "160px",
            left: "200px",
            color:
              "radial-gradient(ellipse 50.00% 50.00% at 50.00% 50.00%, rgba(249, 171, 0, 0.70) 0%, rgba(147, 100.95, 0, 0) 100%)",
            size: "412px",
            blur: "53.40px",
          },
          // Fourth blob - Blue (bottom-right)
          {
            bottom: "260px",
            right: "200px",
            color:
              "radial-gradient(ellipse 50.00% 50.00% at 50.00% 50.00%, rgba(66, 133, 244, 0.70) 0%, rgba(66, 133, 244, 0) 100%)",
            size: "412px",
            blur: "70.40px",
          },
        ]
      : [];

  const combined = [...presetBlobs, ...blobs];

  return (
    <div className={clsx("fixed inset-0 pointer-events-none", className)}>
      {combined.map((blob, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: blob.top,
            bottom: blob.bottom,
            left: blob.left,
            right: blob.right,
            width: blob.size || "300px",
            height: blob.size || "382px",
            opacity: blob.opacity || "0.75",
            filter: `blur(${blob.blur || "120px"})`,
            background: blob.color.startsWith("radial-gradient")
              ? blob.color
              : `radial-gradient(circle, ${blob.color} 0%, ${blob.color
                  .replace("0.9", "0.5")
                  .replace("0.95", "0.5")} 40%, ${blob.color
                  .replace("0.9", "0.2")
                  .replace("0.95", "0.2")} 80%)`,
          }}
        />
      ))}
    </div>
  );
};

export default GlowBlobs;
