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
  validEdit: any;
  weeks: string[];
  days: string[];
  startEdit: (info: RowInfo) => void;
  discardEdit: () => void;
  completeEdit: () => Promise<boolean>;
  addRow: ({ week, day }: { week: number; day: number }) => void;
  updateRow: (row: TimetableEntry) => void;
  removeRow: (info: RowInfo) => void;
  setValid: (column: string, isValid: boolean) => void;
  fetchTimetable: () => Promise<void>;
  updateTimetable: (newTimetable: Timetable[]) => Promise<Response>;
  createTimetable: (newTimetable: Timetable[]) => Promise<Response>;
  deleteTimetable: () => Promise<Response>;
}

const NO_EDIT_ROW: RowInfo = { week: -1, day: -1, row: -1, index: -1 };
const ALL_FIELDS_VALID = {
  className: true,
  startTime: true,
  endTime: true,
  classType: true,
  url: true,
};

export const useTimetableStore = create<TimetableState>((set, get) => ({
  timetable: null,
  editingRow: null,
  editRowInfo: NO_EDIT_ROW,
  validEdit: ALL_FIELDS_VALID,
  weeks: ["First week", "Second week"],
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  startEdit: (info: RowInfo) => {
    set({
      editRowInfo: info,
      editingRow:
        get().timetable![info.week].days[info.day].classEntries[info.row],
      validEdit: { ...ALL_FIELDS_VALID },
    });
  },
  discardEdit: () => {
    const editRowInfo = get().editRowInfo;
    const editingEntry =
      get().timetable![editRowInfo.week].days[editRowInfo.day].classEntries[
        editRowInfo.row
      ];
    if (editingEntry.className == "") {
      get().removeRow(editRowInfo);
    }
    set({
      editingRow: null,
      editRowInfo: NO_EDIT_ROW,
      validEdit: { ...ALL_FIELDS_VALID },
    });
  },
  completeEdit: async () => {
    let ok = true;
    for (const [key, value] of Object.entries(get().validEdit)) {
      if (value == false) ok = false;
      if ((get().editingRow as any)[key] == "" && key != "url") {
        ok = false;
        const validInfo = get().validEdit;
        validInfo[key] = false;
        set({ validEdit: validInfo });
      }
    }
    if (!ok) return false;
    const { week, day, row } = get().editRowInfo;
    const newTimetable = produce(get().timetable, (timetable: Timetable[]) => {
      timetable![week].days[day].classEntries[row] = get().editingRow!;
    });
    await get().updateTimetable(newTimetable!);
    set({
      timetable: newTimetable,
      editingRow: null,
      editRowInfo: NO_EDIT_ROW,
      validEdit: { ...ALL_FIELDS_VALID },
    });
    return true;
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
      validEdit: { ...ALL_FIELDS_VALID },
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
  setValid: (column: string, isValid: boolean) => {
    set((state) => {
      const validInfo = state.validEdit;
      validInfo[column] = isValid;
      console.log(validInfo);
      return { validEdit: validInfo };
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
