import React, { useEffect, useRef, useState } from "react";

import { useMediaQuery } from "react-responsive";

import { collection, doc, getDoc } from "firebase/firestore";
// import { isValidPhoneNumber } from "react-phone-number-input";
import { useFormik } from "formik";
// import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";

import { getFormApi } from "../../components/api/form";
import { createUserFormApi } from "../../components/api/userform";
import Countdown from "../../components/Forms/countdown/countdown";
import InputApellido from "../../components/Forms/inputApellido/inputApellido";
import InputMail from "../../components/Forms/inputMail/inputMail";
import InputNombre from "../../components/Forms/inputNombre/inputNombre";
import InputWatsapp from "../../components/Forms/inputWhatsapp/inputWhatsapp";
import OptionComponent from "../../components/Forms/option/option";
import { db } from "../../firebase/firebaseConfig";
import { Background, LoaderContain, LoaderImage } from "../../screens/Login.styled";
import styles from "./formulario.module.css";

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
    type: "thankYouPage" | "customLink";
    link: string;
    textButton: string;
  };
}

interface DisplayContentProps {
  content: string;
}

const Formularios = () => {
  const router = useRouter();
  let formId: string | undefined = router.query.formId as string | undefined;
  console.log(formId);
  const validFormIds = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
  ]; // Arreglo de IDs válidos
  const specialFormIds = ["10", "11", "12", undefined];

  // const form10: Form = {
  //   name: "campaña 11 Febrero 2024 Facebook",
  //   title:
  //     "<p><strong>Solicitud</strong> de Beca de 75% y <strong>Plan de 4 pagos</strong> ¡Última oportunidad!</p>",
  //   subtitle:
  //     "<p><strong>Más de 70 cursos</strong> de uñas, maquillaje y pestañas <strong>incluídos</strong>. Además, recibe acceso a cursos de Lash Master (3 cursos de pestañas en Técnicas Clásica, Abanicos Tecnológicos, Diseños y Efectos). Aprende en línea, <strong>Desde cero</strong> con <strong>revisión de prácticas</strong>, asesorías ilimitadas y <strong>Certificado oficial</strong> de la marca. Un precio real de <s>$6,307.00 MXN</s> reducido a un costo total de $1,599.00 MXN (99 USD) que podrás pagar en 4 pagos de $399.00 MXN (25 USD). 💞 <strong>LUGARES MUY LIMITADOS. Apresúrate a apartar tu lugar antes de que se agoten. Solicita</strong> tu inscripción con beca al 75% de descuento y plan de <strong>4 pagos de $399 MXN</strong> (uno a la semana) y en caso de ser seleccionada, te contactaremos de inmediato. 🥳</p>",
  //   createdAt: "11-03-2024 15:40:36",
  //   editedAt: "11-03-2024 20:50:35",
  //   img: {
  //     source:
  //       "https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/forms%2Fform_10?alt=media&token=bf9cd061-79de-4657-854a-85dd5c4bb4a8",
  //     isVisible: true,
  //   },
  //   optionsArray: [
  //     {
  //       isVisible: true,
  //       label: `<p>Recuerda que el <strong>costo del programa es de $1,599.00 MXN</strong> y podrás pagarlo en 4 partes. <strong>Se dará acceso</strong> una vez que liquides el monto total. ¡Todas las alumnas de este programa "Gonvar+ cuatrimestral" participan para <strong>ganar un iPad Nuevo</strong>, remodelación de su salón y miles de pesos más! <span style="color: rgb(18, 18, 18);">😍 </span>El primer pago de cuatro, deberás darlo hoy y <strong>Máximo este</strong> SÁBADO 16 de Marzo. Elige tu plan de Pagos:</p>`,
  //       options: [
  //         {
  //           label: "Pagaré en 4 partes de 399 pesos (un pago a la semana)",
  //           value: "Pagaré en 4 partes de 399 pesos",
  //         },
  //         {
  //           label: "Pagaré en una sola exhibición máximo el día sábado",
  //           value: "Pagaré en una sola exhibición",
  //         },
  //       ],
  //     },
  //     {
  //       isVisible: true,
  //       label: `<p><strong>En caso de ser seleccionada</strong>, ¿Te comprometes a tomar el lugar, realizar tus pagos puntualmente y realizar el curso <strong>por completo</strong>? Recuerda que al ser seleccionada <strong>tomarás uno de los lugares</strong> y otras aspirantes quedarán fuera.</p>`,
  //       options: [
  //         {
  //           label: "<p>Si, me comprometo a realizar el programa</p>",
  //           value: "Si, me comprometo",
  //         },
  //         {
  //           label: "<p>No, gracias. Quiero perder mi lugar</p>",
  //           value: "No, gracias",
  //         },
  //       ],
  //     },
  //     {
  //       isVisible: false,
  //       label: "",
  //       options: [
  //         { label: "", value: "" },
  //         { label: "", value: "" },
  //       ],
  //     },
  //   ],
  //   redirect: {
  //     type: "customLink",
  //     link: "https://chat.whatsapp.com/DnmdR5MubavFDGVkkbnmaM",
  //     textButton: "",
  //   },
  // };

  const responsive500 = useMediaQuery({ query: "(max-width: 500px)" });
  // const router = useRouter();

  const [form, setForm] = useState<Form | null>();

  const [isFormValid, setIsFormValid] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [originalEmail, setOriginalEmail] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  const errorRef = useRef<HTMLDivElement>(null);

  const {
    container,
    formContainer,
    title,
    paragraph,
    logo,
    lineaAtravesada,
    inputContainer,
    names,
    name,
    last_name,
    mail,
    phone,
    errorMessageNombre,
    errorMessageApellido,
    errorMessageMail,
    errorMessageMailExist,
    errorMessageWA,
    errorOption,
    image,
    options,
    optionContainer,
    buttonContainer,
    submitButton,
    center,
  } = styles;

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre es obligatorio")
      .min(3, "Al menos 3 letras"),
    apellido: Yup.string()
      .required("El apellido es obligatorio")
      .min(3, "Al menos 3 letras"),
    correo: Yup.string()
      .required("El correo es obligatorio")
      .email("El correo no es válido"),
    numeroWhatsApp: Yup.string().required(
      "El número de WhatsApp es obligatorio"
    ),
    option1: Yup.lazy(() => {
      return form?.optionsArray[0]?.isVisible
        ? Yup.string().required("Debes seleccionar alguna de las opciones")
        : Yup.string();
    }),
    option2: Yup.lazy(() => {
      return form?.optionsArray[1]?.isVisible
        ? Yup.string().required("Debes seleccionar alguna de las opciones")
        : Yup.string();
    }),
    option3: Yup.lazy(() => {
      return form?.optionsArray[2]?.isVisible
        ? Yup.string().required("Debes seleccionar alguna de las opciones")
        : Yup.string();
    }),
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      correo: "",
      numeroWhatsApp: "",
      codigoPais: "",
      nombrePais: "",
      option1: "",
      option2: "",
      option3: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await handleSubmit(values);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof formId !== "string" || !validFormIds.includes(formId)) {
          // Si formId no está incluido en los IDs válidos, redirigir a página de error
          router.push("/forms/formnotfound");
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

          console.log("from Server");
          console.log(formTemp);

          setForm(formTemp);
          setLoading(false);
        } else {
          try {
            // Identificador único del formulario que deseas recuperar
            const customId = `form_${formId}`;

            // Referencia al documento del formulario en Firestore
            const formDocRef = doc(collection(db, "forms"), customId);

            // Obtén los datos del formulario desde Firestore
            const formSnapshot = await getDoc(formDocRef);

            if (formSnapshot.exists()) {
              // El documento existe, puedes acceder a los datos
              const formData = formSnapshot.data() as Form;
              console.log("Datos del formulario recuperados:", formData);

              setForm(formData);
              setLoading(false);
            } else {
              // El documento no existe
              // redirigir a pagina de error
              console.log("El formulario no existe en Firebase");
            }
          } catch (error) {
            console.error("Error al recuperar datos desde Firebase:", error);
          }
        }

        // setLoading(false);
      } catch (error) {
        console.error("Error al recuperar datos desde el server:", error);
      }
    };

    if (router.isReady) {
      // formId = router.query.formId as string | undefined;
      fetchData();
    }
  }, [router.isReady, formId]);

  useEffect(() => {
    if (errorMessage) {
      // Hacer desplazamiento al mensaje de error
      errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [errorMessage]);

  const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("nombre", event.target.value);
  };

  const handleApellidoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("apellido", event.target.value);
  };

  const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value.trim().toLowerCase();
    formik.setFieldValue("correo", newEmail);

    // Restablecer el mensaje de error si el correo electrónico cambia
    if (errorMessage && newEmail !== originalEmail) {
      setErrorMessage(null);
    }

    if (newEmail == originalEmail)
      setErrorMessage("Este correo ya se ha inscrito. Intenta con otro");
  };

  const handlePaisChange = (
    value: any,
    selectedCountry: any,
    selectedCode: any
  ) => {
    formik.setFieldValue("numeroWhatsApp", value);
    formik.setFieldValue("nombrePais", selectedCountry);
    formik.setFieldValue("codigoPais", selectedCode);
  };

  const handleNombreBlur = () => {
    formik.setFieldTouched("nombre", true);
  };

  const handleApellidoBlur = () => {
    formik.setFieldTouched("apellido", true);
  };

  const handleMailBlur = () => {
    formik.setFieldTouched("correo", true);
  };

  const handlePaisBlur = () => {
    formik.setFieldTouched("numeroWhatsApp", true);
  };

  const handleSubmit = async (values: any) => {
    const lowerCaseMail = values.correo.toLowerCase();

    const createUserDto = {
      formId: formId,
      nombre: values.nombre,
      apellido: values.apellido,
      mail: lowerCaseMail,
      numeroWhatsapp: values.numeroWhatsApp,
      pais: values.nombrePais,
      option1: values.option1,
      option2: values.option2,
      option3: values.option3,
    };

    console.log(createUserDto);

    try {
      const res = await createUserFormApi(createUserDto);
      const createUserResult = res.data.result;
      // const createUserResult = true;
      // console.log(createUserResult);
      // const createUserResult = false;

      if (createUserResult) {
        // const link =
        //   form?.redirect?.type === "thankYouPage"
        //     ? "/forms/thankyoupage"
        //     : form?.redirect?.link || "";
        const link = "forms/thankyoupage?formId=" + formId;
        router.push(link);

        // setIsUserCreateModalVisible(true)
        console.log("usuario registrado exitosamente");
      } else {
        //popup el usuario ya esta registrado
        // setIsUserExistModalVisible(true)
        setOriginalEmail(formik.values.correo);
        setErrorMessage("Este correo ya se ha inscrito. Intenta con otro");
        console.log("usuario ya registrado");
      }
    } catch (error) {
      //popup hubo un error, intentelo otra vez
      console.error("Error al crear el usuario", error);
    }
  };

  const validarOpciones = () => {
    let opcionesValidas = true;

    // Validar option1
    if (!formik.values.option1 && form?.optionsArray[0]?.isVisible) {
      formik.setFieldError("option1", "Debes seleccionar una de las opciones");
      opcionesValidas = false;
    }

    // Validar option2
    if (!formik.values.option2 && form?.optionsArray[1]?.isVisible) {
      formik.setFieldError("option2", "Debes seleccionar una de las opciones");
      opcionesValidas = false;
    }

    // Validar option3
    if (!formik.values.option3 && form?.optionsArray[2]?.isVisible) {
      formik.setFieldError("option3", "Debes seleccionar una de las opciones");
      opcionesValidas = false;
    }

    return opcionesValidas;
  };

  const handleButtonClick = () => {
    // Marcar todos los campos como "touched"
    formik.setTouched({
      nombre: true,
      apellido: true,
      correo: true,
      numeroWhatsApp: true,
      option1: true,
      option2: true,
      option3: true,
    });

    // Realizar la validación del formulario
    formik.validateForm().then((errors) => {
      // Verificar si hay errores en los campos
      const formIsValid = Object.keys(errors).length === 0;

      // Validar opciones
      const optionsAreValid = validarOpciones();

      // Actualizar el estado de validez del formulario
      setIsFormValid(formIsValid && optionsAreValid);

      // Si el checkbox está marcado y el formulario es válido, enviar el formulario
      if (formIsValid && optionsAreValid) {
        try {
          formik.handleSubmit();
        } catch (error) {
          console.error("Error al enviar el formulario", error);
        }
      } else {
        console.error("Campos no validos");
        console.log("form valid", formIsValid);
        console.log("options valid", optionsAreValid);
      }
    });
  };

  const handleOptionChange = (componentIndex: number, value: string) => {
    const fieldName = `option${componentIndex}`;
    formik.setFieldValue(fieldName, value);
  };

  const displayContent = ({ content }: DisplayContentProps) => {
    // Función para sanitizar la cadena HTML
    const sanitizeHTML = (html: string): { __html: string } => {
      return { __html: html };
    };

    return <div dangerouslySetInnerHTML={sanitizeHTML(content)} />;
  };

  if (loading) {
    return (
      <Background style={{ alignItems: "center", justifyContent: "center" }}>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background>
    );
  }

  return (
    <div className={container}>
      <img
        className={logo}
        src="/images/forms/logoGonvar+.png"
        alt="logo Gonvar"
        style={responsive500 ? { maxWidth: 320 } : {}}
      />
      <div className={formContainer}>
        <h2 className={title}>
          {form?.title && displayContent({ content: form.title })}
        </h2>
        <h4 className={paragraph}>
          {form?.subtitle && displayContent({ content: form.subtitle })}
        </h4>
        <div className={lineaAtravesada}></div>

        <Countdown />

        <form onSubmit={formik.handleSubmit} className={inputContainer}>
          <div className={names}>
            <div className={name}>
              <InputNombre
                label={"Escribe tu nombre"}
                placeholder={"Carla"}
                onChange={handleNombreChange}
                onBlur={handleNombreBlur}
                value={formik.values.nombre}
              />
              {formik.touched.nombre && formik.errors.nombre && (
                <div className={errorMessageNombre}>{formik.errors.nombre}</div>
              )}
            </div>

            <div className={last_name}>
              <InputApellido
                label={"Escribe tu apellido"}
                placeholder={"Flores"}
                onChange={handleApellidoChange}
                onBlur={handleApellidoBlur}
                value={formik.values.apellido}
              />
              {formik.touched.apellido && formik.errors.apellido && (
                <div className={errorMessageApellido}>
                  {formik.errors.apellido}
                </div>
              )}
            </div>
          </div>
          <div ref={errorRef} className={mail}>
            <InputMail
              label={"Escribe tu correo electrónico"}
              placeholder={"carlaflores@gmail.com"}
              onChange={handleMailChange}
              onBlur={handleMailBlur}
              value={formik.values.correo}
            />
            {formik.touched.correo && formik.errors.correo && (
              <div className={errorMessageMail}>{formik.errors.correo}</div>
            )}
            {errorMessage && (
              <div className={errorMessageMail}>{errorMessage}</div>
            )}
          </div>
          <div className={phone}>
            <InputWatsapp
              label={"Escribe tu WhatsApp (Selecciona tu país primero)"}
              placeholder={"1153137872"}
              onChange={handlePaisChange}
              onBlur={handlePaisBlur}
              value={formik.values.numeroWhatsApp}
            />
            {formik.touched.numeroWhatsApp && formik.errors.numeroWhatsApp && (
              <div className={errorMessageWA}>
                {formik.errors.numeroWhatsApp}
              </div>
            )}
          </div>
          <div className={image}>
            {form?.img.isVisible && <img src={form.img.source} alt="iphone" />}
          </div>

          <div className={options}>
            <div className={optionContainer}>
              <OptionComponent
                label={form?.optionsArray[0]?.label || ""}
                options={form?.optionsArray[0]?.options || []}
                onOptionChange={(value) => handleOptionChange(1, value)}
                isVisible={!!form?.optionsArray[0]?.isVisible}
              />
              {formik.touched.option1 && formik.errors.option1 && (
                <div className={errorOption}>{formik.errors.option1}</div>
              )}
            </div>

            <div className={optionContainer}>
              <OptionComponent
                label={form?.optionsArray[1]?.label || ""}
                options={form?.optionsArray[1]?.options || []}
                onOptionChange={(value) => handleOptionChange(2, value)}
                isVisible={!!form?.optionsArray[1]?.isVisible}
              />
              {formik.touched.option2 && formik.errors.option2 && (
                <div className={errorOption}>{formik.errors.option2}</div>
              )}
            </div>

            <div className={optionContainer}>
              <OptionComponent
                label={form?.optionsArray[2]?.label || ""}
                options={form?.optionsArray[2]?.options || []}
                onOptionChange={(value) => handleOptionChange(3, value)}
                isVisible={!!form?.optionsArray[2]?.isVisible}
              />
              {form?.optionsArray[2]?.isVisible
                ? formik.touched.option3 &&
                formik.errors.option3 && (
                  <div className={errorOption}>{formik.errors.option3}</div>
                )
                : null}
            </div>
          </div>
          <div className={lineaAtravesada}></div>

          {/* {specialFormIds.includes(formId) &&
            form?.redirect.type === "customLink" && (
              <div className={center}>
                <p>Al enviar tu solicitud te redirigiremos </p>
                <p>a nuestro grupo de WhatsApp. Gracias</p>
              </div>
            )} */}

          <div className={buttonContainer}>
            <button
              type="button"
              className={submitButton}
              onClick={handleButtonClick}
            >
              {form?.redirect.textButton === ""
                ? "Enviar Solicitud"
                : form?.redirect.textButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formularios;
