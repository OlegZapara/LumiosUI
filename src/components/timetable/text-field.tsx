import { CellContext } from "@tanstack/react-table";
import { TimetableEntry } from "@/shared/types";
import { useTimetableStore } from "@/app/stores/timetable";
import { TextInput } from "@/components/timetable/text-input";
import { useFormContext } from "react-hook-form";
import { FormType } from "@/app/timetable/data-table";
import { ColumnType } from "@/app/timetable/columns";
import Link from "next/link";

const MAX_LENGTH = 30;

interface TextFieldProps extends CellContext<TimetableEntry, unknown> {
  type: ColumnType;
}

export function TextField(props: TextFieldProps) {
  const timetableStore = useTimetableStore();
  const formContext = useFormContext<FormType>();
  const isEditing = timetableStore.editRowInfo.row === props.row.index;
  const isFocused =
    props.cell.column.getIndex() === timetableStore.editRowInfo.index;
  const errors =
    formContext.formState.errors[props.column.id as ColumnType] != undefined;

  const fieldValue: string = props.cell.getValue<string>();
  const content =
    fieldValue.slice(0, MAX_LENGTH) +
    (fieldValue.length > MAX_LENGTH ? "..." : "");

  if (!isEditing && props.type == "url") {
    return (
      <Link
        aria-label={`Link to ${fieldValue}`}
        className="px-2 underline text-blue-500"
        target="_blank"
        href={fieldValue}
      >
        {content}
      </Link>
    );
  }
  if (!isEditing) {
    return <div className="px-2">{content}</div>;
  }

  return (
    <TextInput
      {...formContext.register(props.type)}
      isFocused={isFocused}
      errors={errors}
    />
  );
}
