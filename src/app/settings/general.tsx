"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import SettingsField from "./settings-field";

const availableChats = ["Chat 1", "Chat 2", "Chat 3"];

export default function General() {
  const [chatId, setChatId] = useState<string>("");
  const username = "@username";
  const [chat, setChat] = useState<string>(availableChats[0]);
  const { toast } = useToast();

  const saveChatId = () => {
    localStorage.setItem("chatId", chatId);
    toast({
      title: "Chat ID was updated",
      description: "Chat ID is set to " + chatId,
    });
  };
  const saveChat = () => {
    toast({
      title: "Chat was updated",
      description: "Chat is set to " + chat,
    });
  };
  const copyUsername = () => {
    navigator.clipboard.writeText(username);
    toast({
      title: "Username is copied to clipboard",
    });
  };

  useEffect(() => {
    setChatId(localStorage.getItem("chatId") ?? "");
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 ml-1">
      <div className="text-xl font-semibold leading-none tracking-tight">
        General settings
      </div>
      <div className="text-sm text-muted-foreground">
        General app settings that are used for your account functions
      </div>
      <Separator></Separator>
      <section className="flex flex-col gap-2 border border-input rounded-md p-4">
        <div className="text-xl">Account Settings</div>
        <Separator className="my-2"></Separator>
        <div className="flex flex-col gap-6">
          <SettingsField
            name="Current account"
            description="Telegram account that is used for this website"
          >
            <div className="flex h-10 w-full justify-center items-center rounded-md border border-input bg-background px-3 py-2">
              <span className="flex-grow">{username}</span>
              <Button
                className="p-0 rounded-full aspect-square h-8"
                variant="ghost"
                onClick={copyUsername}
              >
                <Copy size={16}></Copy>
              </Button>
            </div>
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:text-red-600 w-full sm:w-32"
            >
              Log out
            </Button>
          </SettingsField>
        </div>
      </section>
      <section className="flex flex-col gap-2 border border-input rounded-md p-4">
        <div className="text-xl">Chat Settings</div>
        <Separator className="my-2"></Separator>
        <div className="flex flex-col gap-6">
          <SettingsField
            name="Chat ID"
            description="Select your chat ID"
            developer
          >
            <Input
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
            ></Input>
            <Button
              variant="outline"
              className="w-full sm:w-32"
              onClick={saveChatId}
            >
              Save
            </Button>
          </SettingsField>
          <SettingsField name="Switch chat" description="Select another chat">
            <Select defaultValue={chat} onValueChange={setChat}>
              <SelectTrigger>
                <SelectValue placeholder="Font" />
              </SelectTrigger>
              <Button
                variant="outline"
                className="w-full sm:w-32"
                onClick={saveChat}
              >
                Save
              </Button>
              <SelectContent>
                {availableChats.map((x) => (
                  <SelectItem key={x} value={x}>
                    {x}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SettingsField>
        </div>
      </section>
    </div>
  );
}
