import { useToast } from "@/components/ui/use-toast";
import { Task } from "@/schemas/task-schema";
import { Row } from "@tanstack/react-table";
import { deleteTask } from "../../actions/tasks-actions";
import TaskDialog from "./task-dialog";
import { Button } from "@/components/ui/button";
import { Copy, Edit2, ExternalLink, Trash } from "lucide-react";
import Link from "next/link";

export function TaskActions({ row }: { row: Row<Task> }) {
  const { toast } = useToast();
  const copyToClipboard = () => {
    const text = `Task: ${row.original.taskName},\nDate: ${row.original.dueDate},\nTime: ${row.original.dueTime}${row.original.url ? `,\nURL: ${row.original.url}` : ""}`;
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Task copied to clipboard",
        description: (
          <pre className="mr-3 w-full text-wrap rounded-md border bg-muted/50 p-2">
            {text}
          </pre>
        ),
        duration: 3000,
      });
    });
  };
  const removeTask = () => {
    deleteTask(row.original.id).then(() => {
      toast({ title: "Task deleted successfully" });
    });
  };

  return (
    <div className="flex w-0 flex-row justify-end">
      {row.original.url && (
        <Link
          href={row.original.url}
          target="_blank"
          className="inline-flex aspect-square h-9 items-center justify-center whitespace-nowrap rounded-md p-0 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          type="submit"
        >
          <ExternalLink className="aspect-square h-4 opacity-0 transition-all delay-100 duration-500 ease-out group-hover:stroke-green-500 group-hover:opacity-100" />
        </Link>
      )}
      <TaskDialog type="edit" task={row.original}>
        <Button variant="ghost" className="aspect-square p-0" size="sm">
          <Edit2 className="aspect-square h-4 opacity-0 transition-all delay-100 duration-500 ease-out group-hover:stroke-blue-500 group-hover:opacity-100" />
        </Button>
      </TaskDialog>
      <Button
        size="sm"
        variant="ghost"
        className="aspect-square p-0"
        onClick={removeTask}
      >
        <Trash className="aspect-square h-4 opacity-0 transition-all delay-100 duration-500 ease-out group-hover:stroke-red-500 group-hover:opacity-100" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="aspect-square p-0"
        onClick={copyToClipboard}
      >
        <Copy className="aspect-square h-4 opacity-0 transition-all delay-100 duration-500 ease-out group-hover:stroke-yellow-500 group-hover:opacity-100" />
      </Button>
    </div>
  );
}
