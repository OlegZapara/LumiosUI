"use client";
import React, { useState } from "react";

import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { data, improvement } from "./data";

import { CardBody, CardItem } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Rating() {
  const [activeLabel, setActiveLabel] = useState<string>("");

  function handleClick(data: any, index: number) {
    setActiveLabel(data.activeLabel);
  }

  function getIconForImprovement(improvement: number){
    if(improvement > 0){
      return <div className="flex flex-row justify-between w-16 gap-2">
        <ChevronUp className="stroke-green-500 scale-125"></ChevronUp>
        <div className="text-green-500 text-lg">{improvement}</div>
      </div>
    }
    else if (improvement == 0){
      return <div className="flex flex-row justify-between w-16 gap-2">
      <ChevronsUpDown className="stroke-gray-500 scale-125"></ChevronsUpDown>
      <div className="text-gray-500 text-lg">{improvement}</div>
    </div>
    }
    else{
      return <div className="flex flex-row justify-between w-16 gap-2">
      <ChevronDown className="stroke-red-500 scale-125"></ChevronDown>
      <div className="text-red-500 text-lg">{improvement}</div>
    </div>
    }
  }

  return (
    <div>
      <Card className="w-[calc(100% - 3rem)] mx-6 my-2">
        <CardHeader>
          <CardTitle>Rating for IP-32</CardTitle>
        </CardHeader>
        <CardBody className="w-[calc(100%-2rem)] grid grid-cols-4 gap-4 mx-4 mb-4 h-full">
          <Card className="col-span-3 h-full">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardBody className="w-full">
              <Sheet>
                <SheetTrigger className="w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data
                        .filter((x) => x.rating > 60)
                        .sort((a, b) => a.name.localeCompare(b.name))}
                      onClick={handleClick}
                    >
                      <Tooltip wrapperClassName="rounded-xl ring-2 ring-black font-semibold dark:text-black"></Tooltip>
                      <XAxis dataKey="name" hide></XAxis>
                      <YAxis dataKey="rating"></YAxis>
                      <Bar
                        dataKey="rating"
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
          <Card className="col-span-1 h-full">
            <CardHeader>
              <CardTitle>Weekly change</CardTitle>
            </CardHeader>
            <CardBody className="w-full m-4">
              <ScrollArea className="w-full h-full">
                {improvement.sort((a, b) => b.rating - a.rating).map((data) => (
                  <div key={data.name} className="w-full py-2 px-4 flex justify-start gap-4">
                    {getIconForImprovement(data.rating)}
                    <div>{data.name}</div>
                  </div>
                ))}
              </ScrollArea>
            </CardBody>
          </Card>
        </CardBody>
      </Card>
    </div>
  );
}
