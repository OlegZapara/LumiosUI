"use client";

import { Plus } from "lucide-react";

import {
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

import { useEffect } from "react";
import { EMPTY_ENTRY, useTimetableStore } from "../stores/timetable";
import { DataTableRow } from "@/app/timetable/data-table-row";
import { FormProvider, useForm } from "react-hook-form";
import { timetableEntryScheme } from "@/app/timetable/timetable-scheme";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  weekIndex: number;
  dayIndex: number;
}

export type FormType = z.infer<typeof timetableEntryScheme>;

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
  const formMethods = useForm<FormType>({
    resolver: zodResolver(timetableEntryScheme),
  });
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (editingRow == null) return;
      if (
        event.shiftKey &&
        event.key === "Enter" &&
        formMethods.formState.isValid
      ) {
        onSubmit(formMethods.getValues());
      }
      if (event.key == "Escape") {
        formMethods.reset({ ...EMPTY_ENTRY });
        timetableStore.discardEdit();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingRow, timetableStore]);

  function addRow() {
    if (timetableStore.editingRow != null) {
      toast({
        title: "You cannot add a new row",
        description: "You need to finish editing before adding a new row",
        variant: "destructive",
      });
      return;
    }
    formMethods.reset({ ...EMPTY_ENTRY });
    timetableStore.addRow({ week: weekIndex, day: dayIndex });
  }

  const timeToSeconds = (time: string): number => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  async function onSubmit(data: FormType) {
    if (timeToSeconds(data.startTime) >= timeToSeconds(data.endTime)) {
      formMethods.setError("endTime", {});
      formMethods.setError("startTime", {});
      toast({
        title: "Start time must be before end time",
        variant: "destructive",
      });
      return;
    }
    const ok = await timetableStore.completeEdit(data);
    if (!ok) {
      toast({
        title: "Timetable was not updated",
        description: "Make sure that all values are filled properly",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Timetable updated",
      description: data.className
        ? `${data.className} was updated`
        : "New row was added",
    });
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table
                  .getRowModel()
                  .rows.map((row) => <DataTableRow row={row} key={row.id} />)
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
              <TableRow>
                <TableCell
                  onClick={addRow}
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
      </form>
    </FormProvider>
  );
}
