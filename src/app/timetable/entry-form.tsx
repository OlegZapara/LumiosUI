import TextInput from "@/components/timetable/text-input";
import TimeInput from "@/components/timetable/time-input";
import TypeInput from "@/components/timetable/type-input";
import { TableCell, TableRow } from "@/components/ui/table";
import { startEditRow } from "@/slices/timetable-slice";
import { Cell, Row, flexRender } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Column, TimetableEntry } from "./columns";

interface EntryFormProps<TData> {
  week: number;
  day: number;
  row: Row<TData>;
}

export default function EntryForm<TData>(props: EntryFormProps<TData>) {
  const dispatch = useDispatch();
  const focusedCellIndex = useSelector<RootState, number>(
    (state) => state.timetable.editRowInfo.index
  );

  const startEdit = (i: number) => {
    dispatch(startEditRow({ ...props, row: props.row.index, index: i }));
  };

  const editingRow = useSelector<RootState, TimetableEntry | null>(
    (state) => state.timetable.editingRow
  );
  const renderCell = (cell: Cell<TData, unknown>, i: number) => {
    const inputProps = {
      isFocused: i == focusedCellIndex,
      editingRow: editingRow,
      columnId: cell.column.id,
    };
    switch (cell.column.id) {
      case Column.ClassName:
      case Column.URL:
        return <TextInput {...inputProps} />;
      case Column.StartTime:
      case Column.EndTime:
        return <TimeInput {...inputProps} />;
      case Column.ClassType:
        return <TypeInput {...inputProps} />;
      default:
        return flexRender(cell.column.columnDef.cell, cell.getContext());
    }
  };

  return (
    <TableRow
      key={props.row.id}
      data-state={props.row.getIsSelected() && "selected"}
      tabIndex={props.row.index + 1}
    >
      {props.row.getVisibleCells().map((cell, i) => (
        <TableCell
          key={cell.id}
          style={{ width: cell.column.getSize() }}
          className="cursor-default"
          onDoubleClick={() => startEdit(i)}
        >
          {renderCell(cell, i)}
        </TableCell>
      ))}
    </TableRow>
  );
}