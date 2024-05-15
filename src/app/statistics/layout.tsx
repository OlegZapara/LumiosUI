import dynamic from "next/dynamic";

const StatisticsPage = dynamic(() => import("./page"), {
  ssr: false,
});

export default function QueuesPageLayout() {
  return <StatisticsPage />;
}
