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
import QueuesSettings from "./queues-settings";
import StatisticsSettings from "./statistics-settings";
import TasksSettings from "./tasks-settings";
import TimetableSettings from "./timetable-settings";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";

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
  {
    name: "Statistics",
    content: <StatisticsSettings />,
  },
  {
    name: "Queues",
    content: <QueuesSettings />,
  },
  {
    name: "Tasks",
    content: <TasksSettings />,
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

function withFallback<T>(schema: z.ZodType<T>, fallback: T) {
  return z.preprocess(
    (value) => {
      const parseResult = schema.safeParse(value);
      if (parseResult.success) return value;
      return fallback;
    },
    z.custom((v) => true),
  );
}

export default function Settings() {
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    router.push(`?page=${urlSchema.parse(searchParams.get("page"))}`);
  }, [router, searchParams]);

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
