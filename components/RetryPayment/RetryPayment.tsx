import React, { useState } from 'react'
import { RetryPaymentContainer } from './RetryPayment.styled'
import { VscChevronDown } from "react-icons/vsc";
import { IPm } from './IRetryPayment';
import { PaymentMethods } from './PaymentMethods/PaymentMethods';
let dummyArray: IPm[] = [
  { last4: '4444', default: true },
  { last4: '3424', default: false },
]

export const RetryPayment = () => {
  const [paymentMethods, setPaymentMethods] = useState<IPm[]>(dummyArray)
  const [addPayment, setAddPayment] = useState<boolean>(false);

  const handleAddpayment = () => {
    setAddPayment(!addPayment);
  }
  const changePaymentMethod = (index: number, deflt: boolean) => {
    let tempPaymentsMethods: IPm[] = [...paymentMethods];
    if (tempPaymentsMethods.length > 1) {
      if (deflt) {
        tempPaymentsMethods[index]!.default = false;
        if (index === 0) {
          tempPaymentsMethods[1]!.default = true;
        } else {
          tempPaymentsMethods[0]!.default = true;
        }
      }
      else {
        let idx = tempPaymentsMethods.findIndex((val) => val.default === true);
        tempPaymentsMethods[idx]!.default = false;
        tempPaymentsMethods[index]!.default = true;
      }
      setPaymentMethods(tempPaymentsMethods)
    }
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
                  <PaymentMethods
                    pm={pm}
                    index={index}
                    pm_size={paymentMethods.length}
                    changePaymentMethod={changePaymentMethod}
                    key={"pm-" + index}
                  />
                )
              })
            }
          </div>
        }
        <button>Reintentar pago</button>
        <button
          className='type2'
          onClick={handleAddpayment}>
          Agregar método de pago
          <VscChevronDown className={(addPayment ? "rotate" : "")} />
        </button>
        <a href='/preview' className='actives'>Ir a mis cursos</a>
      </div>
    </RetryPaymentContainer>
  )
}
