import { RootState } from "@/app/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export type TimetablePageSettings = {
  chatId: string;
  enableTimetableHeader: boolean;
  weeks: string[];
  days: string[];
};
const chatIdKey = "chatId";
const enableHeaderKey = "enableHeader";

const timetableDays: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timetableWeeks: string[] = ["First week", "Second week"];

const defaultSettings: TimetablePageSettings = {
  chatId: "",
  enableTimetableHeader: true,
  weeks: timetableWeeks,
  days: timetableDays,
};

export default function useTimetableSettings(): [
  TimetablePageSettings,
  (settings: TimetablePageSettings) => void
] {
  const [timetableSettings, setTimetableSettings] =
    useState<TimetablePageSettings>(() => {
      if (typeof localStorage == "undefined") return defaultSettings;
      return {
        chatId: localStorage.getItem(chatIdKey) || "",
        enableTimetableHeader:
          localStorage.getItem(enableHeaderKey) == "on" ? true : false,
        weeks: timetableWeeks,
        days: timetableDays,
      };
    });
  useEffect(() => {
    localStorage.setItem(chatIdKey, timetableSettings.chatId);
    localStorage.setItem(
      enableHeaderKey,
      timetableSettings.enableTimetableHeader ? "on" : "off"
    );
  }, [timetableSettings]);

  return [timetableSettings, setTimetableSettings];
}
