import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Epic = {
  id: string;
  name: string;
  description: string;
  plannedPoints: number;
  completedPoints: number;
  owner: string;
  riskLevel: "low" | "medium" | "high";
  teamName: string;
};

type EpicsState = {
  list: Epic[];
  selectedId: string | null;
};

const initialState: EpicsState = {
  list: [
    {
      id: "E-1",
      name: "Authentication",
      description: "Login & access control",
      plannedPoints: 40,
      completedPoints: 35,
      owner: "Alice",
      riskLevel: "medium",
      teamName: "Platform",
    },
    {
      id: "E-2",
      name: "Payments",
      description: "Payment gateway integration",
      plannedPoints: 30,
      completedPoints: 45,
      owner: "Bob",
      riskLevel: "high",
      teamName: "Checkout",
    },
  ],
  selectedId: null,
};

const epicsSlice = createSlice({
  name: "epics",
  initialState,
  reducers: {
    setSelectedEpic(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload;
    },
  },
});

export const { setSelectedEpic } = epicsSlice.actions;
export default epicsSlice.reducer;
