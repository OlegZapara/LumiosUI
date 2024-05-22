import { EMPTY_ENTRY, useTimetableStore } from "@/app/stores/timetable";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FormType } from "@/app/timetable/data-table";

export function EditRowAction() {
  const { discardEdit } = useTimetableStore();
  const formContext = useFormContext<FormType>();

  function discard() {
    formContext.reset({ ...EMPTY_ENTRY });
    discardEdit();
  }

  return (
    <div className="flex flex-row">
      <Button variant="ghost" type="submit">
        <Check className="stroke-green-500"></Check>
      </Button>
      <Button variant="ghost" onClick={discard}>
        <X className="stroke-red-500"></X>
      </Button>
    </div>
  );
}
