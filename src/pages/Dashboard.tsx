import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  selectEpicsList,
  selectSelectedEpicId,
} from "../features/epics/epicsSelectors";
import { setSelectedEpic } from "../features/epics/epicsSlice";
import Table from "../components/table/Table";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const epics = useAppSelector(selectEpicsList);
  const selectedId = useAppSelector(selectSelectedEpicId);

  const totalPlanned = epics.reduce((s, e) => s + e.plannedPoints, 0);
  const totalCompleted = epics.reduce((s, e) => s + e.completedPoints, 0);

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

        {/* Table */}
        <div className="bg-white rounded-lg shadow p-4">
          <Table
            data={epics}
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
            onRowClick={(row) => dispatch(setSelectedEpic(row.id))}
          />
        </div>

        {/* Selected */}
        <div className="text-sm text-gray-600">
          Selected Epic:{" "}
          <span className="font-medium">{selectedId ?? "None"}</span>
        </div>
      </div>
    </div>
  );
}
