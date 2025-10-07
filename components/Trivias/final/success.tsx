import router from 'next/router';

import SliderCourses from "../../../components/Trivias/sliderCourses/sliderCourses";
import styles from "./success.module.css";

const Success = () => {
  const {
    successContainer,
    title,
    recomendamos,
    buttonContainer,
  } = styles;

  const handleClick = () => {
    router.push('/trivias');
  };

  return (
    <div className={successContainer}>
      <h1 className={title}>¡Felicidades!</h1>
      <p className={recomendamos}>
        Te recomendamos tomar los siguientes cursos
      </p>
      <SliderCourses></SliderCourses>
      <div className={buttonContainer}>
        <button onClick={handleClick}>Volver a las trivias</button>
      </div>
    </div>
  );
};

export default Success;