import { useEffect, useState } from "react";

import { collection, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

import { db } from "../../../firebase/firebaseConfig";
import { Background, LoaderContain, LoaderImage } from "../../../screens/Login.styled";
import { getFormApi } from "../../api/form";
import styles from "./thankYou.module.css";

const watsapOut = '/images/landing_suscription/whatsapp_outline.png';

interface Answer {
  label: string;
  value: string;
}

interface Option {
  isVisible: boolean | null;
  label: string;
  options: Answer[];
}

interface Form {
  name: string;
  title: string;
  subtitle: string;
  createdAt: string;
  editedAt: string;
  img: {
    source: string;
    isVisible: boolean | null;
  };
  optionsArray: Option[];
  redirect: {
    type: 'thankYouPage' | 'customLink';
    link: string;
    textButton: string;
  };
}

const ThankYouForm = () => {
  const [form, setForm] = useState<Form | null>();
  const [loading, setLoading] = useState(true);

  const {
    container,
    textContainer,
    title,
    subtitle,
    paragraph,
    imgContainer,
    watsapButton,
    allCenter,
    watsapLogo,
    whatsappContainer,
    linkButton,
    contact
  } = styles;

  const router = useRouter();
  let formId = router.query.formId;
  console.log(formId);

  const validFormIds = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
  ]; // Arreglo de IDs válidos
  const specialFormIds = ['10', '11', '12', undefined];

  const isLinkToWhatsappGroup = (text: string | undefined): boolean => {
    // Si el texto es undefined, retornar false
    if (typeof text !== 'string' || text.trim() === '') {
      return false;
    }

    // Verificar si el texto comienza con el prefijo correcto
    if (!text.startsWith('https://chat.whatsapp.com/')) {
      return false;
    }

    // Extraer el código del grupo de WhatsApp del enlace
    const groupCode = text.slice('https://chat.whatsapp.com/'.length);

    console.log(groupCode);
    // Verificar si el código del grupo tiene la longitud esperada (22 caracteres)
    return groupCode.length === 22;
  };

  const redirectToWhatsAppChat = () => {
    const link = form?.redirect.link;
    if (link) {
      window.open(link, '_blank');
    } else {
      // Manejar el caso en el que link es undefined
      console.error('El enlace de redirección es indefinido');
    }
  };

  const redirectToLanding = () => {
    const link = "/suscripcion-cuatrimestral";
    if (link) {
      window.open(link, '_blank');
    } else {
      // Manejar el caso en el que link es undefined
      console.error('El enlace de redirección es indefinido');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof formId !== 'string' || !validFormIds.includes(formId)) {
          // Si formId no está incluido en los IDs válidos, redirigir a página de error
          router.push('/forms/formnotfound');
          return; // Detener la ejecución de fetchData
        }
        const formIdNumber: number = Number(formId);

        const res = await getFormApi(formIdNumber);

        if (res && res.length > 0) {
          const formTemp = res[0];

          // Parsear la cadena JSON en la propiedad "questions"
          formTemp.img = JSON.parse(formTemp.img);

          // Parsear la cadena JSON en la propiedad "result"
          formTemp.optionsArray = JSON.parse(formTemp.optionsArray);

          formTemp.redirect = JSON.parse(formTemp.redirect);

          console.log('from Server');
          console.log(formTemp);

          setForm(formTemp);
          setLoading(false);
        } else {
          try {
            // Identificador único del formulario que deseas recuperar
            const customId = `form_${formId}`;

            // Referencia al documento del formulario en Firestore
            const formDocRef = doc(collection(db, 'forms'), customId);

            // Obtén los datos del formulario desde Firestore
            const formSnapshot = await getDoc(formDocRef);

            if (formSnapshot.exists()) {
              // El documento existe, puedes acceder a los datos
              const formData = formSnapshot.data() as Form;
              console.log('Datos del formulario recuperados:', formData);

              setForm(formData);
              setLoading(false);
            } else {
              // El documento no existe
              // redirigir a pagina de error
              console.log('El formulario no existe en Firebase');
            }
          } catch (error) {
            console.error('Error al recuperar datos desde Firebase:', error);
          }
        }

        // setLoading(false);
      } catch (error) {
        console.error('Error al recuperar datos desde el server:', error);
      }
    };

    if (router.isReady) {
      // formId = router.query.formId as string | undefined;
      fetchData();
    }
  }, [router.isReady, formId]);

  if (loading) {
    return (
      <Background style={{ alignItems: 'center', justifyContent: 'center' }}>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background>
    );
  }

  return (
    <div className={container}>
      <div className={textContainer}>
        <p className={title}>¡Felicidades!</p>
        <p className={subtitle}>Has llenado el formulario con éxito.</p>
        <p className={paragraph}>
          En los próximos días nos comunicaremos contigo para
          indicarte los pasos a seguir.
        </p>

        {isLinkToWhatsappGroup(form?.redirect.link) && (
          <div className={whatsappContainer}>
            <p className={paragraph}>
              <b>2do Paso</b>
              <br />
              Únete al grupo de whatsapp ahora
            </p>
            <div
              className={`${watsapButton} ${allCenter}`}
              onClick={() => redirectToWhatsAppChat()}
            >
              <img src={watsapOut} className={watsapLogo} />
              <p className='my-1'>
                <b>Unirme</b>
              </p>
            </div>
          </div>
        )}
        <>
          <p className={paragraph}>
            <b>{isLinkToWhatsappGroup(form?.redirect.link) ? "3er" : "2do"} Paso</b>
            <br />
            Revisa todo lo que incluye la carrera de uñas a la que deseas inscribir
          </p>
        </>

        <div
          className={`${linkButton} ${allCenter}`}
          onClick={() => redirectToLanding()}
        >
          <p>
            <b>Conoce Gonvar+</b>
          </p>
        </div>
        <div className={contact}>
          <p>Recuerda que nuestros medios de contacto oficiales son:</p>
          <p>
            Whats app: <b>+52 55 3893 3134</b><br />
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
export default ThankYouForm;
