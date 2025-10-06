import AnimatedCardStack from "@/components/AnimatedCardStack";
import Grid from "@/components/GridBackground";
import Button from "@/components/Button";
import { Download } from "lucide-react";

export default function Home() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-[#f6f8fa]">
      <Grid />
      <div className="relative z-10 flex flex-col items-center text-center space-y-10">
        <AnimatedCardStack />
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold text-slate-800">Project Vision</h1>
          <p className="text-slate-600 mt-2">
            Designed to connect, engage, and empower the community, GDG PUP's
            flagship project for the 2026 cohort sets the stage for a smarter
            and more connected member experience.
          </p>
        </div>
        <Button bgColor="bg-blue-600">
          <Download className="mr-2 size-5 stroke-white" />
          <span>Get My Digital ID</span>
        </Button>
      </div>
    </section>
  );
}
