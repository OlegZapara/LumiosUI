"use client";

import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Queue } from "@/shared/types";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useQueuesStore } from "../stores/queues";
import CreateQueuePopover from "./create-popover";
import QueueCard from "./queue";
import useAuth from "@/hooks/useAuth";
import { notFound } from "next/navigation";

export default function Queues() {
  const authenticated = useAuth();

  const { queues, fetchQueues } = useQueuesStore();
  const [filteredData, setFilteredData] = useState<Queue[]>([]);

  useEffect(() => {
    if (authenticated == null) return;
    fetchQueues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  useEffect(() => {
    setFilteredData([
      ...queues.filter((x) => x.pinned),
      ...queues.filter((x) => !x.pinned),
    ]);
  }, [queues]);

  if (authenticated == null) return null;
  if (!authenticated) return notFound();

  function filterData(filter: string) {
    const filteredRecords = queues.filter((x) =>
      x.alias.toUpperCase().includes(filter.toUpperCase()),
    );
    setFilteredData([
      ...filteredRecords.filter((x) => x.pinned),
      ...filteredRecords.filter((x) => !x.pinned),
    ]);
  }

  return (
    <div className="md:container mt-6">
      <Card className="w-full shadow-md lg:shadow-lg h-auto">
        <CardHeader>
          <CardTitle>
            <div className="flex gap-6 flex-col md:flex-row w-full justify-between">
              <span className="mt-3 ml-2">List of group queues</span>
              <div className="flex flex-row gap-4 flex-wrap md:flex-nowrap">
                <CreateQueuePopover></CreateQueuePopover>
                <div className="flex relative w-full sm:w-auto">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground"></Search>
                  <Input
                    className="pl-8 font-normal w-full md:w-80"
                    placeholder="Search queue by name"
                    onChange={(e) => filterData(e.target.value)}
                  ></Input>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardBody className="w-full justify-center gap-6 rounded-lg p-4 md:p-8 grid grid-cols-6 h-auto">
          <div className="col-span-6 grid gap-6 md:col-span-3 lg:col-span-2 w-full h-auto">
            {filteredData
              .filter((_, i) => i % 3 == 0)
              .map((x) => (
                <QueueCard key={x.id} {...x}></QueueCard>
              ))}
          </div>
          <div className="col-span-6 grid gap-6 md:col-span-3 lg:col-span-2 w-full h-auto">
            {filteredData
              .filter((_, i) => (i + 2) % 3 == 0)
              .map((x) => (
                <QueueCard key={x.id} {...x}></QueueCard>
              ))}
          </div>
          <div className="col-span-6 grid gap-6 md:col-span-3 lg:col-span-2 w-full h-auto">
            {filteredData
              .filter((_, i) => (i + 1) % 3 == 0)
              .map((x) => (
                <QueueCard key={x.id} {...x}></QueueCard>
              ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
