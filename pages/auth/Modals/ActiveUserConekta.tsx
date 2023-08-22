import React, { useState } from 'react'
import { ModalContainer, InfoContainer } from '../../../components/Error/ErrorModal.styled';

const ActiveUserConekta = ({ setShow, show, error, user }: any) => {

  const handleClose = () => setShow(false);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <ModalContainer show={show} onHide={handleClose} centered>
      <InfoContainer>
        <p>Gonvar está pasando por un cambio importante en beneficio de nuestras alumnas.</p>
        <p className='p14'>🚨Para esto es necesario que vuelvas a ingresar tus datos bancarios para no perder el acceso a tu
          suscripción mensual por $149 MXN al mes y todos tus beneficios acumulados.</p>
        <p className='p14-bold'>A partir del 18 de septiembre aumentaremos nuestros precios en la suscripción mensual a $199 MXN al mes. </p>
        <p className='p14'>Todas las alumnas que cuenten con su suscripción activa antes de esta fecha se les respetará el precio actual y <span className='p14-bold' style={{ fontWeight: "bold" }}>no habrá aumento en su mensualidad.</span></p>
        <p className='p14'>Para ingresar tu información necesitarás contar con tarjeta de crédito o débito vigente. </p>
        <p className='p14'>Haz click en el botón <span className='p14-bold' style={{ fontWeight: 'bold' }}>Actualizar información</span> para agregar tus datos.</p>
        <button>Actualizar información</button>
        <div>

        </div>
      </InfoContainer>
    </ModalContainer>
  )
}
export default ActiveUserConekta;