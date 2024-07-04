import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex w-full animate-slowly-show flex-col items-center justify-center gap-3 px-10 py-10">
      <div className="my-4 flex h-12 w-full flex-row gap-4">
        <Skeleton className="h-10 w-96 rounded-lg"></Skeleton>
        <Skeleton className="ml-auto h-10 w-24 rounded-lg"></Skeleton>
        <Skeleton className="h-10 w-24 rounded-lg"></Skeleton>
        <Skeleton className="h-10 w-24 rounded-lg"></Skeleton>
      </div>
      {[...Array(7)].map((_, index) => (
        <Skeleton key={index} className={"h-12 w-full rounded-lg"} />
      ))}
    </div>
  );
}
