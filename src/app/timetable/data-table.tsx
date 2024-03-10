"use client";

import { Plus } from "lucide-react";

import {
  Cell,
  ColumnDef,
  flexRender,
  getCoreRowModel,
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

import TextInput from "@/components/timetable/text-input";
import TimeInput from "@/components/timetable/time-input";
import TypeInput from "@/components/timetable/type-input";
import {
  addRow,
  completeEdit,
  discardEdit,
  startEditRow,
} from "@/slices/timetable-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Column, TimetableEntry } from "./columns";

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
  const editingRowIndex = useSelector<RootState>(
    (state) => state.timetable.editingRowIndex
  );
  const editingRow = useSelector<RootState, TimetableEntry | null>(
    (state) => state.timetable.editingRow
  );
  const [focusedCell, setFocusedCell] = useState(-1);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (editingRow == null) return;
      if (event.shiftKey && event.key === "Enter") {
        dispatch(completeEdit());
      }
      if (event.key == "Escape") {
        dispatch(discardEdit());
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [dispatch, editingRow, focusedCell]);

  const getInputForCell = (cell: Cell<TData, unknown>, i: number) => {
    console.log(cell);
    switch (cell.column.id) {
      case Column.ClassName:
      case Column.URL:
        return (
          <TextInput
            isFocused={i == focusedCell}
            editingRow={editingRow}
            columnId={cell.column.id}
          />
        );
      case Column.StartTime:
      case Column.EndTime:
        return (
          <TimeInput
            isFocused={i == focusedCell}
            editingRow={editingRow}
            columnId={cell.column.id}
          />
        );
      case Column.ClassType:
        return (
          <TypeInput
            isFocused={i == focusedCell}
            editingRow={editingRow}
            columnId={cell.column.id}
          />
        );
      default:
        return flexRender(cell.column.columnDef.cell, cell.getContext());
    }
  };

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
                          header.getContext()
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
                tabIndex={row.index + 1}
              >
                {row.getVisibleCells().map((cell, i) => (
                  <TableCell
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                    className="cursor-default"
                    onDoubleClick={() => {
                      dispatch(
                        startEditRow({
                          weekIndex: weekIndex,
                          dayIndex: dayIndex,
                          rowIndex: row.index,
                        })
                      );
                      setFocusedCell(i);
                    }}
                  >
                    {row.index === editingRowIndex ? (
                      getInputForCell(cell, i)
                    ) : (
                      <div className="px-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell colSpan={columns.length}>
              <div
                className="cursor-pointer flex flex-row items-center justify-center w-full h-full"
                onClick={() =>
                  dispatch(
                    addRow({ currentWeek: weekIndex, currentDay: dayIndex })
                  )
                }
              >
                Add new row <Plus></Plus>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
