import { useTimetableStore } from "@/app/stores/timetable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimetableEntry } from "@/shared/types";

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

  return (
    <Select
      onValueChange={(e) => {
        const updatedEntry = { ...editingRow, [columnId]: e };
        timetableStore.updateRow(updatedEntry as TimetableEntry);
      }}
    >
      <SelectTrigger autoFocus={isFocused} className="px-2 w-full">
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
