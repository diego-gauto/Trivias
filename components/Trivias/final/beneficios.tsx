import Link from "next/link";

import styles from "./beneficios.module.css";

const Beneficios = () => {
  const { beneficiosContainer, recuerda, comienza, centrado, width90, buttonContainer } = styles;

  return (
    <div className={beneficiosContainer}>
      <h1>Algunos beneficios Incluidos en </h1>
      <h2>componente de fotos</h2>
      <Link href={`/`}>
        <a>
          <button>Más información</button>
        </a>
      </Link>
    </div>
  );
};

export default Beneficios;