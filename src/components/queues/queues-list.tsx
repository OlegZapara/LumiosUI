"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Queue } from "@/schemas/queue-schema";
import QueueCard from "@/components/queues/queue";

type QueuesListProps = {
  queues: Queue[];
  isAdmin: boolean;
};

export default function QueuesList(props: QueuesListProps) {
  const searchParams = useSearchParams();
  const filteredQueues = props.queues.filter((queue) =>
    queue.alias
      .toLowerCase()
      .includes((searchParams.get("q") || "").toLowerCase()),
  );
  const isAdmin = props.isAdmin || process.env.NODE_ENV !== "production";
  const renderQueueCol = (mod: number) => (
    <div className="col-span-6 grid h-auto w-full gap-6 md:col-span-3 lg:col-span-2">
      {filteredQueues
        .filter((_, i) => i % 3 == mod)
        .map((x) => (
          <QueueCard key={x.id} queue={x} isAdmin={isAdmin} />
        ))}
    </div>
  );

  return (
    <>
      {renderQueueCol(0)}
      {renderQueueCol(1)}
      {renderQueueCol(2)}
    </>
  );
}
