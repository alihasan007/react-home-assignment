import { useMemo, useState } from "react";
import type { Epic } from "../types/epics";
import { useDebounce } from "./useDebounce";

export function useEpicFilters(epics: Epic[]) {
  const [search, setSearch] = useState("");
  const [team, setTeam] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    let result = epics;

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          (e.description ?? "").toLowerCase().includes(q)
      );
    }

    if (team) {
      result = result.filter((e) => e.teamName === team);
    }

    return result;
  }, [epics, debouncedSearch, team]);

  const teams = useMemo(
    () => Array.from(new Set(epics.map((e) => e.teamName))),
    [epics]
  );

  return {
    search,
    setSearch,
    team,
    setTeam,
    teams,
    filtered,
  };
}
