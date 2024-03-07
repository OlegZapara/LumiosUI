"use client"
import { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 shadow-current shadow-sm rounded-full", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Project"
              href="/"
              src="/telegram.png"
              description="Why do you need this bot"
            />
            <ProductItem
              title="Authors"
              href="/authors"
              src="/Bogdan.jpg"
              description="Who made this"
            />
            <ProductItem
              title="Technologies"
              href="/technologies"
              src="/next.webp"
              description="How this project was made"
            />
            <ProductItem
              title="IP-32"
              href="/ip-32"
              src="/IP-32.jpg"
              description="Why this project was made"
            />
          </div>
        </MenuItem>
        <HoveredLink href="/timetable">Timetable</HoveredLink>
        <HoveredLink href="/rating">Rating</HoveredLink>
        <HoveredLink href="/tasks">Tasks</HoveredLink>
        <HoveredLink href="/queues">Queues</HoveredLink>
        <MenuItem setActive={setActive} active={active} item="Settings">
          <div className="flex flex-col space-y-4 text-sm">
            <ProductItem
              title="Appearance"
              href="/appearance-settings"
              src="/settings.jpeg"
              description="Setup website appearance"
            />
            <ProductItem
              title="Bot settings"
              href="/bot-settings"
              src="/bot.webp"
              description="Change bot behaviour"
            />
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}