import React from 'react'
import { Textarea } from '../ui/textarea'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '../ui/button'


interface JsonEditorProps{
  data: string
}

export default function JsonEditor({data}: JsonEditorProps) {
  return (
    <Sheet>
      <SheetTrigger className='flex flex-row w-32 font-medium text-sm h-12 items-center justify-center rounded-md bg-muted px-6 py-1'>Edit JSON</SheetTrigger>
      <SheetContent className='w-[50vw] !max-w-[50vw] flex gap-4 flex-col'>
        <SheetHeader className='h-full'>
          <SheetTitle>JSON Editor</SheetTitle>
          <Textarea className='h-full w-full' value={data}></Textarea>
        </SheetHeader>
        <SheetHeader className='flex flex-row gap-4'>
          <Button className='h-full w-32 m-0'>Save</Button>
          <Button className='h-full w-32 m-0'>Discard</Button>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
