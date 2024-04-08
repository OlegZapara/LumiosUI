"use client";
import JsonEditor from "@/app/timetable/json-editor";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import useTimetableQueryParams from "@/hooks/useTimetableQueryParams";
import { syncSettings } from "@/slices/settings-slice";
import { completeUpdate, setTimetable } from "@/slices/timetable-slice";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import AboutTimetable from "./about-timetable";
import { Timetable, columns } from "./columns";
import { words } from "./data";
import { DataTable } from "./data-table";
import Loading from "./loading-page";
import NoTimetablePage from "./no-timetable-page";
import Settings, { TimetableSettings } from "./settings";
import { useToast } from "@/components/ui/use-toast";

export default function TimetablePage() {
  const { get, update } = useTimetableQueryParams();
  const { toast } = useToast();
  const day = get("day");
  const week = get("week");
  const dispatch = useDispatch();
  const timetable = useSelector<RootState, Timetable[] | null>(
    (state) => state.timetable.timetable
  );
  const requireUpdate = useSelector<RootState, boolean>(
    (state) => state.timetable.requireUpdate
  );
  const settings = useSelector<RootState, TimetableSettings>(
    (state) => state.settings
  );
  const getTimetable = useCallback(
    async (chatId: string) => {
      try {
        const res = await fetch(`/api/timetables?chatId=${chatId}`);
        const jsonData = res.ok ? await res.json() : [];
        dispatch(setTimetable(jsonData));
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );
  const updateTimetable = useCallback(
    async (chatId: string) => {
      try {
        await fetch(`/api/timetables?chatId=${chatId}`, {
          method: "PUT",
          body: JSON.stringify(timetable),
        });
      } catch (err) {
        toast({
          title: "Timetable was not updated",
          description: "Unexpected error, timetable was not updated",
          variant: "destructive",
        });
      } finally {
      }
    },
    [timetable, toast]
  );

  useEffect(() => {
    if (!settings.chatId || !requireUpdate) return;
    updateTimetable(settings.chatId);
    dispatch(completeUpdate());
  }, [dispatch, requireUpdate, settings.chatId, updateTimetable]);

  useEffect(() => {
    dispatch(syncSettings());
  }, [dispatch]);

  useEffect(() => {
    if(settings.chatId === null) return;
    getTimetable(settings.chatId);
  }, [getTimetable, settings.chatId]);

  if (!timetable || !day || !week) {
    return <Loading />;
  }
  if (timetable.length == 0) {
    return <NoTimetablePage />;
  }
  return (
    <div className="w-full h-full flex items-center flex-col">
      {settings.enableTimetableHeader && (
        <TypewriterEffectSmooth words={words} className="mb-12" />
      )}
      <div className="w-5/6 flex justify-center items-center flex-col gap-4">
        <div className="w-full flex justify-between">
          <div className="w-full flex justify-start flex-row gap-4">
            <ToggleGroup
              type="single"
              defaultValue={settings.timetableWeeks[0]}
              onValueChange={(e) => update("week", e)}
            >
              {settings.timetableWeeks.map((week, i) => (
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
              defaultValue={settings.timetableDays[0]}
              onValueChange={(e) => update("day", e)}
            >
              {settings.timetableDays.map((day, i) => (
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
            weekIndex={settings.timetableWeeks.indexOf(week)}
            dayIndex={settings.timetableDays.indexOf(day)}
            data={
              timetable[settings.timetableWeeks.indexOf(week)].days[
                settings.timetableDays.indexOf(day)
              ].classEntries
            }
          />
        </div>
      </div>
    </div>
  );
}
