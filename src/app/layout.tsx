import { getSession } from "@/actions/auth-actions";
import { ThemeProvider } from "@/components/general/theme-provider";
import Navbar from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/toaster";
import { InterFont } from "@/lib/fonts";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumios",
  description: "Official Lumios Bot portal",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <Analytics />
      <SpeedInsights />
      <body className={`${InterFont.className}`}>
        <ThemeProvider attribute="class" defaultTheme={"system"}>
          <Toaster />
          <div className="relative flex min-h-screen flex-col bg-background">
            <Navbar className="top-2" session={session} />
            <Suspense>
              <div>{children}</div>
            </Suspense>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
