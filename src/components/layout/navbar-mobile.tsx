import { SessionType } from "@/actions/auth-actions";
import { cn } from "@/lib/utils";
import { IconBrandGithub } from "@tabler/icons-react";
import { HelpCircle, Menu, Settings, SunMoon, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import TelegramLogin from "../general/telegram-login";
import { Button } from "../ui/button";

type NavbarMobileProps = {
  session: SessionType | null | undefined;
  links: { href: string; title: string; protected: boolean }[];
};

export const NavbarMobile = ({ session, links }: NavbarMobileProps) => {
  const pathname = usePathname();
  const [toggled, setToggled] = useState(false);
  const theme = useTheme();

  return (
    <div className="absolute left-4 md:hidden">
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
        <div className="fixed left-0 top-14 flex h-screen w-full max-w-96 flex-col bg-background shadow-lg">
          {!session?.user ? (
            <TelegramLogin size="medium" />
          ) : (
            <Link
              href="/settings"
              title="User settings"
              aria-label="User settings"
              onClick={() => setToggled(false)}
              className="flex justify-start gap-4 rounded-md px-4 py-2 font-semibold underline hover:bg-muted"
            >
              Logged in as @{session.user.username}
            </Link>
          )}
          {links.map(
            (link) =>
              !(!session?.user && link.protected) && (
                <Link
                  className={cn(
                    "flex h-12 w-full items-center px-4 text-lg hover:bg-muted hover:text-foreground/80",
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
              ),
          )}
          <Link
            href="/tutorial"
            title="Turorial page"
            aria-label="Turorial page"
            onClick={() => setToggled(false)}
            className="flex flex-row gap-2 rounded-md p-2 px-4 hover:bg-muted"
          >
            <HelpCircle className="p-[2px]"></HelpCircle>
            <span>How to use bot?</span>
          </Link>
          <Link
            href="https://github.com/OlegZapara/LumiosUI"
            title="LumiosUI Github page"
            aria-label="LumiosUI Github page"
            className="flex flex-row gap-2 rounded-md p-2 px-4 hover:bg-muted"
          >
            <IconBrandGithub className="p-[2px]"></IconBrandGithub>
            <span>Project Github</span>
          </Link>
          <Button
            aria-label="Toggle theme"
            variant="ghost"
            title="Toggle theme"
            className="flex justify-start gap-2 rounded-md p-2 px-4 text-base font-normal hover:bg-muted"
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
            className="flex flex-row gap-2 rounded-md p-2 px-4 hover:bg-muted"
          >
            <Settings className="p-[2px]"></Settings>
            <span>Settings</span>
          </Link>
        </div>
      )}
    </div>
  );
};
