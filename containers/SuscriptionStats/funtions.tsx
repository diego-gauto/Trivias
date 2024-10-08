import { Stats, StatsByDate } from "./ISuscrioptionsStats";

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getLastMonthStart = (today: string) => {
  const date = new Date(today);

  // Restar 1 mes
  date.setMonth(date.getMonth() - 1);

  // Si el día de hoy es mayor que el último día del mes anterior, ajustamos la fecha
  // Esto maneja casos como el paso de marzo a febrero
  if (date.getDate() > new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()) {
    date.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate());
  }

  return formatDate(date);
};

export const getLastWeekStart = (today: string) => {
  const date = new Date(today);
  const lastWeekStart = new Date(date);
  lastWeekStart.setDate(date.getDate() - 6); // Hace 6 días, ya que today es el último día
  return formatDate(lastWeekStart);
};

export const addSubsByDate = (stats: Stats): number => {
  return (stats.month + stats.quarter + stats.anual)
}

export const addSubsByRange = (statsByRange: Record<string, Stats>): number => {
  return Object.values(statsByRange).reduce((acc, stats) => {
    return acc + addSubsByDate(stats);
  }, 0);
};

export function summarizeCounts(input: StatsByDate): Stats {
  let monthTotal = 0;
  let quarterTotal = 0;
  let anualTotal = 0;

  for (const date in input) {
    const counts = input[date];
    if (counts) {  // Verifica que counts no sea undefined
      monthTotal += counts.month;
      quarterTotal += counts.quarter;
      anualTotal += counts.anual;
    }
  }

  return {
    month: monthTotal,
    quarter: quarterTotal,
    anual: anualTotal,
  };
}