import Link from "next/link";

import SliderCourses from "../../../components/Trivias/sliderCourses/sliderCourses";
import styles from "./failed.module.css";

const Failed = () => {
  const { failedContainer, recuerda, comienza, centrado, width80 } = styles;

  return (
    <div className={failedContainer}>
      <h1>¡Ya jugaste esta trivia!</h1>
      <p>Te recomendamos comenzar con uno de nuestros cursos de uñas y belleza.</p>
      <SliderCourses></SliderCourses>
      <p className={width80}>Recuerda que tenemos más de 60 cursos disponibles para ti.</p>
      <p className={comienza}>¡Comienza tu carrera de Nails Artist hoy!</p>
      <Link href={`/planes`}>
        <a className={centrado}>
          <button>Comenzar</button>
        </a>
      </Link>
    </div>
  );
};

export default Failed;