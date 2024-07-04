"use client";
import React from "react";
import { TelegramChat } from "@/schemas/user-schema";
import ChatCard from "@/components/choose-chat/chat-card";
import { useSearchParams } from "next/navigation";

type ChatListProps = {
  chats: TelegramChat[];
};

export default function ChatList(props: ChatListProps) {
  const searchParams = useSearchParams();

  const filteredChats = props.chats.filter((chat) =>
    chat.name
      .toLowerCase()
      .includes((searchParams.get("q") || "").toLowerCase()),
  );

  if (filteredChats.length === 0) {
    return <div className="col-span-6 pl-2">No results found</div>;
  }
  return (
    <>
      {filteredChats.map((chat) => (
        <ChatCard key={chat.name} {...chat} />
      ))}
    </>
  );
}
