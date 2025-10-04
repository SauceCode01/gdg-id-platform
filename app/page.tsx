import Image from "next/image";
import Grid from "@/components/GridBackground";
import AnimatedGradientTextDemo from "@/components/Button";

export default function Home() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-[#f6f8fa]">
      <Grid />
      {/* foreground content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl font-bold text-slate-800">OFFICIAL GDG PUP DIGITAL ID</h1>
        <div className="flex justify-center">

          <AnimatedGradientTextDemo label="Download as PNG" bgColor="bg-blue-600" />
          <AnimatedGradientTextDemo label="Download as PDF" bgColor="bg-green-600" />
        </div>
        <p className="mt-3 text-slate-600">Sample Text</p>
      </div>
    </section>
  );
}
