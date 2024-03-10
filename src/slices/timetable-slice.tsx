import { Timetable, TimetableEntry } from "@/app/timetable/columns";
import { createSlice } from "@reduxjs/toolkit";

type EditRowInfo = {
  weekIndex: number;
  dayIndex: number;
  rowIndex: number;
};

interface TimetableState {
  timetable: Timetable[] | null;
  editingRow: TimetableEntry | null;
  editingRowIndex: number;
  editRowInfo: EditRowInfo;
}

const initialState: TimetableState = {
  timetable: null,
  editRowInfo: { weekIndex: -1, dayIndex: -1, rowIndex: -1 },
  editingRow: null,
  editingRowIndex: -1,
} as TimetableState;

export const timetableSlice = createSlice({
  name: "timetable",
  initialState,
  reducers: {
    startEditRow: (state, action: { payload: EditRowInfo }) => {
      state.editRowInfo = action.payload;
      state.editingRow =
        state.timetable![action.payload.weekIndex].days[
          action.payload.dayIndex
        ].classEntries[action.payload.rowIndex];
      state.editingRowIndex = action.payload.rowIndex;
    },
    completeEdit: (state) => {
      state.timetable![state.editRowInfo.weekIndex].days[
        state.editRowInfo.dayIndex
      ].classEntries[state.editRowInfo.rowIndex] = state.editingRow!;
      state.editRowInfo = { weekIndex: -1, dayIndex: -1, rowIndex: -1 };
      state.editingRowIndex = -1;
      state.editingRow = null;
    },
    discardEdit: (state) => {
      state.editRowInfo = { weekIndex: -1, dayIndex: -1, rowIndex: -1 };
      state.editingRowIndex = -1;
      state.editingRow = null;
    },
    updateEntry: (state, action: { payload: TimetableEntry }) => {
      state.editingRow = { ...action.payload };
    },
    setTimetable: (state, action: { payload: Timetable[] }) => {
      state.timetable = JSON.parse(JSON.stringify(action.payload));
    },
    addRow: (
      state,
      action: { payload: { currentWeek: number; currentDay: number } }
    ) => {
      state.timetable![action.payload.currentWeek].days[
        action.payload.currentDay
      ].classEntries = [
        ...state.timetable![action.payload.currentWeek].days[
          action.payload.currentDay
        ].classEntries,
        {
          className: "",
          startTime: "",
          endTime: "",
          classType: "",
          url: "",
        },
      ];
    },
    deleteRow: (state, action: { payload: EditRowInfo }) => {
      state.timetable![action.payload.weekIndex].days[
        action.payload.dayIndex
      ].classEntries = state.timetable![action.payload.weekIndex].days[
        action.payload.dayIndex
      ].classEntries.filter((_, i) => i != action.payload.rowIndex);
    },
  },
});

export const {
  startEditRow,
  completeEdit,
  discardEdit,
  updateEntry,
  setTimetable,
  addRow,
  deleteRow,
} = timetableSlice.actions;
export default timetableSlice.reducer;
