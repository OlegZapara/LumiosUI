"use client";
import { cn } from "@/lib/utils";
import { IconBrandGithub } from "@tabler/icons-react";
import { HelpCircle, Menu, Settings, SunMoon, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

const links = [
  {
    href: "/",
    title: "About",
  },
  {
    href: "/authors",
    title: "Authors",
  },
  {
    href: "/timetable",
    title: "Timetable",
  },
  {
    href: "/statistics",
    title: "Statistics",
  },
  {
    href: "/tasks",
    title: "Tasks",
  },
  {
    href: "/queues",
    title: "Queues",
  },
];

export default function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm dark:shadow-muted">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-center sm:justify-between relative">
        <div className="flex flex-row justify-center items-center gap-1 sm:gap-2 md:gap-4">
          <NavbarMenu></NavbarMenu>
          <Link title="Main page" aria-label="Main page" href="/">
            <div className="transition-colors flex flex-row items-center justify-center gap-2 px-2 sm:px-4 py-2 rounded-lg title ml-10 md:ml-0">
              <Image
                src="/lumios.png"
                width="30"
                height="30"
                alt="Lumios logo"
              ></Image>
              <p className="font-bold text-xl sm:text-2xl relative w-max">
                <span>Lumios Bot</span>
                <span className="absolute -bottom-1 left-0 w-0 transition-all h-1 bg-blue-500"></span>
              </p>
            </div>
          </Link>
          {links.map((link) => (
            <Link
              className={cn(
                "hover:text-foreground/80 hidden md:flex",
                link.href == pathname
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
              title={link.title + " page"}
              aria-label={link.title + " page"}
              key={link.title}
              href={link.href}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div className="flex-row items-center justify-center hidden sm:flex">
          <Link
            href="/tutorial"
            title="Turorial page"
            aria-label="Turorial page"
            className="aspect-square rounded-md hover:bg-muted p-2"
          >
            <HelpCircle className="p-[2px]"></HelpCircle>
          </Link>
          <Link
            href="https://github.com/OlegZapara/LumiosUI"
            title="LumiosUI Github page"
            aria-label="LumiosUI Github page"
            className="aspect-square rounded-md hover:bg-muted p-2"
          >
            <IconBrandGithub className="p-[2px]"></IconBrandGithub>
          </Link>
          <Button
            aria-label="Toggle theme"
            variant="ghost"
            title="Toggle theme"
            className="aspect-square rounded-md hover:bg-muted p-2"
            onClick={() => {
              theme.setTheme(theme.theme == "dark" ? "white" : "dark");
            }}
          >
            <SunMoon className="p-[2px]"></SunMoon>
          </Button>
          <Link
            href="/settings"
            title="Settings page"
            aria-label="Settings page"
            className="aspect-square rounded-md hover:bg-muted p-2"
          >
            <Settings className="p-[2px]"></Settings>
          </Link>
        </div>
      </div>
    </header>
  );
}

function NavbarMenu() {
  const pathname = usePathname();
  const [toggled, setToggled] = useState(false);
  const theme = useTheme();

  function getTheme() {
    if (theme.theme == "system") return theme.systemTheme;
    return theme.theme;
  }

  return (
    <div className="md:hidden absolute left-4">
      <Button
        variant="ghost"
        className="aspect-square p-0"
        onClick={() => setToggled((value) => !value)}
      >
        {toggled ? <X></X> : <Menu></Menu>}
      </Button>
      {toggled && (
        <div className="fixed h-screen w-full max-w-96 left-0 top-14 shadow-lg flex flex-col bg-background">
          {links.map((link) => (
            <Link
              className={cn(
                "h-12 w-full hover:text-foreground/80 text-lg px-4 hover:bg-muted flex items-center",
                link.href == pathname
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
              onClick={() => setToggled(false)}
              title={link.title + " page"}
              aria-label={link.title + " page"}
              key={link.title}
              href={link.href}
            >
              {link.title}
            </Link>
          ))}
          <Link
            href="/tutorial"
            title="Turorial page"
            aria-label="Turorial page"
            onClick={() => setToggled(false)}
            className="rounded-md hover:bg-muted p-2 px-4 flex flex-row gap-2"
          >
            <HelpCircle className="p-[2px]"></HelpCircle>
            <span>How to use bot?</span>
          </Link>
          <Link
            href="https://github.com/OlegZapara/LumiosUI"
            title="LumiosUI Github page"
            aria-label="LumiosUI Github page"
            className="rounded-md hover:bg-muted p-2 px-4 flex flex-row gap-2"
          >
            <IconBrandGithub className="p-[2px]"></IconBrandGithub>
            <span>Project Github</span>
          </Link>
          <Button
            aria-label="Toggle theme"
            variant="ghost"
            title="Toggle theme"
            className="rounded-md hover:bg-muted p-2 flex justify-start px-4 font-normal gap-2 text-base"
            onClick={() => {
              theme.setTheme(theme.theme == "dark" ? "white" : "dark");
            }}
          >
            <SunMoon className="p-[2px]"></SunMoon>
            <span>Toggle theme</span>
          </Button>
          <Link
            href="/settings"
            title="Settings page"
            aria-label="Settings page"
            onClick={() => setToggled(false)}
            className="rounded-md hover:bg-muted p-2 px-4 flex flex-row gap-2"
          >
            <Settings className="p-[2px]"></Settings>
            <span>Settings</span>
          </Link>
        </div>
      )}
    </div>
  );
}
