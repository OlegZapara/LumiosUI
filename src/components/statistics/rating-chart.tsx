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
import { getRatingStatistics } from "@/actions/statistics-actions";
import { RatingInfo } from "@/schemas/statistics-schema";

export default function RatingChart() {
  const [data, setData] = useState<RatingInfo[]>([]);
  const [activeUser, setActiveUser] = useState<RatingInfo | null>();

  useEffect(() => {
    getRatingStatistics().then((data) => {
      setData(data);
    });
  }, []);

  function handleClick(data: any, index: number) {
    setActiveUser(data.activePayload[0].payload);
  }

  return (
    <Card className="col-span-4 h-full md:col-span-3">
      <CardHeader>
        <CardTitle>Rating overview</CardTitle>
      </CardHeader>
      <CardBody className="w-full">
        <Sheet>
          <SheetTrigger className="h-full w-full">
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
      <div className="flex w-full justify-center">
        {isLoading || image == "" ? (
          <Skeleton className="aspect-square w-full rounded-full"></Skeleton>
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
      <SheetTitle className="flex w-full flex-row items-center justify-between">
        Username:{" "}
        <span className="flex h-10 w-52 items-center">@{user.username}</span>
      </SheetTitle>
      <SheetTitle className="flex w-full flex-row items-center justify-between">
        Name:{" "}
        <span className="flex h-10 w-52 items-center">
          {name ? name : <span className="text-muted-foreground">Hidden</span>}
        </span>
      </SheetTitle>
      <SheetTitle className="flex w-full flex-row items-center justify-between">
        Rating:{" "}
        <span className="flex h-10 w-52 items-center">{user.reverence}</span>
      </SheetTitle>
    </SheetHeader>
  );
}
