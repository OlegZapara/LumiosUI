"use client";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { EMPTY_ENTRY, TimetableEntry } from "@/schemas/timetable-schema";

export function EditRowAction() {
  const formContext = useFormContext<TimetableEntry>();

  return (
    <div className="flex flex-row">
      <Button variant="ghost" type="submit">
        <Check className="stroke-green-500"></Check>
      </Button>
      <Button
        variant="ghost"
        onClick={() => formContext.reset({ ...EMPTY_ENTRY })}
      >
        <X className="stroke-red-500"></X>
      </Button>
    </div>
  );
}
