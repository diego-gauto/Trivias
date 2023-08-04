import React, { useEffect, useState } from "react";
import {
  CardIconResp,
  PaymentMethodContainer,
  InputCard,
  WhiteLoader,
  LoaderContain,
} from "./User.styled";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../firebase/firebaseConfig";
import { deletePaymentMethod, updatePaymentMethod } from "../../../store/actions/ProfileActions";
import { AiFillStar, AiOutlineClose, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { addPaymentMethod } from "../../../store/actions/PaymentActions";
import { attachPaymentMethod, createPaymentMethod, detachPaymentMethod, setDefaultPaymentMethod } from "../../../components/api/profile";

const PaymentMethod = ({ data, pm, handleClick, newCard, addPayment }: any) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<any>({ data })
  const handleShow = () => setShow(true);
  const [loader, setLoader] = useState<any>(false);
  const [deleteLoad, setDeleteLoad] = useState<any>(false);
  const [card, setCard] = useState<any>({
    holder: '', number: '', cvc: '', exp_month: '', exp_year: ''
  });

  const addNewCard = async () => {
    setLoader(!loader);
    if (Object.keys(card).some(key => card[key] === '')) {
      alert('Por favor acomplete todos los campos!');
      setLoader(false);
    } else {
      const info = {
        card: card,
        stripe_id: data.stripe_id
      }
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
    }
  }

  const updateUserCard = async (card: any) => {
    setDeleteLoad(true);
    let info = {
      payment_method: card.id,
      stripe_id: data.stripe_id
    }
    setDefaultPaymentMethod(info).then(() => {
      handleClick();
      setDeleteLoad(false);
    })
  }
  const detachPayment = async (card: any) => {
    setDeleteLoad(!loader);
    let info = {
      payment_method: card.id
    }
    detachPaymentMethod(info).then(() => {
      setDeleteLoad(false);
      handleClick(true);
    })
  }

  useEffect(() => {
    setUser({ ...data })
  }, [data])

  return (
    <PaymentMethodContainer add={addPayment}>
      <div className="main-container">
        <div className="title">
          Métodos de pago
        </div>
        {
          !deleteLoad
            ?
            <>
              {pm.length > 0 ? <>
                {pm.map((pm: any, index: any) => {
                  return (
                    <React.Fragment key={"pmUser " + index}>
                      <div className="card-contain" >
                        <div
                          className="card"
                          onClick={() => data.payment_method != pm.id && updateUserCard(pm)}
                        >
                          <CardIconResp>
                            {
                              pm.card.brand == "visa" &&
                              <img src="/images/profile/visaLogo.png" />
                            }
                            {
                              pm.card.brand == "mastercard" &&
                              <img src="/images/profile/masterCardLogo.png" />
                            }
                          </CardIconResp>
                          {/* <CardIconResp brand={pm.brand} /> */}
                          <p className="text-card">Tarjeta de débito | <span className="last-digits">Terminación</span><span className="last-4"> •••• {pm.card.last4}</span></p>
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