import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col w-full px-10 justify-center items-center mx-auto gap-3 py-10">
      <div className="flex flex-row w-full h-12 gap-4 my-4">
        <Skeleton className="w-96 h-10 rounded-lg"></Skeleton>
        <Skeleton className="w-24 h-10 ml-auto rounded-lg"></Skeleton>
        <Skeleton className="w-24 h-10 rounded-lg"></Skeleton>
        <Skeleton className="w-24 h-10 rounded-lg"></Skeleton>
      </div>
      {[...Array(7)].map((_, index) => (
        <Skeleton key={index} className={"w-full h-12 rounded-lg"} />
      ))}
    </div>
  );
}
