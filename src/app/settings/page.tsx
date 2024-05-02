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

export default function Settings() {
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
            defaultValue="general"
            className="w-full flex flex-col sm:flex-row min-h-[60vh]"
          >
            <TabsList className="w-full sm:w-48 flex flex-wrap sm:flex-col h-auto justify-evenly sm:justify-start bg-background sm:mr-5 mb-4 sm:mb-0 gap-2">
              <SettingsTab value="general">General</SettingsTab>
              <SettingsTab value="appearance">Appearance</SettingsTab>
              <SettingsTab value="timetable">Timetable</SettingsTab>
              <SettingsTab value="statistics">Statistics</SettingsTab>
              <SettingsTab value="tasks">Tasks</SettingsTab>
              <SettingsTab value="queues">Queues</SettingsTab>
            </TabsList>
            <TabsContent value="general" className="w-full">
              <General />
            </TabsContent>
            <TabsContent value="appearance" className="w-full">
              <Appearance />
            </TabsContent>
            <TabsContent value="timetable" className="w-full">
              <TimetableSettings />
            </TabsContent>
            <TabsContent value="statistics" className="w-full">
              <StatisticsSettings />
            </TabsContent>
            <TabsContent value="tasks" className="w-full">
              <TasksSettings />
            </TabsContent>
            <TabsContent value="queues" className="w-full">
              <QueuesSettings />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsTab(props: { value: string; children: React.ReactNode }) {
  return (
    <TabsTrigger
      className="flex justify-center sm:justify-start w-24 sm:w-full h-9 hover:underline data-[state=active]:bg-muted rounded-md"
      value={props.value}
    >
      {props.children}
    </TabsTrigger>
  );
}
