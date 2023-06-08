import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./final.module.css";
// import logoGonvarBL from "/images/trivia/logo gonvar blanco.svg";
// import volverFlecha from "/images/trivias/icono . retroceder.svg";

const Final = () => {
  //   const navigate = useNavigate();
  //   const location = useLocation();
  //   const { createUserSuccess } = location.state || {};

  const router = useRouter();
  const { createUserSuccess } = router.query;

  console.log(createUserSuccess);
  console.log(Boolean(createUserSuccess));

  const { finalContainer, final, finalTextos, finalVolver, finalImg, link } =
    styles;

  //   const handleVolver = () => {
  //     navigate(`/trivias`);
  //   };
  const booleanValue = Boolean(createUserSuccess);
  let title = "";
  let message = "";
  let span = "";

  if (!booleanValue) {
    title = "Ya has jugado a esta trivia";
    message = "Lamentablemente solo podemos entregar el premio la primera vez";
    span = "";
    console.log("adentro del true");
  } else {
    title = "Revisa tu email";
    message = "Busca en la bandeja de correo o en spam y ";
    span = "disfruta del descuento.";
    console.log("adentro del false");
  }

  console.log(title);
  console.log(message);
  console.log(span);

  return (
    <div className={finalContainer}>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <div className={final}>
        {/* <div className={finalVolver} onClick={handleVolver}>
          <img src={volverFlecha} alt="" />
          <div> Volver</div>
        </div> */}
        <Link href={"/"}>
          <a className={link}>
            <div className={finalVolver}>
              <img src="/images/icono . retroceder.svg" alt="" />
              <div> Volver</div>
            </div>
          </a>
        </Link>
        <div className={finalTextos}>
          <h1>{title}</h1>
          <h3>
            {message}
            <span>{span}</span>
          </h3>
        </div>
      </div>
      <div className={finalImg}>
        <img src="/images/logo gonvar blanco.svg" alt="" />
      </div>
    </div>
  );
};

export default Final;
