import { format, parse, subDays, subMonths } from "date-fns";

import { Stats, StatsByDate } from "./ISuscrioptionsStats";

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getLastMonthStart = (today: string) => {
  const date = parse(today, 'yyyy-MM-dd', new Date());

  // Restar un mes para obtener el inicio del mes anterior
  const lastMonthStart = subMonths(date, 1);

  // Formatear la fecha al formato 'yyyy-MM-dd'
  return format(lastMonthStart, 'yyyy-MM-dd');
};

export const getLastWeekStart = (today: string) => {

  const date = parse(today, 'yyyy-MM-dd', new Date());

  const lastWeekStart = subDays(date, 6);

  return format(lastWeekStart, 'yyyy-MM-dd');
};

export const addSubsByDate = (stats: Stats): number => {
  return (stats.mensual_count + stats.cuatri_count + stats.anual_count)
}

export const addSubsByRange = (statsByRange: Record<string, Stats>): number => {
  return Object.values(statsByRange).reduce((acc, stats) => {
    return acc + addSubsByDate(stats);
  }, 0);
};

export function summarizeCounts(input: StatsByDate): Stats {
  let mensual_count = 0;
  let cuatri_count = 0;
  let anual_count = 0;

  for (const date in input) {
    const counts = input[date];
    if (counts) {  // Verifica que counts no sea undefined
      mensual_count += Number(counts.mensual_count) || 0;
      cuatri_count += Number(counts.cuatri_count) || 0;
      anual_count += Number(counts.anual_count) || 0;
    }
  }

  return {
    mensual_count: mensual_count,
    cuatri_count: cuatri_count,
    anual_count: anual_count,
  };
}

export const formatStats = (stat: Stats): Stats => {
  return {
    anual_count: Number(stat.anual_count),
    cuatri_count: Number(stat.cuatri_count),
    mensual_count: Number(stat.mensual_count),
  };
};