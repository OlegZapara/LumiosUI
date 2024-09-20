"use client";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
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
import { Row } from "@tanstack/react-table";
import { useFormContext } from "react-hook-form";
import { TimetableEntry } from "@/schemas/timetable-schema";
import { useTimetableSearchParams } from "@/hooks/timetable/useTimetableSearchParams";
import { useTimetableStore } from "@/state/timetable-state";

type BasicRowActionProps = {
  row: Row<TimetableEntry>;
};

export function BasicRowAction({ row }: BasicRowActionProps) {
  const { toast } = useToast();
  const formContext = useFormContext<TimetableEntry>();
  const { dayIndex, weekIndex } = useTimetableSearchParams();
  const timetableStore = useTimetableStore();

  const entryInfo = {
    week: weekIndex,
    day: dayIndex,
    row: row.index,
    index: 0,
  };

  function copyUrlToClipboard() {
    navigator.clipboard.writeText(row.original.url).then(() => {
      toast({
        title: "Link copied to clipboard",
        description: row.original.url,
        duration: 3000,
      });
    });
  }

  function startEdit() {
    timetableStore.startEdit(entryInfo);
    formContext.reset(
      timetableStore.timetable![weekIndex].days[dayIndex].classEntries[
        row.index
      ],
    );
  }

  async function deleteRow() {
    await timetableStore.removeRow(entryInfo);
    const rowName = row.getAllCells()[0].getValue<string>();
    toast({
      title: "Row deleted",
      description: `${rowName ? rowName : "Row"} was removed from timetable`,
    });
  }

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={copyUrlToClipboard}>
            Copy URL
          </DropdownMenuItem>
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem onClick={startEdit}>Edit row</DropdownMenuItem>
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
              This action cannot be undone. This will permanently remove
              timetable entry from database
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteRow}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </DropdownMenu>
    </AlertDialog>
  );
}
