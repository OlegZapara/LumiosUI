import { useTimetableStore } from "@/app/stores/timetable";
import { TimetableEntry } from "@/shared/types";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface TextInputProps {
  isFocused: boolean;
  editingRow: any;
  columnId: string;
  canBeEmpty?: boolean;
}

export default function TextInput({
  isFocused,
  editingRow,
  columnId,
  canBeEmpty,
}: TextInputProps) {
  const timetableStore = useTimetableStore();
  const notValid = "border-red-500 focus-visible:ring-red-500";
  const validateBlur = () => {
    const valid = !(!canBeEmpty && !editingRow[columnId]);
    timetableStore.setValid(columnId, valid);
  };
  const validateValue = (value: string | undefined) => {
    timetableStore.setValid(columnId, !(!canBeEmpty && !value));
  };

  return (
    <Input
      autoFocus={isFocused}
      onBlur={validateBlur}
      className={cn(
        "px-2 w-full",
        timetableStore.validEdit[columnId] ? "" : notValid,
      )}
      value={editingRow[columnId]}
      size={1}
      onChange={(e) => {
        validateValue(e.target.value);
        const updatedEntry = { ...editingRow, [columnId]: e.target.value };
        timetableStore.updateRow(updatedEntry as TimetableEntry);
      }}
    />
  );
}
