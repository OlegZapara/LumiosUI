import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import useTimetableSettings from "./useTimetableSettings";
import { useSelector } from "react-redux";
import { TimetableSettings } from "@/app/timetable/settings";
import { RootState } from "@/app/store";

type PeriodType = "week" | "day";

export default function useTimetableQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const [{weeks: weeks, days}, _] = useTimetableSettings();
  const {timetableDays, timetableWeeks} = useSelector<RootState, TimetableSettings>(state => state.settings)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const get = useCallback(
    (type: PeriodType) => {
      return searchParams.get(type);
    },
    [searchParams]
  );
  const update = useCallback(
    (type: PeriodType, value: string) => {
      return (
        value && router.push(pathname + "?" + createQueryString(type, value))
      );
    },
    [router, pathname, createQueryString]
  );

  useEffect(() => {
    if (!get("week")) update("week", timetableWeeks[0]);
    if (!get("day")) update("day", timetableDays[0]);
  }, [get, timetableDays, timetableWeeks, update]);

  return { get, update };
}
