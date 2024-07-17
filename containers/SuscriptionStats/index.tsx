import { useEffect, useState } from "react";

import CardStats from "../../components/admin/SuscriptionStats/Card";
import MultiLineChart from "../../components/admin/SuscriptionStats/multiLineChart";
import styles from "./suscriptionStats.module.css";

const today = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate
}

interface Stats {
  month: number;
  quarter: number;
  anual: number;
}

interface StatsByType {
  new: Stats;
  renewed: Stats;
  reactive: Stats;
  canceled: Stats;
}

const defaultStats: Stats = { month: 0, quarter: 0, anual: 0 };

const SuscriptionStats = () => {
  const { container, button_container, button, card_container } = styles

  const [todayStats, setTodayStats] = useState<StatsByType>()

  const todayString = today()

  const handleClickToday = () => {
    console.log(todayString)
  }

  useEffect(() => {
    const news: Stats = { month: 10, quarter: 30, anual: 5 }
    const renewed: Stats = { month: 5, quarter: 12, anual: 3 }
    const reactive: Stats = { month: 3, quarter: 10, anual: 2 }
    const canceled: Stats = { month: 1, quarter: 1, anual: 1 }
    const stats: StatsByType = { new: news, renewed: renewed, reactive: reactive, canceled: canceled }
    setTodayStats(stats)
  }, [])


  return (
    <div className={container}>
      <h1>Estadísticas de Suscripciones</h1>
      <div className={button_container}>
        <button className={button} onClick={handleClickToday}>Hoy</button>
        <button className={button}>Última semana</button>
        <button className={button}>Último mes</button>
        <button className={button}>último trimestre</button>
        <button className={button}>Personalizar fechas</button>
      </div>
      <div className={card_container}>
        <CardStats type={"Nuevas"} suscriptores={45} suscriptions={todayStats?.new || defaultStats} color={"#2962FF"} />
        <CardStats type={"Renovadas"} suscriptores={20} suscriptions={todayStats?.renewed || defaultStats} color={"#E1575A"} />
        <CardStats type={"Reactivadas"} suscriptores={15} suscriptions={todayStats?.reactive || defaultStats} color={"#F28E2C"} />
        <CardStats type={"Canceladas"} suscriptores={3} suscriptions={todayStats?.canceled || defaultStats} color={"#40E0D0"} />
      </div>
      <MultiLineChart />
    </div>
  );
}

export default SuscriptionStats;