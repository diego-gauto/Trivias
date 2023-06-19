import React, { useEffect } from 'react'
import Link from "next/link";
import { PREVIEW_PATH } from '../../constants/paths';
import { FailedContainer } from './PaymentFailed.styled';

const PaymentFailedAlineacion = () => {

  const redirecTo = () => {
    window.location.href = "/preview";
  }

  useEffect(() => {
    setTimeout(() => {
      redirecTo();
    }, 5000)
  }, [])

  return (
    <FailedContainer>
      <div className='modal-costum'>
        <h1>¡Ha ocurrido unproblema!</h1>
        <p><span>¡Tu compra ha sido cancelada!</span> <br /> <br />

          Por favor de contactar con tu banco! <br /></p>
        <button className="full">
          <Link href={PREVIEW_PATH}>Ver los cursos</Link>
        </button>
      </div>
    </FailedContainer>
  )
}
export default PaymentFailedAlineacion;