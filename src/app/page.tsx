import MainBentoGrid from "@/components/bento-grid";
import { VortexMainLoading, VortextMain } from "@/components/vortex-main";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="overflow-hidden bg-gradient-to-b from-white dark:from-black dark:via-black to-background w-full">
      <Suspense fallback={<VortexMainLoading></VortexMainLoading>}>
        <VortextMain></VortextMain>
      </Suspense>
      <MainBentoGrid></MainBentoGrid>
    </div>
  );
}
