import type { RootState } from "../../store";

export const selectEpicsList = (state: RootState) => state.epics.list;

export const selectSelectedEpicId = (state: RootState) =>
  state.epics.selectedId;

export const selectedEpic = (state: RootState) =>
  state.epics.list.find((e) => e.id === state.epics.selectedId) ?? null;
