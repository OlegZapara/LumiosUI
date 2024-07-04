"use client";
import { DataTableRow } from "@/components/timetable/data-table-row";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useTimetableSearchParams } from "@/hooks/timetable/useTimetableSearchParams";
import {
  Timetable,
  TimetableEntry,
  TimetableEntrySchema,
} from "@/schemas/timetable-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

type DataTableProps = {
  columns: ColumnDef<TimetableEntry>[];
  data: Timetable;
};

export function DataTable({ columns, data }: DataTableProps) {
  const { dayIndex, weekIndex } = useTimetableSearchParams();
  const table = useReactTable({
    data: data[weekIndex].days[dayIndex].classEntries,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const form = useForm<TimetableEntry>({
    resolver: zodResolver(TimetableEntrySchema),
  });
  const { toast } = useToast();

  // useEffect(() => {
  //   const handleHotkey = (event: KeyboardEvent) => {
  //     if (form.getValues() == null) return;
  //     if (event.shiftKey && event.key === "Enter" && form.formState.isValid) {
  //       onSubmit(form.getValues());
  //     }
  //     if (event.key == "Escape") {
  //       form.reset({ ...EMPTY_ENTRY });
  //     }
  //   };
  //
  //   document.addEventListener("keydown", handleHotkey);
  //   return () => {
  //     document.removeEventListener("keydown", handleHotkey);
  //   };
  // }, [form, onSubmit]);

  const timeToSeconds = (time: string): number => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  async function onSubmit(data: TimetableEntry) {
    if (timeToSeconds(data.startTime) >= timeToSeconds(data.endTime)) {
      form.setError("endTime", {});
      form.setError("startTime", {});
      toast({
        title: "Start time must be before end time",
        variant: "destructive",
      });
      return;
    }
    // const ok = await timetableStore.completeEdit(data);
    // if (!ok) {
    //   toast({
    //     title: "Timetable was not updated",
    //     description: "Make sure that all values are filled properly",
    //     variant: "destructive",
    //   });
    //   return;
    // }
    // toast({
    //   title: "Timetable updated",
    //   description: data.className
    //     ? `${data.className} was updated`
    //     : "New row was added",
    // });
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6 w-full">
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
                  .rows.map((row) => <DataTableRow key={row.id} row={row} />)
              ) : (
                <EmptyTimetableRow colSpan={columns.length} />
              )}
              <AddRowButton colSpan={columns.length} />
            </TableBody>
          </Table>
        </div>
      </form>
    </FormProvider>
  );
}

function EmptyTimetableRow(props: { colSpan: number }) {
  return (
    <TableRow>
      <TableCell {...props} className="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  );
}

function AddRowButton(props: { colSpan: number }) {
  const form = useFormContext<TimetableEntry>();
  const { toast } = useToast();

  function addRow() {
    if (form.getValues() != null) {
      toast({
        title: "You cannot add a new row",
        description: "You need to finish editing before adding a new row",
        variant: "destructive",
      });
      return;
    }
    // form.reset({ ...EMPTY_ENTRY });
  }

  return (
    <TableRow>
      <TableCell onClick={addRow} className="cursor-pointer" {...props}>
        <div className="flex h-full w-full flex-row items-center justify-center">
          Add new row <Plus></Plus>
        </div>
      </TableCell>
    </TableRow>
  );
}
