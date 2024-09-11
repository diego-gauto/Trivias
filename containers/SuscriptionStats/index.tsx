import { useEffect, useState } from "react";

import CardStats from "../../components/admin/SuscriptionStats/Card";
import MultiLineChart from "../../components/admin/SuscriptionStats/multiLineChart";
import { getStatsByDate, getStatsByRange } from "../../components/api/subStats";
import {
  addSubsByDate,
  addSubsByRange,
  formatDate,
  getLastMonthStart,
  getLastWeekStart,
} from "./funtions";
import { Stats, StatsByDate, StatsByRange } from "./ISuscrioptionsStats";
import styles from "./suscriptionStats.module.css";

const today = (() => {
  return formatDate(new Date());
})();

const lastMonthStart = getLastMonthStart(today);

const lastWeekStart = getLastWeekStart(today);

const defaultStats: Stats = { month: 0, quarter: 0, anual: 0 };

const SuscriptionStats = () => {
  const { container, button_container, button, card_container } = styles

  const [error, setError] = useState<string | null>(null);

  const [todayStats, setTodayStats] = useState<StatsByDate>()
  const [rangeStats, setRangeStats] = useState<StatsByRange>()
  const [showChart, setShowChart] = useState<boolean>(true);
  const [allNewStats, setAllNewStats] = useState<number>(0);
  const [allRenewelsStats, setAllRenewellsStats] = useState<number>(0);
  const [allReactiveStats, setAllReactiveStats] = useState<number>(0);
  const [allInactiveStats, setAllInactiveStats] = useState<number>(0);
  const [allCancelStats, setAllCancelStats] = useState<number>(0);


  // const todayString = today()
  const todayString = '2024-05-31'
  const starDate = '2024-09-01'
  const endDate = '2024-09-02'

  const fetchStatsByDate = async (date: string) => {
    try {
      const statsByDate: StatsByDate = await getStatsByDate(date);
      setTodayStats(statsByDate);
      setAllNewStats(addSubsByDate(statsByDate.new))
      setAllRenewellsStats(addSubsByDate(statsByDate.renewed))
      setAllReactiveStats(addSubsByDate(statsByDate.reactive))
      setAllInactiveStats(addSubsByDate(statsByDate.inactive))
      setAllCancelStats(addSubsByDate(statsByDate.canceled))
      setShowChart(false); // Oculta el gráfico cuando se muestran estadísticas de hoy
    } catch (err) {
      handleError(err);
    }
  };

  const fetchStatsByRange = async (startDate: string, endDate: string) => {
    try {
      const statsByRange = await getStatsByRange(startDate, endDate);
      setRangeStats(statsByRange);
      setAllNewStats(addSubsByRange(statsByRange.new))
      setAllRenewellsStats(addSubsByRange(statsByRange.renewed))
      setAllReactiveStats(addSubsByRange(statsByRange.reactive))
      setAllInactiveStats(addSubsByRange(statsByRange.inactive))
      setAllCancelStats(addSubsByRange(statsByRange.canceled))
      setShowChart(true); // Muestra el gráfico cuando se muestran estadísticas de un rango
      console.log(statsByRange)
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

  const handleClickToday = () => {
    fetchStatsByDate(today);
  };

  const handleClickLastWeek = () => {
    fetchStatsByRange(lastWeekStart, today);
  };

  const handleClickLastMonth = () => {
    fetchStatsByRange(lastMonthStart, today);
  };

  useEffect(() => {
    handleClickLastWeek(); // Cargar las estadísticas de la última semana por defecto
  }, []);

  useEffect(() => {

    const fetchData = async () => {
      try {
        console.log(todayString)
        const response = await getStatsByDate(todayString);
        // if (!response.ok) {
        //   throw new Error(`Error: ${response.status} ${response.statusText}`);
        // }
        // const jsonData = await response.json();
        // setTodayStats(jsonData);
        setTodayStats(response);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unexpected error');
        }
      }
    };

    fetchData();
  }, [])

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!todayStats) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={container}>
      <h1>Estadísticas de Suscripciones</h1>
      <div className={button_container}>
        <button className={button} onClick={handleClickToday}>Hoy</button>
        <button className={button} onClick={handleClickLastWeek}>Última semana</button>
        <button className={button} onClick={handleClickLastMonth}>Último mes</button>
        <button className={button}>último trimestre</button>
        <button className={button}>Personalizar fechas</button>
      </div>
      <div className={card_container}>
        <CardStats type={"Nuevas"} suscriptores={45} suscriptions={todayStats?.new || defaultStats} color={"#2962FF"} />
        <CardStats type={"Renovadas"} suscriptores={20} suscriptions={todayStats?.renewed || defaultStats} color={"#E1575A"} />
        <CardStats type={"Reactivadas"} suscriptores={15} suscriptions={todayStats?.reactive || defaultStats} color={"#F28E2C"} />
        <CardStats type={"Canceladas"} suscriptores={3} suscriptions={todayStats?.canceled || defaultStats} color={"#40E0D0"} />
      </div>
      {showChart && <MultiLineChart />}    </div>
  );
}

export default SuscriptionStats;