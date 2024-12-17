"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main
    className="flex min-h-screen w-full flex-col items-center justify-center p-20"
    style={{
      backgroundImage: "url('/landing_bg.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed", // Ensures the background image is fixed
    }}
  >
    <h1 className="text-blue text-4xl font-bold">Welcome to E-commerce App🎉</h1>
    <div className="flex space-x-4 mt-8">
      <Link href="/products">
        <Button>Explore</Button>
      </Link>
      <Link href="/login">
        <Button>Go to Login</Button>
      </Link>
    </div>
  </main>
  );
}
