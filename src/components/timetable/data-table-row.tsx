import { TableCell, TableRow } from "@/components/ui/table";
import { useTimetableSearchParams } from "@/hooks/timetable/useTimetableSearchParams";
import { TimetableEntry } from "@/schemas/timetable-schema";
import { useTimetableStore } from "@/state/timetable-state";
import { flexRender, Row } from "@tanstack/react-table";
import { useFormContext } from "react-hook-form";

interface DataTableRowProps {
  row: Row<TimetableEntry>;
}

export function DataTableRow({ row }: DataTableRowProps) {
  const formContext = useFormContext<TimetableEntry>();
  const { dayIndex, weekIndex } = useTimetableSearchParams();
  const timetableStore = useTimetableStore();

  function startEdit(index: number) {
    timetableStore.startEdit({
      week: weekIndex,
      day: dayIndex,
      row: row.index,
      index,
    });
    formContext.reset(row.original);
  }

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      tabIndex={row.index + 1}
    >
      {row.getVisibleCells().map((cell, i) => (
        <TableCell
          key={cell.id}
          style={{ width: cell.column.getSize() }}
          onDoubleClick={() => startEdit(i)}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}
