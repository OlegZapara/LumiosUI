import { CellContext, ColumnDef } from "@tanstack/react-table";
import { TimetableEntry } from "@/shared/types";
import { useTimetableStore } from "../stores/timetable";
import { EditRowAction } from "@/components/timetable/edit-row-action";
import { BasicRowAction } from "@/components/timetable/basic-row-action";
import { TextField } from "@/components/timetable/text-field";
import { TypeField } from "@/components/timetable/type-field";

export type ColumnType =
  | "className"
  | "startTime"
  | "endTime"
  | "classType"
  | "url";

export const columns: ColumnDef<TimetableEntry>[] = [
  {
    accessorKey: "className",
    header: "Class Name",
    cell: (props) => <TextField {...props} type="className" />,
    maxSize: 200,
    minSize: 100,
  },
  {
    accessorKey: "startTime",
    header: "Start time",
    cell: (props) => <TextField {...props} type="startTime" />,

    maxSize: 200,
    minSize: 100,
  },
  {
    accessorKey: "endTime",
    header: "End time",
    cell: (props) => <TextField {...props} type="endTime" />,

    maxSize: 200,
    minSize: 100,
  },
  {
    accessorKey: "classType",
    header: "Class type",
    cell: (props) => <TypeField {...props} type="classType" />,

    maxSize: 200,
    minSize: 100,
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: (props) => <TextField {...props} type="url" />,
    maxSize: 400,
    minSize: 200,
  },
  {
    id: "actions",
    cell: (props) => <RowAction {...props}></RowAction>,
    size: 150,
  },
];

function RowAction(props: CellContext<TimetableEntry, unknown>) {
  const isEdit = useTimetableStore(
    (state) => state.editRowInfo.row === props.row.index,
  );
  return (
    <div className="flex justify-end">
      {isEdit ? <EditRowAction /> : <BasicRowAction row={props.row} />}
    </div>
  );
}
