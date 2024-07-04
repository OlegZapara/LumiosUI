import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <Card className="w-[calc(100% - 3rem)] md:mx-6 md:my-2">
      <CardHeader>
        <Skeleton className="h-10 w-full"></Skeleton>
      </CardHeader>
      <CardContent className="mx-4 mb-4 grid h-full w-[calc(100%-2rem)] grid-cols-4 grid-rows-4 gap-4">
        <Card className="col-span-4 row-span-1 h-full md:col-span-3">
          <div className="flex h-full flex-row items-end gap-2 p-4">
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
        <Card className="col-span-4 row-span-1 flex w-full flex-col gap-2 p-4 md:col-span-1">
          <Skeleton className="mb-4 h-12 w-full rounded-md"></Skeleton>
          <Skeleton className="h-10 w-full rounded-md"></Skeleton>
          <Skeleton className="h-10 w-full rounded-md"></Skeleton>
          <Skeleton className="h-10 w-full rounded-md"></Skeleton>
          <Skeleton className="h-10 w-full rounded-md"></Skeleton>
          <Skeleton className="h-10 w-full rounded-md"></Skeleton>
          <Skeleton className="h-10 w-full rounded-md"></Skeleton>
        </Card>
        <Card className="col-span-4 row-span-1 h-full md:col-span-1">
          <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
            <Skeleton className="h-10 w-full rounded-md"></Skeleton>
            <Skeleton className="h-10 w-full rounded-md"></Skeleton>
            <Skeleton className="h-10 w-full rounded-md"></Skeleton>
            <Skeleton className="h-10 w-full rounded-md"></Skeleton>
            <Skeleton className="h-10 w-full rounded-md"></Skeleton>
          </div>
        </Card>
        <Card className="col-span-4 row-span-1 flex h-full items-center justify-center md:col-span-2">
          <Skeleton className="aspect-square h-[275px] rounded-full"></Skeleton>
        </Card>
        <Card className="col-span-4 row-span-1 h-full md:col-span-1">
          <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
            <Skeleton className="h-10 w-full rounded-md"></Skeleton>
            <Skeleton className="h-10 w-full rounded-md"></Skeleton>
            <Skeleton className="h-10 w-full rounded-md"></Skeleton>
            <Skeleton className="h-10 w-full rounded-md"></Skeleton>
            <Skeleton className="h-10 w-full rounded-md"></Skeleton>
          </div>
        </Card>
        <Card className="col-span-4 row-span-1 flex h-full items-center justify-center">
          <CardHeader>
            <Skeleton className="h-10 w-full"></Skeleton>
          </CardHeader>
          <CardContent className="h-full w-full p-4">
            <Skeleton className="h-full w-full rounded-md"></Skeleton>
          </CardContent>
        </Card>
        <Card className="col-span-2 row-span-1 flex h-full items-center justify-center">
          <CardHeader>
            <Skeleton className="h-10 w-full"></Skeleton>
          </CardHeader>
          <CardContent className="h-full w-full p-4">
            <Skeleton className="h-full w-full rounded-md"></Skeleton>
          </CardContent>
        </Card>
        <Card className="col-span-2 row-span-1 flex h-full items-center justify-center">
          <CardHeader>
            <Skeleton className="h-10 w-full"></Skeleton>
          </CardHeader>
          <CardContent className="h-full w-full p-4">
            <Skeleton className="h-full w-full rounded-md"></Skeleton>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
