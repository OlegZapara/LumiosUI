import { useTimetableStore } from "@/app/stores/timetable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimetableEntry } from "@/shared/types";
import { cn } from "@/lib/utils";

interface TypeInputProps {
  isFocused: boolean;
  editingRow: any;
  columnId: string;
}

export default function TypeInput({
  isFocused,
  editingRow,
  columnId,
}: TypeInputProps) {
  const timetableStore = useTimetableStore();
  const notValid =
    "border-red-500 focus:ring-red-500 focus-visible:ring-red-500";

  const validateBlur = () => {
    timetableStore.setValid(columnId, editingRow[columnId] != "");
  };
  const validateValue = (value: string | undefined) => {
    timetableStore.setValid(columnId, value != "");
  };

  return (
    <Select
      onValueChange={(e) => {
        validateValue(e);
        const updatedEntry = { ...editingRow, [columnId]: e };
        timetableStore.updateRow(updatedEntry as TimetableEntry);
      }}
    >
      <SelectTrigger
        onBlur={validateBlur}
        autoFocus={isFocused}
        className={cn(
          "px-2 w-full",
          timetableStore.validEdit[columnId] ? "" : notValid,
        )}
      >
        <SelectValue placeholder={editingRow[columnId]} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="LAB">LAB</SelectItem>
        <SelectItem value="PRACTICE">PRACTICE</SelectItem>
        <SelectItem value="LECTURE">LECTURE</SelectItem>
        <SelectItem value="OTHER">OTHER</SelectItem>
      </SelectContent>
    </Select>
  );
}
