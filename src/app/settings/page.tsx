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

export default function Settings() {
  return (
    <div>
      <Card className="m-8">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage your account, sebsite and bot settings.
          </CardDescription>
          <Separator className="w-full my-4"></Separator>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="appearance"
            className="w-full flex flex-row min-h-[60vh]"
          >
            <TabsList className="w-48 flex flex-col h-auto justify-start bg-background mr-5">
              <TabsTrigger
                className="flex justify-start w-full h-9 hover:underline data-[state=active]:bg-muted rounded-md"
                value="appearance"
              >
                Appearance
              </TabsTrigger>
              <TabsTrigger
                className="flex justify-start w-full h-9 hover:underline data-[state=active]:bg-muted rounded-md"
                value="account"
              >
                Account
              </TabsTrigger>
              <TabsTrigger
                className="flex justify-start w-full h-9 hover:underline data-[state=active]:bg-muted rounded-md"
                value="password"
              >
                Password
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div>Account</div>
            </TabsContent>
            <TabsContent value="password">
              <div>Password</div>
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
