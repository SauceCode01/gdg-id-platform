"use client";
import { useBreakpoint } from "@/lib/clientUtils";
import { useEffect, useState } from "react";

export default function Grid() {
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const {isMd} = useBreakpoint();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize mouse position to range [-1, 1]
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      setTransform({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Intensity controls
  const ROTATE_INTENSITY = isMd  ? 3 : 0; // vertical tilt
  const PAN_INTENSITY = isMd ? 5 : 0; // horizontal pan in px

  // Apply both tilt (y) and horizontal pan (x)
  const topTransform = `perspective(900px) rotateX(${
    -60 - transform.y * ROTATE_INTENSITY
  }deg) translateX(${-transform.x * PAN_INTENSITY}px) translateY(${
    -transform.y * PAN_INTENSITY
  }px)`;

  const centerTransform = `translateX(${
    -transform.x * PAN_INTENSITY
  }px) translateY(${-transform.y * PAN_INTENSITY}px)`; // subtle parallax

  const bottomTransform = `perspective(900px) rotateX(${
    60 - transform.y * ROTATE_INTENSITY
  }deg) translateX(${-transform.x * PAN_INTENSITY}px) translateY(${
    -transform.y * PAN_INTENSITY
  }px)`;

  return (
    <div
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
        maskMode: "alpha",
        maskRepeat: "no-repeat",
      }}
      className="fixed inset-0 pointer-events-none"
    >
      {/* Top slanted plane */}
      <div
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--text) 11%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--text) 11%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          transform: topTransform,
          top: "-30%",
          transition: "transform 0.3s ease-out",
        }}
        className="absolute left-0 w-full origin-bottom h-[60%] pointer-events-none"
      />

      {/* Center flat grid */}
      <div
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--text) 11%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--text) 11%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          transform: centerTransform,
          top: "30%",
          transition: "transform 0.3s ease-out",
        }}
        className="absolute left-0 w-full h-[40%] pointer-events-none"
      />

      {/* Bottom slanted plane */}
      <div
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--text) 11%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--text) 11%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          transform: bottomTransform,
          bottom: "-30%",
          transition: "transform 0.3s ease-out",
        }}
        className="absolute left-0 w-full origin-top h-[60%] pointer-events-none"
      />
    </div>
  );
}
