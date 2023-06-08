import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import { useNavigate, useParams } from "react-router-dom";
import InputNombre from "../../../../components/Trivias/inputNombre/inputNombre";
import styles from "./form.module.css";
// import logoGonvarBL from "/images/logo gonvar blanco.svg";
// import volverFlecha from "/images/icono . retroceder.svg";
import InputMail from "../../../../components/Trivias/inputMail/inputMail";
import InputWatsapp from "../../../../components/Trivias/inputWhatsapp/inputWhatsapp";
import userTrivia from "../../../../components/api/usertrivia"

const Form = () => {
  //   const navigate = useNavigate();
  //   const { id } = useParams();
  const {
    query: { triviaId, result },
  } = useRouter();
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [numeroWhatsApp, setNumeroWhatsApp] = useState("");

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

  //   const handleVolver = () => {
  //     navigate(`/trivias`);
  //   };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleApellidoChange = (event) => {
    setApellido(event.target.value);
  };

  const handleMailChange = (event) => {
    setCorreo(event.target.value);
  };

  const handlePaisChange = (event) => {
    setNumeroWhatsApp(event.target.value);
  };

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  const handleRedirect = (createUserSuccess) => {
    // const router = useRouter();
    router.push(`/trivias/final?createUserSuccess=${createUserSuccess}`);
  };

  const handleSubmit = async () => {
    const createUserDto = {
      nombre: nombre,
      apellido: apellido,
      mail: correo,
      numeroWhatsapp: numeroWhatsApp,
      pais: "Argentina", // Completa el país según corresponda
      isUser:false,
      numeroTrivia: triviaId, // Completa el número de trivia según corresponda
      resultadoTrivia: result, // Completa el resultado de la trivia según corresponda
    };

    

    let createUserSuccess = false; // Variable para almacenar el resultado del primer POST

    try {
      // Realizar la solicitud HTTP POST para crear el usuario
      // const createUserResponse = await fetch("http://localhost:3000/userTrivia", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(createUserDto),
      // });

      //userTrivia(createUserDto)
      const createUserResult = userTrivia(createUserDto); // Obtener el resultado del primer POST

      if (createUserResult) {
        createUserSuccess = true;
        // El usuario fue creado correctamente, se puede proceder al envío del correo
        const sendEmailDto = {
          to: correo,
          username: nombre + " " + apellido,
          subject: "Prueba de envío por SendinBlu desde el front",
          idTemplateBrevo: 7,
          //numeroWhatsApp: numeroWhatsApp,
        };

        // Realizar la solicitud HTTP POST para enviar el correo
        const sendEmailResponse = await fetch("http://localhost:3000/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendEmailDto),
        });

        if (sendEmailResponse.ok) {
          // El correo se envió correctamente
          console.log("Correo enviado correctamente");
        } else {
          // Hubo un error al enviar el correo
          console.log("Error al enviar el correo");
        }
      } else {
        // Hubo un error al crear el usuario
        console.log("Error al crear el usuario");
      }
      
      handleRedirect(createUserSuccess);
      // Redireccionar a `/trivias/final`
      //   navigate(`/trivias/final`, { state: { createUserSuccess } });
    } catch (error) {
      console.error(error);
    }
  };

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
              placeholder={"Carla"}
              onChange={handleNombreChange}
            />
            <InputNombre
              label={"Apellido"}
              placeholder={"Flores"}
              onChange={handleApellidoChange}
            />
            <InputMail
              label={"Correo Electrónico"}
              placeholder={"carlaflores@gmail.com"}
              onChange={handleMailChange}
            />
            <InputWatsapp
              label={"Número de whatsApp"}
              placeholder={"1153137872"}
              onChange={setNumeroWhatsApp}
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
