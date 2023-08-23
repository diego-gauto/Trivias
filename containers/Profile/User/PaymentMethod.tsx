import React, { useEffect, useState } from "react";
import {
  CardIconResp,
  PaymentMethodContainer,
  InputCard,
  WhiteLoader,
  LoaderContain,
} from "./User.styled";
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { attachPaymentMethod, attachPaymentMethodConekta, createPaymentMethod, detachPaymentMethod, detachPaymentMethodConekta, setDefaultPaymentMethod, setDefaultPaymentMethodConekta } from "../../../components/api/profile";
import { conektaPm, stripePm } from "../../../components/api/users";
import PaymentMethodModal from "../../../components/PaymentMethodModal/PaymentMethodModal";
declare let window: any

const PaymentMethod = ({ data, pm, handleClick, newCard, addPayment }: any) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<any>({ data })
  const [loader, setLoader] = useState<any>(false);
  const [deleteLoad, setDeleteLoad] = useState<any>(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [card, setCard] = useState<any>({
    holder: '', number: '', cvc: '', exp_month: '', exp_year: ''
  });

  useEffect(() => {
    window.Conekta.setPublicKey('key_U5yJatlpMvd1DhENgON5ZYx');
  }, [])

  const addNewCard = async () => {
    setLoader(!loader);
    if (Object.keys(card).some(key => card[key] === '')) {
      alert('Por favor acomplete todos los campos!');
      setLoader(false);
    } else {
      const info = {
        card: card,
        stripe_id: data.stripe_id,
      }

      if (data.conekta_id === null) {
        createPaymentMethod(info).then((res) => {
          if (res.status === 400) {
            alert("Hay un error en los datos de la tarjeta!");
            setLoader(false);
          } else {
            let cardInfo = {
              stripe_id: data.stripe_id,
              payment_method: res.data.paymentMethod.id
            }
            attachPaymentMethod(cardInfo).then((response) => {
              if (response.status === 400) {
                alert("Hay un error en los datos de la tarjeta!");
                setLoader(false);
              }
              setCard({ holder: '', number: '', cvc: '', exp_month: '', exp_year: '' });
              newCard();
              handleClick(true);
              setLoader(false);
            })
          }
        })
      } else {
        let tempCard = {
          card: {
            number: card.number.replaceAll(" ", ""),
            name: card.holder,
            exp_month: card.exp_month,
            exp_year: card.exp_year,
            cvc: card.cvc,
          }
        }
        window.Conekta.Token.create(
          tempCard,
          conektaSuccessResponseHandler,
          conektaErrorResponseHandler, 'web'
        );
      }
    }
  }

  const conektaSuccessResponseHandler = (token: any) => {
    let tokenId = token.id
    const body = {
      token_id: tokenId,
      conekta_id: data.conekta_id
    }
    attachPaymentMethodConekta(body).then((res) => {
      handleClick(true);
      setCard({ holder: '', number: '', cvc: '', exp_month: '', exp_year: '' });
      newCard();
      setLoader(false);
    })
  }
  const conektaErrorResponseHandler = (response: any) => {
    alert("Hay un error en los datos de la tarjeta!")
    setLoader(false)
  };

  const updateUserCard = async (card: any) => {
    setDeleteLoad(true);
    let body = {
      payment_method: card.id,
      stripe_id: data.stripe_id,
      conekta_id: data.conekta_id
    }
    if (data.conekta_id === null) {
      setDefaultPaymentMethod(body).then(() => {
        handleClick(true);
        setDeleteLoad(false);
      })
    } else {
      setDefaultPaymentMethodConekta(body).then((res) => {
        handleClick(true);
        setDeleteLoad(false);
      })
    }
  }

  const detachPayment = async (card: any) => {
    if (card.default && user.level === 1 || pm.length === 1 && user.level === 1) {
      setShow(true);
      return;
    }
    setDeleteLoad(!loader);
    let body = {
      payment_method: card.id,
      conekta_id: data.conekta_id
    }
    if (data.conekta_id === null) {
      detachPaymentMethod(body).then(() => {
        setDeleteLoad(false);
        handleClick(true);
      })
    } else {
      detachPaymentMethodConekta(body).then(() => {
        setDeleteLoad(false);
        handleClick(true);
      })
    }
  }

  useEffect(() => {
    setDeleteLoad(true);
    let body = {
      stripe_id: data.stripe_id,
      conekta_id: data.conekta_id
    }
    if (data.conekta_id === null) {
      stripePm(body).then((res) => {
        const conektaPaymentMethods = res.data.payment_methods.data
        const extractedProperties = conektaPaymentMethods.map(({ id, card: { brand }, card: { last4 }, default: boolean }: any) => ({ id, brand, last4, default: boolean }));
        setPaymentMethods(extractedProperties);
        setDeleteLoad(false);
      })
    } else {
      conektaPm(body).then((res) => {
        const conektaPaymentMethods = res.data.payment_methods.data
        const extractedProperties = conektaPaymentMethods.map(({ id, brand, last4, default: boolean }: any) => ({ id, brand, last4, default: boolean }));
        setPaymentMethods(extractedProperties);
        setDeleteLoad(false);
      })
    }
  }, [data])



  return (
    <PaymentMethodContainer add={addPayment}>
      <PaymentMethodModal show={show} onHide={() => { setShow(false); }} newCard={() => { newCard(true); setShow(false); }}
        message="Si desea eliminar su metodo de pago, por favor de agregar otro metodo de pago y hacerlo su metodo de pago predeterminado o si desea puede cancelar su suscripcion, gracias!"

      />
      <div className="main-container">
        <div className="title">
          Métodos de pago
        </div>
        {
          !deleteLoad
            ?
            <>
              {(paymentMethods.length > 0 && !deleteLoad) ? <>
                {paymentMethods.map((pm: any, index: any) => {
                  return (
                    <React.Fragment key={"pmUser " + index}>
                      <div className="card-contain" >
                        <div
                          className="card"
                          onClick={() => data.payment_method != pm.id && updateUserCard(pm)}
                        >
                          <CardIconResp>
                            {
                              pm.brand == "visa" &&
                              <img src="/images/profile/visaLogo.png" />
                            }
                            {
                              pm.brand == "mastercard" &&
                              <img src="/images/profile/masterCardLogo.png" />
                            }
                          </CardIconResp>
                          {/* <CardIconResp brand={pm.brand} /> */}
                          <p className="text-card">Tarjeta de débito | <span className="last-digits">Terminación</span><span className="last-4"> •••• {pm.last4}</span></p>
                          {
                            pm.default
                              ?
                              <div className="star">
                                <AiFillStar />
                              </div>
                              :
                              <div className="star" >
                                <AiOutlineStar />
                              </div>
                          }
                        </div>
                        <div className="circle" onClick={() => {
                          detachPayment(pm)
                        }}>
                          <  FaTrashAlt />
                        </div>

                      </div>
                    </React.Fragment>
                  )
                })
                }
              </> :
                <p>Sin métodos de pago...</p>}
            </>
            : <LoaderContain />
        }


        <div className="bottom-contain" onClick={newCard}>
          {
            !addPayment
              ? <AiOutlinePlus />
              : <AiOutlineMinus />
          }
          <p>Agregar nueva <span>tarjeta de crédito o débito</span> </p>
        </div>
      </div>
      {
        addPayment &&
        <div className="new-card">
          <p className="main-title">Nueva <span> tarjeta de crédito o débito</span></p>
          <div className="container-2">
            <div className="card-input">
              <p>Nombre</p>
              <input
                placeholder="Nombre del propietario" onChange={(e) => {
                  setCard((card: any) => ({ ...card, holder: e.target.value }));
                }}
              />
            </div>
            <div className="card-input">
              <p>Número de tarjeta</p>
              <InputCard placeholder="XXXX XXXX XXXX XXXX" mask='9999 9999 9999 9999' maskChar={null} onChange={(e: any) => {
                setCard((card: any) => ({ ...card, number: e.target.value }));
              }} />
            </div>
            <div className="info">
              <div className="date">
                <p>
                  Fecha de expiración
                </p>
                <div className="inputs">
                  <input
                    placeholder="Mes"
                    className="date-inputs"
                    maxLength={2} onChange={(e) => {
                      setCard((card: any) => ({ ...card, exp_month: e.target.value }));
                    }}
                  />
                  <input
                    placeholder="Año"
                    className="date-inputs"
                    maxLength={4} onChange={(e) => {
                      setCard((card: any) => ({ ...card, exp_year: e.target.value }));
                    }}
                  />
                </div>
              </div>
              <div className="date">
                <p>CVV</p>
                <input
                  type={"password"}
                  placeholder="***"
                  className="date-inputs"
                  maxLength={4} onChange={(e) => {
                    setCard((card: any) => ({ ...card, cvc: e.target.value }));
                  }}
                />
              </div>
            </div>
          </div>
          {
            !loader
              ?
              <div className="button-contain" onClick={() => {
                addNewCard();
              }}>
                <button>Guardar</button>
              </div>
              : <WhiteLoader />
          }

        </div>
      }

    </PaymentMethodContainer>
  )
}
export default PaymentMethod;