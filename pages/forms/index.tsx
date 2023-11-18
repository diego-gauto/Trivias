import React, { useState } from "react";

// import { isValidPhoneNumber } from "react-phone-number-input";
import { useFormik } from "formik";
// import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";

import InputMail from "../../components/Forms/inputMail/inputMail";
import InputNombre from "../../components/Forms/inputNombre/inputNombre";
import InputWatsapp from "../../components/Forms/inputWhatsapp/inputWhatsapp";
import ModalSuccessUserCreate from "../../components/Forms/Modals/modalSuccesUserCreate";
import ModalUserExist from "../../components/Forms/Modals/modalUserExist";
import OptionComponent from "../../components/Forms/option/option";
import styles from "./formulario.module.css";

const Formularios = () => {
  const {
    query: { formId },
  } = useRouter();

  const [isFormValid, setIsFormValid] = useState(false);

  const [selectedOption1, setSelectedOption1] = useState<string | null>(null);
  const [selectedOption2, setSelectedOption2] = useState<string | null>(null);
  const [selectedOption3, setSelectedOption3] = useState<string | null>(null);


  const [isImageVisible, setIsImageVisible] = useState(true);
  const [isOption1Visible, setIsOption1Visible] = useState(true);
  const [isOption2Visible, setIsOption2Visible] = useState(true);
  const [isOption3Visible, setIsOption3Visible] = useState(true);

  const [isUserCreateModalVisible, setIsUserCreateModalVisible] = useState(false);
  const [isUserExistModalVisible, setIsUserExistModalVisible] = useState(false);
  // const [isUserCreateModalVisible, setIsUserCreateModalVisible] = useState(false);





  const { container, formContainer, title, paragraph, logo, lineaAtravesada, inputContainer, names, mail, phone, errorMessageNombre, errorMessageApellido, errorMessageMail, errorMessageWA, image, options, buttonContainer, submitButton } = styles;

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio').min(3, 'El nombre debe tener al menos 3 letras'),
    apellido: Yup.string().required('El apellido es obligatorio').min(3, 'El apellido debe tener al menos 3 letras'),
    correo: Yup.string().required('El correo electrónico es obligatorio').email('El correo electrónico no es válido'),
    numeroWhatsApp: Yup.string().required('El número de WhatsApp es obligatorio')
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


  const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('nombre', event.target.value);
  };

  const handleApellidoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('apellido', event.target.value);
  };

  const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('correo', event.target.value);
  };


  const handlePaisChange = (value: any, selectedCountry: any, selectedCode: any) => {
    formik.setFieldValue("numeroWhatsApp", value);
    formik.setFieldValue("nombrePais", selectedCountry);
    formik.setFieldValue("codigoPais", selectedCode)

    // const isValid = isValidPhoneNumber(value, selectedCode)
    // console.log(value)
    // console.log(selectedCode)
    // console.log(isValid)

  };

  const handleNombreBlur = () => {
    formik.setFieldTouched('nombre', true);
  };

  const handleApellidoBlur = () => {
    formik.setFieldTouched('apellido', true);
  };

  const handleMailBlur = () => {
    formik.setFieldTouched('correo', true);
  };

  const handlePaisBlur = () => {
    formik.setFieldTouched('numeroWhatsApp', true);
  };

  // const handleRedirect = (createUserSuccess: boolean) => {
  //   router.push(`/trivias/final?createUserSuccess=${createUserSuccess}`);
  //   console.log("entro")
  // };

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

    console.log(createUserDto)

    try {
      // const res = await createUserFormApi(createUserDto);
      // const createUserResult = res.data.result;
      const createUserResult = true;

      if (createUserResult) {
        setIsUserCreateModalVisible(true)
        console.log("usuario registrado exitosamente")
      } else {
        //popup el usuario ya esta registrado
        setIsUserExistModalVisible(true)
        console.log("usuario ya registrado")
      }
    } catch (error) {
      //popup hubo un error, intentelo otra vez
      console.error("Error al crear el usuario", error);
    }

  };

  const handleButtonClick = () => {
    // Marcar todos los campos como "touched"
    formik.setTouched({
      nombre: true,
      apellido: true,
      correo: true,
      numeroWhatsApp: true,
    });

    // Realizar la validación del formulario
    formik.validateForm().then((errors) => {
      // Verificar si hay errores en los campos
      const formIsValid = Object.keys(errors).length === 0;

      // Actualizar el estado de validez del formulario
      setIsFormValid(formIsValid);

      // Si el checkbox está marcado y el formulario es válido, enviar el formulario
      if (formIsValid) {
        try {
          formik.handleSubmit();
        } catch (error) {
          console.error("Error al enviar el formulario", error);
        }
      }
    });
  };

  // useEffect(() => {
  //   if (localStorage.getItem("email")) {
  //     getUserApi(localStorage.getItem("email")).then((res) => {
  //       setUserData(res);
  //       formik.setFieldValue("nombre", res.name);
  //       formik.setFieldValue("apellido", res.last_name);
  //       formik.setFieldValue("correo", res.email);
  //       setUserDataLoaded(true);
  //     });
  //   }
  // }, []);
  const handleOptionChange = (componentIndex: number, value: string) => {
    const fieldName = `option${componentIndex}`;
    formik.setFieldValue(fieldName, value);
  };

  const optionLabel1 = "Recuerda que el 𝗰𝗼𝘀𝘁𝗼 𝘁𝗼𝘁𝗮𝗹 𝗱𝗲𝗹 𝗽𝗿𝗼𝗴𝗿𝗮𝗺𝗮 𝗲𝘀 𝗱𝗲 𝟭,𝟱𝟵𝟵 𝗠𝗫𝗡 y podrás pagarlo en 4 partes. 𝗦𝗲 𝗱𝗮𝗿á 𝗮𝗰𝗰𝗲𝘀𝗼 una vez que liquides el monto total. ¡Todas las alumnas de este curso participan para 𝗴𝗮𝗻𝗮𝗿 𝘂𝗻 𝗶𝗣𝗵𝗼𝗻𝗲 𝟭𝟱 𝗣𝗿𝗼 NUEVO, remodelación de su salón y miles de pesos más! 😍El primer pago de cuatro, deberás darlo hoy y 𝗠Á𝗫𝗜𝗠𝗢 𝗲𝘀𝘁𝗲 𝗩𝗜𝗘𝗥𝗡𝗘𝗦 3 de Noviembre. Elige tu plan de Pagos:"
  const optionLabel2 = "𝗘𝗻 𝗰𝗮𝘀𝗼 𝗱𝗲 𝘀𝗲𝗿 𝘀𝗲𝗹𝗲𝗰𝗰𝗶𝗼𝗻𝗮𝗱𝗮, ¿Te comprometes a tomar el lugar, realizar tus pagos puntualmente y realizar el curso 𝗽𝗼𝗿 𝗰𝗼𝗺𝗽𝗹𝗲𝘁𝗼? Recuerda que al ser seleccionada 𝘁𝗼𝗺𝗮𝗿á𝘀 𝘂𝗻𝗼 𝗱𝗲 𝗹𝗼𝘀 𝗹𝘂𝗴𝗮𝗿𝗲𝘀 y otras aspirantes quedarán fuera."
  const optionLabel3 = "𝗘𝗻 𝗰𝗮𝘀𝗼 𝗱𝗲 𝘀𝗲𝗿 𝘀𝗲𝗹𝗲𝗰𝗰𝗶𝗼𝗻𝗮𝗱𝗮, ¿Te comprometes a tomar el lugar, realizar tus pagos puntualmente y realizar el curso 𝗽𝗼𝗿 𝗰𝗼𝗺𝗽𝗹𝗲𝘁𝗼?"

  const options1 = ["Pagaré en 4 partes de $399,00 MXN ( un pago a la semana )", "Pagaré en una sola exhibición máximo el día Viernes"]
  const options2 = ["Si, me comprometo a realizar el programa", "No, gracias. Quiero perder mi lugar"]
  const options3 = ["Si, me comprometo", "No, gracias"]


  return (
    <div className={container}>

      <img className={logo} src="/images/forms/logoGonvar+.png" alt="logo Gonvar" />
      <div className={formContainer}>
        <h2 className={title}>𝗦𝗼𝗹𝗶𝗰𝗶𝘁𝘂𝗱 de Beca de 75% y 𝗣𝗹𝗮𝗻 𝗱𝗲 𝟰 𝗽𝗮𝗴𝗼𝘀</h2>
        <p className={paragraph}>𝗠á𝘀 𝗱𝗲 𝟲𝟬 𝗰𝗹𝗮𝘀𝗲𝘀 𝗶𝗻𝗰𝗹𝘂𝗶𝗱𝗮𝘀. Un curso online 𝗗𝗲𝘀𝗱𝗲 𝗖𝗲𝗿𝗼 con 𝗿𝗲𝘃𝗶𝘀𝗶ó𝗻 𝗱𝗲 𝗽𝗿á𝗰𝘁𝗶𝗰𝗮𝘀, asesorías ilimitadas y 𝗖𝗲𝗿𝘁𝗶𝗳𝗶𝗰𝗮𝗱𝗼 𝗼𝗳𝗶𝗰𝗶𝗮𝗹 de la marca. Un precio real de $̶6̶7̶1̶9̶ MXN reducido a un costo total de 1,599 MXN (99 USD) que podrás pagar en 4 pagos de 399 MXN (25 USD).💞 𝗟𝗨𝗚𝗔𝗥𝗘𝗦 𝗠𝗨𝗬 𝗟𝗜𝗠𝗜𝗧𝗔𝗗𝗢𝗦. 𝗔𝗽𝗿𝗲𝘀ú𝗿𝗮𝘁𝗲 𝗮 𝗮𝗽𝗮𝗿𝘁𝗮𝗿 𝘁𝘂 𝗹𝘂𝗴𝗮𝗿 𝗮𝗻𝘁𝗲𝘀 𝗱𝗲 𝗾𝘂𝗲 𝘀𝗲 𝗮𝗴𝗼𝘁𝗲𝗻.  𝗦𝗼𝗹𝗶𝗰𝗶𝘁𝗮 tu inscripción con beca al 75% y plan de 𝟰 𝗽𝗮𝗴𝗼𝘀 𝗱𝗲 𝟯𝟵𝟵 𝗠𝗫𝗡 (uno a la semana) y en caso de ser seleccionada, te contactaremos de inmediato. 🥳 </p>
        <div className={lineaAtravesada}></div>

        <form onSubmit={formik.handleSubmit} className={inputContainer}>
          <div className={names}>
            <InputNombre
              label={"Nombre"}
              placeholder={"Carla"}
              onChange={handleNombreChange}
              onBlur={handleNombreBlur}
              value={formik.values.nombre}
            />
            {formik.touched.nombre && formik.errors.nombre && (
              <div className={errorMessageNombre}>{formik.errors.nombre}</div>
            )}

            <InputNombre
              label={"Apellido"}
              placeholder={"Flores"}
              onChange={handleApellidoChange}
              onBlur={handleApellidoBlur}
              value={formik.values.apellido}
            />
            {formik.touched.apellido && formik.errors.apellido && (
              <div className={errorMessageApellido}>{formik.errors.apellido}</div>
            )}

          </div>
          <div className={mail}>
            <InputMail
              label={"Correo Electrónico"}
              placeholder={"carlaflores@gmail.com"}
              onChange={handleMailChange}
              onBlur={handleMailBlur}
              value={formik.values.correo}
            />
            {formik.touched.correo && formik.errors.correo && (
              <div className={errorMessageMail}>{formik.errors.correo}</div>
            )}
          </div>
          <div className={phone}>
            <InputWatsapp
              label={"Número de WhatsApp"}
              placeholder={"1153137872"}
              onChange={handlePaisChange}
              onBlur={handlePaisBlur}
              value={formik.values.numeroWhatsApp}
            />
            {formik.touched.numeroWhatsApp && formik.errors.numeroWhatsApp && (
              <div className={errorMessageWA}>{formik.errors.numeroWhatsApp}</div>
            )}
          </div>
          {isImageVisible && <img className={image} src="./images/forms/iPhone-14-removebg.png" alt="iphone" />}
          <div className={options}>
            <OptionComponent label={optionLabel1} options={options1} onOptionChange={(value) => handleOptionChange(1, value)} isVisible={isOption1Visible} />
            <OptionComponent label={optionLabel2} options={options2} onOptionChange={(value) => handleOptionChange(2, value)} isVisible={isOption2Visible} />
            <OptionComponent label={optionLabel3} options={options3} onOptionChange={(value) => handleOptionChange(3, value)} isVisible={isOption3Visible} />
          </div>
          <div className={lineaAtravesada}></div>

          <div className={buttonContainer}>
            <button type="submit" className={submitButton} onClick={handleButtonClick}>
              Enviar Solicitud
            </button>
          </div>


        </form>
      </div>
      {isUserCreateModalVisible && <ModalSuccessUserCreate closeModal={setIsUserCreateModalVisible} />}
      {isUserExistModalVisible && <ModalUserExist closeModal={setIsUserExistModalVisible} />}

    </div>
  );
};

export default Formularios;
