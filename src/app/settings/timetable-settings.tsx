import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import SettingsField from "@/app/settings/settings-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useTimetableStore } from "@/app/stores/timetable";

export default function TimetableSettings() {
  const { deleteTimetable } = useTimetableStore((state) => state);
  const [timetableHeader, setTimetableHeader] = useState<string>("Enabled");
  const { toast } = useToast();

  useEffect(() => {
    setTimetableHeader(
      localStorage.getItem("enableTimetableHeader") ?? "Enabled",
    );
  }, []);

  const updateTimetableHeader = () => {
    localStorage.setItem("enableTimetableHeader", timetableHeader);
    toast({
      title: "Timetable header updated",
      description: `Timetable header is now ${timetableHeader.toLowerCase()}`,
    });
  };

  const removeTimetable = () => {
    deleteTimetable()
      .then((res) => {
        if (res.ok)
          toast({
            title: "Timetable deleted successfully",
          });
        else
          toast({
            title: "Timetable was not deleted",
            variant: "destructive",
            description: "Please try again later",
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="text-xl font-semibold leading-none tracking-tight">
        Timetable
      </div>
      <div className="text-sm text-muted-foreground">
        Customize the appearance and functionality of the timetable
      </div>
      <Separator className="w-full my-2"></Separator>
      <section className="flex flex-col gap-4 my-4 border border-input rounded-md p-4">
        <div className="text-xl">Appearance</div>
        <Separator></Separator>
        <SettingsField
          name="Timetable header"
          description="Enable timetable header for timetable page"
        >
          <Select value={timetableHeader} onValueChange={setTimetableHeader}>
            <SelectTrigger>
              <SelectValue placeholder="Enabled" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Enabled">Enabled</SelectItem>
              <SelectItem value="Disabled">Disabled</SelectItem>
            </SelectContent>
          </Select>{" "}
          <Button
            onClick={updateTimetableHeader}
            variant="outline"
            className="w-full sm:w-32"
          >
            Save
          </Button>
        </SettingsField>
      </section>
      <section className="flex flex-col gap-4 my-4 border border-input rounded-md p-4">
        <div className="text-xl">Actions</div>
        <Separator></Separator>
        <SettingsField
          name="Delete timetable"
          description="Remove timetable for this group (This action cannot be undone)"
          developer
        >
          <Button
            onClick={removeTimetable}
            variant="destructive"
            className="w-full"
          >
            Delete timetable
          </Button>
        </SettingsField>
      </section>
      {process.env.NODE_ENV !== "production" && (
        <section className="flex flex-col gap-4 my-4 border border-input rounded-md p-4">
          <div className="text-xl">Functionality</div>
          <Separator></Separator>
          <SettingsField
            name="JSON editor"
            description="Enable timetable JSON editing"
            developer
          >
            <Select defaultValue={"Enabled"}>
              <SelectTrigger>
                <SelectValue placeholder="Font" />
              </SelectTrigger>
              <Button variant="outline" className="w-full sm:w-32">
                Save
              </Button>
              <SelectContent>
                <SelectItem value="Enabled">Enabled</SelectItem>
                <SelectItem value="Disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </SettingsField>
        </section>
      )}
    </div>
  );
}
