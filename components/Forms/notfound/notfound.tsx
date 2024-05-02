import styles from './notfound.module.css';

const NotFoundForm = () => {
  const { container, textContainer, title, subtitle, paragraph, imgContainer } =
    styles;

  return (
    <div className={container}>
      <div className={textContainer}>
        <p className={title}>¡Parece que algo falló!</p>
        <p className={subtitle}>No te preocupes.</p>
        <p className={paragraph}>
          Verifica si has escrito correctamente la dirección y vuelve a
          intentarlo.
        </p>
      </div>

      <div className={imgContainer}>
        <img alt='Mujer duda' src='/images/forms/notfound.png' />
      </div>
    </div>
  );
};
export default NotFoundForm;
