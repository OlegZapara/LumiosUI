import dynamic from "next/dynamic";

const PageView = dynamic(() => import("./page"), {
  ssr: false,
});

export default function TasksPageLayout() {
  return <PageView />;
}
