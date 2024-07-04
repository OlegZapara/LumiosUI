import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MoveRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Filter from "@/components/general/filter";

export default function Loading() {
  return (
    <div className="mt-6 md:container">
      <Card className="h-auto w-full shadow-md lg:shadow-lg">
        <CardHeader>
          <CardTitle>
            <div className="flex w-full flex-col items-center justify-between gap-6 px-4 md:flex-row">
              <span className="mt-3 flex flex-col gap-1">
                Lumios Bot is available in multiple chats.
                <span className="flex flex-row items-center gap-2 text-base font-normal">
                  <MoveRight></MoveRight>Select chat that you want to use
                </span>
              </span>
              <Filter placeholder="Search for chats" disabled />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid h-auto w-full grid-cols-6 justify-center gap-6 rounded-lg p-4 md:p-8">
          <LoadingCard></LoadingCard>
          <LoadingCard></LoadingCard>
          <LoadingCard></LoadingCard>
        </CardContent>
      </Card>
    </div>
  );
}

function LoadingCard() {
  return (
    <Card className="col-span-6 animate-slowly-show sm:col-span-3 lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex flex-row items-center justify-start gap-5">
          <Skeleton className="aspect-square h-14 rounded-full"></Skeleton>
          <Skeleton className="h-8 w-full"></Skeleton>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Separator className="mb-4" />
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
        <Skeleton className="h-4 w-full"></Skeleton>
      </CardContent>
    </Card>
  );
}
