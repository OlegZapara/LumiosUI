import { ColumnDef, Row } from "@tanstack/react-table"
import { Check, MoreHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { completeEdit, discardEdit } from "@/slices/timetable-slice"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { Badge } from "@/components/ui/badge"

export type Timetable = {
  weekType: string;
  days: TimetableDay[]
}

export type TimetableDay = {
  dayName: string;
  classEntries: TimetableEntry[]
}

export type TimetableEntry = {
  className: string;
  startTime: string;
  endTime: string;
  classType: string;
  url: string;
}

export enum Column{
  ClassName = "className",
  StartTime = "startTime",
  EndTime = "endTime",
  ClassType = "classType",
  URL = "url",
}

function getBadge(classType: string){
  switch (classType){
    case "LAB":
      return <Badge className='bg-green-500 hover:bg-green-400'>{classType}</Badge>
    case "PRACTICE":
      return <Badge className='bg-orange-400 hover:bg-orange-300'>{classType}</Badge>
    case "LECTURE":
      return <Badge className='bg-blue-500 hover:bg-blue-400'>{classType}</Badge>
    case "OTHER":
      return <Badge className='bg-violet-500 hover:bg-violet-400'>{classType}</Badge>
    default:
      return <Badge>{classType}</Badge>
  }
}
export const columns: ColumnDef<TimetableEntry>[] = [
  {
    accessorKey: Column.ClassName,
    header: "Class Name",
    maxSize: 200,
    minSize: 100
  },
  {
    accessorKey: Column.StartTime,
    header: "Start time",
    maxSize: 200,
    minSize: 100
  },
  {
    accessorKey: Column.EndTime,
    header: "End time",
    maxSize: 200,
    minSize: 100
  },
  {
    accessorKey: Column.ClassType,
    header: "Class type",
    cell: c => getBadge(c.getValue<string>()),
    maxSize: 200,
    minSize: 100
  },
  {
    accessorKey: Column.URL,
    header: "URL",
    maxSize: 700,
    minSize: 400
  },
  {
    id: "actions",
    cell: ({ row }) => <div className="flex justify-end"><Dropdown row={row}></Dropdown></div>,
    size: 150
  },
]

interface CellProps {
  row: Row<TimetableEntry>
}

function Dropdown({ row }: CellProps) {
  const entry = row.original
  const editingRowIndex = useSelector<RootState>((state) => state.timetable.editingRowIndex)
  const dispatch = useDispatch()
  if(row.index == editingRowIndex){
    return <OnEditButtons row={row}></OnEditButtons>
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(entry.url)}
        >
          Copy URL
        </DropdownMenuItem>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuItem>Edit row</DropdownMenuItem>
        <DropdownMenuItem>Delete row</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function OnEditButtons({ row }: CellProps){
  const editingRowIndex = useSelector<RootState>((state) => state.timetable.editingRowIndex)
  const dispatch = useDispatch()
  if(editingRowIndex !== row.index){
    return (
    <></>
    )
  }
  return (
    <div className="flex flex-row">
      <Button variant="ghost" onClick={() => dispatch(completeEdit())}><Check className="stroke-green-500"></Check></Button>
      <Button variant="ghost" onClick={() => dispatch(discardEdit())}><X className="stroke-red-500"></X></Button>
    </div>
  )
}