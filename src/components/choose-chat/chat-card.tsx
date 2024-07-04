"use client";
import { updateChatId } from "@/actions/auth-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useChatImage } from "@/hooks/choose-chat/useChatImage";
import { TelegramChat } from "@/schemas/user-schema";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ChatCardProps extends TelegramChat {
  image?: string;
}

const getShortName = (name: string) => {
  if (!name) return "Unknown chat";
  if (name.length > 30) return name.slice(0, 30) + "...";
  return name;
};
const getShortDescription = (description: string) => {
  if (!description) return "";
  if (description.length > 125) return description.slice(0, 125) + "...";
  return description;
};

export default function ChatCard(props: ChatCardProps) {
  const { image, isImage } = useChatImage(props.id);
  const router = useRouter();

  const chooseChat = () => {
    updateChatId(props.id).then(() => {
      toast({ title: `Welcome to ${props.name}`, duration: 3000 });
      router.push("/");
    });
  };

  return (
    <Card
      className="col-span-6 cursor-pointer hover:border-blue-500 sm:col-span-3 lg:col-span-2"
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
              className="w-14 rounded-full"
            ></Image>
          ) : (
            <div className="flex aspect-square w-14 items-center justify-center rounded-full bg-muted p-3">
              <MessageCircle size={30}></MessageCircle>
            </div>
          )}
          <span>{getShortName(props.name)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />
        <CardDescription>
          {getShortDescription(props.description ?? "lol")}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
