import { useEffect, useState } from "react";
import type { Epic } from "../types/epics";
import { fetchEpicsApi } from "../api/epicsAPI";

export function useEpics() {
  const [data, setData] = useState<Epic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    fetchEpicsApi()
      .then((epics) => {
        if (mounted) {
          setData(epics);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setError("Failed to load epics");
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}
