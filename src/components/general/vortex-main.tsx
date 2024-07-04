"use client";

import { Vortex } from "@/components/ui/vortex";
import { useTheme } from "next-themes";

export function VortexMain() {
  const theme = useTheme();

  return (
    <div className="mx-auto h-[calc(100vh-3rem)] w-full overflow-hidden rounded-md">
      <Vortex
        backgroundColor={theme.resolvedTheme == "dark" ? "black" : "white"}
        mode={theme.resolvedTheme == "dark" ? "lighter" : "darken"}
        rangeY={150}
        particleCount={450}
        className="flex h-full w-full flex-col items-center justify-center px-2 py-4 md:px-10"
      >
        <h2 className="text-center text-2xl font-bold text-foreground md:text-6xl">
          Lumios Bot
        </h2>
        <p className="mt-6 max-w-xl text-center text-sm text-foreground md:text-2xl">
          Powerful bot to manage your student life
        </p>
      </Vortex>
    </div>
  );
}

export function VortexMainLoading() {
  return (
    <div className="mx-auto h-[calc(100vh-3rem)] w-full overflow-hidden rounded-md">
      <div className="flex h-full w-full flex-col items-center justify-center px-2 py-4 md:px-10">
        <div className="flex h-full w-full flex-col items-center justify-center px-2 py-4 md:px-10"></div>
        <h2 className="text-center text-2xl font-bold text-foreground md:text-6xl">
          Lumios Bot
        </h2>
        <p className="mt-6 max-w-xl text-center text-sm text-foreground md:text-2xl">
          Powerful bot to manage your student life
        </p>
      </div>
    </div>
  );
}
