import Image from "next/image";
import Grid from "@/components/GridBackground";
import Button from "@/components/Button";
import { DiscAlbum, Download } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1>Landing Page</h1>
      <Link href="/ids">
        <button className="bg-blue-600 text-white py-2 px-4 rounded">Go to /ids/ route</button>
      </Link>
    </div>
  );
}
