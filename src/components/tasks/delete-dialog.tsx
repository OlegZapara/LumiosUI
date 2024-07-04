import { deleteTask } from "@/actions/tasks-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Task } from "@/schemas/task-schema";
import { DialogClose } from "@radix-ui/react-dialog";
import { Trash2 } from "lucide-react";

type DeleteDialogProps = { tasks: Task[] };

export default function DeleteDialog(props: DeleteDialogProps) {
  const { toast } = useToast();

  function deleteAllTasks(tasks: Task[]) {
    const promises = tasks.map((task) => deleteTask(task.id));
    Promise.all(promises).then(() => {
      toast({ title: "Tasks deleted successfully" });
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative ml-auto mr-4 border-red-500"
        >
          <Trash2 className="absolute left-3 h-5 w-5 stroke-red-500"></Trash2>
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
            <div className="my-2 flex w-full flex-col items-start gap-2 px-4">
              {props.tasks.map((task) => (
                <div key={task.id}>- {task.taskName}</div>
              ))}
            </div>
          </DialogDescription>
          <div className="flex w-full flex-row justify-between">
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
