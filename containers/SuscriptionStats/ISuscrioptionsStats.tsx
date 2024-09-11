export interface Stats {
  month: number;
  quarter: number;
  anual: number;
}

export interface StatsByDate {
  new: Stats;
  renewed: Stats;
  reactive: Stats;
  canceled: Stats;
  inactive: Stats
}

export interface StatsByRange {
  new: Record<string, Stats>;
  renewed: Record<string, Stats>;
  reactive: Record<string, Stats>;
  canceled: Record<string, Stats>;
  inactive: Record<string, Stats>;
}