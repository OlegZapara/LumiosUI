"use client"
import React, { useState } from 'react'

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import { data } from './data'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Skeleton } from '@/components/ui/skeleton'

export default function Rating() {
  const [activeLabel, setActiveLabel] = useState<string>("")

  function handleClick(data: any, index: number){
    setActiveLabel(data.activeLabel)
  }

  return (
    <div className='w-full h-[75vh]'>
      <div className='text-6xl font-bold text w-full text-center'>Rating for IP-32</div>
      <Sheet>
      <SheetTrigger className='w-full h-full'>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data.filter(x => x.rating > 60)} onClick={handleClick}>
          <Tooltip wrapperClassName='rounded-xl ring-2 ring-black font-semibold'></Tooltip>
          <XAxis dataKey="name" hide={true}></XAxis>
          <Bar dataKey="rating" 
          style={
            {
              fill: "hsl(var(--foreground))",
              opacity: 0.9,
            } as React.CSSProperties
          }>
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{activeLabel}</SheetTitle>
          <SheetDescription className='w-full flex justify-center'>
            <Skeleton className='aspect-square w-4/5 rounded-full'></Skeleton>
          </SheetDescription>
          <SheetDescription>
            Detailed information about {activeLabel}
          </SheetDescription>
          <SheetTitle className='flex flex-row items-center w-full justify-between'>First name: <Skeleton className='h-10 w-52'></Skeleton></SheetTitle>
          <SheetTitle className='flex flex-row items-center w-full justify-between'>Last name: <Skeleton className='h-10 w-52'></Skeleton></SheetTitle>
          <SheetTitle className='flex flex-row items-center w-full justify-between'>Rating: <Skeleton className='h-10 w-52'></Skeleton></SheetTitle>
          <SheetTitle className='flex flex-row items-center w-full justify-between'>Description: <Skeleton className='h-10 w-52'></Skeleton></SheetTitle>

        </SheetHeader>
      </SheetContent>
      </Sheet>
    </div>
  )
}

const CustomTooltip = ({ label = '' } : {label:string}) => {
  return (
    <div className="custom-tooltip">
      <p className="label">{`${label}`}</p>
    </div>
  );
};