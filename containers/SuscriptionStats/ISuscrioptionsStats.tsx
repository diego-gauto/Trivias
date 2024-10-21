export interface Stats {
  mensual_count: number;
  cuatri_count: number;
  anual_count: number;
}

export interface StatsByDate extends Record<string, Stats> { }

export interface MembershipsByDate extends Record<string, number> { }

export interface StatsByType {
  new: Stats;
  renewed: Stats;
  reactive: Stats;
  canceled: Stats;
  inactive: Stats
}

export interface StatsByRange {
  new: StatsByDate;
  renewed: StatsByDate;
  reactive: StatsByDate;
  canceled: StatsByDate;
  inactive: StatsByDate;
}

export type Period = 'today' | 'yesterday' | 'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth' | 'custom' | 'customDay';

export interface CalendarResponse {
  startDate: string;
  endDate: string;
  period: Period;
}