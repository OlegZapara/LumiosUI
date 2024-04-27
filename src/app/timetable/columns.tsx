import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Check, MoreHorizontal, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
// import { days, weeks } from "./data";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TimetableEntry } from "@/shared/types";
import { useTimetableStore } from "../stores/timetable";
import { useSettingsStore } from "../stores/settings";

export enum Column {
  ClassName = "className",
  StartTime = "startTime",
  EndTime = "endTime",
  ClassType = "classType",
  URL = "url",
}

export const columns: ColumnDef<TimetableEntry>[] = [
  {
    accessorKey: Column.ClassName,
    header: "Class Name",
    maxSize: 200,
    minSize: 100,
  },
  {
    accessorKey: Column.StartTime,
    header: "Start time",
    maxSize: 200,
    minSize: 100,
  },
  {
    accessorKey: Column.EndTime,
    header: "End time",
    maxSize: 200,
    minSize: 100,
  },
  {
    accessorKey: Column.ClassType,
    header: "Class type",
    maxSize: 200,
    minSize: 100,
  },
  {
    accessorKey: Column.URL,
    header: "URL",
    maxSize: 700,
    minSize: 400,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <AlertDialog>
        <div className="flex justify-end">
          <RowAction row={row}></RowAction>
        </div>
      </AlertDialog>
    ),
    size: 150,
  },
];

interface CellProps {
  row: Row<TimetableEntry>;
}

function RowAction({ row }: CellProps) {
  const timetableStore = useTimetableStore();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const isEdit = timetableStore.editRowInfo.row === row.index;

  const { weeks, days } = useSettingsStore();

  const entryInfo = {
    week: weeks.indexOf(searchParams.get("week")!),
    day: days.indexOf(searchParams.get("day")!),
    row: row.index,
    index: 0,
  };

  if (isEdit) {
    return (
      <div className="flex flex-row">
        <Button
          variant="ghost"
          onClick={() => {
            timetableStore.completeEdit();
            toast({
              title: "Timetable updated",
              description: `${row
                .getAllCells()[0]
                .getValue<string>()} was updated`,
            });
          }}
        >
          <Check className="stroke-green-500"></Check>
        </Button>
        <Button variant="ghost" onClick={() => timetableStore.discardEdit()}>
          <X className="stroke-red-500"></X>
        </Button>
      </div>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            toast({
              title: "Link copied to clipboard",
              description: row.original.url,
              duration: 3000,
            });
            navigator.clipboard.writeText(row.original.url);
          }}
        >
          Copy URL
        </DropdownMenuItem>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuItem onClick={() => timetableStore.startEdit(entryInfo)}>
          Edit row
        </DropdownMenuItem>
        <DropdownMenuItem>
          <AlertDialogTrigger>Delete row</AlertDialogTrigger>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete{" "}
            {row.getAllCells()[0].getValue<string>()}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove timetable
            entry from database
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              timetableStore.removeRow(entryInfo);
              const rowName = row.getAllCells()[0].getValue<string>();
              toast({
                title: "Row deleted",
                description: `${
                  rowName ? rowName : "Row"
                } was removed from timetable`,
              });
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </DropdownMenu>
  );
}
