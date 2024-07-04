import React from "react";
import { Separator } from "@/components/ui/separator";

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function SettingsSection(props: SettingsSectionProps) {
  return (
    <section className="flex flex-col gap-2 rounded-md border border-input p-4">
      <div className="text-xl">Account Settings</div>
      <Separator className="my-2"></Separator>
      <div className="flex flex-col gap-6">{props.children}</div>
    </section>
  );
}
