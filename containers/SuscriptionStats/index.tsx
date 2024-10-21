import { useCallback, useEffect, useState } from "react";

import { format } from "date-fns";

import CardStats from "../../components/admin/SuscriptionStats/Card";
import DateRangePickerComp from "../../components/admin/SuscriptionStats/DateRangePicker";
import MultiLineChart from "../../components/admin/SuscriptionStats/multiLineChart";
import { getStatsByRange } from "../../components/api/subStats";
import { Background, LoaderContain, LoaderImage } from "../../screens/Login.styled";
import { getLastMonthStart, getLastWeekStart, summarizeCounts } from "./funtions";
import { CalendarResponse, Stats, StatsByRange, StatsByType } from "./ISuscrioptionsStats";
import styles from "./suscriptionStats.module.css";

const today = (() => {
  return format(new Date(), 'yyyy-MM-dd');
})();

const lastMonthStart = getLastMonthStart(today);

const lastWeekStart = getLastWeekStart(today);

const defaultStats: Stats = { mensual_count: 0, cuatri_count: 0, anual_count: 0 };
const defaultRange: CalendarResponse = { startDate: lastWeekStart, endDate: today, period: "custom" }
console.log(defaultRange)

const SuscriptionStats = () => {
  const { container, button_container, button, card_container, chartContainer } = styles

  const [error, setError] = useState<string | null>(null);

  const [todayStats, setTodayStats] = useState<StatsByType>()
  const [rangeStats, setRangeStats] = useState<StatsByRange>()
  const [showChart, setShowChart] = useState<boolean>(true);
  const [startDate, setStartDate] = useState(lastWeekStart); // Inicializa con la última semana
  const [range, setRange] = useState<CalendarResponse>(defaultRange);
  const [newStats, setNewStats] = useState<Stats>(defaultStats)
  const [renewedStats, setRenewedStats] = useState<Stats>(defaultStats)
  const [reactiveStats, setReactiveStats] = useState<Stats>(defaultStats)
  const [cancelledStats, setCancelledStats] = useState<Stats>(defaultStats)
  const [inactiveStats, setInactiveStats] = useState<Stats>(defaultStats)
  const [loading, setLoading] = useState<boolean>(true);

  const [cachedTodayStats, setCachedTodayStats] = useState<StatsByRange | null>(null);
  const [cachedYesterdayStats, setCachedYesterdayStats] = useState<StatsByRange | null>(null);
  const [cachedThisWeekStats, setCachedThisWeekStats] = useState<StatsByRange | null>(null);
  const [cachedLastWeekStats, setCachedLastWeekStats] = useState<StatsByRange | null>(null);
  const [cachedThisMonthStats, setCachedThisMonthStats] = useState<StatsByRange | null>(null);
  const [cachedLastMonthStats, setCachedLastMonthStats] = useState<StatsByRange | null>(null);

  const defaultVisibility = {
    new: true,
    renewed: true,
    reactive: true,
    canceled: true,
    inactive: true,
  }

  const [visibleSeries, setVisibleSeries] = useState(defaultVisibility);

  // const fetchStatsByDate = async (date: string) => {
  //   if (cachedTodayStats) {
  //     // Si ya tenemos los datos cacheados, usarlos
  //     setTodayStats(cachedTodayStats);
  //     setNewStats(formatStats(cachedTodayStats.new));
  //     setRenewedStats(formatStats(cachedTodayStats.renewed));
  //     setReactiveStats(formatStats(cachedTodayStats.reactive));
  //     setCancelledStats(formatStats(cachedTodayStats.canceled));
  //     setInactiveStats(formatStats(cachedTodayStats.inactive));
  //     setLoading(false);
  //     setShowChart(false); // Oculta el gráfico cuando se muestran estadísticas de hoy
  //     return;
  //   }

  //   try {
  //     const statsByDate: StatsByType = await getStatsByDate(date);
  //     setTodayStats(statsByDate);
  //     setNewStats(formatStats(statsByDate.new));
  //     setRenewedStats(formatStats(statsByDate.renewed));
  //     setReactiveStats(formatStats(statsByDate.reactive));
  //     setCancelledStats(formatStats(statsByDate.canceled));
  //     setInactiveStats(formatStats(statsByDate.inactive));
  //     setLoading(false);
  //     setShowChart(false); // Oculta el gráfico cuando se muestran estadísticas de hoy

  //     // Cachear los datos obtenidos
  //     setCachedTodayStats(statsByDate);
  //   } catch (err) {
  //     handleError(err);
  //   }
  // };

  const fetchStatsByRange = async (startDate: string, endDate: string, period: string) => {
    let cachedData;

    // Verificamos caché según el valor de period
    if (period === "today" && cachedTodayStats) {
      cachedData = cachedTodayStats;
    } else if (period === "yesterday" && cachedYesterdayStats) {
      cachedData = cachedYesterdayStats;
    } else if (period === "thisWeek" && cachedThisWeekStats) {
      cachedData = cachedThisWeekStats;
    } else if (period === "lastWeek" && cachedLastWeekStats) {
      cachedData = cachedLastWeekStats;
    } else if (period === "thisMonth" && cachedThisMonthStats) {
      cachedData = cachedThisMonthStats;
    } else if (period === "lastMonth" && cachedLastMonthStats) {
      cachedData = cachedLastMonthStats;
    }

    // Si los datos están en caché, los usamos
    if (cachedData) {
      setRangeStats(cachedData);
      setNewStats(summarizeCounts(cachedData?.new || {}));
      setRenewedStats(summarizeCounts(cachedData?.renewed || {}));
      setReactiveStats(summarizeCounts(cachedData?.reactive || {}));
      setCancelledStats(summarizeCounts(cachedData?.canceled || {}));
      setInactiveStats(summarizeCounts(cachedData?.inactive || {}));
      setLoading(false);
      setShowChart(!(period === "today" || period === "yesterday" || period === "customDay")); // Oculta el gráfico si es today, yesterday o customDay
      return;
    }

    // Si no está en caché, se hace la llamada para obtener los datos
    try {
      const statsByRange = await getStatsByRange(startDate, endDate);
      setRangeStats(statsByRange);
      setNewStats(summarizeCounts(statsByRange?.new || {}));
      setRenewedStats(summarizeCounts(statsByRange?.renewed || {}));
      setReactiveStats(summarizeCounts(statsByRange?.reactive || {}));
      setCancelledStats(summarizeCounts(statsByRange?.canceled || {}));
      setInactiveStats(summarizeCounts(statsByRange?.inactive || {}));
      setLoading(false);
      setShowChart(!(period === "today" || period === "yesterday" || period === "customDay")); // Oculta el gráfico si es today, yesterday o customDay

      // Cacheamos los datos obtenidos según el periodo
      if (period === "today") {
        setCachedTodayStats(statsByRange);
      } else if (period === "yesterday") {
        setCachedYesterdayStats(statsByRange);
      } else if (period === "thisWeek") {
        setCachedThisWeekStats(statsByRange);
      } else if (period === "lastWeek") {
        setCachedLastWeekStats(statsByRange);
      } else if (period === "thisMonth") {
        setCachedThisMonthStats(statsByRange);
      } else if (period === "lastMonth") {
        setCachedLastMonthStats(statsByRange);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Unexpected error");
    }
  };

  // const handleClickToday = () => {
  //   fetchStatsByDate(today);
  // };

  // const handleClickLastWeek = async () => {
  //   setStartDate(lastWeekStart);
  //   await fetchStatsByRange(lastWeekStart, today, "week");
  //   setVisibleSeries(defaultVisibility)
  // };

  // const handleClickLastMonth = async () => {
  //   setStartDate(lastMonthStart);
  //   await fetchStatsByRange(lastMonthStart, today, "month");
  //   setVisibleSeries(defaultVisibility)
  // };

  const handleVisibility = (seriesKey: keyof typeof visibleSeries) => {
    setVisibleSeries(prevState => ({
      ...prevState,
      [seriesKey]: !prevState[seriesKey],
    }));
  };

  const handleSetRange = useCallback((newRange: CalendarResponse) => {
    setRange(newRange);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchStatsByRange(range.startDate, range.endDate, range.period);
    console.log(range)
  }, [range]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return (
      <Background style={{ alignItems: 'center', justifyContent: 'center' }}>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background>
    );
  }

  return (
    <div className={container}>
      <h1>Estadísticas de Suscripciones</h1>
      <div className={button_container}>
        {/* <button className={button} onClick={handleClickToday}>Hoy</button>
        <button className={button} onClick={handleClickLastWeek}>Última semana</button>
        <button className={button} onClick={handleClickLastMonth}>Último mes</button> */}
        <DateRangePickerComp setRange={handleSetRange} range={range} />
      </div>
      <div className={card_container}>
        <CardStats
          type={"Nuevas"}
          suscriptions={newStats}
          color={"#629753"}
          isVisible={visibleSeries.new} // Condicional según visibilidad
          onClick={() => handleVisibility("new")}
        />
        <CardStats
          type={"Renovadas"}
          suscriptions={renewedStats}
          color={"#2962FF"}
          isVisible={visibleSeries.renewed}
          onClick={() => handleVisibility("renewed")}
        />
        <CardStats
          type={"Reactivadas"}
          suscriptions={reactiveStats}
          color={"#40E0D0"}
          isVisible={visibleSeries.reactive}
          onClick={() => handleVisibility("reactive")}
        />
        <CardStats
          type={"Canceladas"}
          suscriptions={cancelledStats}
          color={"#E1575A"}
          isVisible={visibleSeries.canceled}
          onClick={() => handleVisibility("canceled")}
        />
        <CardStats
          type={"Inactivas"}
          suscriptions={inactiveStats}
          color={"#F28E2C"}
          isVisible={visibleSeries.inactive}
          onClick={() => handleVisibility("inactive")}
        />
      </div>

      {showChart && <div className={chartContainer}><MultiLineChart membershipsStats={rangeStats} visibleSeries={visibleSeries} /></div>}

    </div>
  );
}

export default SuscriptionStats;