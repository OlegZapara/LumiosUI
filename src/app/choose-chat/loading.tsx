import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

export default function Loading() {
  return (
    <div className="md:container mt-6">
      <Card className="w-full shadow-md lg:shadow-lg h-auto">
        <CardHeader>
          <CardTitle>
            <div className="flex gap-6 flex-col md:flex-row w-full justify-between items-center px-4">
              <div className="mt-3 flex flex-col gap-1 animate-slowly-show">
                <Skeleton className="h-7 w-96"></Skeleton>
                <Skeleton className="h-5 w-72"></Skeleton>
              </div>
              <div className="w-full md:w-72 flex relative">
                <Input
                  placeholder="Search for chat"
                  className="w-full max-w-96 font-normal pl-9"
                  disabled
                ></Input>
                <div className="absolute left-3 top-3">
                  <Search size={16}></Search>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full justify-center gap-6 rounded-lg p-4 md:p-8 grid grid-cols-6 h-auto animate-slowly-show">
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
    <Card className="col-span-6 sm:col-span-3 lg:col-span-2 cursor-pointer">
      <CardHeader>
        <CardTitle className="flex flex-row items-center justify-start gap-5">
          <Skeleton className="h-16 w-16 aspect-square rounded-full"></Skeleton>
          <Skeleton className="w-full h-8"></Skeleton>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Skeleton className="w-full h-4"></Skeleton>
        <Skeleton className="w-full h-4"></Skeleton>
        <Skeleton className="w-full h-4"></Skeleton>
      </CardContent>
    </Card>
  );
}
