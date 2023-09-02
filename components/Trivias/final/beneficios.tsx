import Link from "next/link";

import styles from "./beneficios.module.css";
import BeneficiosCardContainer from "./beneficiosCardContainer";

const Beneficios = () => {
  const { beneficiosContainer, containerTitle, textContainer, img, titulo, buttonContainer } = styles;

  return (
    <div className={beneficiosContainer}>
      <div className={containerTitle}>
        <h2 className={titulo}>Algunos beneficios Incluidos en </h2>
        <img className={img} src="/images/trivias/Logo Gonvar degradado.svg" alt="" />
      </div>
      <BeneficiosCardContainer></BeneficiosCardContainer>
      <Link href={`/`}>
        <a>
          <button>Más información</button>
        </a>
      </Link>
    </div>
  );
};

export default Beneficios;