"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Task } from "@/shared/types";
import { PlusCircle, Settings2, SquarePen } from "lucide-react";
import React from "react";
import DeleteDialog from "./delete-dialog";
import TaskDialog from "./task-dialog";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({ id: false });
  const [rowSelection, setRowSelection] = React.useState({});
  const [taskDialogOpen, setTaskDialogOpen] = React.useState(false);
  const [editTaskDialogOpen, setEditTaskDialogOpen] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  function getSelectedTask(): Task {
    const selectedTaskValues = table.getFilteredSelectedRowModel().rows[0]
      .original as {
      id: string;
      taskName: string;
      dueTime: string;
      dueDate: string;
      url: string;
    };
    return {
      ...selectedTaskValues,
      dueDate: new Date(selectedTaskValues.dueDate),
    } as Task;
  }

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter tasks..."
          value={
            (table.getColumn("taskName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("taskName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <>
            <div className="flex-1 text-sm text-muted-foreground ml-4">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <DeleteDialog
              tasks={table
                .getFilteredSelectedRowModel()
                .rows.map((x) => x.original as Task)}
            ></DeleteDialog>
          </>
        )}
        {table.getFilteredSelectedRowModel().rows.length == 1 && (
          <TaskDialog
            type="edit"
            task={getSelectedTask()}
            open={editTaskDialogOpen}
            setOpen={setEditTaskDialogOpen}
          >
            <div className="border-blue-500 cursor-pointer ml-auto h-10 px-4 py-2 relative mr-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:bg-accent hover:text-accent-foreground">
              <SquarePen className="absolute h-5 w-5 left-3 stroke-blue-500"></SquarePen>
              <div className="pl-6 text-blue-500">Edit</div>
            </div>
          </TaskDialog>
        )}
        <TaskDialog
          type="create"
          open={taskDialogOpen}
          setOpen={setTaskDialogOpen}
        >
          <div className="border-green-500 cursor-pointer ml-auto h-10 px-4 py-2 relative mr-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:bg-accent hover:text-accent-foreground">
            <PlusCircle className="absolute h-5 w-5 left-3 stroke-green-500"></PlusCircle>
            <div className="pl-6 text-green-500">Create</div>
          </div>
        </TaskDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="relative">
              <Settings2 className="absolute h-5 w-5 left-3"></Settings2>
              <div className="pl-6">View</div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide() && column.id != "id")
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
