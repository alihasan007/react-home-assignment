import { useState, useMemo } from "react";
import { epics } from "../data/epics";
import { useAppSelector } from "../app/hook";
import { selectSelectedEpicId } from "../features/epics/epicsSelectors";
import Table from "../components/table/Table";
import { useEpics } from "../hooks/useEpics";
import { useEpicFilters } from "../hooks/useEpicFilters";
import { useDebounce } from "../hooks/useDebounce";

export default function Dashboard() {
  const [selectedEpicId, setSelectedEpicId] = useState<string | null>(null);
  const [epicSearch, setEpicSearch] = useState("");

  const debouncedSearch = useDebounce(epicSearch, 300);
  const { data: list, loading, error } = useEpics();
  const { team, setTeam, teams, filtered } = useEpicFilters(list);

  const selectedId = useAppSelector(selectSelectedEpicId);

  const filteredEpics = useMemo(() => {
    return epics.filter((e) => {
      const matchesSearch = debouncedSearch
        ? e.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        : true;

      return matchesSearch;
    });
  }, [epics, debouncedSearch]);

  const totalPlanned = filtered.reduce((sum, e) => sum + e.plannedPoints, 0);
  const totalCompleted = filtered.reduce(
    (sum, e) => sum + e.completedPoints,
    0
  );
  const selectedEpic = list.find((e) => e.id === selectedEpicId) ?? null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">Loading epics…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">PI Drift Tracker</h1>
          <p className="text-sm text-gray-500">Planned vs Completed Epics</p>
        </div>

        {/* Totals */}
        <div className="flex gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-xs text-gray-500">Total Planned</div>
            <div className="text-xl font-semibold">{totalPlanned}</div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-xs text-gray-500">Total Completed</div>
            <div className="text-xl font-semibold">{totalCompleted}</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            value={epicSearch}
            onChange={(e) => setEpicSearch(e.target.value)}
            placeholder="Search epics..."
            className="w-full sm:w-64 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className="w-full sm:w-48 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Teams</option>
            {teams.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow p-4">
          <Table
            data={filteredEpics}
            columns={[
              { header: "Epic", render: (e) => e.name },
              { header: "Planned", render: (e) => e.plannedPoints },
              { header: "Completed", render: (e) => e.completedPoints },
              {
                header: "Drift %",
                render: (e) => {
                  const drift =
                    ((e.completedPoints - e.plannedPoints) / e.plannedPoints) *
                    100;
                  return (
                    <span
                      className={drift > 0 ? "text-red-600" : "text-green-600"}
                    >
                      {drift.toFixed(1)}%
                    </span>
                  );
                },
              },
              { header: "Owner", render: (e) => e.owner },
              { header: "Risk", render: (e) => e.riskLevel },
            ]}
            onRowClick={(row: unknown) => setSelectedEpicId((row as any).id)}
          />
        </div>

        {/* Selected */}
        <div className="text-sm text-gray-600">
          {selectedEpic && (
            <div className="mt-6 rounded-xl bg-white p-4 shadow">
              <h3 className="text-lg font-semibold">{selectedEpic.name}</h3>
              <p className="mt-1 text-sm text-slate-600">
                {selectedEpic.description}
              </p>

              <div className="mt-3 text-sm">
                <div>
                  <strong>Owner:</strong> {selectedEpic.owner}
                </div>
                <div>
                  <strong>Team:</strong> {selectedEpic.teamName}
                </div>
                <div>
                  <strong>Risk:</strong>{" "}
                  <span className="capitalize">{selectedEpic.riskLevel}</span>
                </div>
              </div>
            </div>
          )}
          <span className="font-medium">{selectedId ?? "None"}</span>
        </div>
      </div>
    </div>
  );
}
