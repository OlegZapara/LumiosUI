import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex h-auto w-full animate-slowly-show flex-col items-center gap-4">
      <Skeleton className="my-12 inline-block h-12 w-5/6 rounded-sm"></Skeleton>
      <div className="flex h-12 w-5/6 flex-row justify-between gap-4 rounded-sm">
        <div className="flex h-full flex-row gap-4">
          <Skeleton className="h-full w-48"></Skeleton>
          <Skeleton className="h-full w-96"></Skeleton>
        </div>
        <div className="flex h-full flex-row gap-4">
          <Skeleton className="h-full w-48"></Skeleton>
        </div>
      </div>
      <Skeleton className="inline-block h-48 w-5/6 rounded-sm"></Skeleton>
      <Skeleton className="inline-block h-12 w-5/6 rounded-sm"></Skeleton>
    </div>
  );
}
