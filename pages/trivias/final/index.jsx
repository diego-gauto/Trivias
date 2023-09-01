import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./final.module.css";

import Failed from "../../../components/Trivias/final/failed"
import Success from "../../../components/Trivias/final/success"
import Beneficios from "../../../components/Trivias/final/beneficios"

const Final = () => {
  const { finalContainer, final, finalTextos, finalVolver, finalImg, link } =
  styles;

  const router = useRouter();

  const {
    query: { createUserSuccess },
  } = useRouter();

  const success = (createUserSuccess==="true")
  console.log(createUserSuccess)
  console.log(success)

  return (
    <>
    <div className={finalContainer}>
      <style jsx global>{`
        body {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <div className={final}>
        <Link href={"/trivias"}>
          <a className={link}>
            <div className={finalVolver}>
              <img src="/images/trivias/icono . retroceder.svg" alt="" />
              <div> Volver</div>
            </div>
          </a>
        </Link>
        {success?<Success></Success>:<Failed></Failed>}
      </div>
      <div className={finalImg}>
        <img src="/images/trivias/logo gonvar blanco.svg" alt="" />
      </div>
    </div>
          {success && <Beneficios></Beneficios>}
    </>
  );
};

export default Final;
