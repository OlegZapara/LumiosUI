"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

export default function General() {
  const [chatId, setChatId] = useState<string>("");
  useEffect(() => {
    setChatId(localStorage.getItem("chatId") ?? "");
  }, []);

  return (
    <div className="w-full flex flex-col gap-2 ml-1">
      <div className="text-xl font-semibold leading-none tracking-tight">
        General settings
      </div>
      <div className="text-sm text-muted-foreground">
        General app settings that are used for your account functions
      </div>
      <Separator className="w-full my-2"></Separator>
      <section className="flex flex-col gap-2">
        <div className="leading-none tracking-tight">Chat ID</div>
        <div className="text-sm text-muted-foreground">Select your chat ID</div>
        <div className="flex flex-col sm:flex-row w-full gap-2 max-w-96">
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
