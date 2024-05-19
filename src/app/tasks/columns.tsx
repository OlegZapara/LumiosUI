"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task } from "@/shared/types";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useTasksStore } from "../stores/tasks";
import TaskDialog from "./task-dialog";
import { useToast } from "@/components/ui/use-toast";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: true,
  },
  {
    accessorKey: "taskName",
    header: "Name",
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "dueTime",
    header: "Time",
    cell: ({ row }) => {
      const time = row.original.dueTime;
      return time.slice(0, 5);
    },
  },
  {
    accessorKey: "url",
    header: "Url",
    cell: ({ row }) => {
      const url = row.getValue("url") as string;
      const content = url.slice(0, 30) + (url.length > 30 ? "..." : "");
      return <span>{content}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <TasksDropdown row={row} />;
    },
    enableSorting: false,
    enableHiding: false,
  },
];

function TasksDropdown(props: { row: Row<Task> }) {
  const { removeTask } = useTasksStore();
  const [editWindowOpen, setEditWindowOpen] = useState<boolean>(false);
  const { toast } = useToast();

  return (
    <>
      <TaskDialog
        setOpen={setEditWindowOpen}
        type="edit"
        task={props.row.original}
        open={editWindowOpen}
      ></TaskDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {props.row.original.url && (
            <>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard
                    .writeText(props.row.original.url)
                    .then(() => {
                      toast({
                        title: "Link copied to clipboard",
                        description: props.row.original.url,
                        duration: 3000,
                      });
                    });
                }}
              >
                Copy task URL
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem onClick={() => setEditWindowOpen(true)}>
            Edit task
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => removeTask(props.row.original.id)}>
            Delete task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

const extractDomain = (url: string): string => {
  const match = url.match(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/);
  return match ? match[1] : url;
};
