import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'


export default function SettingsSheet() {
  return (
    <Sheet>
      <SheetTrigger className='font-medium text-sm inline-flex h-12 items-center justify-center rounded-md bg-muted px-6 py-1'>Settings</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Timetable settings</SheetTitle>
          <SheetDescription>
            <div className="grid w-full max-w-sm items-center gap-2 m-3">
              <Label htmlFor="ChatID">Chat ID</Label>
              <Input type="text" id="ChatID" placeholder="Enter chat ID" />
            </div>
          </SheetDescription>
          <SheetTitle>Shortcut reference</SheetTitle>
          <SheetDescription>
            <div className="grid w-full max-w-sm items-center gap-2 m-3">
              <Label>Edit row: Double click</Label>
              <Label>Save row: Shift-Enter</Label>
              <Label>Move to next row: Tab</Label>
              <Label>Move to previous row: Shift-Tab</Label>
              <Label>Move to left cell: Left arrow</Label>
              <Label>Move to right cell: Right arrow</Label>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
