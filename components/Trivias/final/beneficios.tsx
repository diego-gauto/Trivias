import Link from 'next/link';

import styles from './beneficios.module.css';
import BeneficiosCardContainer from './beneficiosCardContainer';

const Beneficios = () => {
  const {
    beneficiosContainer,
    containerTitle,
    textContainer,
    img,
    titulo,
    buttonContainer,
  } = styles;

  return (
    <div className={beneficiosContainer}>
      <div className={containerTitle}>
        <h2 className={titulo}>Algunos beneficios Incluidos en </h2>
        <img className={img} src='/images/trivias/logoGonvar+.png' alt='' />
      </div>
      <BeneficiosCardContainer></BeneficiosCardContainer>
      <div className={buttonContainer}>
        <Link href={'/suscripcion-anual'} className={styles.buttonLink}>
          Más información
        </Link>
      </div>
    </div>
  );
};

export default Beneficios;
