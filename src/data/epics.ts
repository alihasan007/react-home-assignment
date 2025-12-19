import type { Epic } from "../types/epics";

export const epics: Epic[] = [
  {
      id: "1",
      name: "Authentication",
      description: "User login and access control",
      plannedPoints: 40,
      completedPoints: 35,
      owner: "Alice",
      riskLevel: "medium",
      teamName: "Platform",
      iterations: []
  },
  {
      id: "2",
      name: "Payments",
      description: "Payment gateway integration",
      plannedPoints: 50,
      completedPoints: 45,
      owner: "Bob",
      riskLevel: "high",
      teamName: "Checkout",
      iterations: []
  },
];
