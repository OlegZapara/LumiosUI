import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

interface ChatCardProps {
  image: string;
  name: string;
  description: string;
}

export default function ChatCard(props: ChatCardProps) {
  const getShortName = (name: string) => {
    if (name.length > 20) return name.slice(0, 20) + "...";
    return name;
  };
  const getShortDescription = (description: string) => {
    if (description.length > 175) return description.slice(0, 175) + "...";
    return description;
  };

  return (
    <Card className="col-span-6 sm:col-span-3 lg:col-span-2 hover:border-blue-500 cursor-pointer">
      <CardHeader>
        <CardTitle className="flex flex-row items-center justify-start gap-5">
          <Image
            alt={props.name}
            src={props.image}
            width={50}
            height={50}
          ></Image>
          <span>{getShortName(props.name)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {getShortDescription(props.description)}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
