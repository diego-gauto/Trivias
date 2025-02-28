// import { useState } from "react";

// import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import { useEffect } from "react";

import styles from "./thankYou-dist.module.css";

const watsapOut = '/images/landing_suscription/whatsapp_outline.png';


const ThankYouFormDist = () => {
  // const [loading, setLoading] = useState(true);

  const {
    container,
    textContainer,
    title,
    subtitle,
    paragraph,
    imgContainer,
    contact,
    whatsappContainer,
    watsapButton,
    watsapLogo,
    allCenter,
  } = styles;

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      const eventKey = "thankYouDistEvent_fired"; // Clave única en sessionStorage

      if (!sessionStorage.getItem(eventKey)) {
        (window as any).fbq("trackCustom", "FormularioDistEnviado"); // Nombre real del evento
        sessionStorage.setItem(eventKey, "true"); // Evita que se vuelva a disparar en esta sesión
      }
    }
  }, []);

  const redirectToWhatsAppChat = () => {
    const link = 'https://wa.me/525538933134';
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
          Recuerda que nuestros medios de contacto oficiales son:
        </p>

        <div className={contact}>

          <div className={whatsappContainer}>
            <div
              className={`${watsapButton} ${allCenter}`}
              onClick={() => redirectToWhatsAppChat()}
            >
              <img src={watsapOut} className={watsapLogo} />
              <p className='my-1'>
                <b>Enviar Mensaje</b>
              </p>
            </div>
          </div>

          <p>
            Whatsapp: <b>+52 55 3893 3134</b><br />
            📞 <b>+1 656-218-5379</b><br />
            📞 <b>+1 334-560-1678</b><br />
            📞 <b>55 38 933 134</b><br />
            <br />
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
