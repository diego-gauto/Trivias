import React from 'react'
import { PaymentMethodsContainer } from './PaymentMethods.styled'
const master_card = "/images/RetryPayment/mastercard.png";
import { IPaymentMethods } from './IPaymentMethods';

export const PaymentMethods = (props: IPaymentMethods) => {
  const { pm, index, pm_size, changePaymentMethod } = props;

  return (
    <PaymentMethodsContainer>
      <div className='payment-method'>
        <img src={master_card} />
        <p className='dots'>**** **** ****</p>
        <p className='text'>{pm.last4}</p>
      </div>
      <p className='description-2'>Para quitarla, agrega otra forma de pago </p>
      <div className='edit'>
        {
          pm_size > 1
            ?
            <div className='default'>
              <div className={'input-radio ' + (pm.default ? "selected-radio" : "")} onClick={() => changePaymentMethod(index, pm.default)}>
                <div className='dot' />
              </div>
              <p>Predeterminada</p>
            </div>
            : <div style={{ width: 197 }} />
        }

        <div className='right'>
          <p className='actives'>Editar</p>
          {
            !pm.default ?
              <p className='actives'>Eliminar</p>
              : <div style={{ width: 80 }} />
          }
        </div>
      </div>
    </PaymentMethodsContainer>
  )
}
