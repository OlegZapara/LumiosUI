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
  startEdit: (info: RowInfo) => void;
  discardEdit: () => void;
  completeEdit: () => Promise<void>;
  addRow: ({ week, day }: { week: number; day: number }) => void;
  updateRow: (row: TimetableEntry) => void;
  removeRow: (info: RowInfo) => void;
  fetchTimetable: () => Promise<void>;
  updateTimetable: (newTimetable: Timetable[]) => Promise<void>;
  createTimetable: (newTimetable: Timetable[]) => Promise<void>;
}

const NO_EDIT_ROW: RowInfo = { week: -1, day: -1, row: -1, index: -1 };

export const useTimetableStore = create<TimetableState>((set, get) => ({
  timetable: null,
  editingRow: null,
  editRowInfo: NO_EDIT_ROW,
  startEdit: (info: RowInfo) => {
    set({
      editRowInfo: info,
      editingRow:
        get().timetable![info.week].days[info.day].classEntries[info.row],
    });
  },
  discardEdit: () => {
    set({
      editingRow: null,
      editRowInfo: NO_EDIT_ROW,
    });
  },
  completeEdit: async () => {
    const { week, day, row } = get().editRowInfo;
    const newTimetable = produce(get().timetable, (timetable: Timetable[]) => {
      timetable![week].days[day].classEntries[row] = get().editingRow!;
    });
    await get().updateTimetable(newTimetable!);
    set({
      timetable: newTimetable,
      editingRow: null,
      editRowInfo: NO_EDIT_ROW,
    });
  },
  addRow: ({ week, day }: { week: number; day: number }) => {
    const timetable = produce(get().timetable, (newTimetable) => {
      newTimetable![week].days[day].classEntries.push({
        className: "",
        startTime: "",
        endTime: "",
        classType: "",
        url: "",
      });
    })!;
    set({
      timetable,
      editRowInfo: {
        week,
        day,
        row: timetable[week].days[day].classEntries.length - 1,
        index: 0,
      },
      editingRow: timetable[week].days[day].classEntries.at(-1),
    });
  },
  updateRow: (row: TimetableEntry) => {
    set({ editingRow: row });
  },
  removeRow: (info: RowInfo) => {
    const newTimetable = produce(get().timetable, (newTimetable) => {
      newTimetable![info.week].days[info.day].classEntries.splice(
        info.row,
        info.row
      );
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
    set({ timetable: await result.json() });
  },
  updateTimetable: async (newTimetable: Timetable[]) => {
    const chatId = useUsersStore.getState().chatId;
    if (chatId === null) throw new Error("Chat id must not be null");
    await fetch(`/api/timetables?chatId=${chatId}`, {
      method: "PUT",
      body: JSON.stringify(newTimetable),
    });
  },
  createTimetable: async (newTimetable: Timetable[]) => {
    const chatId = useUsersStore.getState().chatId;
    if (chatId === null) throw new Error("Chat id must not be null");
    await fetch(`/api/timetables?chatId=${chatId}`, {
      method: "POST",
      body: JSON.stringify(newTimetable),
    });
  },
}));
