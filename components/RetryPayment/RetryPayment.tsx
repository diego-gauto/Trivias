import React, { useState } from 'react'
import { RetryPaymentContainer } from './RetryPayment.styled'
import { VscChevronDown } from "react-icons/vsc";
import { RetryPayModal } from '../Modals/RetryPayModal/RetryPayModal';
const master_card = "/images/RetryPayment/mastercard.png";
let dummyArray: IPm[] = [
  { last4: '4444', default: true },
  { last4: '3424', default: false },
]
interface IPm {
  last4: string;
  default: boolean;
}
export const RetryPayment = () => {
  const [paymentMethods, setPaymentMethods] = useState<IPm[]>(dummyArray)
  const changePaymentMethod = (index: number) => {
    let tempPaymentsMethods: IPm[] = [...paymentMethods];
    // tempPaymentsMethods[index]?.default = false;
  }
  return (
    <RetryPaymentContainer>
      <div className='main-container'>
        <h2>Métodos de pago</h2>
        <p className='description'>Edita tus métodos de pago y agrega una forma de pago<br /> adicional como respaldo.</p>
        {
          paymentMethods.length > 0 &&
          <div className='payment-container'>
            {
              paymentMethods.map((pm: IPm, index: number) => {
                return (
                  <div className='payment-container' key={"pm-" + index}>
                    <div className='payment-method'>
                      <img src={master_card} />
                      <p className='dots'>**** **** ****</p>
                      <p className='text'>{pm.last4}</p>
                    </div>
                    <p className='description-2'>Para quitarla, agrega otra forma de pago </p>
                    <div className='edit'>
                      <div className='default'>
                        <div className={'input-radio ' + (pm.default ? "selected-radio" : "")} onClick={() => changePaymentMethod(index)}>
                          <div className='dot' />
                        </div>
                        <p>Predeterminada</p>
                      </div>
                      <div className='right'>
                        <p className='actives'>Editar</p>
                        <p className='actives'>Eliminar</p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        }
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
