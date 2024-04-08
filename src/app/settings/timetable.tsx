import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useTimetableSettings from "@/hooks/useTimetableSettings";
import React from "react";

export default function Timetable() {
  const [timetableSettings, setTimetableSettings] = useTimetableSettings();

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="text-xl font-semibold leading-none tracking-tight">
        Appearance
      </div>
      <div className="text-sm text-muted-foreground">
        Customize the appearance of the app. Automatically switch between day
        and night themes.
      </div>
      <Separator className="w-full my-2"></Separator>

      <section className="flex flex-col gap-2 my-4">
        <div className="leading-none tracking-tight">Chat ID</div>
        <div className="text-sm text-muted-foreground">Select your chat ID</div>
        <Input
          value={timetableSettings.chatId}
          onChange={(e) =>
            setTimetableSettings({
              ...timetableSettings,
              chatId: e.target.value,
            })
          }
        ></Input>
      </section>
    </div>
  );
}
