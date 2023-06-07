// import logoGonvar from "/images/Logo Gonvar degradado.svg";
import styles from "./banner.module.css";

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
          <img src="/images/trivias/Logo Gonvar degradado.svg" alt="" />
        </div>
        <div className={titulo}>
          Empieza a cursar cientos de clases sobre uñas y belleza{" "}
          <span className={span}>en linea</span>
        </div>
        <div className={subtitulo}>
          Diferentes niveles de dificultad e instructores internacionales
        </div>
      </div>
      <div className={comenzar}>
        <button className={buttonComenzar}>Comenzar ahora</button>
      </div>
    </div>
  );
};

export default Banner;
