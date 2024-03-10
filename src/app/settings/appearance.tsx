"use client";

import { CardDescription, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import React from "react";

export default function Appearance() {
  const theme = useTheme();

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="text-xl font-semibold leading-none tracking-tight">Appearance</div>
      <div className="text-sm text-muted-foreground">Customize the appearance of the app. Automatically switch between day and night themes.</div>
      <Separator className="w-full my-2"></Separator>

      <section className="flex flex-col gap-2 my-4">
        <div className="leading-none tracking-tight">Font</div>
        <div className="text-sm text-muted-foreground">Set the font you want to use.</div>
        <Select defaultValue="inter">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Font"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inter">Inter</SelectItem>
            <SelectItem value="manrope">Manrope</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </section>

      <section className="flex flex-col gap-2 my-4">
        <div className="leading-none tracking-tight">Theme</div>
        <div className="text-sm text-muted-foreground">Select the theme for the website.</div>
        <RadioGroup
          defaultValue="light-theme-option"
          onValueChange={(e) => theme.setTheme(e)}
          className="flex flex-row gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="white" id="light-theme-option" hidden />
            <Label
              htmlFor="light-theme-option"
              className="flex flex-col justify-center items-center"
            >
              <div className="w-56 h-40">
                <LightThemeExample></LightThemeExample>
              </div>
              <div>Light theme</div>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dark" id="dark-theme-option" hidden />
            <Label
              htmlFor="dark-theme-option"
              className="flex flex-col justify-center items-center"
            >
              <div className="w-56 h-40">
                <DarkThemeExample></DarkThemeExample>
              </div>
              <div>Dark theme</div>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="system" id="system-theme-option" hidden />
            <Label
              htmlFor="system-theme-option"
              className="flex flex-col justify-center items-center"
            >
              <div className="w-56 h-40">
                <MixedThemeExample></MixedThemeExample>
              </div>
              <div>System theme</div>
            </Label>
          </div>
        </RadioGroup>
      </section>
    </div>
  );
}

function MixedThemeExample() {
  return (
    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
      <div className="space-y-2 rounded-sm bg-slate-500 p-2">
        <div className="space-y-2 rounded-md bg-slate-400 p-2 shadow-sm">
          <div className="h-2 w-[80px] rounded-lg bg-slate-200"></div>
          <div className="h-2 w-[100px] rounded-lg bg-slate-200"></div>
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-slate-400 p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-slate-200"></div>
          <div className="h-2 w-[100px] rounded-lg bg-slate-200"></div>
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-slate-400 p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-slate-200"></div>
          <div className="h-2 w-[100px] rounded-lg bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
}

function DarkThemeExample() {
  return (
    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
      <div className="space-y-2 rounded-sm bg-slate-950 p-2">
        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
          <div className="h-2 w-[80px] rounded-lg bg-slate-400"></div>
          <div className="h-2 w-[100px] rounded-lg bg-slate-400"></div>
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-slate-400"></div>
          <div className="h-2 w-[100px] rounded-lg bg-slate-400"></div>
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-slate-400"></div>
          <div className="h-2 w-[100px] rounded-lg bg-slate-400"></div>
        </div>
      </div>
    </div>
  );
}

function LightThemeExample() {
  return (
    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]"></div>
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-[#ecedef]"></div>
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
        </div>
        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
          <div className="h-4 w-4 rounded-full bg-[#ecedef]"></div>
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]"></div>
        </div>
      </div>
    </div>
  );
}
