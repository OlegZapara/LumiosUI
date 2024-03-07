import { TimetableEntry } from '@/app/timetable/columns';
import { updateEntry } from '@/slices/timetable-slice';
import React from 'react'
import { useDispatch } from 'react-redux';
import { Input } from '../ui/input';

interface TextInputProps{
  isFocused: boolean,
  editingRow: any
  columnId: string
}

export default function TextInput({isFocused, editingRow, columnId} : TextInputProps) {
  const dispatch = useDispatch();
  return <Input
    autoFocus={isFocused}
    className='p-0 w-full'
    value={editingRow[columnId]}
    size={1}
    onChange={(e) => {
      const updatedEntry = { ...editingRow, [columnId]: e.target.value };
      dispatch(updateEntry(updatedEntry as TimetableEntry));
    }}
  />
}
