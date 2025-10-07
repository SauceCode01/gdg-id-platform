export default function Grid() {
  return (
    <div
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
        maskMode: "alpha",
        maskRepeat: "no-repeat",
      }}
      className="absolute inset-0 pointer-events-none"
    >
      {/* Top slanted plane */}
      <div
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--text) 11%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--text) 11%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          transform: "perspective(900px) rotateX(-60deg)",
          top: "-30%",
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
          top: "30%",
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
          transform: "perspective(900px) rotateX(60deg)",
          bottom: "-30%",
        }}
        className="absolute left-0 w-full origin-top h-[60%] pointer-events-none"
      />
    </div>
  );
}
