// import { useState } from "react";

// import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import styles from "./thankYou-store.module.css";

const ThankYouFormStore = () => {
  // const [loading, setLoading] = useState(true);

  const {
    container,
    textContainer,
    title,
    subtitle,
    paragraph,
    imgContainer,
    contact,
    linkButton,
    allCenter
  } = styles;

  const redirectToStore = () => {
    const link = "https://gonvarnails.mx/products/mystery-box-premium-pincel-garantizado?_pos=1&_psq=myste&_ss=e&_v=1.0";
    if (link) {
      window.open(link, '_blank');
    } else {
      // Manejar el caso en el que link es undefined
      console.error('El enlace de redirección es indefinido');
    }
  };

  return (
    <div className={container}>
      <div className={textContainer}>
        <p className={title}>¡Felicidades!</p>
        <p className={subtitle}>Has llenado el formulario con éxito.</p>
        <p className={paragraph}>
          En los próximos días nos comunicaremos contigo para indicarte los pasos a seguir.
        </p>
        <p className={paragraph}>
          Si quieres realizar tu compra en un solo pago, dale click aquí
        </p>

        <div
          className={`${linkButton} ${allCenter}`}
          onClick={() => redirectToStore()}
        >
          <p style={{ marginTop: "3px", fontSize: "16px" }}>
            <b>Comprar ahora</b>
          </p>
        </div>

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
export default ThankYouFormStore;
