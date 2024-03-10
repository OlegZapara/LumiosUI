import { createSlice } from "@reduxjs/toolkit";

interface SettingsState {
  theme: string;
}

const initialState: SettingsState = {
  theme: "white",
} as unknown as SettingsState;

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state.theme == "white") {
        state.theme = "dark";
      } else {
        state.theme = "white";
      }
    },
  },
});

export const { toggleTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
