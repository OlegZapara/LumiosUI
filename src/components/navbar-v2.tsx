"use client";
import { cn } from "@/lib/utils";
import { IconBrandGithub } from "@tabler/icons-react";
import { HelpCircle, Menu, Settings, SunMoon, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import TelegramLoginButton, { TelegramUser } from "telegram-login-button";
import { useUsersStore } from "@/app/stores/users";

const links = [
  {
    href: "/",
    title: "About",
    protected: false,
  },
  {
    href: "/authors",
    title: "Authors",
    protected: false,
  },
  {
    href: "/timetable",
    title: "Timetable",
    protected: true,
  },
  {
    href: "/statistics",
    title: "Statistics",
    protected: true,
  },
  {
    href: "/tasks",
    title: "Tasks",
    protected: true,
  },
  {
    href: "/queues",
    title: "Queues",
    protected: true,
  },
];

export default function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();
  const theme = useTheme();
  const usersStore = useUsersStore();
  const router = useRouter();

  const updateUserId = (user: TelegramUser) => {
    usersStore.setUserId(user.id).then((ok) => {
      if (!ok) router.push("/choose-chat");
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm dark:shadow-muted">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between relative">
        <div className="flex flex-row justify-center items-center gap-1 sm:gap-2 md:gap-4">
          <NavbarMenu></NavbarMenu>
          <Link title="Main page" aria-label="Main page" href="/">
            <div className="transition-colors flex flex-row items-center justify-center gap-2 px-2 sm:px-4 py-2 rounded-lg title ml-5 md:ml-0">
              <Image
                src="/lumios.png"
                width="30"
                height="30"
                alt="Lumios logo"
                className="min-w-6"
              ></Image>
              <p className="font-bold text-sm sm:text-2xl relative w-max">
                <span>Lumios Bot</span>
                <span className="absolute -bottom-1 left-0 w-0 transition-all h-1 bg-blue-500"></span>
              </p>
            </div>
          </Link>
          {links.map(
            (link) =>
              !(usersStore.chatId == null && link.protected) && (
                <Link
                  className={cn(
                    "hover:text-foreground/80 hidden md:flex",
                    link.href == pathname
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                  title={link.title + " page"}
                  aria-label={link.title + " page"}
                  key={link.title}
                  href={link.href}
                >
                  {link.title}
                </Link>
              ),
          )}
        </div>
        <div className="flex-row items-center justify-center flex">
          {usersStore.userId == null || usersStore.user == null ? (
            <TelegramLoginButton
              buttonSize={window.innerWidth < 800 ? "small" : "medium"}
              botName="lumios_bot"
              dataOnauth={updateUserId}
            />
          ) : (
            <Link
              href="/settings"
              title="User settings"
              aria-label="User settings"
              className="justify-center items-center rounded-md hover:bg-muted py-2 px-4 font-semibold"
            >
              @{usersStore.user.username}
            </Link>
          )}

          <Link
            href="/tutorial"
            title="Turorial page"
            aria-label="Turorial page"
            className="hidden sm:flex aspect-square rounded-md hover:bg-muted p-2"
          >
            <HelpCircle className="p-[2px]"></HelpCircle>
          </Link>
          <Link
            href="https://github.com/OlegZapara/LumiosUI"
            title="LumiosUI Github page"
            aria-label="LumiosUI Github page"
            className="hidden sm:flex aspect-square rounded-md hover:bg-muted p-2"
          >
            <IconBrandGithub className="p-[2px]"></IconBrandGithub>
          </Link>
          <Button
            aria-label="Toggle theme"
            variant="ghost"
            title="Toggle theme"
            className="hidden sm:flex aspect-square rounded-md hover:bg-muted p-2"
            onClick={() => {
              theme.setTheme(theme.theme == "dark" ? "light" : "dark");
            }}
          >
            <SunMoon className="p-[2px]"></SunMoon>
          </Button>
          <Link
            href="/settings"
            title="Settings page"
            aria-label="Settings page"
            className="hidden sm:flex aspect-square rounded-md hover:bg-muted p-2"
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
  const usersStore = useUsersStore();

  return (
    <div className="md:hidden absolute left-4">
      <Button
        title="Toggle menu"
        aria-label="Toggle menu"
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
                  : "text-muted-foreground",
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
          {/*{(usersStore.userId == null || usersStore.user == null) && (*/}
          <TelegramLoginButton
            buttonSize="large"
            botName="lumios_bot"
            dataOnauth={(user: TelegramUser) => usersStore.setUserId(user.id)}
          />
          {/*)}*/}
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
              theme.setTheme(theme.theme == "dark" ? "light" : "dark");
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
