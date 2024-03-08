import { Timetable, TimetableEntry } from "@/app/timetable/columns";
import { createSlice } from "@reduxjs/toolkit";

type EditRowInfo = {
  weekIndex: number, 
  dayIndex: number, 
  rowIndex: number
}

interface TimetableState{
  currentWeek: number
  currentDay: number
  timetable: Timetable[] | null
  editingRow: TimetableEntry | null
  editingRowIndex: number
  editRowInfo: EditRowInfo
}

const initialState:TimetableState = {
  currentWeek: 0,
  currentDay: 0,
  timetable: null,
  editRowInfo: { weekIndex: -1, dayIndex: -1, rowIndex: -1 },
  editingRow: null,
  editingRowIndex: -1
} as unknown as TimetableState

export const timetableSlice = createSlice({
  name:'timetable',
  initialState,
  reducers: {
    setCurrentDayAndWeek: (state, action: {payload: {week: number, day: number}}) => {
      state.currentWeek = action.payload.week;
      state.currentDay = action.payload.day;
    },
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
    },
    addRow: (state) => {
      state.timetable![state.currentWeek].days[state.currentDay].classEntries = 
      [...state.timetable![state.currentWeek].days[state.currentDay].classEntries, {
        className: "",
        startTime: "",
        endTime: "",
        classType: "",
        url: "",
      }]
    },
    deleteRow: (state, action: {payload: number}) => {
      state.timetable![state.currentWeek].days[state.currentDay].classEntries = 
      state.timetable![state.currentWeek].days[state.currentDay].classEntries.filter((_, i) => i != action.payload)
    }
  }
})


export const { setCurrentDayAndWeek, startEditRow, completeEdit, discardEdit, updateEntry, setTimetable, viewState, addRow, deleteRow} = timetableSlice.actions;
export default timetableSlice.reducer;
