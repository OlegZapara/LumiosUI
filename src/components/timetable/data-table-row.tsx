import { TableCell, TableRow } from "@/components/ui/table";
import { TimetableEntry } from "@/schemas/timetable-schema";
import { flexRender, Row } from "@tanstack/react-table";
import { useFormContext } from "react-hook-form";

interface DataTableRowProps {
  row: Row<TimetableEntry>;
}

export function DataTableRow({ row }: DataTableRowProps) {
  const formContext = useFormContext<TimetableEntry>();

  function startEdit() {
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
          onDoubleClick={startEdit}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}
