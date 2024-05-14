"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { TelegramChat } from "@/shared/types";
import {
  MessageCircle,
  MessageSquare,
  MessageSquareDashed,
  MessageSquareMore,
  MessageSquareText,
  MessagesSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUsersStore } from "../stores/users";
import { useEffect, useState } from "react";
import Image from "next/image";

interface ChatCardProps extends TelegramChat {
  image?: string;
}

const getRandomIcon = () => {
  const randomChoice = Math.floor(Math.random() * 6);
  if (randomChoice == 0) return <MessageCircle size={30}></MessageCircle>;
  if (randomChoice == 1) return <MessageSquare size={30}></MessageSquare>;
  if (randomChoice == 2)
    return <MessageSquareText size={30}></MessageSquareText>;
  if (randomChoice == 3) return <MessagesSquare size={30}></MessagesSquare>;
  if (randomChoice == 4)
    return <MessageSquareMore size={30}></MessageSquareMore>;
  return <MessageSquareDashed size={30}></MessageSquareDashed>;
};

export default function ChatCard(props: ChatCardProps) {
  const [image, setImage] = useState("");
  const [isImage, setIsImage] = useState(false);
  const usersStore = useUsersStore();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    fetch(`/api/user/photo?userId=${props.id}`)
      .then((image) => image.blob())
      .then((data) => {
        setIsImage(data.type !== "text/plain");
        setImage(URL.createObjectURL(data));
      });
  }, [props.id]);

  const getShortName = (name: string) => {
    if (name.length > 30) return name.slice(0, 30) + "...";
    return name;
  };
  const getShortDescription = (description: string) => {
    if (description.length > 125) return description.slice(0, 125) + "...";
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
          {isImage ? (
            <Image
              src={image}
              alt={props.name}
              width={200}
              height={200}
              className="h-16 w-16 rounded-full"
            ></Image>
          ) : (
            <div className="h-16 w-16 aspect-square rounded-full bg-muted flex justify-center items-center p-3">
              {getRandomIcon()}
            </div>
          )}
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
