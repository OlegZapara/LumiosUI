import { create } from "zustand";

interface SettingsStore {
  weeks: string[];
  days: string[];
}

export const useSettingsStore = create<SettingsStore>(() => ({
  weeks: ["First week", "Second week"],
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
}));
