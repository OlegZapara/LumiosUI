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
import { RatingInfo } from "@/shared/types";

export default function RatingChart() {
  const MINIMAL_RATING = 150;
  const usersStore = useUsersStore();
  const [data, setData] = useState<RatingInfo[]>([]);

  useEffect(() => {
    if (!usersStore.chatId) return;
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const dateString = date.toISOString().split("T")[0];
    fetch(
      `/api/statistics/rating?chatId=${usersStore.chatId}&date=${dateString}`
    )
      .then((res) => res.json())
      .then((data: RatingInfo[]) => {
        setData(
          data
            .filter((x) => x.reverence > MINIMAL_RATING)
            .sort((a, b) => a.username.localeCompare(b.username))
        );
      })
      .catch((err) => console.error(err));
  }, [usersStore.chatId]);

  const [activeLabel, setActiveLabel] = useState<string>("");

  function handleClick(data: any, index: number) {
    setActiveLabel(data.activeLabel);
  }

  return (
    <Card className="col-span-3 h-full">
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
            <SheetHeader>
              <SheetTitle>{activeLabel}</SheetTitle>
              <SheetDescription className="w-full flex justify-center">
                <Skeleton className="aspect-square w-4/5 rounded-full"></Skeleton>
              </SheetDescription>
              <SheetDescription>
                Detailed information about {activeLabel}
              </SheetDescription>
              <SheetTitle className="flex flex-row items-center w-full justify-between">
                First name: <Skeleton className="h-10 w-52"></Skeleton>
              </SheetTitle>
              <SheetTitle className="flex flex-row items-center w-full justify-between">
                Last name: <Skeleton className="h-10 w-52"></Skeleton>
              </SheetTitle>
              <SheetTitle className="flex flex-row items-center w-full justify-between">
                Rating: <Skeleton className="h-10 w-52"></Skeleton>
              </SheetTitle>
              <SheetTitle className="flex flex-row items-center w-full justify-between">
                Description: <Skeleton className="h-10 w-52"></Skeleton>
              </SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </CardBody>
    </Card>
  );
}
