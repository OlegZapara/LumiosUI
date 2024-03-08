import React from 'react'
import { Textarea } from '../../components/ui/textarea'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '../../components/ui/button'


interface JsonEditorProps{
  data: string
}

export default function JsonEditor({data}: JsonEditorProps) {
  return (
    <Sheet>
      <SheetTrigger className='flex flex-row w-32 font-medium text-sm h-12 items-center justify-center rounded-md bg-muted px-6 py-1'>Edit JSON</SheetTrigger>
      <SheetContent className='w-[50vw] !max-w-[50vw] flex gap-4 flex-col'>
        <SheetHeader className='h-full'>
          <SheetTitle className='flex flex-row gap-4 items-center'>
            JSON Editor
            <div className='text-sm font-normal'>
              (Values updated automatically)
            </div>
          </SheetTitle>
          <Textarea className='h-full w-full' value={data}></Textarea>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
