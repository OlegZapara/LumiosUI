"use client";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { EMPTY_ENTRY, TimetableEntry } from "@/schemas/timetable-schema";
import { useTimetableStore } from "@/state/timetable-state";

export function EditRowAction() {
  const formContext = useFormContext<TimetableEntry>();
  const timetableStore = useTimetableStore();

  function discardEdit() {
    timetableStore.discardEdit();
    formContext.reset({ ...EMPTY_ENTRY });
  }

  return (
    <div className="flex flex-row">
      <Button variant="ghost" type="submit">
        <Check className="stroke-green-500" type="submit"></Check>
      </Button>
      <Button variant="ghost" onClick={discardEdit}>
        <X className="stroke-red-500"></X>
      </Button>
    </div>
  );
}
