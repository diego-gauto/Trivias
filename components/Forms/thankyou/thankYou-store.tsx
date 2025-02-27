// import { useState } from "react";

// import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import styles from "./thankYou-store.module.css";

type TypeValue = 'store' | 'catalog';

type ThankYouFormStoreProps = {
  type: TypeValue
}

const watsapOut = '/images/landing_suscription/whatsapp_outline.png';

const ThankYouFormStore = ({ type }: ThankYouFormStoreProps) => {
  const {
    container,
    textContainer,
    title,
    subtitle,
    paragraph,
    imgContainer,
    contact,
    linkButton,
    allCenter,
    whatsappContainer,
    watsapButton,
    watsapLogo,
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

  const redirectToGoogleDrive = () => {
    // https://bit.ly/3XGu3AV
    const link = "https://drive.google.com/file/d/1F3bbY8Uwje3Uf8EtCydDh24lHH5BChrY/view?usp=sharing";
    if (link) {
      window.open(link, '_blank');
    } else {
      // Manejar el caso en el que link es undefined
      console.error('El enlace de redirección es indefinido');
    }
  };

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
          En los próximos días nos comunicaremos contigo para indicarte los pasos a seguir.
        </p>
        <p className={paragraph}>
          {
            type === 'catalog' ? 'Si quieres checar el catálogo con precio oficial para socias distribuidoras, dale click aquí'
              : 'Si quieres realizar tu compra en un solo pago, dale click aquí'
          }
        </p>

        <div
          className={`${linkButton} ${allCenter}`}
          onClick={() => {
            if (type === 'catalog') {
              redirectToGoogleDrive();
            } else {
              redirectToStore()
            }
          }}
        >
          <p style={{ marginTop: "3px", fontSize: "16px" }}>
            <b>
              {
                type === 'catalog' ? 'Ver catálogo'
                  : 'Comprar ahora'
              }
            </b>
          </p>
        </div>

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
export default ThankYouFormStore;
