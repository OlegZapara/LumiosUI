import { configureStore } from '@reduxjs/toolkit';
import timetableReducer from '../slices/timetable-slice';
import settingsSlice from '../slices/settings-slice';

export const store = configureStore({
  reducer: {
    timetable: timetableReducer,
    settings: settingsSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export type RootState = ReturnType<typeof store.getState>;
