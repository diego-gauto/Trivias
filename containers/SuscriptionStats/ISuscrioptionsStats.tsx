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

export interface StatsByDate {

}