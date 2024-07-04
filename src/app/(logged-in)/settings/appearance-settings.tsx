"use client";

import { ThemeViewGroupItem } from "@/components/settings/theme-group-item";
import { RadioGroup } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AppearanceSettings() {
  const theme = useTheme();
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    if (theme.theme) setThemeLoaded(true);
  }, [theme.theme]);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="text-xl font-semibold leading-none tracking-tight">
        Appearance
      </div>
      <div className="text-sm text-muted-foreground">
        Customize the appearance of the app. Automatically switch between day
        and night themes.
      </div>
      <Separator className="my-2 w-full"></Separator>

      <section className="my-4 flex flex-col gap-4 rounded-md border border-input p-4">
        <div className="flex w-full flex-col gap-2 p-2 sm:p-4">
          <div className="leading-none tracking-tight">Theme</div>
          <div className="text-sm text-muted-foreground">
            Select the theme for the website.
          </div>
          {themeLoaded && (
            <RadioGroup
              value={theme.theme || "system"}
              onValueChange={(e) => theme.setTheme(e)}
              className="flex flex-col flex-wrap gap-4 md:flex-row"
            >
              <ThemeViewGroupItem type="light" />
              <ThemeViewGroupItem type="dark" />
              <ThemeViewGroupItem type="system" />
            </RadioGroup>
          )}
        </div>
      </section>
    </div>
  );
}
