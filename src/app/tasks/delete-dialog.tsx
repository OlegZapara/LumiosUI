import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Task } from "@/shared/types";
import { DialogClose } from "@radix-ui/react-dialog";
import { Trash2 } from "lucide-react";
import { useTasksStore } from "../stores/tasks";

interface DeleteDialogProps {
  tasks: Task[];
}

export default function DeleteDialog(props: DeleteDialogProps) {
  const { removeTask } = useTasksStore();

  function deleteAllTasks(tasks: Task[]) {
    tasks.forEach((task) => {
      removeTask(task.id);
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto relative mr-4 border-red-500"
        >
          <Trash2 className="absolute h-5 w-5 left-3 stroke-red-500"></Trash2>
          <div className="pl-6 text-red-500">Delete</div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {props.tasks.length == 1
              ? "Are you sure you want to delete this row?"
              : `Are you sure you want to delete ${props.tasks.length} rows?`}
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. List of tasks that will be deleted:
          </DialogDescription>
          <DialogDescription asChild>
            <div className="flex flex-col gap-2 my-2 w-full px-4 items-start">
              {props.tasks.map((task) => (
                <div key={task.id}>- {task.taskName}</div>
              ))}
            </div>
          </DialogDescription>
          <div className="flex flex-row w-full justify-between">
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => deleteAllTasks(props.tasks)}
              >
                Confirm
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
