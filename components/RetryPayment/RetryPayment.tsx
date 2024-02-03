import React, { useState } from 'react'
import { RetryPaymentContainer } from './RetryPayment.styled'
import { VscChevronDown } from "react-icons/vsc";
import { ICard, IPayOption, IPm, TKey, TPayOptionId } from './IRetryPayment';
import { PaymentMethods } from './PaymentMethods/PaymentMethods';
import { Month, PayOptions, Year } from './constants';
import InputMask from "react-input-mask";
import { FaChevronDown } from "react-icons/fa";
import { checkEmpty } from './functions';

let dummyArray: IPm[] = [
  { last4: '4444', default: true },
  { last4: '3424', default: false },
]

export const RetryPayment = () => {
  const [paymentMethods, setPaymentMethods] = useState<IPm[]>(dummyArray)
  const [addPayment, setAddPayment] = useState<boolean>(false);
  const [selectedButton, setSelectedButton] = useState<TPayOptionId>("card");
  const [card, setCard] = useState<ICard>({
    cvc: '',
    exp_month: '',
    exp_year: '',
    number: '',
    holder: '',
  });

  const changeElement = (key: TKey, value: string) => {
    let tempCard = { ...card };
    tempCard[key] = value;
    setCard(tempCard);
  }
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
      <div className='complete-contain'>
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
          <button className={(addPayment ? "fade" : "")}>Reintentar pago</button>
          <button
            className='type2'
            onClick={handleAddpayment}>
            Agregar método de pago
            <FaChevronDown className={(addPayment ? "rotate" : "")} />
          </button>
          <a href='/preview' className={'actives ' + (addPayment ? "fade" : "")}>Ir a mis cursos</a>
          <div className={'add-payment-container ' + (addPayment ? "show-contain" : "")}>
            <div className='button-container'>
              {
                PayOptions.map((pay: IPayOption, index: number) => {
                  return (
                    <div className={'box-container ' + (selectedButton === pay.id ? "selected-box" : "")} key={"pay-button" + index} onClick={() => setSelectedButton(pay.id)}>
                      {selectedButton === pay.id
                        ? <img src={pay.img_select} />
                        : <img src={pay.img_unselect} />
                      }
                      {pay.title !== "" && <p>{pay.title}</p>}
                    </div>
                  )
                })
              }
            </div>
            {
              selectedButton === "card" &&
              <>
                <div className='card-container'>
                  <div className='left-side'>
                    <div className='input-container'>
                      <label>Número de la tarjeta</label>
                      <InputMask
                        placeholder='Introduce solo números'
                        mask='9999 9999 9999 9999'
                        maskChar={null}
                        onChange={(e) => changeElement("number", e.target.value)}
                      />
                    </div>
                    <div className='input-container'>
                      <label>Nombre del titular</label>
                      <input
                        placeholder='Introduce el nombre impreso de la tarjeta'
                        onChange={(e) => changeElement("holder", e.target.value)}
                      />
                    </div>
                    <div className='inputs-column'>
                      <div className='input-container'>
                        <label>Mes</label>
                        <select defaultValue={"MM"} onChange={(e) => changeElement("exp_month", e.target.value)}>
                          <option disabled value={"MM"}>MM</option>
                          {
                            Month.map((month: number, index: number) => {
                              return (
                                <option key={"mes-" + index} value={month}>
                                  {month}
                                </option>
                              )
                            })
                          }
                        </select>
                      </div>
                      <div className='input-container'>
                        <label>Año</label>
                        <select defaultValue={"AA"} onChange={(e) => changeElement("exp_year", e.target.value)}>
                          <option disabled value={"AA"}>AA</option>
                          {
                            Year.map((year: number, index: number) => {
                              return (
                                <option key={"year-" + index} value={year}>
                                  {year}
                                </option>
                              )
                            })
                          }
                        </select>
                      </div>
                      <div className='input-container'>
                        <label>CVV</label>
                        <input
                          placeholder='***'
                          type='password'
                          onChange={(e) => changeElement("cvc", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='right-side'>
                    <div className={'card-img ' + (checkEmpty(card) ? "background-checked " : "")}>
                      <div className='square' />
                      <p className='number'>{card.number}</p>
                      <div className='last-data'>
                        <p>{card.holder}</p>
                        {
                          (card.exp_month !== "" || card.exp_year !== "") &&
                          <div className='date'>
                            <p>mes/año</p>
                            <p>{card.exp_month}/{card.exp_year}</p>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <p className='description-text'>
                  Presionando en el botón "Guardar" estás dando tu consentimiento
                  para que Gonvar automáticamente continúe con tu suscripción
                  ( Mensual, Cuatrimestral, Anual, según sea el caso ) y te cobremos ( precio / período )
                  en el medio de pago que estás agregando hasta que tu decidas cancelarla.
                  <br /><br />
                  Puedes cancelar la suscripción en cualquier momento. Para hacerlo, dirígite a
                  tu perfil y presiona en el botón "Cancelar suscripción"
                </p>
                <button className='type3'>Guardar</button>
              </>
            }
            {
              selectedButton === "oxxo" &&
              <button className='type3 oxxo'>Pagar con oxxo</button>
            }
            {
              selectedButton === "transfer" &&
              <button className='type3 spei'>Pagar con spei</button>
            }
          </div>
        </div>
      </div>
    </RetryPaymentContainer>
  )
}
