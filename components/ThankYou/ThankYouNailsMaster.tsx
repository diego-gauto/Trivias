import React, { useEffect } from 'react'
import Link from "next/link";
import { PREVIEW_PATH } from '../../constants/paths';
import { ThankYouContainer } from './ThankYou.styled';

const ThankYouNailsMaster = () => {

  const redirecTo = () => {
    window.location.href = "/preview";
  }

  useEffect(() => {
    setTimeout(() => {
      redirecTo();
    }, 5000)
  }, [])

  return (
    <ThankYouContainer>
      <div className='modal-costum'>
        <h1>¡Grandes noticias</h1>
        <p><span>¡Tu compra ha sido exitosa!</span> Enviamos el <br />
          recibo de pago a tu correo electrónico. <br /> <br />

          Ahora formas parte de la comunidad Gonvar+. <br />
          <b>¡No esperes más y comienza a aprender!</b></p>

        <button className="full">
          <Link href={PREVIEW_PATH}>Ver los cursos</Link>
        </button>
      </div>
    </ThankYouContainer>
  )
}
export default ThankYouNailsMaster;