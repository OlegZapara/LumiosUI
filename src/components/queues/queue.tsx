"use client";

import { CardBody } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { updateQueue } from "@/actions/queues-actions";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Queue, QueueUser } from "@/schemas/queue-schema";
import { createContext, useState } from "react";
import { DragField } from "./drag-field";
import { QueueActions } from "./queue-actions";

type QueueCardProps = { queue: Queue; isAdmin: boolean };

type QueueContextType = {
  queue: Queue | null;
  users: QueueUser[];
  setUsers: (users: QueueUser[]) => void;
  isAdmin: boolean;
};
export const QueueContext = createContext<QueueContextType>({
  queue: null,
  users: [],
  setUsers: () => {},
  isAdmin: false,
});

export default function QueueCard(props: QueueCardProps) {
  const { queue } = props;

  const [users, setUsers] = useState(queue.contents);

  const update = () => {
    // TODO: Handle admin permissions
    // if (!allowed({ error: "Only admin can update queue" })) {
    //   return;
    // }
    const newQueue = { ...queue, contents: users };
    updateQueue(newQueue).then(() => {
      toast({
        title: "Queue updated",
        description: `${queue.alias} was successfully updated`,
      });
    });
  };

  const isDraft = () => {
    return JSON.stringify(queue.contents) !== JSON.stringify(users);
  };

  return (
    <QueueContext.Provider value={{ ...props, users, setUsers }}>
      <Card className="flex flex-col justify-start [&>div]:w-full">
        <CardHeader>
          <CardTitle className="flex flex-col-reverse items-center justify-between gap-2 sm:flex-row">
            <div className="flex-row items-end pl-4">
              <span>{queue.alias}</span>
              {isDraft() && (
                <span className="ml-1 text-sm font-normal text-blue-500">
                  Draft
                </span>
              )}
            </div>
            <QueueActions />
          </CardTitle>
        </CardHeader>
        <CardBody className="relative flex h-auto flex-col gap-1 p-6">
          <DragField />
          {isDraft() && (
            <>
              <Separator className="my-2"></Separator>
              <div className="flex flex-row gap-2">
                <Button
                  className="flex-grow border-red-500 text-red-500 hover:text-red-600"
                  variant="outline"
                  onClick={() => setUsers(queue.contents)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-grow border-green-500 text-green-500 hover:text-green-600"
                  variant="outline"
                  onClick={update}
                >
                  Update
                </Button>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </QueueContext.Provider>
  );
}
