import { createSlice } from "@reduxjs/toolkit";

const chatIdKey = "chatId";
const enableTimetableHeaderKey = "enableHeader";

interface SettingsState {
  chatId: string | null;
  enableTimetableHeader: boolean;
  timetableWeeks: string[];
  timetableDays: string[];
}


const initialState: SettingsState = {
  chatId: null,
  enableTimetableHeader: true,
  timetableWeeks: ["First week", "Second week"],
  timetableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    syncSettings: (state) => {
      state.chatId = localStorage.getItem(chatIdKey);
      if(state.chatId === null){
        localStorage.setItem(chatIdKey, "");
        state.chatId = ""
      }
      state.enableTimetableHeader = localStorage.getItem(enableTimetableHeaderKey) == "off" ? false : true
    },
    updateChatId: (state, action: { payload: string }) => {
      state.chatId = action.payload;
      localStorage.setItem(chatIdKey, action.payload);
    },
    updateTimetableHeader: (state, action: { payload: boolean }) => {
      state.enableTimetableHeader = action.payload;
      localStorage.setItem(
        enableTimetableHeaderKey,
        action.payload ? "on" : "off"
      );
    },
  },
});

export const { syncSettings, updateChatId, updateTimetableHeader} = settingsSlice.actions;
export default settingsSlice.reducer;
