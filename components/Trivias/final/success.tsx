import Link from "next/link";

import SliderCourses from "../../../components/Trivias/sliderCourses/sliderCourses";
import styles from "./success.module.css";

const Success = () => {
  const { successContainer, title, ganaste, span, red, green, acceso, recomendamos, revisa, tachado, buttonContainer } = styles;

  return (
    <div className={successContainer}>
      <h1 className={title}>¡Felicidades!</h1>
      <p className={ganaste}>Ganaste el acceso a <span className={span}>más de 63 cursos de uñas y belleza </span>en línea con un descuento especial.</p>
      <p className={red}>Costo total real: <span className={tachado}>$74,719.00 MXN</span></p>
      <p className={green}> Sólo $1,599.00 MXN</p>
      <p className={acceso}>(Acceso por año con renovación automática)</p>
      <p className={recomendamos}>Te recomendamos tomar los siguientes cursos</p>
      <SliderCourses></SliderCourses>
      <p className={revisa}>Revisa tu correo electrónico para conocer los pasos para suscribirte y obtener tu descuento o haz click en Comenzar y suscríbete ahora.</p>
      <div className={buttonContainer}>
        <Link href={`/`}>
          <a>
            <button>Comienza por $1.599</button>
          </a>
        </Link>
        <Link href={`/`}>
          <a>
            <button>Más información</button>
          </a>
        </Link>
      </div>

    </div>
  );
};

export default Success;