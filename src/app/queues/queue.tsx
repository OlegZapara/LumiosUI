"use client";

import { CardBody } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Queue, User } from "@/shared/types";
import {
  GripVertical,
  Pin,
  PinOff,
  Shuffle,
  Trash2,
  UserRoundMinus,
} from "lucide-react";
import { useQueuesStore } from "../stores/queues";

import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useUsersStore } from "@/app/stores/users";

const reorder = (list: User[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function QueueCard(props: Queue) {
  const queuesStore = useQueuesStore();
  const isAdmin = useUsersStore(
    (state) => state.user!.chats.find((x) => x.id == state.chatId)!.admin,
  );
  const [users, setUsers] = useState(props.contents);
  const { toast } = useToast();

  function togglePin() {
    if (props.pinned) queuesStore.unpinQueue(props.id);
    else queuesStore.pinQueue(props.id);
  }

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }
    const reorderedUsers = reorder(
      users,
      result.source.index,
      result.destination.index,
    );
    setUsers(reorderedUsers);
  }

  const isDraft = () =>
    JSON.stringify(props.contents) !== JSON.stringify(users);

  const deleteQueue = () => {
    queuesStore.removeQueue(props.id, props.isMixed).then(() => {
      toast({
        title: "Queue deleted",
        description: `${props.alias} was successfully deleted`,
      });
    });
  };

  const updateQueue = () => {
    const { pinned, ...queueProps } = props;
    const queue: Queue = {
      ...queueProps,
      contents: users,
    };
    queuesStore.updateQueue(queue).then(() => {
      toast({
        title: "Queue updated",
        description: `${props.alias} was successfully updated`,
      });
    });
  };

  const removeUser = (index: number) => {
    if (!isAdmin && process.env.NODE_ENV === "production") {
      toast({ title: "Only admin can remove users" });
      return;
    }
    setUsers((users) => users.filter((_, i) => i !== index));
  };

  const shuffleQueue = () => {
    if (process.env.NODE_ENV === "production" && !isAdmin) {
      toast({ title: "Only admin can shuffle the queue" });
      return;
    }
    queuesStore
      .shuffleQueue(props.id)
      .then(() => {
        toast({ title: "Queue was successfully shuffled" });
      })
      .catch((err) => {
        toast({
          title: "Error occurred during queue shuffle",
          variant: "destructive",
        });
        console.error(err);
      });
  };

  return (
    <Card className="flex justify-start [&>div]:w-full flex-col">
      <CardHeader>
        <CardTitle className="flex flex-col-reverse sm:flex-row justify-between items-center gap-2">
          <div className="pl-4 flex-row items-end">
            <span>{props.alias}</span>
            {isDraft() && (
              <span className="text-blue-500 ml-1 text-sm font-normal">
                Draft
              </span>
            )}
          </div>
          <div className="flex flex-row gap-1">
            {props.isMixed && (
              <Button
                className="aspect-square w-10 p-0"
                variant="ghost"
                title="Shuffle queue"
                onClick={shuffleQueue}
              >
                <Shuffle className="stroke-blue-500" size={16}></Shuffle>
              </Button>
            )}
            <Button
              className={cn(
                "aspect-square w-10 p-0 ",
                props.pinned ? "border-[1px] border-orange-300" : "",
              )}
              variant="ghost"
              title={props.pinned ? "Unpin queue" : "Pin queue"}
              onClick={() => togglePin()}
            >
              {props.pinned ? (
                <PinOff className="stroke-orange-300" size={16}></PinOff>
              ) : (
                <Pin className="stroke-orange-300" size={16}></Pin>
              )}
            </Button>
            <Button
              className="aspect-square w-10 p-0"
              variant="ghost"
              title="Remove queue"
              onClick={deleteQueue}
            >
              <Trash2 className="stroke-red-500" size={16}></Trash2>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardBody className="h-auto p-6 flex flex-col gap-1 relative">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="droppable"
            isDropDisabled={!(isAdmin || process.env.NODE_ENV !== "production")}
          >
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {users.map((user, index) => (
                  <Draggable
                    key={user.username}
                    draggableId={user.username}
                    index={index}
                  >
                    {(provided, snapshot) => {
                      if (snapshot.isDragging) {
                        (provided.draggableProps.style as any).left = (
                          provided.draggableProps.style as any
                        ).offsetLeft;
                        (provided.draggableProps.style as any).top = (
                          provided.draggableProps.style as any
                        ).offsetTop;
                      }
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={cn(
                            "rounded-lg px-3 py-1 select-none hover:shadow dark:shadow-muted-foreground",
                            snapshot.isDragging ? "bg-muted shadow-lg" : "",
                          )}
                        >
                          <div className="group flex flex-row gap-2 items-center h-8 justify-between">
                            <div className="flex flex-row gap-2 items-center">
                              <GripVertical size={16}></GripVertical>@
                              {user.username}
                            </div>
                            <Button
                              variant="ghost"
                              title="Remove user"
                              onClick={() => removeUser(index)}
                              className="h-8 py-0 hidden group-hover:flex"
                            >
                              <UserRoundMinus
                                className="stroke-red-500"
                                size={16}
                              ></UserRoundMinus>
                              <span className="ml-2 text-red-500 hidden md:flex">
                                Remove
                              </span>
                            </Button>
                          </div>
                        </div>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {isDraft() && (
          <>
            <Separator className="my-2"></Separator>
            <div className="flex flex-row gap-2">
              <Button
                className="flex-grow border-red-500 text-red-500 hover:text-red-600"
                variant="outline"
                onClick={() => setUsers(props.contents)}
              >
                Cancel
              </Button>
              <Button
                className="flex-grow border-green-500 text-green-500 hover:text-green-600"
                variant="outline"
                onClick={updateQueue}
              >
                Update
              </Button>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
}
