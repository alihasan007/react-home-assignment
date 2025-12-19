export type RiskLevel = "low" | "medium" | "high";

export type Iteration = {
  id: string;
  name: string;
  plannedPoints: number;
  completedPoints: number;
};

export interface Epic {
  iterations: Iteration[];
  id: string;
  name: string;
  description: string;
  plannedPoints: number;
  completedPoints: number;
  owner: string;
  riskLevel: RiskLevel;
  teamName: string;
}
