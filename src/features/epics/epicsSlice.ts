import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Epic } from "../../types/epics";
import { fetchEpicsApi } from "../../api/epicsAPI";

type EpicsState = {
  list: Epic[];
  selectedId: string | null;
  loading: boolean;
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
  loading: false,
};

export const fetchEpicById = createAsyncThunk(
  "epics/fetchById",
  async (id: string) => {
    const list = await fetchEpicsApi();
    return list.find((e) => e.id === id) ?? null;
  }
);

const epicsSlice = createSlice({
  name: "epics",
  initialState,
  reducers: {
    setSelectedEpic(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpicById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEpicById.fulfilled, (state, action: PayloadAction<Epic | null>) => {
        state.loading = false;
        const epic = action.payload;
        if (epic) {
          const exists = state.list.some((e) => e.id === epic.id);
          if (!exists) {
            state.list.push(epic);
          }
        }
      })
      .addCase(fetchEpicById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSelectedEpic } = epicsSlice.actions;
export default epicsSlice.reducer;
