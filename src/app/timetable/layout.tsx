import dynamic from "next/dynamic";

const TimetablePage = dynamic(() => import("./page"), {
  ssr: false,
});

export default function TimetablePageLayout() {
  return <TimetablePage />;
}
