"use client";

import { Plus } from "lucide-react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect } from "react";
import { useTimetableStore } from "../stores/timetable";
import EntryForm from "./entry-form";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  weekIndex: number;
  dayIndex: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  weekIndex,
  dayIndex,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const timetableStore = useTimetableStore();
  const editingRow = timetableStore.editingRow;

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (editingRow == null) return;
      if (event.shiftKey && event.key === "Enter") {
        timetableStore.completeEdit();
      }
      if (event.key == "Escape") {
        timetableStore.discardEdit();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [editingRow, timetableStore]);

  return (
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
            table
              .getRowModel()
              .rows.map((row) => (
                <DataTableRow
                  key={row.id}
                  row={row}
                  week={weekIndex}
                  day={dayIndex}
                ></DataTableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell
              onClick={() =>
                timetableStore.addRow({ week: weekIndex, day: dayIndex })
              }
              className="cursor-pointer"
              colSpan={columns.length}
            >
              <div className="flex flex-row items-center justify-center w-full h-full">
                Add new row <Plus></Plus>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

interface DataTableRowProps<TData> {
  week: number;
  day: number;
  row: Row<TData>;
}

function DataTableRow<TData>(props: DataTableRowProps<TData>) {
  const timetableStore = useTimetableStore();

  const isEdit = timetableStore.editRowInfo.row === props.row.index;

  if (isEdit) {
    return <EntryForm {...props}></EntryForm>;
  }

  return (
    <TableRow
      key={props.row.id}
      data-state={props.row.getIsSelected() && "selected"}
      tabIndex={props.row.index + 1}
    >
      {props.row.getVisibleCells().map((cell, i) => (
        <TableCell
          key={cell.id}
          style={{ width: cell.column.getSize() }}
          className="cursor-default"
          onDoubleClick={() =>
            timetableStore.startEdit({
              ...props,
              row: props.row.index,
              index: i,
            })
          }
        >
          <div className="px-2">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        </TableCell>
      ))}
    </TableRow>
  );
}
