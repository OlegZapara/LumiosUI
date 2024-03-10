"use client";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCallback, useEffect, useState } from "react";
import { Timetable, columns } from "./columns";
import { DataTable } from "./data-table";
import SettingsSheet from "./settings-sheet";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { setTimetable } from "@/slices/timetable-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { data, weeks, days, words } from "./data";
import Loading from "./loading";
import JsonEditor from "@/app/timetable/json-editor";
import AboutTimetable from "./about-timetable";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function TimetablePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const dispatch = useDispatch();
  const timetable = useSelector<RootState, Timetable[] | null>(
    (state) => state.timetable.timetable
  );

  useEffect(() => {
    dispatch(setTimetable(data));
  }, [dispatch]);

  useEffect(() => {
    console.log(pathname);
    if (!searchParams.get("week")) {
      router.push(pathname + "?" + createQueryString("week", weeks[0]));
    }
    if (!searchParams.get("day")) {
      router.push(pathname + "?" + createQueryString("day", days[0]));
    }
  }, [createQueryString, pathname, router, searchParams]);

  if (
    timetable == null ||
    !searchParams.get("week") ||
    !searchParams.get("day")
  ) {
    return <Loading></Loading>;
  }
  return (
    <div className="w-full h-full flex items-center flex-col">
      <TypewriterEffectSmooth words={words} className="mb-12" />
      <div className="w-5/6 flex justify-center items-center flex-col gap-4">
        <div className="w-full flex justify-between">
          <div className="w-full flex justify-start flex-row gap-4">
            <ToggleGroup
              type="single"
              defaultValue={weeks[0]}
              onValueChange={(e) => {
                if (e) {
                  router.push(pathname + "?" + createQueryString("week", e));
                }
              }}
            >
              {weeks.map((week, i) => (
                <ToggleGroupItem
                  key={week}
                  value={week}
                  data-state={week == searchParams.get("week") ? "on" : "off"}
                  aria-label="Change week"
                >
                  <div>{week}</div>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <ToggleGroup
              type="single"
              defaultValue={days[0]}
              onValueChange={(e) => {
                if (e) {
                  router.push(pathname + "?" + createQueryString("day", e));
                }
              }}
            >
              {days.map((day, i) => (
                <ToggleGroupItem
                  key={day}
                  value={day}
                  data-state={day == searchParams.get("day") ? "on" : "off"}
                  aria-label="Change day"
                >
                  <div>{day}</div>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="mr-4 flex justify-start flex-row gap-4">
            <JsonEditor data={JSON.stringify(data, null, 2)}></JsonEditor>
            <SettingsSheet></SettingsSheet>
            <AboutTimetable></AboutTimetable>
          </div>
        </div>
        <div className="w-full">
          <DataTable
            columns={columns}
            weekIndex={weeks.indexOf(searchParams.get("week")!)}
            dayIndex={days.indexOf(searchParams.get("day")!)}
            data={
              timetable[weeks.indexOf(searchParams.get("week")!)].days[
                days.indexOf(searchParams.get("day")!)
              ].classEntries
            }
          />
        </div>
      </div>
    </div>
  );
}
