"use client";
import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getRatingDiffStatistics } from "@/actions/statistics-actions";
import { RatingInfo } from "@/schemas/statistics-schema";
import { UserInfo } from "./rating-chart";

function getIconForImprovement(improvement: number) {
  if (improvement > 0) {
    return (
      <div className="flex flex-row justify-between gap-2">
        <ChevronUp size={24} className="stroke-green-500"></ChevronUp>
        <div className="text-lg text-green-500">{improvement}</div>
      </div>
    );
  } else if (improvement == 0) {
    return (
      <div className="flex flex-row justify-between gap-2">
        <ChevronsUpDown size={24} className="stroke-gray-500"></ChevronsUpDown>
        <div className="text-lg text-gray-500">{improvement}</div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row justify-between gap-2">
        <ChevronDown size={24} className="stroke-red-500"></ChevronDown>
        <div className="text-lg text-red-500">{improvement}</div>
      </div>
    );
  }
}

export default function RatingChangeList() {
  const [data, setData] = useState<RatingInfo[]>([]);
  const [activeUser, setActiveUser] = useState<RatingInfo | null>();

  useEffect(() => {
    getRatingDiffStatistics().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <Card className="col-span-4 h-full md:col-span-1">
      <CardHeader>
        <CardTitle>Weekly change</CardTitle>
      </CardHeader>
      <CardBody className="w-full p-2">
        <Sheet>
          <ScrollArea className="h-full w-full pr-4">
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
                    className="flex w-full items-center justify-start gap-4 px-4 py-2"
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
