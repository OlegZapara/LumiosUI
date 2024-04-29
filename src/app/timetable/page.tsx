"use client";
import JsonEditor from "@/app/timetable/json-editor";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import useTimetableQueryParams from "@/hooks/useTimetableQueryParams";
import { useEffect, useState } from "react";
import { useSettingsStore } from "../stores/settings";
import { useTimetableStore } from "../stores/timetable";
import AboutTimetable from "./about-timetable";
import { columns } from "./columns";
import { words } from "./data";
import { DataTable } from "./data-table";
import Loading from "./loading-page";
import NoTimetablePage from "./no-timetable-page";
import Settings from "./settings";

export default function TimetablePage() {
  const timetableStore = useTimetableStore();
  const settingsStore = useSettingsStore();

  const [enableHeader, setEnableHeader] = useState(true);

  const { get, update } = useTimetableQueryParams();
  const day = get("day");
  const week = get("week");

  useEffect(() => {
    setEnableHeader(localStorage.getItem("enableTimetableHeader") != "off");
    timetableStore.fetchTimetable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!timetableStore.timetable || !day || !week) {
    return <Loading />;
  }
  if (timetableStore.timetable.length == 0) {
    return <NoTimetablePage />;
  }
  return (
    <div className="w-full h-full flex items-center flex-col mt-6">
      {enableHeader && (
        <TypewriterEffectSmooth words={words} className="mb-12" />
      )}
      <div className="w-5/6 flex justify-center items-center flex-col gap-4">
        <div className="w-full flex justify-between">
          <div className="w-full flex justify-start flex-row gap-4">
            <ToggleGroup
              type="single"
              defaultValue={settingsStore.weeks[0]}
              onValueChange={(e) => update("week", e)}
            >
              {settingsStore.weeks.map((week, i) => (
                <ToggleGroupItem
                  key={week}
                  value={week}
                  data-state={week == get("week") ? "on" : "off"}
                  aria-label="Change week"
                >
                  <div>{week}</div>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <ToggleGroup
              type="single"
              defaultValue={settingsStore.days[0]}
              onValueChange={(e) => update("day", e)}
            >
              {settingsStore.days.map((day, i) => (
                <ToggleGroupItem
                  key={day}
                  value={day}
                  data-state={day == get("day") ? "on" : "off"}
                  aria-label="Change day"
                >
                  <div>{day}</div>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="gap-2 inline-flex h-12 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <JsonEditor></JsonEditor>
            <Settings></Settings>
            <AboutTimetable></AboutTimetable>
          </div>
        </div>
        <div className="w-full mb-6">
          <DataTable
            columns={columns}
            weekIndex={settingsStore.weeks.indexOf(week)}
            dayIndex={settingsStore.days.indexOf(day)}
            data={
              timetableStore.timetable[settingsStore.weeks.indexOf(week)].days[
                settingsStore.days.indexOf(day)
              ].classEntries
            }
          />
        </div>
      </div>
    </div>
  );
}
