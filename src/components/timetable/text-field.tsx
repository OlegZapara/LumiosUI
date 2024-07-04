import { CellContext } from "@tanstack/react-table";
import { TextInput } from "@/components/timetable/text-input";
import { useFormContext } from "react-hook-form";
import { ColumnType } from "@/components/timetable/columns";
import Link from "next/link";
import { TimetableEntry } from "@/schemas/timetable-schema";

const MAX_LENGTH = 30;

interface TextFieldProps extends CellContext<TimetableEntry, unknown> {
  type: ColumnType;
  placeholder: string;
}

export function TextField(props: TextFieldProps) {
  const formContext = useFormContext<TimetableEntry>();
  // const isEditing = timetableStore.editRowInfo.row === props.row.index;
  // const isFocused =
  //   props.cell.column.getIndex() === timetableStore.editRowInfo.index;
  // TODO: Fix this
  const isEditing = false;
  const isFocused = false;
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
        className="px-2 text-blue-500 underline"
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
      placeholder={props.placeholder}
    />
  );
}
