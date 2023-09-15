import router from "next/router";

import SliderCourses from "../../../components/Trivias/sliderCourses/sliderCourses";
import { PURCHASE_PATH } from "../../../constants/paths";
import styles from "./failed.module.css";

const Failed = () => {
  const { failedContainer, recuerda, comienza, centrado, width80 } = styles;

  const handleClick = () => {
    localStorage.setItem("plan", "true");
    router.push({ pathname: PURCHASE_PATH, query: { type: 'subscription', frequency: 'anual', v: '1' } })
  }

  return (
    <div className={failedContainer}>
      <h1>¡Ya jugaste esta trivia!</h1>
      <p>Te recomendamos comenzar con uno de nuestros cursos de uñas y belleza.</p>
      <SliderCourses></SliderCourses>
      <p className={width80}>Recuerda que tenemos más de 60 cursos disponibles para ti.</p>
      <p className={comienza}>¡Comienza tu carrera de Nails Artist hoy!</p>
      <div className={centrado}>
        <button onClick={handleClick}>Comenzar</button>
      </div>
    </div>
  );
};

export default Failed;