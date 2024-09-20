import { updateTimetable } from "@/actions/timetable-actions";
import {
  days,
  Timetable,
  TimetableEntry,
  weeks,
} from "@/schemas/timetable-schema";
import { produce } from "immer";
import { create } from "zustand";

type RowInfo = {
  week: number;
  day: number;
  row: number;
  index: number;
};
interface TimetableState {
  timetable: Timetable | null;
  editingRow: TimetableEntry | null;
  editRowInfo: RowInfo;
  weeks: string[];
  days: string[];
  startEdit: (info: RowInfo) => void;
  discardEdit: () => void;
  completeEdit: (data: TimetableEntry) => Promise<boolean>;
  addRow: ({ week, day }: { week: number; day: number }) => Promise<void>;
  updateRow: (row: TimetableEntry) => void;
  removeRow: (info: RowInfo) => Promise<void>;
  setTimetable: (timetable: Timetable) => Promise<void>;
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
  weeks: weeks,
  days: days,
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
    const newTimetable = produce(get().timetable, (timetable: Timetable) => {
      timetable![week].days[day].classEntries[row] = data;
    })!;
    await updateTimetable(newTimetable);
    set({
      timetable: newTimetable,
      editingRow: null,
      editRowInfo: NO_EDIT_ROW,
    });
    return true;
  },
  addRow: async ({ week, day }: { week: number; day: number }) => {
    const newTimetable = produce(get().timetable, (timetable) => {
      timetable![week].days[day].classEntries.push({ ...EMPTY_ENTRY });
    })!;
    const nextRow = newTimetable[week].days[day].classEntries.length - 1;
    await updateTimetable(newTimetable);
    set({
      timetable: newTimetable,
      editRowInfo: { week, day, row: nextRow, index: 0 },
      editingRow: newTimetable[week].days[day].classEntries.at(-1),
    });
  },
  updateRow: (row: TimetableEntry) => {
    set({ editingRow: row });
  },
  removeRow: async (info: RowInfo) => {
    const newTimetable = produce(get().timetable, (newTimetable) => {
      newTimetable![info.week].days[info.day].classEntries.splice(info.row, 1);
    })!;
    await updateTimetable(newTimetable);
    set({
      timetable: newTimetable,
    });
  },
  setTimetable: async (timetable: Timetable) => {
    set({ timetable });
  },
}));
