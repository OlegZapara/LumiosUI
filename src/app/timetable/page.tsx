"use client"
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";
import { Timetable, columns } from "./columns";
import { DataTable } from "./data-table";
import SettingsSheet from "./settings-sheet";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { setTimetable } from "@/slices/timetable-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { data, weeks, days, words } from './data';
import Loading from './loading';
import JsonEditor from "@/components/timetable/json-editor";

export default function TimetablePage() {
  const [activeWeek, setActiveWeek] = useState<string>(weeks[0])
  const [activeDay, setActiveDay] = useState<string>(days[0])
  const dispatch = useDispatch()
  const timetable = useSelector<RootState, Timetable[] | null>((state) => state.timetable.timetable)
  useEffect(() => {
    dispatch(setTimetable(data))
  }, [dispatch])
  if(timetable == null){
    return <Loading></Loading>
  }
  return (
    <div className="w-full h-full flex items-center flex-col">
      <TypewriterEffectSmooth words={words} className="mb-12" />
      <div className="w-5/6 flex justify-center items-center flex-col gap-4">
        <div className="w-full flex justify-between">
          <div className="w-full flex justify-start flex-row gap-4">
            <ToggleGroup type="single" defaultValue={weeks[0]} onValueChange={(e) => setActiveWeek(e)}>
              {weeks.map((week, i) => (
                <ToggleGroupItem key={week} value={week} aria-label="Toggle bold">
                  <div>{week}</div>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <ToggleGroup type="single" defaultValue={days[0]} onValueChange={(e) => setActiveDay(e)}>
              {days.map((day, i) => (
                <ToggleGroupItem key={day} value={day} aria-label="Toggle bold">
                  <div>{day}</div>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="mr-4 flex justify-start flex-row gap-4">
            <JsonEditor data={JSON.stringify(data, null, 2)}></JsonEditor>
            <SettingsSheet></SettingsSheet>
          </div>
        </div>
        <div className="w-full">
          <DataTable 
          columns={columns} 
          weekIndex = {weeks.indexOf(activeWeek)}
          dayIndex = {days.indexOf(activeDay)}
          data={timetable[weeks.indexOf(activeWeek)].days[days.indexOf(activeDay)].classEntries}/>
        </div>
      </div>
    </div>
  );
}
