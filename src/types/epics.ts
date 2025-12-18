export type RiskLevel = "low" | "medium" | "high";

export interface Epic {
  id: string;
  name: string;
  description: string;
  plannedPoints: number;
  completedPoints: number;
  owner: string;
  riskLevel: RiskLevel;
  teamName: string;
}
