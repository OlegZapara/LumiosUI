"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { IconBrandGithub, IconQuestionMark } from "@tabler/icons-react";
import { HelpCircle, Moon, Settings, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();
  const theme = useTheme();
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

  function getTheme() {
    if (theme.theme == "system") return theme.systemTheme;
    return theme.theme;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex flex-row justify-center items-center gap-4">
          <Link href="/">
            <div className="transition-colors flex flex-row items-center justify-center gap-2 px-4 py-2 rounded-lg title">
              <Image
                src="/lumios.png"
                width="30"
                height="30"
                alt="Lumios logo"
              ></Image>
              <p className="font-bold text-2xl relative w-max">
                <span>Lumios Bot</span>
                <span className="absolute -bottom-1 left-0 w-0 transition-all h-1 bg-blue-500"></span>
              </p>
            </div>
          </Link>
          {links.map((link) => (
            <Link
              className={cn(
                "hover:text-foreground/80",
                link.href == pathname
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
              key={link.title}
              href={link.href}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div className="flex flex-row items-center justify-center">
          <Link
            href="/tutorial"
            className="aspect-square rounded-md hover:bg-muted p-2"
          >
            <HelpCircle className="p-[2px]"></HelpCircle>
          </Link>
          <Link
            href="https://github.com/OlegZapara/LumiosUI"
            className="aspect-square rounded-md hover:bg-muted p-2"
          >
            <IconBrandGithub className="p-[2px]"></IconBrandGithub>
          </Link>
          <Button
            variant="ghost"
            className="aspect-square rounded-md hover:bg-muted p-2"
            onClick={() => {
              theme.setTheme(theme.theme == "dark" ? "white" : "dark");
            }}
          >
            {getTheme() == "dark" ? (
              <Moon className="p-[2px]"></Moon>
            ) : (
              <Sun className="p-[2px]"></Sun>
            )}
          </Button>
          <Link
            href="/settings"
            className="aspect-square rounded-md hover:bg-muted p-2"
          >
            <Settings className="p-[2px]"></Settings>
          </Link>
        </div>
      </div>
    </header>
  );
}
