// import { useState } from "react";

// import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import styles from "./thankYou-dist.module.css";

const ThankYouFormDist = () => {
  // const [loading, setLoading] = useState(true);

  const {
    container,
    textContainer,
    title,
    subtitle,
    paragraph,
    imgContainer,
    contact
  } = styles;

  // if (loading) {
  //   return (
  //     <Background style={{ alignItems: 'center', justifyContent: 'center' }}>
  //       <LoaderImage>
  //         <LoaderContain />
  //       </LoaderImage>
  //     </Background>
  //   );
  // }

  return (
    <div className={container}>
      <div className={textContainer}>
        <p className={title}>¡Felicidades!</p>
        <p className={subtitle}>Has llenado el formulario con éxito.</p>
        <p className={paragraph}>
          En los próximos días nos comunicaremos contigo para indicarte los pasos a seguir.
        </p>

        <div className={contact}>
          <p>Recuerda que nuestros medios de contacto oficiales son:</p>
          <p>
            Whatsapp: <b>+52 55 3893 3134</b><br />
            📞 <b>+1 656-218-5379</b><br />
            📞 <b>+1 334-560-1678</b><br />
            📞 <b>55 38 933 134</b><br />
            Soporte Correo: <b>soporte@gonvar.io</b>
          </p>
        </div>
      </div>

      <div className={imgContainer}>
        <img
          alt='Mujer celebrando ser'
          src='/images/forms/mujerCelebrando.png'
        />
      </div>
    </div>
  );
};
export default ThankYouFormDist;
