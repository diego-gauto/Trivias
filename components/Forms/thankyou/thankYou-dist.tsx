// import { useState } from "react";

// import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
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

  // if (loading) {
  //   return (
  //     <Background style={{ alignItems: 'center', justifyContent: 'center' }}>
  //       <LoaderImage>
  //         <LoaderContain />
  //       </LoaderImage>
  //     </Background>
  //   );
  // }

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
                <b>Gonvar</b>
              </p>
            </div>
          </div>

          <p>
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
