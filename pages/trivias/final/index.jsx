import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./final.module.css";

const Final = () => {
  const { finalContainer, final, finalTextos, finalVolver, finalImg, link } =
  styles;

  const router = useRouter();
  // const { createUserSuccess } = router.query;

  const {
    query: { createUserSuccess },
  } = useRouter();

  const [title, setTitle] = useState("Revisa tu email");
  const [message, setMessage] = useState(
    "Busca en la bandeja de correo o en spam y"
  );
  const [span, setSpan] = useState("disfruta del descuento.");

  const isUserCreated = createUserSuccess === "true";

  useEffect(() => {
    if (!isUserCreated) {
      setTitle("Ya has jugado a esta trivia");
      setMessage(
        "Lamentablemente solo podemos entregar el premio la primera vez"
      );
      setSpan("");
    }
  }, [isUserCreated]);

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
        <Link href={"/trivias"}>
          <a className={link}>
            <div className={finalVolver}>
              <img src="/images/trivias/icono . retroceder.svg" alt="" />
              <div> Volver</div>
            </div>
          </a>
        </Link>
        <div className={finalTextos}>
          <h1>{title}</h1>
          <h3>
            {message}
            <span>{" " + span}</span>
          </h3>
        </div>
      </div>
      <div className={finalImg}>
        <img src="/images/trivias/logo gonvar blanco.svg" alt="" />
      </div>
    </div>
  );
};

export default Final;
