import Link from "next/link";

import SliderCourses from "../../../components/Trivias/sliderCourses/sliderCourses";
import styles from "./success.module.css";

const Success = () => {
  const { successContainer, recuerda, comienza, centrado, width90, buttonContainer } = styles;

  return (
    <div className={successContainer}>
      <h1>¡Felicidades!</h1>
      <p>Ganaste el acceso a más de 63 cursos de uñas y belleza en línea con un descuento especial.</p>
      <p>Costo total real: <span>$74,719.00 MXN</span></p>
      <p> Sólo $1,599.00 MXN</p>
      <p>(Acceso por un año)</p>
      <p>Te recomendamos tomar los siguientes cursos</p>
      <SliderCourses></SliderCourses>
      <p>Revisa tu correo electrónico para conocer los pasos para suscribirte y obtener tu descuento o haz click en Comenzar y suscríbete ahora.</p>
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