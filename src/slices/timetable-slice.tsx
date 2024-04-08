import { Timetable, TimetableEntry } from "@/app/timetable/columns";
import { createSlice } from "@reduxjs/toolkit";

type RowInfo = {
  week: number;
  day: number;
  row: number;
  index: number;
};

const NO_EDIT_ROW: RowInfo = { week: -1, day: -1, row: -1, index: -1 };

interface TimetableState {
  timetable: Timetable[] | null;
  editingRow: TimetableEntry | null;
  editRowInfo: RowInfo;
  requireUpdate: boolean;
}

const initialState: TimetableState = {
  timetable: null,
  editRowInfo: NO_EDIT_ROW,
  editingRow: null,
  requireUpdate: false,
} as TimetableState;

const emptyRow = {
  className: "",
  startTime: "",
  endTime: "",
  classType: "",
  url: "",
};

export const timetableSlice = createSlice({
  name: "timetable",
  initialState,
  reducers: {
    startEditRow: (state, action: { payload: RowInfo }) => {
      const { week, day, row } = action.payload;
      state.editRowInfo = action.payload;
      state.editingRow = state.timetable![week].days[day].classEntries[row];
    },
    completeEdit: (state) => {
      const { week, day, row } = state.editRowInfo;
      state.timetable![week].days[day].classEntries[row] = state.editingRow!;
      state.editRowInfo = NO_EDIT_ROW;
      state.editingRow = null;
      state.requireUpdate = true;
    },
    completeUpdate: (state) => {
      state.requireUpdate = false;
    },
    discardEdit: (state) => {
      state.editRowInfo = NO_EDIT_ROW;
      state.editingRow = null;
    },
    updateEntry: (state, action: { payload: TimetableEntry }) => {
      state.editingRow = { ...action.payload };
    },
    setTimetable: (state, action: { payload: Timetable[] }) => {
      state.timetable = JSON.parse(JSON.stringify(action.payload));
    },
    addRow: (state, action: { payload: { week: number; day: number } }) => {
      const { week, day } = action.payload;
      state.timetable![week].days[day].classEntries = [
        ...state.timetable![week].days[day].classEntries,
        emptyRow,
      ];
      const lastItemIndex =
        state.timetable![week].days[day].classEntries.length - 1;
      state.editRowInfo = { ...action.payload, row: lastItemIndex, index: 0 };
      state.editingRow =
        state.timetable![week].days[day].classEntries[lastItemIndex];
    },
    deleteRow: (state, action: { payload: RowInfo }) => {
      const { week, day, row } = action.payload;
      state.timetable![week].days[day].classEntries = state.timetable![
        week
      ].days[day].classEntries.filter((_, i) => i != row);
      state.requireUpdate = true;
    },
  },
});

export const {
  startEditRow,
  completeEdit,
  completeUpdate,
  discardEdit,
  updateEntry,
  setTimetable,
  addRow,
  deleteRow,
} = timetableSlice.actions;
export default timetableSlice.reducer;
