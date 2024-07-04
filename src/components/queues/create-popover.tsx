"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { PopoverClose } from "@radix-ui/react-popover";
import { Plus, Shuffle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { createQueue } from "@/actions/queues-actions";

export default function CreateQueuePopover() {
  const [title, setTitle] = useState("");
  const [isMixed, setIsMixed] = useState(false);
  const { toast } = useToast();

  function create() {
    createQueue(title, isMixed).then(() => {
      toast({
        title: "Queue is successfully created",
        description: `${
          isMixed ? "Mixed" : "Simple"
        } queue with name ${title} was added`,
      });
    });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          title="Create queue"
          className="flex flex-row items-center justify-center gap-2 text-muted-foreground transition-all ease-out hover:border-green-500 hover:text-green-500"
        >
          <Plus size={16}></Plus>
          <span className="font-normal">Create queue</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left" className="flex flex-col gap-4">
        <div className="font-semibold">Enter title of the queue</div>
        <div className="flex flex-row items-center justify-center gap-2">
          <Input
            placeholder="Queue title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-10 w-3/4 flex-grow"
            id="title-input"
          ></Input>
          <Toggle
            variant="outline"
            className={isMixed ? "border-blue-500" : ""}
            pressed={isMixed}
            onPressedChange={(e) => setIsMixed(e)}
          >
            <Shuffle className="stroke-blue-500" size={16}></Shuffle>
          </Toggle>
        </div>
        <div className="flex flex-row gap-2">
          <PopoverClose asChild>
            <Button
              className="flex-grow border-red-500 text-red-500 hover:text-red-600"
              variant="outline"
              onClick={() => {
                setTitle("");
                setIsMixed(false);
              }}
            >
              Cancel
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              className="flex-grow border-green-500 text-green-500 hover:text-green-600"
              variant="outline"
              onClick={create}
            >
              {isMixed ? "Create mixed" : "Create"}
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
