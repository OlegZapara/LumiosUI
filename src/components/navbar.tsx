"use client";
import { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 shadow-current shadow-sm rounded-full",
        className
      )}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/">Project</HoveredLink>
            <HoveredLink href="/authors">Authors</HoveredLink>
            <HoveredLink href="/technologies">Technologies</HoveredLink>
            <HoveredLink href="/ip-32">IP-32</HoveredLink>
          </div>
        </MenuItem>
        <HoveredLink href="/timetable">Timetable</HoveredLink>
        <HoveredLink href="/statistics">Statistics</HoveredLink>
        <HoveredLink href="/tasks">Tasks</HoveredLink>
        <HoveredLink href="/queues">Queues</HoveredLink>
        <HoveredLink href="/settings">Settings</HoveredLink>
      </Menu>
    </div>
  );
}
