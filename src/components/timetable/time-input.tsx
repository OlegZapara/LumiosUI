import { useTimetableStore } from "@/app/stores/timetable";
import { TimetableEntry } from "@/shared/types";
import { useMask } from "@react-input/mask";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

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

  const notValid = "border-red-500 focus-visible:ring-red-500";
  const validateBlur = () => {
    const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
    const isValidTime = timeRegex.test(editingRow[columnId]);
    const lastChar = editingRow[columnId][editingRow[columnId].length - 1];
    timetableStore.setValid(
      columnId,
      editingRow[columnId] != "" && (lastChar == "_" || isValidTime),
    );
  };
  const validateValue = (value: string | undefined) => {
    const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
    const isValidTime = timeRegex.test(value!);
    const lastChar = value![value!.length - 1];
    timetableStore.setValid(
      columnId,
      value != "" && (lastChar == "_" || isValidTime),
    );
  };

  return (
    <Input
      ref={inputRef}
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
