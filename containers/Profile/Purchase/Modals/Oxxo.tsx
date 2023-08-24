import React, { useEffect, useState } from 'react'
import { ModalContainer, OxxoContainer } from './Modals.styled';

const OxxoModal = ({ show, setShow, user, product, barcode, reference, expires_at }: any) => {

  const transformDate = (timestamp: any) => {
    const date = new Date(timestamp * 1000);

    // Format the date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Create the formatted string
    const formattedDate = `${year}-${month}-${day} - ${hours}:${minutes} hrs`;
    return formattedDate;
  }

  return (
    <ModalContainer show={show} onHide={() => { setShow(false) }} centered>
      <OxxoContainer>
        <h3>Hola {user.name}</h3>
        <p>Gonvar Nails te ha enviado una referencia
          para pago seguro en efectivo con <span>Conekta</span> en <span>tiendas OXXO</span>
        </p>
        <p className='p10'>Los pagos en oxxo tardan en reflejarse hasta 48 hrs. <br />
          Ingresa a la plataforma después de este tiempo para tener validado tu pago</p>
        <p className='p10'>*La referencia le llegara a su correo electronico.</p>
        <p className='p12-bold'>Referencia: {reference}</p>
        <img src={barcode} />
        <p className='p12'>Monto a pagar:</p>
        <p className='p18'>${product.price} MXN</p>
        <p className='p12-bold'>+$14.00 MXN por comisión de OXXO</p>
        <p className='p12'>Paga antes del {transformDate(expires_at)}.</p>
        <img style={{ width: "50px" }} src="/images/purchase/oxxo.png" alt="" />
      </OxxoContainer>
    </ModalContainer>
  )
}
export default OxxoModal;