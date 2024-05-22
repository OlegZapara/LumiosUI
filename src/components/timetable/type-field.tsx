import { CellContext } from "@tanstack/react-table";
import { TimetableEntry } from "@/shared/types";
import { useTimetableStore } from "@/app/stores/timetable";
import { Controller, useFormContext } from "react-hook-form";
import { FormType } from "@/app/timetable/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColumnType } from "@/app/timetable/columns";

interface TypeFieldProps extends CellContext<TimetableEntry, unknown> {
  type: ColumnType;
}

export function TypeField(props: TypeFieldProps) {
  const timetableStore = useTimetableStore();
  const formContext = useFormContext<FormType>();
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
              className={`px-2 w-full ${errors && invalidClassName}`}
            >
              <SelectValue placeholder={field.value} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LAB">LAB</SelectItem>
              <SelectItem value="PRACTICE">PRACTICE</SelectItem>
              <SelectItem value="LECTURE">LECTURE</SelectItem>
              <SelectItem value="OTHER">OTHER</SelectItem>
            </SelectContent>
          </Select>
        );
      }}
    ></Controller>
  );
}
