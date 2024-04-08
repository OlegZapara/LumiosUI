import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import {
  syncSettings,
  updateChatId,
  updateTimetableHeader,
} from "@/slices/settings-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

export interface TimetableSettings {
  chatId: string | null;
  enableTimetableHeader: boolean;
  timetableWeeks: string[];
  timetableDays: string[];
}

export default function Settings() {
  const timetableSettings = useSelector<RootState, TimetableSettings>(
    (state) => state.settings
  );
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [chatId, setChatId] = useState<string>("");
  useEffect(() => {
    dispatch(syncSettings());
  }, [dispatch]);
  useEffect(() => {
    setChatId(timetableSettings.chatId || "");
  }, [timetableSettings.chatId]);
  return (
    <Sheet>
      <SheetTrigger className="text-nowrap inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors  disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground hover:bg-background bg-transparent h-10 px-3">
        Settings
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-col gap-2 overflow-y-scroll overflow-x-visible h-full p-1">
          <SheetTitle>Timetable header</SheetTitle>
          <SheetDescription>
            <div className="flex items-center space-x-2">
              <Switch
                id="timetable-header"
                checked={timetableSettings.enableTimetableHeader}
                onCheckedChange={(e) => {
                  dispatch(updateTimetableHeader(e));
                }}
              />
              <Label htmlFor="timetable-header">Display timetable header</Label>
            </div>
          </SheetDescription>
          <Separator></Separator>
          <SheetTitle>Timetable settings</SheetTitle>
          <SheetDescription>
            <div className="grid w-full max-w-sm items-center gap-1">
              <Label htmlFor="ChatID" className="ml-2">
                Chat ID
              </Label>
              <div className="flex flex-row gap-1">
                <Input
                  type="text"
                  id="ChatID"
                  placeholder="Enter chat ID"
                  value={chatId}
                  onChange={(e) => setChatId(e.target.value)}
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    dispatch(updateChatId(chatId));
                    toast({
                      title: "Chat ID updated",
                      description: `Chat ID is now set to ${chatId}`,
                    });
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </SheetDescription>
          <Separator></Separator>
          <SheetTitle>Weeks</SheetTitle>
          <SheetDescription className="flex flex-col gap-2">
            {timetableSettings.timetableWeeks.map((week) => (
              <div key={week} className="flex flex-row gap-1">
                <Input key={week} value={week} disabled></Input>
                <Button variant="outline" disabled>
                  Remove
                </Button>
              </div>
            ))}
            <Button className="w-full" variant="outline" disabled>
              Add new week
            </Button>
          </SheetDescription>
          <Separator></Separator>
          <SheetTitle>Days</SheetTitle>
          <SheetDescription className="flex flex-col gap-2">
            {timetableSettings.timetableDays.map((day) => (
              <div key={day} className="flex flex-row gap-1">
                <Input key={day} value={day} disabled></Input>
                <Button variant="outline" disabled>
                  Remove
                </Button>
              </div>
            ))}
            <Button className="w-full" variant="outline" disabled>
              Add new day
            </Button>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
