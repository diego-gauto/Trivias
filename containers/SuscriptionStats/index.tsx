import CardStats from "../../components/SuscriptionStats/Card";
import MultiLineChart from "../../components/SuscriptionStats/multiLineChart";
import styles from "./suscriptionStats.module.css";

const SuscriptionStats = () => {
  const { container, button_container, button, card_container } = styles

  return (
    <div className={container}>
      <h1>Estadísticas de Suscripciones</h1>
      <div className={button_container}>
        <button className={button}>Hoy</button>
        <button className={button}>Última semana</button>
        <button className={button}>Último mes</button>
        <button className={button}>último trimestre</button>
        <button className={button}>Personalizar fechas</button>
      </div>
      <div className={card_container}>
        <CardStats type={"Nuevas"} suscriptores={45} suscriptions={{ month: 10, quarter: 30, anual: 5 }} color={"#2962FF"} />
        <CardStats type={"Renovadas"} suscriptores={20} suscriptions={{ month: 5, quarter: 12, anual: 3 }} color={"#E1575A"} />
        <CardStats type={"Reactivadas"} suscriptores={15} suscriptions={{ month: 3, quarter: 10, anual: 2 }} color={"#F28E2C"} />
        <CardStats type={"Canceladas"} suscriptores={3} suscriptions={{ month: 1, quarter: 1, anual: 1 }} color={"#40E0D0"} />
      </div>
      <MultiLineChart />
    </div>
  );
}

export default SuscriptionStats;