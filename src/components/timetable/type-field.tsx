import { CellContext } from "@tanstack/react-table";
import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColumnType } from "@/components/timetable/columns";
import { TimetableEntry } from "@/schemas/timetable-schema";
import { useTimetableStore } from "@/state/timetable-state";

interface TypeFieldProps extends CellContext<TimetableEntry, unknown> {
  type: ColumnType;
}

export function TypeField(props: TypeFieldProps) {
  const formContext = useFormContext<TimetableEntry>();
  const timetableStore = useTimetableStore();
  const isEditing = timetableStore.editRowInfo.row === props.row.index;
  const isFocused =
    props.cell.column.getIndex() === timetableStore.editRowInfo.index;

  if (!isEditing) {
    return <div className="px-2">{props.cell.getValue<string>()}</div>;
  }
  const invalidClassName = "border-red-500 focus-visible:ring-red-500";

  const errors = formContext.formState.errors.classType;

  return (
    <Controller
      name={props.type}
      control={formContext.control}
      render={({ field }) => {
        return (
          <Select onValueChange={field.onChange}>
            <SelectTrigger
              autoFocus={isFocused}
              className={`w-full px-2 ${errors && invalidClassName}`}
            >
              <SelectValue placeholder={field.value ? field.value : "Type"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LAB">LAB</SelectItem>
              <SelectItem value="PRACTICE">PRACTICE</SelectItem>
              <SelectItem value="LECTURE">LECTURE</SelectItem>
            </SelectContent>
          </Select>
        );
      }}
    ></Controller>
  );
}
