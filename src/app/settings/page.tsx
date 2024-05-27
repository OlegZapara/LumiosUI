"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Appearance from "./appearance";
import General from "./general";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";
import { withFallback } from "@/app/utils/schema-extensions";
import TimetableSettings from "@/app/settings/timetable-settings";
import { useUsersStore } from "@/app/stores/users";

const pages = [
  {
    name: "General",
    content: <General />,
  },
  {
    name: "Appearance",
    content: <Appearance />,
  },
  {
    name: "Timetable",
    content: <TimetableSettings />,
  },
];

const urlSchema = withFallback(
  z
    .string()
    .optional()
    .refine((value) => {
      return value && pages.some((x) => x.name == value);
    }),
  pages[0].name,
);

export default function Settings() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const usersStore = useUsersStore();
  useEffect(() => {
    router.push(`?page=${urlSchema.parse(searchParams.get("page"))}`);
  }, [router, searchParams]);

  useEffect(() => {
    if (usersStore.userId) {
      usersStore.setUserId(usersStore.userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sm-6">
      <Card className="sm:m-8">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage your account, website and bot settings.
          </CardDescription>
          <Separator className="w-full my-4"></Separator>
        </CardHeader>
        <CardContent>
          <Tabs
            value={urlSchema.parse(searchParams.get("page")) as string}
            className="w-full flex flex-col sm:flex-row min-h-[60vh]"
          >
            <TabsList className="w-full sm:w-48 flex flex-wrap sm:flex-col h-auto justify-evenly sm:justify-start bg-background sm:mr-5 mb-4 sm:mb-0 gap-2">
              {pages.map((page) => (
                <SettingsTab value={page.name} key={page.name}>
                  {page.name}
                </SettingsTab>
              ))}
            </TabsList>
            {pages.map((page) => (
              <TabsContent
                key={page.name + "-content"}
                value={page.name}
                className="w-full"
              >
                {page.content}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsTab(props: { value: string; children: string }) {
  return (
    <TabsTrigger asChild value={props.value}>
      <Link
        className="flex justify-center sm:justify-start w-24 sm:w-full h-9 hover:underline data-[state=active]:bg-muted rounded-md"
        href={`?page=${props.value}`}
      >
        {props.children}
      </Link>
    </TabsTrigger>
  );
}
