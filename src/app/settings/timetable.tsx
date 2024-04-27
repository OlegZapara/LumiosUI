import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";

export default function Timetable() {
  const [chatId, setChatId] = useState<string>("");

  useEffect(() => {
    setChatId(localStorage.getItem("chatId") ?? "");
  }, []);

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
        <div className="flex flex-row w-full gap-2">
          <Input
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
          ></Input>
          <Button
            variant="outline"
            className="px-8"
            onClick={() => localStorage.setItem("chatId", chatId)}
          >
            Save
          </Button>
        </div>
      </section>
    </div>
  );
}
