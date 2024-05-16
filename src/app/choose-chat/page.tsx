"use client";
import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { TelegramChat } from "@/shared/types";
import { MoveRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useUsersStore } from "../stores/users";
import ChatCard from "./chat-card";
import Loading from "./loading";
import NoChat from "./no-chat";

export default function ChooseChatPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(true);
  const [searchString, setSearchString] = useState<string>("");
  const [filteredChats, setFilteredChats] = useState<TelegramChat[]>([]);
  const usersStore = useUsersStore();

  useEffect(() => {
    if (usersStore.user === null) return;
    if (usersStore.user.chats.length === 1) {
      usersStore.updateChatId(usersStore.user.chats[0].id);
      router.push("/");
      toast({
        title: `Welcome to ${usersStore.user.chats[0].name}`,
        duration: 3000,
      });
      return;
    }
    setFilteredChats(
      usersStore.user.chats.filter(
        (x) => x.name != undefined && x.description != undefined,
      ),
    );
    setLoading(false);
  }, [router, toast, usersStore, usersStore.user]);

  const filter = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
    setFilteredChats(
      usersStore.user!.chats.filter((x) =>
        x.name.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    );
  };
  if (loading) return <Loading />;
  if (usersStore.user!.chats.length === 0) return <NoChat />;

  return (
    <div className="md:container mt-6">
      <Card className="w-full shadow-md lg:shadow-lg h-auto">
        <CardHeader>
          <CardTitle>
            <div className="flex gap-6 flex-col md:flex-row w-full justify-between items-center px-4">
              <span className="mt-3 flex flex-col gap-1">
                Lumios Bot is available in multiple chats.
                <span className="text-base font-normal flex flex-row gap-2 items-center">
                  <MoveRight></MoveRight>Select chat that you want to use
                </span>
              </span>
              <div className="w-full md:w-72 flex relative">
                <Input
                  placeholder="Search for chat"
                  className="w-full max-w-96 font-normal pl-9"
                  value={searchString}
                  onChange={filter}
                ></Input>
                <div className="absolute left-3 top-3">
                  <Search size={16}></Search>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardBody className="w-full justify-center gap-6 rounded-lg p-4 md:p-8 grid grid-cols-6 h-auto">
          {filteredChats.length !== 0 ? (
            filteredChats.map((chat) => <ChatCard key={chat.name} {...chat} />)
          ) : (
            <div className="col-span-6 pl-2">No results found</div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
