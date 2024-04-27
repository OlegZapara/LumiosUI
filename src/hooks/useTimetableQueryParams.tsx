import { useSettingsStore } from "@/app/stores/settings";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

type PeriodType = "week" | "day";

export default function useTimetableQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { days, weeks } = useSettingsStore();

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
    if (!get("week")) update("week", weeks[0]);
    if (!get("day")) update("day", days[0]);
  }, [get, days, weeks, update]);

  return { get, update };
}
