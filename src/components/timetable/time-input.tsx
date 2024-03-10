import { TimetableEntry } from "@/app/timetable/columns";
import { updateEntry } from "@/slices/timetable-slice";
import { useMask } from "@react-input/mask";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
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
        dispatch(updateEntry(updatedEntry as TimetableEntry));
      }}
    />
  );
}
