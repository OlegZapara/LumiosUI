import React from "react";
import Image from "next/image";

export default function KuziaPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <Image
        height={2000}
        width={3000}
        alt="BEST GYM"
        src="/gyyym.jpg"
        className="h-full"
      ></Image>
      <Image
        height={1000}
        width={800}
        src="/kuzia.jpg"
        alt="Kuzia"
        className="h-full w-auto"
      ></Image>
    </div>
  );
}
