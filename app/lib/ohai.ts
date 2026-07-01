export interface ScoutReport {
  score: number;
  verdict: string;
}

export function runScoutMission(pool: any): ScoutReport {
  return {
    score: 0,
    verdict: "Watch",
  };
}