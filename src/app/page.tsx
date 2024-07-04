import MainBentoGrid from "@/components/general/bento-grid";
import {
  VortexMain,
  VortexMainLoading,
} from "@/components/general/vortex-main";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-full overflow-hidden bg-gradient-to-b from-white to-background dark:from-black dark:via-black">
      <Suspense fallback={<VortexMainLoading></VortexMainLoading>}>
        <VortexMain></VortexMain>
      </Suspense>
      <MainBentoGrid></MainBentoGrid>
    </div>
  );
}
