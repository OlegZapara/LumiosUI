"use client";
import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RatingInfo } from "@/shared/types";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useUsersStore } from "../stores/users";

async function fetchRatingInfo(chatId: number, date: string) {
  const res = await fetch(
    `/api/statistics/rating?chatId=${chatId}&date=${date}`
  );
  const data = await res.json();
  return data;
}

function getDiff(i1: RatingInfo, i2: RatingInfo | undefined): RatingInfo {
  if (i2 == undefined) return i1;
  return {
    ...i1,
    reverence: i1.reverence - i2.reverence,
  };
}

export default function RatingChangeList() {
  const [data, setData] = useState<RatingInfo[]>([]);
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
      setData(
        today.map((x) =>
          getDiff(
            x,
            before.find((y) => y.userId == x.userId)
          )
        )
      );
    });
  }, [usersStore.chatId]);

  function getIconForImprovement(improvement: number) {
    if (improvement > 0) {
      return (
        <div className="flex flex-row justify-between w-16 gap-2">
          <ChevronUp className="stroke-green-500 scale-125"></ChevronUp>
          <div className="text-green-500 text-lg">{improvement}</div>
        </div>
      );
    } else if (improvement == 0) {
      return (
        <div className="flex flex-row justify-between w-16 gap-2">
          <ChevronsUpDown className="stroke-gray-500 scale-125"></ChevronsUpDown>
          <div className="text-gray-500 text-lg">{improvement}</div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-row justify-between w-16 gap-2">
          <ChevronDown className="stroke-red-500 scale-125"></ChevronDown>
          <div className="text-red-500 text-lg">{improvement}</div>
        </div>
      );
    }
  }
  return (
    <Card className="col-span-4 md:col-span-1 h-full">
      <CardHeader>
        <CardTitle>Weekly change</CardTitle>
      </CardHeader>
      <CardBody className="w-full m-4">
        <ScrollArea className="w-full h-full">
          {data
            .sort((a, b) => b.reverence - a.reverence)
            .map((data) => (
              <div
                key={data.username}
                className="w-full py-2 px-4 flex justify-start gap-4"
              >
                {getIconForImprovement(data.reverence)}
                <div>{data.username}</div>
              </div>
            ))}
        </ScrollArea>
      </CardBody>
    </Card>
  );
}
