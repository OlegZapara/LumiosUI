import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full h-auto flex items-center flex-col gap-4">
      <Skeleton className="inline-block rounded-sm w-5/6 h-12 my-12"></Skeleton>
      <div className="rounded-sm w-5/6 h-12 flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 h-full">
          <Skeleton className="w-48 h-full"></Skeleton>
          <Skeleton className="w-96 h-full"></Skeleton>
        </div>
        <div className="flex flex-row gap-4 h-full">
          <Skeleton className="w-24 h-full"></Skeleton>
          <Skeleton className="w-24 h-full"></Skeleton>
        </div>
      </div>
      <Skeleton className="inline-block rounded-sm w-5/6 h-48"></Skeleton>
      <Skeleton className="inline-block rounded-sm w-5/6 h-12"></Skeleton>
    </div>
  );
}
