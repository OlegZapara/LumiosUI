import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useTimetableStore } from "@/app/stores/timetable";
import { withFallback } from "@/app/utils/schema-extensions";
import { z } from "zod";

type PeriodType = "week" | "day";

const getWeek = function (weeks: string[]) {
  const date = new Date();
  const onejan = new Date(date.getFullYear(), 0, 1);
  return weeks[
    // @ts-ignore
    (Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7) + 1) %
      weeks.length
  ];
};

function clamp(num: number, min: number, max: number) {
  return num <= min ? min : num >= max ? max : num;
}

export default function useTimetableSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { days, weeks } = useTimetableStore();
  const pathname = usePathname();

  const urlDaySchema = withFallback(
    z
      .string()
      .optional()
      .refine((value) => {
        return value && days.some((x) => x == value);
      }),
    days[clamp(new Date().getDay() - 1, 0, days.length - 1)],
  );

  const urlWeekSchema = withFallback(
    z
      .string()
      .optional()
      .refine((value) => {
        return value && weeks.some((x) => x == value);
      }),
    getWeek(weeks),
  );

  useEffect(() => {
    router.push(
      `?week=${urlWeekSchema.parse(searchParams.get("week"))}&day=${urlDaySchema.parse(searchParams.get("day"))}`,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  // const get = useCallback(
  //   (type: PeriodType) => {
  //     return searchParams.get(type);
  //   },
  //   [searchParams],
  // );
  const updateSearchParams = useCallback(
    (type: PeriodType, value: string) => {
      return (
        value && router.push(pathname + "?" + createQueryString(type, value))
      );
    },
    [router, pathname, createQueryString],
  );
  //
  // useEffect(() => {
  //   if (!get("week")) update("week", weeks[0]);
  //   if (!get("day")) update("day", days[0]);
  // }, [get, days, weeks, update]);

  return { searchParams, updateSearchParams };
}
