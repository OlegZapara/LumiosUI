"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Task } from "@/schemas/task-schema";
import { Table } from "@tanstack/table-core";
import { Settings2 } from "lucide-react";
import TaskDialog from "./task-dialog";
import DeleteDialog from "./delete-dialog";

type ActionBarProps = {
  table: Table<Task>;
  selectedTasks: Task[];
};

export default function ActionBar({ table, selectedTasks }: ActionBarProps) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filter tasks..."
        value={(table.getColumn("taskName")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("taskName")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      {selectedTasks.length > 0 && (
        <>
          <div className="ml-4 flex-1 text-sm text-muted-foreground">
            {selectedTasks.length} of {table.getFilteredRowModel().rows.length}{" "}
            row(s) selected.
          </div>
          <DeleteDialog tasks={selectedTasks}></DeleteDialog>
        </>
      )}
      {selectedTasks.length == 1 && (
        <TaskDialog type="edit" task={selectedTasks[0]} />
      )}
      <div className="ml-auto">
        <TaskDialog type="create" />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="relative">
            <Settings2 className="absolute left-3 h-5 w-5"></Settings2>
            <div className="pl-6">View</div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
