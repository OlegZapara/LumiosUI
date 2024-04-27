import { useTimetableStore } from "@/app/stores/timetable";
import { TimetableEntry } from "@/shared/types";
import { Input } from "../ui/input";

interface TextInputProps {
  isFocused: boolean;
  editingRow: any;
  columnId: string;
}

export default function TextInput({
  isFocused,
  editingRow,
  columnId,
}: TextInputProps) {
  const timetableStore = useTimetableStore();

  return (
    <Input
      autoFocus={isFocused}
      className="px-2 w-full"
      value={editingRow[columnId]}
      size={1}
      onChange={(e) => {
        const updatedEntry = { ...editingRow, [columnId]: e.target.value };
        timetableStore.updateRow(updatedEntry as TimetableEntry);
      }}
    />
  );
}
