import { TimetableEntry } from '@/app/timetable/columns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateEntry } from '@/slices/timetable-slice';
import { useDispatch } from 'react-redux';
import { Badge } from '../ui/badge';

interface TypeInputProps {
  isFocused: boolean,
  editingRow: any
  columnId: string
}

export default function TypeInput({ isFocused, editingRow, columnId }: TypeInputProps) {
  const dispatch = useDispatch();

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

  return (
    <Select
    onValueChange={(e) => {
      const updatedEntry = { ...editingRow, [columnId]: e };
      dispatch(updateEntry(updatedEntry as TimetableEntry));
    }}>
      <SelectTrigger autoFocus={isFocused} className='p-0 w-full flex justify-around'>
        <SelectValue placeholder={getBadge(editingRow[columnId])} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='LAB'>{getBadge("LAB")}</SelectItem>
        <SelectItem value='PRACTICE'>{getBadge("PRACTICE")}</SelectItem>
        <SelectItem value='LECTURE'>{getBadge("LECTURE")}</SelectItem>
        <SelectItem value='OTHER'>{getBadge("OTHER")}</SelectItem>
      </SelectContent>
    </Select>
  )
}
