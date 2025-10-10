import Link from 'next/link';

// import logoGonvar from "/images/Logo Gonvar degradado.svg";
import styles from './banner.module.css';

const {
  banner,
  texto,
  logo,
  titulo,
  span,
  subtitulo,
  comenzar,
  buttonComenzar,
} = styles;

const Banner = () => {
  return (
    <div className={banner}>
      <div className={texto}>
        <div className={logo}>
          <img src='/images/trivias/Logo Gonvar degradado.svg' alt='' />
        </div>
        <div className={titulo}>
          Empieza a cursar cientos de clases sobre uñas y belleza{' '}
          <span className={span}>en linea</span>
        </div>
        <div className={subtitulo}>
          Diferentes niveles de dificultad e instructores internacionales
        </div>
        <div className={comenzar}>
          {/* External link to Gonvar site - opens in a new tab */}
          <a href={'https://www.gonvar.io'} target="_blank" rel="noopener noreferrer" className={buttonComenzar}>
            Comenzar ahora
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
