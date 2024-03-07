import { TimetableEntry } from '@/app/timetable/columns';
import { updateEntry } from '@/slices/timetable-slice';
import InputMask from 'react-input-mask';
import { useDispatch } from 'react-redux';
import { Input } from '../ui/input';


interface TimeInputProps{
  isFocused: boolean,
  editingRow: any
  columnId: string
}

export default function TimeInput({isFocused, editingRow, columnId} : TimeInputProps) {
  const dispatch = useDispatch();
  return (
    <InputMask 
    mask={"99:99:99"} 
    value={editingRow[columnId]} 
    // autoFocus={isFocused} // fix this somehow
    className='p-0 w-full flex h-10 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' 
    size={1}
    onChange={(e) => {
      const updatedEntry = { ...editingRow, [columnId]: e.target.value };
      dispatch(updateEntry(updatedEntry as TimetableEntry));
    }} />
  )
}
