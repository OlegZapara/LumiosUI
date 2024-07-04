import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettings from "./general-settings";
import Link from "next/link";
import { z } from "zod";
import { withFallback } from "@/utils/schema-extensions";
import AppearanceSettings from "@/app/(logged-in)/settings/appearance-settings";
import TimetableSettings from "@/app/(logged-in)/settings/timetable-settings";

const pages = [
  { name: "General", content: <GeneralSettings /> },
  { name: "Appearance", content: <AppearanceSettings /> },
  { name: "Timetable", content: <TimetableSettings /> },
];

const urlSchema = withFallback(
  z
    .string()
    .optional()
    .refine((value) => value && pages.some((x) => x.name == value)),
  pages[0].name,
);

export default async function Settings({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams?.page || "GeneralSettings";
  return (
    <div className="sm-6">
      <Card className="sm:m-8">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage your account, website and bot settings.
          </CardDescription>
          <Separator className="my-4 w-full"></Separator>
        </CardHeader>
        <CardContent>
          <Tabs
            value={urlSchema.parse(page) as string}
            className="flex min-h-[60vh] w-full flex-col sm:flex-row"
          >
            <TabsList className="mb-4 flex h-auto w-full flex-wrap justify-evenly gap-2 bg-background sm:mb-0 sm:mr-5 sm:w-48 sm:flex-col sm:justify-start">
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
        className="flex h-9 w-24 justify-center rounded-md hover:underline data-[state=active]:bg-muted sm:w-full sm:justify-start"
        href={`?page=${props.value}`}
      >
        {props.children}
      </Link>
    </TabsTrigger>
  );
}
