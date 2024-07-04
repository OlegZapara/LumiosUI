"use client";
import AboutTimetable from "@/components/timetable/about-timetable";
import JsonEditor from "@/components/timetable/json-editor";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTimetableSearchParams } from "@/hooks/timetable/useTimetableSearchParams";
import { days, weeks } from "@/schemas/timetable-schema";
import Link from "next/link";

export default function TimetableActions({ isAdmin }: { isAdmin: boolean }) {
  const { day, week, navigate } = useTimetableSearchParams();

  return (
    <div className="flex w-full flex-wrap justify-between gap-4 md:flex-nowrap">
      <div className="flex w-full flex-col justify-start gap-4 md:flex-row">
        <ToggleGroup
          type="single"
          value={week}
          onValueChange={(newWeek) => navigate(newWeek, day)}
        >
          {weeks.map((w, i) => (
            <ToggleGroupItem
              className="text-nowrap"
              key={w}
              value={w}
              data-state={w == week ? "on" : "off"}
              aria-label="Change week"
            >
              {w}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <ToggleGroup
          type="single"
          value={day}
          className="h-auto flex-wrap px-6 md:h-12 md:flex-nowrap md:px-1"
          onValueChange={(newDay) => navigate(week, newDay)}
        >
          {days.map((d, i) => (
            <ToggleGroupItem
              key={d}
              value={d}
              data-state={d == day ? "on" : "off"}
              aria-label="Change day"
              className="flex-grow md:flex-grow-0"
            >
              {d}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="hidden h-12 items-center justify-center gap-2 rounded-md bg-muted p-1 text-muted-foreground lg:inline-flex">
        {(process.env.NODE_ENV !== "production" || isAdmin) && (
          <JsonEditor></JsonEditor>
        )}
        <Link
          href="/settings?page=Timetable"
          className="inline-flex h-10 items-center justify-center text-nowrap rounded-md bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-background hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
        >
          Settings
        </Link>
        <AboutTimetable></AboutTimetable>
      </div>
    </div>
  );
}

// function TimetableToggleGroup() {
//   return (
//     <ToggleGroup
//       type="single"
//       value={day}
//       onValueChange={(newWeek) => navigate(newWeek, day)}
//     >
//       {weeks.map((w, i) => (
//         <ToggleGroupItem
//           className="text-nowrap"
//           key={w}
//           value={w}
//           data-state={w == week ? "on" : "off"}
//           aria-label="Change week"
//         >
//           {w}
//         </ToggleGroupItem>
//       ))}
//     </ToggleGroup>
//   );
// }
