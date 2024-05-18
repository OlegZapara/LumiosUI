"use client";
import JsonEditor from "@/app/timetable/json-editor";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import useTimetableQueryParams from "@/hooks/useTimetableQueryParams";
import { useEffect, useState } from "react";
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
import { useUsersStore } from "@/app/stores/users";

export default function TimetablePage() {
  const authenticated = useAuth();
  const timetableStore = useTimetableStore();
  const isAdmin = useUsersStore(
    (state) =>
      state.user?.chats.find((x) => x.id == state.chatId)?.admin ?? false,
  );

  const [enableHeader, setEnableHeader] = useState(true);

  const { searchParams, updateSearchParams } = useTimetableQueryParams();
  const dayParam = searchParams.get("day")!;
  const weekParam = searchParams.get("week")!;

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

  if (!timetableStore.timetable || !dayParam || !weekParam) {
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
      <div className="w-full px-1 md:w-5/6 flex justify-center items-center flex-col gap-4">
        <div className="w-full flex flex-wrap md:flex-nowrap justify-between gap-4">
          <div className="w-full flex justify-start flex-col md:flex-row gap-4">
            <ToggleGroup
              type="single"
              value={dayParam}
              onValueChange={(e) => updateSearchParams("week", e)}
            >
              {timetableStore.weeks.map((week, i) => (
                <ToggleGroupItem
                  key={week}
                  value={week}
                  data-state={week == weekParam ? "on" : "off"}
                  aria-label="Change week"
                >
                  <div className="text-nowrap">{week}</div>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <ToggleGroup
              type="single"
              value={weekParam}
              onValueChange={(e) => updateSearchParams("day", e)}
              className="md:flex-nowrap flex-wrap md:h-12 h-auto px-6 md:px-1"
            >
              {timetableStore.days.map((day, i) => (
                <ToggleGroupItem
                  key={day}
                  value={day}
                  data-state={day == dayParam ? "on" : "off"}
                  aria-label="Change day"
                  className="flex-grow md:flex-grow-0"
                >
                  <div>{day}</div>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="hidden lg:inline-flex gap-2 h-12 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            {(process.env.NODE_ENV !== "production" || isAdmin) && (
              <JsonEditor></JsonEditor>
            )}
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
            weekIndex={timetableStore.weeks.indexOf(weekParam)}
            dayIndex={timetableStore.days.indexOf(dayParam)}
            data={
              timetableStore.timetable[timetableStore.weeks.indexOf(weekParam)]
                .days[timetableStore.days.indexOf(dayParam)].classEntries
            }
          />
        </div>
        <div className="inline-flex lg:hidden w-full gap-2 h-12 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
          {(process.env.NODE_ENV !== "production" || isAdmin) && (
            <JsonEditor></JsonEditor>
          )}
          <Link
            href="/settings?page=Timetable"
            className="text-nowrap inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors  disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground hover:bg-background bg-transparent h-10 px-3"
          >
            Settings
          </Link>
          <AboutTimetable></AboutTimetable>
        </div>
      </div>
    </div>
  );
}
