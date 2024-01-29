import React from 'react'
import { RetryPaymentContainer } from './RetryPayment.styled'
import { VscChevronDown } from "react-icons/vsc";
import { RetryPayModal } from '../Modals/RetryPayModal/RetryPayModal';
const master_card = "/images/RetryPayment/mastercard.png";

export const RetryPayment = () => {
  return (
    <RetryPaymentContainer>
      <div className='main-container'>
        <h2>Métodos de pago</h2>
        <p className='description'>Edita tus métodos de pago y agrega una forma de pago<br /> adicional como respaldo.</p>
        <div className='payment-method'>
          <img src={master_card} />
          <p className='dots'>**** **** ****</p>
          <p className='text'>{'4811'}</p>
        </div>
        <p className='description-2'>Para quitarla, agrega otra forma de pago </p>
        <div className='edit'>
          <div className='default'>
            <p>Predeterminada</p>
          </div>
          <div className='right'>
            <p className='actives'>Editar</p>
            <p className='actives'>Eliminar</p>
          </div>
        </div>
        <button>Reintentar pago</button>
        <button className='type2'>Agregar método de pago <VscChevronDown /> </button>
        <a href='/preview' className='actives'>Ir a mis cursos</a>
      </div>
      {/* <RetryPayModal
        show={true}
        onHide={() => { }}
        withSubscription={true}
      /> */}
    </RetryPaymentContainer>
  )
}
