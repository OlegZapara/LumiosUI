"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import SettingsField from "./settings-field";
import { Button } from "@/components/ui/button";

export default function Appearance() {
  const theme = useTheme();

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="text-xl font-semibold leading-none tracking-tight">
        Appearance
      </div>
      <div className="text-sm text-muted-foreground">
        Customize the appearance of the app. Automatically switch between day
        and night themes.
      </div>
      <Separator className="w-full my-2"></Separator>

      <section className="flex flex-col gap-4 my-4 border border-input rounded-md p-4">
        <div className="text-xl">Font & Theme</div>
        <Separator></Separator>
        <SettingsField
          name="Font"
          description="Preffered font that will be used accross application"
        >
          <Select defaultValue="inter">
            <SelectTrigger className="w-[180px]" disabled>
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inter">Inter</SelectItem>
              <SelectItem value="manrope">Manrope</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </SettingsField>
        <div className="w-full flex flex-col gap-2 p-2 sm:p-4">
          <div className="leading-none tracking-tight">Theme</div>
          <div className="text-sm text-muted-foreground">
            Select the theme for the website.
          </div>
          <RadioGroup
            value={theme.theme}
            onValueChange={(e) => theme.setTheme(e)}
            className="flex flex-col md:flex-row flex-wrap gap-4"
          >
            <ThemeViewGroupItem type="light" />
            <ThemeViewGroupItem type="dark" />
            <ThemeViewGroupItem type="system" />
          </RadioGroup>
        </div>
      </section>

      <section className="flex flex-col gap-4 my-4 border border-input rounded-md p-4">
        <div className="text-xl">Timetable</div>
        <Separator></Separator>
        <SettingsField
          name="Timetable header"
          description="Enable timetable header for timetable page"
        >
          <Select defaultValue="Enabled">
            <SelectTrigger>
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <Button variant="outline" className="w-full sm:w-32">
              Save
            </Button>
            <SelectContent>
              <SelectItem value="Enabled">Enabled</SelectItem>
              <SelectItem value="Disabled">Disabled</SelectItem>
            </SelectContent>
          </Select>
        </SettingsField>
        <SettingsField
          name="JSON editor"
          description="Enable timetable JSON editing"
          developer
        >
          <Select defaultValue="Enabled">
            <SelectTrigger>
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <Button variant="outline" className="w-full sm:w-32">
              Save
            </Button>
            <SelectContent>
              <SelectItem value="Enabled">Enabled</SelectItem>
              <SelectItem value="Disabled">Disabled</SelectItem>
            </SelectContent>
          </Select>
        </SettingsField>
      </section>
    </div>
  );
}

function ThemeViewGroupItem({ type }: { type: "light" | "dark" | "system" }) {
  const getThemedView = () => {
    if (type == "light") return <LightThemeExample />;
    if (type == "dark") return <DarkThemeExample />;
    if (type == "system") return <MixedThemeExample />;
  };
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={type} id={type} hidden />
      <Label
        htmlFor={type}
        className="flex flex-col justify-center items-center w-full sm:w-56 mx-10 sm:mx-0"
      >
        <div className="w-full h-40">{getThemedView()}</div>
        <div className="capitalize">{type} theme</div>
      </Label>
    </div>
  );
}

function MixedThemeExample() {
  const theme = useTheme();
  return (
    <div
      className={`items-center rounded-md border-2 ${
        theme.theme == "system" ? "border-blue-500" : "border-muted"
      } bg-popover p-1 hover:bg-accent hover:text-accent-foreground`}
    >
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
  const theme = useTheme();
  return (
    <div
      className={`items-center rounded-md border-2 ${
        theme.theme == "dark" ? "border-blue-500" : "border-muted"
      } bg-popover p-1 hover:bg-accent hover:text-accent-foreground`}
    >
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
  const theme = useTheme();
  return (
    <div
      className={`items-center rounded-md border-2 ${
        theme.theme == "light" ? "border-blue-500" : "border-muted"
      } bg-popover p-1 hover:bg-accent hover:text-accent-foreground`}
    >
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
