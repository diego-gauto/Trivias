import React, { useState } from 'react'
import { RetryPaymentContainer } from './RetryPayment.styled'
import { VscChevronDown } from "react-icons/vsc";
import { IPayOption, IPm } from './IRetryPayment';
import { PaymentMethods } from './PaymentMethods/PaymentMethods';
import { PayOptions } from './constants';
let dummyArray: IPm[] = [
  { last4: '4444', default: true },
  { last4: '3424', default: false },
]

export const RetryPayment = () => {
  const [paymentMethods, setPaymentMethods] = useState<IPm[]>(dummyArray)
  const [addPayment, setAddPayment] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<number>(0);

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
        <a href='/preview' className={'actives ' + (addPayment ? "fade" : "")}>Ir a mis cursos</a>
        <div className={'add-payment-container ' + (addPayment ? "show-contain" : "")}>
          <div className='button-container'>
            {
              PayOptions.map((pay: IPayOption, index: number) => {
                return (
                  <div className={'box-container ' + (selectedButton === index ? "selected-box" : "")} key={"pay-button" + index} onClick={() => setSelectedButton(index)}>
                    {selectedButton === index
                      ? <img src={pay.img_select} />
                      : <img src={pay.img_unselect} />
                    }
                    {pay.title !== "" && <p>{pay.title}</p>}
                  </div>
                )
              })
            }

          </div>
        </div>
      </div>
    </RetryPaymentContainer>
  )
}
