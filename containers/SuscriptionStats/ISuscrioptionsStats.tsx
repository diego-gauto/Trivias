export interface Stats {
  month: number;
  quarter: number;
  anual: number;
}

export interface StatsByType {
  new: Stats;
  renewed: Stats;
  reactive: Stats;
  canceled: Stats;
  inactive: Stats
}

export interface StatsByDate extends Record<string, Stats> { }

export interface StatsByRange {
  new: StatsByDate;
  renewed: StatsByDate;
  reactive: StatsByDate;
  canceled: StatsByDate;
  inactive: StatsByDate;
}