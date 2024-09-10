"use client";
import { SessionType } from "@/actions/auth-actions";
import TelegramLogin from "@/components/general/telegram-login";
import { cn } from "@/lib/utils";
import { IconBrandGithub } from "@tabler/icons-react";
import { HelpCircle, Settings, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { NavbarMobile } from "./navbar-mobile";
import { useEffect, useState } from "react";

export const navLinks = [
  { href: "/", title: "About", protected: false },
  { href: "/authors", title: "Authors", protected: false },
  { href: "/timetable", title: "Timetable", protected: true },
  { href: "/statistics", title: "Statistics", protected: true },
  { href: "/tasks", title: "Tasks", protected: true },
  { href: "/queues", title: "Queues", protected: true },
  { href: "/tree", title: "Tree", protected: true },
];

type NavbarProps = {
  className?: string;
  session?: SessionType | null;
};

export default function Navbar({ className, session }: NavbarProps) {
  const links = navLinks.filter((link) => !link.protected || session != null);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-muted">
      <div className="container relative flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex h-full items-center justify-center sm:hidden">
          <NavbarMobile session={session} links={navLinks} />
        </div>
        <div className="flex flex-row items-center justify-center gap-1 sm:gap-2 md:gap-4">
          <LumiosLogo />
          <NavList links={links} />
        </div>
        <LinkList session={session} />
      </div>
    </header>
  );
}

function LumiosLogo() {
  return (
    <Link title="Main page" aria-label="Main page" href="/">
      <div className="title ml-5 flex flex-row items-center justify-center gap-2 rounded-lg px-2 py-2 transition-colors sm:px-4 md:ml-0">
        <Image
          src="/lumios.png"
          width="30"
          height="30"
          alt="Lumios logo"
          className="min-w-6"
        ></Image>
        <p className="relative w-max text-sm font-bold sm:text-2xl">
          <span>Lumios Bot</span>
          <span className="absolute -bottom-1 left-0 h-1 w-0 bg-blue-500 transition-all"></span>
        </p>
      </div>
    </Link>
  );
}

function NavList({ links }: { links: { title: string; href: string }[] }) {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => (
        <Link
          className={cn(
            "hidden hover:text-foreground/80 md:flex",
            link.href == pathname ? "text-foreground" : "text-muted-foreground",
          )}
          title={link.title + " page"}
          aria-label={link.title + " page"}
          key={link.title}
          href={link.href}
        >
          {link.title}
        </Link>
      ))}
    </>
  );
}

function LinkList({ session }: { session: SessionType | null | undefined }) {
  const theme = useTheme();
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () =>
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
  }, []);
  // 640px = tailwind sm breakpoint
  if (width < 640) {
    return null;
  }
  return (
    <div className="hidden flex-row items-center justify-center sm:flex">
      {!session?.user ? (
        <TelegramLogin key="TelegramLogin" size="medium" />
      ) : (
        <Link
          href="/settings"
          title="User settings"
          aria-label="User settings"
          className="items-center justify-center rounded-md px-4 py-2 font-semibold hover:bg-muted"
        >
          @{session.user.username}
        </Link>
      )}

      <Link
        href="/tutorial"
        title="Turorial page"
        aria-label="Turorial page"
        className="hidden aspect-square rounded-md p-2 hover:bg-muted sm:flex"
      >
        <HelpCircle className="p-[2px]"></HelpCircle>
      </Link>
      <Link
        href="https://github.com/OlegZapara/LumiosUI"
        title="LumiosUI Github page"
        aria-label="LumiosUI Github page"
        className="hidden aspect-square rounded-md p-2 hover:bg-muted sm:flex"
      >
        <IconBrandGithub className="p-[2px]"></IconBrandGithub>
      </Link>
      <Button
        aria-label="Toggle theme"
        variant="ghost"
        title="Toggle theme"
        className="hidden aspect-square rounded-md p-2 hover:bg-muted sm:flex"
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
        className="hidden aspect-square rounded-md p-2 hover:bg-muted sm:flex"
      >
        <Settings className="p-[2px]"></Settings>
      </Link>
    </div>
  );
}
