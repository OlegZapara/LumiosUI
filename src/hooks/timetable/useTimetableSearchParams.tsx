import { withFallback } from "@/utils/schema-extensions";
import { days, weeks } from "@/schemas/timetable-schema";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";

const dayUrlSchema = withFallback(
  z.string().refine((value) => value && days.some((day) => day == value)),
  days[0],
);

const weekUrlSchema = withFallback(
  z.string().refine((value) => value && weeks.some((week) => week == value)),
  weeks[0],
);

export function useTimetableSearchParams() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const day = dayUrlSchema.parse(searchParams.get("day")) as string;
  const week = weekUrlSchema.parse(searchParams.get("week")) as string;
  const dayIndex = days.indexOf(day);
  const weekIndex = weeks.indexOf(week);

  useEffect(() => {
    navigate(week, day);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function navigate(week: string, day: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("day", day);
    params.set("week", week);
    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
  }

  return { day, dayIndex, week, weekIndex, navigate };
}
