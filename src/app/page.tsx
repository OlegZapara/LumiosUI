import MainBentoGrid from "@/components/bento-grid";
import { VortexMain, VortexMainLoading } from "@/components/vortex-main";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="overflow-hidden bg-gradient-to-b from-white dark:from-black dark:via-black to-background w-full">
      <Suspense fallback={<VortexMainLoading></VortexMainLoading>}>
        <VortexMain></VortexMain>
      </Suspense>
      <MainBentoGrid></MainBentoGrid>
    </div>
  );
}
