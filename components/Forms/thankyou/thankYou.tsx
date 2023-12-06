

import styles from "./thankYou.module.css";

const ThankYouForm = () => {

  const { container, textContainer, title, subtitle, paragraph, imgContainer } = styles

  return (
    <div className={container}>

      <div className={textContainer}>
        <p className={title}>¡Felicidades!</p>
        <p className={subtitle}>Has llenado el formulario con éxito.</p>
        <p className={paragraph}>En los próximos dias nos comunicaremos contigo para <br />indicarte los pasos a seguir.</p>
      </div>

      <div className={imgContainer}>
        <img
          alt="Mujer celebrando ser"
          src="/images/forms/mujerCelebrando.png"
        />
      </div>
    </div>

  );
}
export default ThankYouForm;