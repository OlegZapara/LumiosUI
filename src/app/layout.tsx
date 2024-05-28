import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/navbar-v2";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lumios",
  description: "Official Lumios Bot portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <GoogleAnalytics />
        <ThemeProvider attribute="class" defaultTheme={"system"}>
          <Toaster />
          <div className="relative flex min-h-screen flex-col bg-background">
            <Navbar className="top-2" />
            <Suspense>
              <div>{children}</div>
            </Suspense>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
