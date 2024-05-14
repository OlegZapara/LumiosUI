import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <Card className="w-[calc(100% - 3rem)] md:mx-6 md:my-2">
      <CardHeader>
        <Skeleton className="h-10 w-full"></Skeleton>
      </CardHeader>
      <CardContent className="w-[calc(100%-2rem)] grid grid-cols-4 grid-rows-4 gap-4 mx-4 mb-4 h-full">
        <Card className="col-span-4 md:col-span-3 h-full row-span-1">
          <div className="flex flex-row h-full items-end gap-2 p-4">
            <Skeleton className="h-[10%] flex-grow rounded-md"></Skeleton>
            <Skeleton className="h-[40%] flex-grow rounded-md"></Skeleton>
            <Skeleton className="h-[20%] flex-grow rounded-md"></Skeleton>
            <Skeleton className="h-[100%] flex-grow rounded-md"></Skeleton>
            <Skeleton className="h-[80%] flex-grow rounded-md"></Skeleton>
            <Skeleton className="h-[90%] flex-grow rounded-md"></Skeleton>
            <Skeleton className="h-[70%] flex-grow rounded-md"></Skeleton>
            <Skeleton className="h-[50%] flex-grow rounded-md"></Skeleton>
            <Skeleton className="h-[60%] flex-grow rounded-md"></Skeleton>
            <Skeleton className="h-[10%] flex-grow rounded-md"></Skeleton>
            <Skeleton className="h-[40%] flex-grow rounded-md"></Skeleton>
            <Skeleton className="h-[20%] flex-grow rounded-md"></Skeleton>
            <Skeleton className="h-[100%] flex-grow rounded-md"></Skeleton>
            <Skeleton className="h-[80%] flex-grow rounded-md"></Skeleton>
            <Skeleton className="h-[90%] flex-grow rounded-md"></Skeleton>
            <Skeleton className="h-[70%] flex-grow rounded-md"></Skeleton>
            <Skeleton className="h-[50%] flex-grow rounded-md"></Skeleton>
            <Skeleton className="h-[60%] flex-grow rounded-md"></Skeleton>
          </div>
        </Card>
        <Card className="col-span-4 md:col-span-1 row-span-1 flex flex-col gap-2 w-full p-4">
          <Skeleton className="h-12 w-full rounded-md mb-4"></Skeleton>
          <Skeleton className="h-10 w-full rounded-md"></Skeleton>
          <Skeleton className="h-10 w-full rounded-md"></Skeleton>
          <Skeleton className="h-10 w-full rounded-md"></Skeleton>
          <Skeleton className="h-10 w-full rounded-md"></Skeleton>
          <Skeleton className="h-10 w-full rounded-md"></Skeleton>
          <Skeleton className="h-10 w-full rounded-md"></Skeleton>
        </Card>
        <Card className="col-span-4 md:col-span-1 h-full row-span-1">
          <div className="flex flex-col gap-4 justify-center items-center p-4 h-full">
            <Skeleton className="h-10 w-full rounded-md"></Skeleton>
            <Skeleton className="h-10 w-full rounded-md"></Skeleton>
            <Skeleton className="h-10 w-full rounded-md"></Skeleton>
            <Skeleton className="h-10 w-full rounded-md"></Skeleton>
            <Skeleton className="h-10 w-full rounded-md"></Skeleton>
          </div>
        </Card>
        <Card className="col-span-4 md:col-span-2 h-full row-span-1 flex justify-center items-center">
          <Skeleton className="h-[275px] aspect-square rounded-full"></Skeleton>
        </Card>
        <Card className="col-span-4 md:col-span-1 h-full row-span-1">
          <div className="flex flex-col gap-4 justify-center items-center p-4 h-full">
            <Skeleton className="h-10 w-full rounded-md"></Skeleton>
            <Skeleton className="h-10 w-full rounded-md"></Skeleton>
            <Skeleton className="h-10 w-full rounded-md"></Skeleton>
            <Skeleton className="h-10 w-full rounded-md"></Skeleton>
            <Skeleton className="h-10 w-full rounded-md"></Skeleton>
          </div>
        </Card>
        <Card className="col-span-4 h-full row-span-1 flex justify-center items-center">
          <CardHeader>
            <Skeleton className="h-10 w-full"></Skeleton>
          </CardHeader>
          <CardContent className="p-4 h-full w-full">
            <Skeleton className="h-full w-full rounded-md"></Skeleton>
          </CardContent>
        </Card>
        <Card className="col-span-2 h-full row-span-1 flex justify-center items-center">
          <CardHeader>
            <Skeleton className="h-10 w-full"></Skeleton>
          </CardHeader>
          <CardContent className="p-4 h-full w-full">
            <Skeleton className="h-full w-full rounded-md"></Skeleton>
          </CardContent>
        </Card>
        <Card className="col-span-2 h-full row-span-1 flex justify-center items-center">
          <CardHeader>
            <Skeleton className="h-10 w-full"></Skeleton>
          </CardHeader>
          <CardContent className="p-4 h-full w-full">
            <Skeleton className="h-full w-full rounded-md"></Skeleton>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
