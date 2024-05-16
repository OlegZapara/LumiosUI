"use client";
import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingInfo } from "@/shared/types";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useUsersStore } from "../stores/users";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserInfo } from "@/app/statistics/rating-chart";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

async function fetchRatingInfo(chatId: number, date: string) {
  const res = await fetch(
    `/api/statistics/rating?chatId=${chatId}&date=${date}`,
  );
  return await res.json();
}

function getDiff(i1: RatingInfo, i2: RatingInfo | undefined): RatingInfo {
  if (i2 == undefined) return i1;
  return {
    ...i1,
    reverence: i1.reverence - i2.reverence,
  };
}

function getIconForImprovement(improvement: number) {
  if (improvement > 0) {
    return (
      <div className="flex flex-row justify-between gap-2">
        <ChevronUp size={24} className="stroke-green-500"></ChevronUp>
        <div className="text-green-500 text-lg">{improvement}</div>
      </div>
    );
  } else if (improvement == 0) {
    return (
      <div className="flex flex-row justify-between gap-2">
        <ChevronsUpDown size={24} className="stroke-gray-500"></ChevronsUpDown>
        <div className="text-gray-500 text-lg">{improvement}</div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row justify-between gap-2">
        <ChevronDown size={24} className="stroke-red-500"></ChevronDown>
        <div className="text-red-500 text-lg">{improvement}</div>
      </div>
    );
  }
}

export default function RatingChangeList() {
  const [data, setData] = useState<RatingInfo[]>([]);
  const [activeUser, setActiveUser] = useState<RatingInfo | null>();
  const usersStore = useUsersStore();

  useEffect(() => {
    if (!usersStore.chatId) return;
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const today = d.toISOString().split("T")[0];
    d.setDate(d.getDate() - 8);
    const weekAgo = d.toISOString().split("T")[0];
    Promise.all([
      fetchRatingInfo(usersStore.chatId, today),
      fetchRatingInfo(usersStore.chatId, weekAgo),
    ]).then(([today, before]: [today: RatingInfo[], before: RatingInfo[]]) => {
      const data = today.map((x) =>
        getDiff(
          x,
          before.find((y) => y.userId == x.userId),
        ),
      );
      setData(data);
      setActiveUser(data[0]);
    });
  }, [usersStore.chatId]);

  return (
    <Card className="col-span-4 md:col-span-1 h-full">
      <CardHeader>
        <CardTitle>Weekly change</CardTitle>
      </CardHeader>
      <CardBody className="w-full p-2">
        <Sheet>
          <ScrollArea className="w-full h-full pr-4">
            <SheetTrigger className="w-full">
              {data
                .sort((a, b) => b.reverence - a.reverence)
                .map((data) => (
                  <Button
                    key={data.userId}
                    onClick={() => {
                      setActiveUser(data);
                    }}
                    variant="ghost"
                    className="w-full py-2 px-4 flex justify-start items-center gap-4"
                  >
                    {getIconForImprovement(data.reverence)}
                    <div>{data.username}</div>
                  </Button>
                ))}
            </SheetTrigger>
          </ScrollArea>
          <SheetContent>
            <UserInfo user={activeUser!}></UserInfo>
          </SheetContent>
        </Sheet>
      </CardBody>
    </Card>
  );
}
