import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { getUserApi } from "../../../../components/api/users";
import { emailTrivia, userTrivia } from "../../../../components/api/usertrivia";
import InputMail from "../../../../components/Trivias/inputMail/inputMail";
import InputNombre from "../../../../components/Trivias/inputNombre/inputNombre";
import InputWatsapp from "../../../../components/Trivias/inputWhatsapp/inputWhatsapp";
import styles from "./form.module.css";

const Form = () => {
  const {
    query: { triviaId, result },
  } = useRouter();

  const router = useRouter();

  const [userData, setUserData] = useState<any>(null);
  const [userDataLoaded, setUserDataLoaded] = useState(false);


  const [isChecked, setIsChecked] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [numeroWhatsApp, setNumeroWhatsApp] = useState("");
  const [pais, setPais] = useState("")
  const [isUser, setIsUser] = useState(false)

  const {
    formContainer,
    form,
    volver,
    textos,
    inputContainer,
    checkboxContainer,
    btnRecibir,
    formImg,
    link,
  } = styles;

  const handleNombreChange = (event: any) => {
    setNombre(event.target.value);
  };

  const handleApellidoChange = (event: any) => {
    setApellido(event.target.value);
  };

  const handleMailChange = (event: any) => {
    setCorreo(event.target.value);
  };

  const handlePaisChange = (value: any, selectedCountry: any) => {
    setNumeroWhatsApp(value);
    setPais(selectedCountry)
  };

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  const handleRedirect = (createUserSuccess: boolean) => {
    router.push(`/trivias/final?createUserSuccess=${createUserSuccess}`);
  };

  const handleSubmit = async () => {

    const createUserDto = {
      nombre: nombre,
      apellido: apellido,
      mail: correo,
      numeroWhatsapp: numeroWhatsApp,
      pais: pais, // Completa el país según corresponda
      isUser: isUser,
      numeroTrivia: triviaId, // Completa el número de trivia según corresponda
      resultadoTrivia: result, // Completa el resultado de la trivia según corresponda
    };

    console.log(createUserDto);

    let createUserSuccess: boolean = false; // Variable para almacenar el resultado del primer POST

    userTrivia(createUserDto).then((res) => {
      const createUserResult = res.data.result

      if (createUserResult) {
        createUserSuccess = true;
        // El usuario fue creado correctamente, se puede proceder al envío del correo
        const sendEmailDto = {
          to: correo,
          username: nombre + " " + apellido,
          subject: "Prueba de envío por SendinBlu desde el front",
          idTemplateBrevo: 7,
        };

        const sendEmailResponse = emailTrivia(sendEmailDto)

        console.log(sendEmailResponse)
      } else {
        // El usuario ya había jugado a esta trivia
        console.log("El usuario ya jugó a esta trivia");
      }

      handleRedirect(createUserSuccess);

    })
      .catch((error) => {
        console.error("Error al crear el usuario", error);
      });
  }

  useEffect(() => {
    if (localStorage.getItem("email")) {
      getUserApi(localStorage.getItem("email")).then((res) => {
        setUserData(res);
        setNombre(res.name);
        setApellido(res.last_name);
        setCorreo(res.email);
        setUserDataLoaded(true);
        setIsUser(true)
      })
    }

  }, [])
  console.log(numeroWhatsApp)
  console.log(pais)
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <div className={formContainer}>
        <div className={form}>
          <Link href={"/trivias"}>
            <a className={link}>
              <div className={volver}>
                <img src="/images/trivias/icono . retroceder.svg" alt="" />
                <div> Volver</div>
              </div>
            </a>
          </Link>
          <div className={textos}>
            <h1>¡Felicidades!</h1>
            <h3>
              ¡Te ganaste un cupón de 30% para cualquiera de nuestros cursos{" "}
              <span>en línea!</span>
            </h3>
            <p>
              Nota : Una vez llenes los datos, te enviaremos el cupón de
              descuento a tú correo electrónico.
            </p>
          </div>
          <form action="" className={inputContainer}>
            <InputNombre
              label={"Nombre"}
              placeholder={userDataLoaded ? nombre : "Carla"}
              onChange={handleNombreChange}
              disabled={userDataLoaded}
            />
            <InputNombre
              label={"Apellido"}
              placeholder={userDataLoaded ? apellido : "Flores"}
              onChange={handleApellidoChange}
              disabled={userDataLoaded}
            />
            <InputMail
              label={"Correo Electrónico"}
              placeholder={userDataLoaded ? correo : "carlaflores@gmail.com"}
              onChange={handleMailChange}
              disabled={userDataLoaded}

            />
            <InputWatsapp
              label={"Número de whatsApp"}
              placeholder={"1153137872"}
              onChange={handlePaisChange}
            />
          </form>
          <div className={checkboxContainer}>
            <input
              type="checkbox"
              name="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="checkbox">
              He leído y acepto los{" "}
              <span>Términos y Condiciones y Políticas de privacidad</span>
            </label>
          </div>
          <button
            className={btnRecibir}
            disabled={!isChecked}
            style={{ pointerEvents: isChecked ? "auto" : "none" }}
            onClick={() => {
              handleSubmit();
            }}
          >
            Recibir regalo
          </button>
        </div>
        <div className={formImg}>
          <img src="/images/trivias/logo gonvar blanco.svg" alt="" />
        </div>
      </div>
    </>
  );
};

export default Form;