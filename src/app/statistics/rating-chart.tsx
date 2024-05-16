"use client";
import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { RatingInfo } from "@/shared/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useUsersStore } from "../stores/users";

export default function RatingChart() {
  const MINIMAL_RATING = 150;
  const usersStore = useUsersStore();
  const [data, setData] = useState<RatingInfo[]>([]);
  const [activeUser, setActiveUser] = useState<RatingInfo | null>();

  useEffect(() => {
    if (!usersStore.chatId) return;
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const dateString = date.toISOString().split("T")[0];
    fetch(
      `/api/statistics/rating?chatId=${usersStore.chatId}&date=${dateString}`,
    )
      .then((res) => res.json())
      .then((data: RatingInfo[]) => {
        setData(
          data
            .filter((x) => x.reverence > MINIMAL_RATING)
            .sort((a, b) => a.username.localeCompare(b.username)),
        );
      })
      .catch((err) => console.error(err));
  }, [usersStore.chatId]);

  function handleClick(data: any, index: number) {
    setActiveUser(data.activePayload[0].payload);
  }

  return (
    <Card className="col-span-4 md:col-span-3 h-full">
      <CardHeader>
        <CardTitle>Rating overview</CardTitle>
      </CardHeader>
      <CardBody className="w-full">
        <Sheet>
          <SheetTrigger className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} onClick={handleClick}>
                <Tooltip wrapperClassName="rounded-xl ring-2 ring-black font-semibold dark:text-black"></Tooltip>
                <XAxis dataKey="username" hide></XAxis>
                <YAxis dataKey="reverence"></YAxis>
                <Bar
                  dataKey="reverence"
                  style={
                    {
                      fill: "hsl(var(--foreground))",
                      opacity: 0.9,
                    } as React.CSSProperties
                  }
                ></Bar>
              </BarChart>
            </ResponsiveContainer>
          </SheetTrigger>
          <SheetContent>
            <UserInfo user={activeUser!}></UserInfo>
          </SheetContent>
        </Sheet>
      </CardBody>
    </Card>
  );
}

export function UserInfo({ user }: { user: RatingInfo }) {
  const [image, setImage] = useState("");
  const [isImage, setIsImage] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  useEffect(() => {
    fetch(`/api/user/photo?userId=${user.userId}`)
      .then((image) => image.blob())
      .then((data) => {
        setIsImage(data.type !== "text/plain");
        setImage(URL.createObjectURL(data));
      });
  }, [user.userId]);
  useEffect(() => {
    fetch(`/api/user?userId=${user.userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.name) setName("");
        else setName(data.name.replace("null", ""));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user.userId]);

  return (
    <SheetHeader>
      <div className="w-full flex justify-center">
        {isLoading || image == "" ? (
          <Skeleton className="w-full aspect-square rounded-full"></Skeleton>
        ) : (
          <Image
            src={isImage ? image : "/user.png"}
            alt={`${user.username} profile image`}
            className="rounded-full"
            height={400}
            width={400}
          ></Image>
        )}
      </div>
      <SheetDescription>Detailed information about user</SheetDescription>
      <SheetTitle className="flex flex-row items-center w-full justify-between">
        Username:{" "}
        <span className="h-10 w-52 flex items-center">@{user.username}</span>
      </SheetTitle>
      <SheetTitle className="flex flex-row items-center w-full justify-between">
        Name:{" "}
        <span className="h-10 w-52 flex items-center">
          {name ? name : <span className="text-muted-foreground">Hidden</span>}
        </span>
      </SheetTitle>
      <SheetTitle className="flex flex-row items-center w-full justify-between">
        Rating:{" "}
        <span className="h-10 w-52 flex items-center">{user.reverence}</span>
      </SheetTitle>
    </SheetHeader>
  );
}
