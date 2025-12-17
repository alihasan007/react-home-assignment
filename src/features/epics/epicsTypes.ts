import type { Epic } from "../../models/types";

export interface EpicsState {
  list: Epic[];
  loading: boolean;
  error: string | null;
  selectedId: string | null;
  search: string;
  teamFilter: string | null;
  onlyOverrun: boolean;
}
