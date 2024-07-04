"use client";
import { deleteTimetable } from "@/actions/timetable-actions";
import SettingsField from "@/components/settings/settings-field";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useTimetableHeader } from "@/hooks/settings/useTimetableHeader";

export default function TimetableSettings() {
  const { timetableHeader, setTimetableHeader, updateTimetableHeader } =
    useTimetableHeader();

  const removeTimetable = () => {
    deleteTimetable()
      .then(() => {
        toast({ title: "Timetable deleted successfully" });
      })
      .catch(() =>
        toast({ title: "Failed to delete timetable", variant: "destructive" }),
      );
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="text-xl font-semibold leading-none tracking-tight">
        Timetable
      </div>
      <div className="text-sm text-muted-foreground">
        Customize the appearance and functionality of the timetable
      </div>
      <Separator className="my-2 w-full"></Separator>
      <section className="my-4 flex flex-col gap-4 rounded-md border border-input p-4">
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
      <section className="my-4 flex flex-col gap-4 rounded-md border border-input p-4">
        <div className="text-xl">Actions</div>
        <Separator></Separator>
        <SettingsField
          name="Delete timetable"
          description="Remove timetable for this group (This action cannot be undone)"
          admin
        >
          <Button
            onClick={removeTimetable}
            variant="destructive"
            className="w-full"
            disabled={process.env.NODE_ENV === "production"}
          >
            Delete timetable
          </Button>
        </SettingsField>
      </section>
    </div>
  );
}
