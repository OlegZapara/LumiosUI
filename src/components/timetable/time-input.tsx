import { useTimetableStore } from "@/app/stores/timetable";
import { TimetableEntry } from "@/shared/types";
import { useMask } from "@react-input/mask";
import { Input } from "../ui/input";

interface TimeInputProps {
  isFocused: boolean;
  editingRow: any;
  columnId: string;
}

export default function TimeInput({
  isFocused,
  editingRow,
  columnId,
}: TimeInputProps) {
  const timetableStore = useTimetableStore();

  const inputRef = useMask({
    mask: "__:__:__",
    replacement: { _: /\d/ },
    showMask: true,
  });
  return (
    <Input
      ref={inputRef}
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
