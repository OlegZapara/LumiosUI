import dynamic from "next/dynamic";

const QueuesPage = dynamic(() => import("./page"), {
  ssr: false,
});

export default function QueuesPageLayout() {
  return <QueuesPage />;
}
