import { Timetable, TimetableEntry } from "@/app/timetable/columns";
import { createSlice } from "@reduxjs/toolkit";

type EditRowInfo = {
  weekIndex: number, 
  dayIndex: number, 
  rowIndex: number
}

interface TimetableState{
  timetable: Timetable[] | null
  editingRow: TimetableEntry | null
  editingRowIndex: number
  editRowInfo: EditRowInfo
}

const initialState:TimetableState = {
  timetable: null,
  editRowInfo: { weekIndex: -1, dayIndex: -1, rowIndex: -1 },
  editingRow: null,
  editingRowIndex: -1
} as unknown as TimetableState

export const timetableSlice = createSlice({
  name:'timetable',
  initialState,
  reducers: {
    startEditRow: (state, action: { payload: EditRowInfo }) => {
      state.editRowInfo = action.payload
      state.editingRow = state.timetable![action.payload.weekIndex].days[action.payload.dayIndex].classEntries[action.payload.rowIndex]
      state.editingRowIndex = action.payload.rowIndex
      console.log("Now editing", action.payload)
    },
    completeEdit: (state) => {
      state.timetable![state.editRowInfo.weekIndex].days[state.editRowInfo.dayIndex].classEntries[state.editRowInfo.rowIndex] = state.editingRow!
      state.editRowInfo = { weekIndex: -1, dayIndex: -1, rowIndex: -1 },
      state.editingRowIndex = -1;
      state.editingRow = null,
      console.log("Finished editing", state.editingRowIndex)
    },
    discardEdit: (state) => {
      state.editRowInfo = { weekIndex: -1, dayIndex: -1, rowIndex: -1 },
      state.editingRowIndex = -1;
      state.editingRow = null,
      console.log("Discared editing", state.editingRowIndex)
    },
    updateEntry: (state, action: {payload: TimetableEntry}) => {
      state.editingRow = {...action.payload}
    },
    setTimetable: (state, action: {payload: Timetable[]}) => {
      state.timetable = JSON.parse(JSON.stringify(action.payload))
      console.log(state.timetable)
    },
    viewState: (state) => {
      console.log(JSON.stringify(state.timetable, null, 2))
    }
  }
})


export const { startEditRow, completeEdit, discardEdit, updateEntry, setTimetable, viewState } = timetableSlice.actions;
export default timetableSlice.reducer;
