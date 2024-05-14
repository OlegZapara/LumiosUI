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
import { Copy, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import SettingsField from "./settings-field";
import { useUsersStore } from "../stores/users";
import Link from "next/link";

export default function General() {
  const [chatId, setChatId] = useState<string>("");
  const [chat, setChat] = useState<string>("");
  const { toast } = useToast();

  const usersStore = useUsersStore();
  const [userId, setUserId] = useState<string>("");
  const saveUserId = () => {
    usersStore.setUserId(parseInt(userId));
  };
  useEffect(() => {
    setUserId(usersStore.userId ? usersStore.userId.toString() : "");
    setChatId(usersStore.chatId ? usersStore.chatId.toString() : "");
    setChat(
      usersStore.user?.chats.find((x) => x.id == usersStore.chatId)?.name ?? ""
    );
  }, [usersStore.user, usersStore.userId, usersStore.chatId]);

  const saveChatId = () => {
    usersStore.updateChatId(parseInt(chatId));
    toast({
      title: "Chat ID was updated",
      description: "Chat ID is set to " + chatId,
    });
  };
  const saveChat = () => {
    const chatId = usersStore.user!.chats.find((x) => x.name == chat)!.id;
    usersStore.updateChatId(chatId);
    toast({
      title: "Chat was updated",
      description: "Chat is set to " + chat,
    });
  };
  const copyUsername = () => {
    navigator.clipboard.writeText("@" + usersStore.user?.username!);
    toast({
      title: "Username is copied to clipboard",
    });
  };
  const logout = () => {
    usersStore.logout();
  };

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
              <span className="flex-grow">@{usersStore.user?.username}</span>
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
              onClick={logout}
              className="border-red-500 text-red-500 hover:text-red-600 w-full sm:w-32"
            >
              Log out
            </Button>
          </SettingsField>
          <SettingsField
            name="User Id"
            description="Telegram user Id (used for testing)"
            developer
          >
            <Input
              value={userId}
              type="number"
              onChange={(e) => setUserId(e.target.value)}
            ></Input>
            <Button
              variant="outline"
              className="w-full sm:w-32"
              onClick={saveUserId}
            >
              Save
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
            {/* <Select value={chat} onValueChange={setChat}>
              <SelectTrigger>
                <SelectValue placeholder="User chat" />
              </SelectTrigger>
              <Button
                variant="outline"
                className="w-full sm:w-32"
                onClick={saveChat}
              >
                Save
              </Button>
              <SelectContent>
                {usersStore.user?.chats.map((x) => (
                  <SelectItem key={x.id} value={x.name}>
                    {x.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
            <Link
              href="/choose-chat"
              prefetch={true}
              className="flex flex-row gap-2 h-10 w-full max-w-96 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
              Switch chat <ExternalLink size={16}></ExternalLink>
            </Link>
          </SettingsField>
        </div>
      </section>
    </div>
  );
}
