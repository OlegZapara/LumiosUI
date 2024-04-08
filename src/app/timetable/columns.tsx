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
import {
  completeEdit,
  deleteRow,
  discardEdit,
  startEditRow,
} from "@/slices/timetable-slice";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Check, MoreHorizontal, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
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
import useTimetableSettings from "@/hooks/useTimetableSettings";

export type Timetable = {
  weekType: string;
  days: TimetableDay[];
};

export type TimetableDay = {
  dayName: string;
  classEntries: TimetableEntry[];
};

export type TimetableEntry = {
  className: string;
  startTime: string;
  endTime: string;
  classType: string;
  url: string;
};

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
  const { toast } = useToast();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const isEdit = useSelector<RootState, boolean>(
    (state) => state.timetable.editRowInfo.row === row.index
  );

  const [{ weeks: weeks, days }, _] = useTimetableSettings();

  const entryInfo = {
    week: weeks.indexOf(searchParams.get("week")!),
    day: days.indexOf(searchParams.get("day")!),
    row: row.index,
    index: 0,
  };

  if (isEdit) {
    return (
      <div className="flex flex-row">
        <Button variant="ghost" onClick={() => {
          dispatch(completeEdit());
          toast({
            title: "Timetable updated",
            description: `${row.getAllCells()[0].getValue<string>()} was updated`
          })
          }}>
          <Check className="stroke-green-500"></Check>
        </Button>
        <Button variant="ghost" onClick={() => dispatch(discardEdit())}>
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
        <DropdownMenuItem onClick={() => dispatch(startEditRow(entryInfo))}>
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
              dispatch(deleteRow(entryInfo));
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
