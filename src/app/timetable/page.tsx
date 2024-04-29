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
import useAuth from "@/hooks/useAuth";
import { notFound } from "next/navigation";
import Link from "next/link";
import NoTimetablePageV2 from "@/app/timetable/no-timetable-page-v2";

export default function TimetablePage() {
  const authenticated = useAuth();

  const timetableStore = useTimetableStore();
  const settingsStore = useSettingsStore();

  const [enableHeader, setEnableHeader] = useState(true);

  const { get, update } = useTimetableQueryParams();
  const day = get("day");
  const week = get("week");

  useEffect(() => {
    if (authenticated == null) return;
    setEnableHeader(
      localStorage.getItem("enableTimetableHeader") != "Disabled",
    );
    timetableStore.fetchTimetable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  if (authenticated == null) return null;
  if (!authenticated) return notFound();

  if (!timetableStore.timetable || !day || !week) {
    return <Loading />;
  }

  if (timetableStore.timetable?.length == 0) {
    return <NoTimetablePageV2></NoTimetablePageV2>;
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
            {process.env.NODE_ENV !== "production" && <JsonEditor></JsonEditor>}
            <Link
              href="/settings?page=Timetable"
              className="text-nowrap inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors  disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground hover:bg-background bg-transparent h-10 px-3"
            >
              Settings
            </Link>
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
