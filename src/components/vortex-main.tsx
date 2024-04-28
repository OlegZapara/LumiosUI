"use client";

import { Vortex } from "@/components/ui/vortex";
import { useTheme } from "next-themes";

export function VortextMain() {
  const theme = useTheme();

  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[30rem] overflow-hidden">
      <Vortex
        backgroundColor={theme.resolvedTheme == "dark" ? "black" : "white"}
        mode={theme.resolvedTheme == "dark" ? "lighter" : "darken"}
        rangeY={150}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-foreground text-2xl md:text-6xl font-bold text-center">
          Lumios Bot
        </h2>
        <p className="text-foreground text-sm md:text-2xl max-w-xl mt-6 text-center">
          Powerful bot to manage your student life
        </p>
      </Vortex>
    </div>
  );
}