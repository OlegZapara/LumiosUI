import { flexRender, Row } from "@tanstack/react-table";
import { TableCell, TableRow } from "@/components/ui/table";
import { useTimetableStore } from "@/app/stores/timetable";
import useTimetableSearchParams from "@/hooks/useTimetableQueryParams";
import { useFormContext } from "react-hook-form";
import { FormType } from "@/app/timetable/data-table";

interface DataTableRowProps<TData> {
  row: Row<TData>;
}

export function DataTableRow<TData>({ row }: DataTableRowProps<TData>) {
  const timetableStore = useTimetableStore();
  const { searchParams } = useTimetableSearchParams();
  const formContext = useFormContext<FormType>();

  const week = timetableStore.weeks.indexOf(searchParams.get("week")!);
  const day = timetableStore.days.indexOf(searchParams.get("day")!);

  function startEdit(index: number) {
    timetableStore.startEdit({ week, day, row: row.index, index });
    formContext.reset(
      timetableStore.timetable![week].days[day].classEntries[row.index],
    );
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
