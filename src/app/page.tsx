import Image from "next/image";
import Grid from "@/components/GridBackground";
import Button from "@/components/Button";
import { Download } from "lucide-react";

export default function Home() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-[#f6f8fa]">
      <Grid />
      {/* foreground content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl font-bold text-slate-800">
          OFFICIAL GDG PUP DIGITAL ID
        </h1>
        <div className="flex justify-center">
          <Button bgColor="bg-blue-600">
            <Download className="mr-2 size-5 stroke-white" />
            <span>Download as PNG</span>
          </Button>
          
          <Button bgColor="bg-green-600">
            <Download className="mr-2 size-5 stroke-white" />
            <span>Download as PDF</span>
          </Button> 
        </div>
        <p className="mt-3 text-slate-600">Sample Text</p>
      </div>
    </section>
  );
}
