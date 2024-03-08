"use client"

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useTheme } from 'next-themes'
import React from 'react'

export default function Settings() {
  const theme = useTheme()
  return (
    <div>
      <div>Themes</div>
      <RadioGroup defaultValue="light-theme-option" onValueChange={e => theme.setTheme(e)}
        className='flex flex-row gap-4'>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="white" id="light-theme-option" hidden/>
          <Label htmlFor="light-theme-option" className='flex flex-col justify-center items-center'>
            <div className='w-56 h-40'>
              <LightThemeExample></LightThemeExample>
            </div>
            <div>Light theme</div>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="dark" id="dark-theme-option" hidden/>
          <Label htmlFor="dark-theme-option" className='flex flex-col justify-center items-center'>
            <div className='w-56 h-40'>
              <DarkThemeExample></DarkThemeExample>
            </div>
            <div>Dark theme</div>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="system" id="system-theme-option" hidden/>
          <Label htmlFor="system-theme-option" className='flex flex-col justify-center items-center'>
            <div className='w-56 h-40'>
              <MixedThemeExample></MixedThemeExample>
            </div>
            <div>System theme</div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}

function MixedThemeExample(){
  return (
    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
      <div className="space-y-2 rounded-sm bg-slate-500 p-2">
        <div className="space-y-2 rounded-md bg-slate-400 p-2 shadow-sm">
          <div className="h-2 w-[80px] rounded-lg bg-slate-200"></div>
          <div className="h-2 w-[100px] rounded-lg bg-slate-200">
          </div>
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-slate-400 p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-slate-200"></div>
          <div className="h-2 w-[100px] rounded-lg bg-slate-200"></div>
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-slate-400 p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-slate-200"></div>
          <div className="h-2 w-[100px] rounded-lg bg-slate-200">
          </div>
        </div>
      </div>
    </div>
  )
}

function DarkThemeExample() {
  return (
    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
          <div className="h-2 w-[80px] rounded-lg bg-slate-400"></div>
          <div className="h-2 w-[100px] rounded-lg bg-slate-400">
          </div>
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-slate-400"></div>
          <div className="h-2 w-[100px] rounded-lg bg-slate-400"></div>
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-slate-400"></div>
          <div className="h-2 w-[100px] rounded-lg bg-slate-400">
          </div>
        </div>
      </div>
    </div>
  )
}

function LightThemeExample(){
  return <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent"><div className="space-y-2 rounded-sm bg-[#ecedef] p-2"><div className="space-y-2 rounded-md bg-white p-2 shadow-sm"><div className="h-2 w-[80px] rounded-lg bg-[#ecedef]"></div><div className="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div></div><div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm"><div className="h-4 w-4 rounded-full bg-[#ecedef]"></div><div className="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div></div><div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm"><div className="h-4 w-4 rounded-full bg-[#ecedef]"></div><div className="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div></div></div></div>
}