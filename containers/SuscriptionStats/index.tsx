import CardStats from "../../components/SuscriptionStats/Card";
import MultiLineChart from "../../components/SuscriptionStats/multiLineChart";

const SuscriptionStats = () => {
  return (
    <div>
      <h1>Container Suscription</h1>
      <CardStats type={"Nuevas"} suscriptores={45} />
      <MultiLineChart />
    </div>
  );
}

export default SuscriptionStats;