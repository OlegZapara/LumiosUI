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
import { useQueuesStore } from "../stores/queues";

export default function CreateQueuePopover() {
  const [title, setTitle] = useState("");
  const [isMixed, setIsMixed] = useState(false);
  const { createQueue } = useQueuesStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          title="Create queue"
          className="transition-all ease-out flex flex-row gap-2 justify-center items-center text-muted-foreground hover:text-green-500 hover:border-green-500"
        >
          <Plus size={16}></Plus>
          <span className="font-normal">Create queue</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left" className="flex flex-col gap-4">
        <div className="font-semibold">Enter title of the queue</div>
        <div className="flex flex-row gap-2 items-center justify-center">
          <Input
            placeholder="Queue title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-3/4 h-10 flex-grow"
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
              className="flex-grow text-red-500 border-red-500 hover:text-red-600"
              variant="outline"
              onClick={() => {
                setTitle("");
                setIsMixed(false);
              }}
            >
              Cancel
            </Button>
          </PopoverClose>
          <Button
            className="flex-grow text-green-500 border-green-500 hover:text-green-600"
            variant="outline"
            onClick={() => {
              createQueue(title);
            }}
          >
            {isMixed ? "Create mixed" : "Create"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
