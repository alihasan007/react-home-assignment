import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import fetchEpicById, { setSelectedEpic } from "../features/epics/epicsSlice";
import Drawer from "../components/ui/Drawer";
import Loader from "../components/ui/Loader";

export default function EpicDetail() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.epics);
  const { selectedId } = useAppSelector((state) => state.epics);
  const isListReady = Array.isArray(state.list);

  // ✅ SAFE derivation
  const epic =
    isListReady && selectedId
      ? state.list.find((e) => e.id === selectedId)
      : undefined;

  // ✅ Hook ALWAYS runs
  useEffect(() => {
    if (!isListReady) return;

    if (selectedId && !epic) {
      void dispatch(fetchEpicById(selectedId));
    }
  }, [dispatch, selectedId, epic, isListReady]);

  function close() {
    dispatch(setSelectedEpic(null));
  }

  // ✅ Early return AFTER hooks
  if (!isListReady) {
    return <Loader />;
  }

  return (
    <Drawer open={!!selectedId} onClose={close}>
      {state.loading && !epic ? (
        <Loader />
      ) : epic ? (
        <div>
          <h2 className="text-xl font-semibold">{epic.name}</h2>
          <div className="text-sm text-gray-500 mb-4">{epic.id}</div>

          <p className="mb-4">{epic.description}</p>

          <div className="mb-4 space-y-1">
            <div>
              <strong>Owner:</strong> {epic.owner}
            </div>
            <div>
              <strong>Team:</strong> {epic.teamName}
            </div>
            <div>
              <strong>Risk:</strong>{" "}
              <span className="capitalize">{epic.riskLevel}</span>
            </div>
          </div>

          <div>
            <strong>Iterations</strong>
            <table className="w-full mt-2 border-collapse">
              <thead>
                <tr className="text-sm text-gray-500 border-b">
                  <th className="p-2 text-left">Iteration</th>
                  <th className="p-2 text-left">Planned</th>
                  <th className="p-2 text-left">Completed</th>
                </tr>
              </thead>
              <tbody>
                {epic.iterations.map((it: any) => (
                  <tr key={it.id} className="border-t">
                    <td className="p-2">{it.name}</td>
                    <td className="p-2">{it.plannedPoints}</td>
                    <td className="p-2">{it.completedPoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-500">No epic selected</div>
      )}
    </Drawer>
  );
}
