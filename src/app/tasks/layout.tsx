import dynamic from "next/dynamic";
import React from "react";
import Loading from "./loading";

const PageView = dynamic(() => import("./page"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function TasksPageLayout() {
  return <PageView />;
}
