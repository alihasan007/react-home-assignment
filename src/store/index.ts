import { configureStore } from "@reduxjs/toolkit";
import epicsReducer from "../features/epics/epicsSlice";

export const store = configureStore({
  reducer: {
    epics: epicsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;