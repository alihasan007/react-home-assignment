import { epics } from "../data/epics";
import type { Epic } from "../types/epics";

export function fetchEpicsApi(): Promise<Epic[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(epics);
    }, 500); // simulate network delay
  });
}
