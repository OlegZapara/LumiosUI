import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Pin, PinOff, Shuffle, Trash2 } from "lucide-react";
import { useContext } from "react";
import { removeQueue, shuffleQueue } from "../../actions/queues-actions";
import { QueueContext } from "./queue";

export function QueueActions() {
  const { queue, isAdmin } = useContext(QueueContext);
  if (!queue) return null;

  function togglePin() {
    // if (queue.pinned) queuesStore.unpinQueue(queue.id);
    // else queuesStore.pinQueue(queue.id);
  }

  const remove = () => {
    if (!isAdmin) {
      toast({ title: "Only admin can delete queue" });
      return;
    }
    removeQueue(queue.id, queue.isMixed).then(() => {
      toast({
        title: "Queue deleted",
        description: `${queue.alias} was successfully deleted`,
      });
    });
  };

  const shuffle = () => {
    if (!isAdmin) {
      toast({ title: "Only admin can shuffle the queue" });
      return;
    }
    shuffleQueue(queue.id)
      .then(() => {
        toast({ title: "Queue was successfully shuffled" });
      })
      .catch((err) => {
        toast({
          title: "Error occurred during queue shuffle",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="flex flex-row gap-1">
      {queue.isMixed && (
        <Button
          className="aspect-square w-10 p-0"
          variant="ghost"
          title="Shuffle queue"
          onClick={shuffle}
        >
          <Shuffle className="stroke-blue-500" size={16}></Shuffle>
        </Button>
      )}
      <Button
        className={cn(
          "aspect-square w-10 p-0",
          queue.pinned ? "border-[1px] border-orange-300" : "",
        )}
        variant="ghost"
        title={queue.pinned ? "Unpin queue" : "Pin queue"}
        onClick={() => togglePin()}
      >
        {queue.pinned ? (
          <PinOff className="stroke-orange-300" size={16}></PinOff>
        ) : (
          <Pin className="stroke-orange-300" size={16}></Pin>
        )}
      </Button>
      <Button
        className="aspect-square w-10 p-0"
        variant="ghost"
        title="Remove queue"
        onClick={remove}
      >
        <Trash2 className="stroke-red-500" size={16}></Trash2>
      </Button>
    </div>
  );
}
