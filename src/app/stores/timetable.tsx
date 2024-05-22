import { Timetable, TimetableEntry } from "@/shared/types";
import { create } from "zustand";
import { produce } from "immer";
import { useUsersStore } from "./users";

type RowInfo = {
  week: number;
  day: number;
  row: number;
  index: number;
};

interface TimetableState {
  timetable: Timetable[] | null;
  editingRow: TimetableEntry | null;
  editRowInfo: RowInfo;
  weeks: string[];
  days: string[];
  startEdit: (info: RowInfo) => void;
  discardEdit: () => void;
  completeEdit: (data: TimetableEntry) => Promise<boolean>;
  addRow: ({ week, day }: { week: number; day: number }) => void;
  updateRow: (row: TimetableEntry) => void;
  removeRow: (info: RowInfo) => void;
  fetchTimetable: () => Promise<void>;
  updateTimetable: (newTimetable: Timetable[]) => Promise<Response>;
  createTimetable: (newTimetable: Timetable[]) => Promise<Response>;
  deleteTimetable: () => Promise<Response>;
}

const NO_EDIT_ROW: RowInfo = { week: -1, day: -1, row: -1, index: -1 };
export const EMPTY_ENTRY: TimetableEntry = {
  className: "",
  startTime: "",
  endTime: "",
  classType: "",
  url: "",
};

export const useTimetableStore = create<TimetableState>((set, get) => ({
  timetable: null,
  editingRow: null,
  editRowInfo: NO_EDIT_ROW,
  weeks: ["First week", "Second week"],
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  startEdit: (info: RowInfo) => {
    set({
      editRowInfo: info,
      editingRow:
        get().timetable![info.week].days[info.day].classEntries[info.row],
    });
  },
  discardEdit: () => {
    if (!get().editingRow?.className) {
      get().removeRow(get().editRowInfo);
    }
    set({
      editingRow: null,
      editRowInfo: { ...NO_EDIT_ROW },
    });
  },
  completeEdit: async (data: TimetableEntry) => {
    const { week, day, row } = get().editRowInfo;
    const newTimetable = produce(get().timetable, (timetable: Timetable[]) => {
      timetable![week].days[day].classEntries[row] = data;
    });
    await get().updateTimetable(newTimetable!);
    set({
      timetable: newTimetable,
      editingRow: null,
      editRowInfo: NO_EDIT_ROW,
    });
    return true;
  },
  addRow: ({ week, day }: { week: number; day: number }) => {
    const timetable = produce(get().timetable, (newTimetable) => {
      newTimetable![week].days[day].classEntries.push({ ...EMPTY_ENTRY });
    })!;
    const nextRow = timetable[week].days[day].classEntries.length - 1;
    set({
      timetable,
      editRowInfo: { week, day, row: nextRow, index: 0 },
      editingRow: timetable[week].days[day].classEntries.at(-1),
    });
  },
  updateRow: (row: TimetableEntry) => {
    set({ editingRow: row });
  },
  removeRow: (info: RowInfo) => {
    const newTimetable = produce(get().timetable, (newTimetable) => {
      newTimetable![info.week].days[info.day].classEntries.splice(info.row, 1);
    });
    get().updateTimetable(newTimetable!);
    set({
      timetable: newTimetable,
    });
  },
  fetchTimetable: async () => {
    const chatId = useUsersStore.getState().chatId;
    if (chatId === null) throw new Error("Chat id must not be null");
    const result = await fetch(`/api/timetables?chatId=${chatId}`);
    if (!result.ok) {
      set({ timetable: [] });
      return;
    }
    set({ timetable: await result.json() });
  },
  updateTimetable: async (newTimetable: Timetable[]) => {
    const chatId = useUsersStore.getState().chatId;
    if (chatId === null) throw new Error("Chat id must not be null");
    return await fetch(`/api/timetables?chatId=${chatId}`, {
      method: "PUT",
      body: JSON.stringify(newTimetable),
    });
  },
  createTimetable: async (newTimetable: Timetable[]) => {
    const chatId = useUsersStore.getState().chatId;
    if (chatId === null) throw new Error("Chat id must not be null");
    return await fetch(`/api/timetables?chatId=${chatId}`, {
      method: "POST",
      body: JSON.stringify(newTimetable),
    });
  },
  deleteTimetable: async () => {
    const chatId = useUsersStore.getState().chatId;
    if (chatId === null) throw new Error("Chat id must not be null");
    return await fetch(`/api/timetables?chatId=${chatId}`, {
      method: "DELETE",
    });
  },
}));
