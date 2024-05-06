import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TelegramChat } from "@/shared/types";
import Image from "next/image";
import React from "react";
import { useUsersStore } from "../stores/users";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface ChatCardProps extends TelegramChat {
  image?: string;
}

export default function ChatCard(props: ChatCardProps) {
  const usersStore = useUsersStore();
  const router = useRouter();
  const { toast } = useToast();
  const getShortName = (name: string) => {
    if (name.length > 20) return name.slice(0, 20) + "...";
    return name;
  };
  const getShortDescription = (description: string) => {
    if (description.length > 175) return description.slice(0, 175) + "...";
    return description;
  };
  const chooseChat = () => {
    usersStore.updateChatId(props.id);
    router.push("/");
    toast({
      title: `Welcome to ${props.name}`,
      duration: 3000,
    });
  };

  return (
    <Card
      className="col-span-6 sm:col-span-3 lg:col-span-2 hover:border-blue-500 cursor-pointer"
      onClick={chooseChat}
    >
      <CardHeader>
        <CardTitle className="flex flex-row items-center justify-start gap-5">
          <Image
            alt={props.name}
            src={props.image ?? "/lumios.png"}
            width={50}
            height={50}
          ></Image>
          <span>{getShortName(props.name)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {getShortDescription(props.description ?? "lol")}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
