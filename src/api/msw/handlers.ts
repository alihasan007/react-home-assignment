import { http, HttpResponse, HttpHandler } from "msw";
import { type Epic, type Iteration } from "../../models/types";
import { v4 as uuid } from "uuid";

// Mock Data
const sampleEpics: Epic[] = [
  {
    id: "E-1",
    name: "User Onboarding",
    description: "Improve sign-up funnel and onboarding emails.",
    plannedPoints: 120,
    completedPoints: 100,
    owner: "Alice",
    riskLevel: "medium",
    teamName: "Auth",
    iterations: [
      {
        id: uuid(),
        name: "Iteration-1",
        plannedPoints: 30,
        completedPoints: 28,
      },
      {
        id: uuid(),
        name: "Iteration-2",
        plannedPoints: 30,
        completedPoints: 25,
      },
      {
        id: uuid(),
        name: "Iteration-3",
        plannedPoints: 30,
        completedPoints: 23,
      },
      {
        id: uuid(),
        name: "Iteration-4",
        plannedPoints: 30,
        completedPoints: 24,
      },
    ],
  },
  {
    id: "E-2",
    name: "Payments & Billing",
    description: "Stabilize billing, refunds, and invoicing.",
    plannedPoints: 80,
    completedPoints: 60,
    owner: "Bob",
    riskLevel: "high",
    teamName: "Payments",
    iterations: [
      {
        id: uuid(),
        name: "Iteration-1",
        plannedPoints: 20,
        completedPoints: 18,
      },
      {
        id: uuid(),
        name: "Iteration-2",
        plannedPoints: 20,
        completedPoints: 10,
      },
      {
        id: uuid(),
        name: "Iteration-3",
        plannedPoints: 20,
        completedPoints: 20,
      },
      {
        id: uuid(),
        name: "Iteration-4",
        plannedPoints: 20,
        completedPoints: 12,
      },
    ],
  },
  {
    id: "E-3",
    name: "Search & Discovery",
    description: "Improve search relevance and discovery surfaces.",
    plannedPoints: 100,
    completedPoints: 105,
    owner: "Carol",
    riskLevel: "low",
    teamName: "Search",
    iterations: [
      {
        id: uuid(),
        name: "Iteration-1",
        plannedPoints: 25,
        completedPoints: 30,
      },
      {
        id: uuid(),
        name: "Iteration-2",
        plannedPoints: 25,
        completedPoints: 25,
      },
      {
        id: uuid(),
        name: "Iteration-3",
        plannedPoints: 25,
        completedPoints: 25,
      },
      {
        id: uuid(),
        name: "Iteration-4",
        plannedPoints: 25,
        completedPoints: 25,
      },
    ],
  },
];

// Utility delay helper
const delay = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

export const handlers: HttpHandler[] = [
  /**
   * GET /api/epics
   * Supports query params: ?q=&team=
   */
  http.get("/api/epics", async ({ request }) => {
    const url = new URL(request.url);

    const q: string = url.searchParams.get("q") ?? "";
    const team: string = url.searchParams.get("team") ?? "";

    let result: Epic[] = sampleEpics;

    if (q) {
      const lower = q.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(lower) ||
          (e.description ?? "").toLowerCase().includes(lower)
      );
    }

    if (team) {
      result = result.filter((e) => e.teamName === team);
    }

    await delay(300);

    return HttpResponse.json<Epic[]>(result, { status: 200 });
  }),

  /**
   * GET /api/epics/:id
   */
  http.get("/api/epics/:id", async ({ params }) => {
    const { id } = params as { id: string };

    const epic = sampleEpics.find((e) => e.id === id);

    await delay(200);

    if (!epic) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    return HttpResponse.json<Epic>(epic, { status: 200 });
  }),

  /**
   * GET /api/iterations
   */
  http.get("/api/iterations", async () => {
    const iters: (Iteration & { epicId: string; epicName: string })[] =
      sampleEpics.flatMap((e) =>
        (e.iterations ?? []).map((it) => ({
          ...it,
          epicId: e.id,
          epicName: e.name,
        }))
      );

    await delay(200);

    return HttpResponse.json(iters, { status: 200 });
  }),
];
