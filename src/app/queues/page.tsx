"use client";

import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, PlusCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useQueuesStore } from "../stores/queues";
import { Queue } from "@/shared/types";
import QueueCard from "./queue";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CreateQueuePopover from "./create-popover";

export default function Queues() {
  const { queues, fetchQueues, createQueue } = useQueuesStore();
  const [filteredData, setFilteredData] = useState<Queue[]>([]);

  useEffect(() => {
    fetchQueues();

    // const interval = setInterval(fetchQueues, 5000);
    // return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilteredData([
      ...queues.filter((x) => x.pinned),
      ...queues.filter((x) => !x.pinned),
    ]);
  }, [queues]);

  function filterData(filter: string) {
    const filteredRecords = queues.filter((x) =>
      x.alias.toUpperCase().includes(filter.toUpperCase())
    );
    setFilteredData([
      ...filteredRecords.filter((x) => x.pinned),
      ...filteredRecords.filter((x) => !x.pinned),
    ]);
  }

  return (
    <div className="container">
      <Card className="w-full shadow-md lg:shadow-lg h-auto">
        <CardHeader>
          <CardTitle>
            <div className="flex gap-6 flex-col md:flex-row w-full justify-between">
              <span className="mt-3 ml-2">List of group queues</span>
              <div className="flex flex-row gap-4 flex-wrap">
                <CreateQueuePopover></CreateQueuePopover>
                <div className="flex relative">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground"></Search>
                  <Input
                    className="pl-8 font-normal w-80"
                    placeholder="Search queue by name"
                    onChange={(e) => filterData(e.target.value)}
                  ></Input>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardBody className="w-full justify-center gap-6 rounded-lg p-8 grid grid-cols-6 h-auto">
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
