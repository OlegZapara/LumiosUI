import dynamic from "next/dynamic";

const SettingsPage = dynamic(() => import("./page"), {
  ssr: false,
});

export default function SettingsPageLayout() {
  return <SettingsPage />;
}
