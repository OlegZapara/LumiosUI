import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Account from "./account";
import Appearance from "./appearance";
import General from "./general";

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
            <TabsList className="w-full sm:w-48 flex flex-wrap sm:flex-col h-auto justify-between sm:justify-start bg-background sm:mr-5 mb-4 sm:mb-0 gap-2">
              <SettingsTab value="general">General</SettingsTab>
              <SettingsTab value="appearance">Appearance</SettingsTab>
              <SettingsTab value="a">Account</SettingsTab>
              <SettingsTab value="b">Account</SettingsTab>
              <SettingsTab value="acccount">Account</SettingsTab>
              <SettingsTab value="acdcount">Account</SettingsTab>
            </TabsList>
            <TabsContent value="general">
              <General />
            </TabsContent>
            <TabsContent value="account">
              <Account />
            </TabsContent>
            <TabsContent value="appearance" className="w-full">
              <Appearance />
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
      className="flex justify-start sm:w-full h-9 hover:underline data-[state=active]:bg-muted rounded-md"
      value={props.value}
    >
      {props.children}
    </TabsTrigger>
  );
}
