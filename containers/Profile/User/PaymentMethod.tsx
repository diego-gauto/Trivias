import React, { useEffect, useState } from "react";
import Modal1 from "./Modal1/Modal1";
import {
  AddPay,
  DeleteContain,
  DeleteText,
  PaymentBox,
  PaymentText,
  PaymentTitle,
  CardIconResp,
  PayBox,
  PayContainer,
  ProfilePayment,
  TrashIcon,
  LoaderContain,
  PaymentMethodContainer,
  InputCard,
} from "./User.styled";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../firebase/firebaseConfig";
import { deletePaymentMethod } from "../../../store/actions/ProfileActions";
import { MdModeEdit } from "react-icons/md";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { addPaymentMethod } from "../../../store/actions/PaymentActions";

const PaymentMethod = ({ data, pm, handleClick }: any) => {

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [loader, setLoader] = useState<any>(false);
  const [addPayment, setAddPayment] = useState<boolean>(false);
  const [editCard, setEditCard] = useState(0);
  const [card, setCard] = useState<any>({
    holder: '', number: '', cvc: '', exp_month: '', exp_year: ''
  });

  const addNewCard = async () => {
    let temp_new = {};
    setLoader(!loader);
    if (Object.keys(card).some(key => card[key] === '')) {
      alert('Por favor acomplete todos los campos!');
      setLoader(false);
    } else {
      const addCard = httpsCallable(functions, 'createPaymentMethodStripe');
      const info = {
        card: card,
        stripe_id: data.stripeId
      }
      await addCard(info).then(async (res: any) => {
        if ("raw" in res.data) {
          alert("Hay un error en los datos de la tarjeta!");
          setCard({ holder: '', number: '', cvc: '', exp_month: '', exp_year: '' });
          setLoader(false);
        } else {
          temp_new = {
            cardId: res.data.id,
            brand: res.data.card.brand,
            last4: res.data.card.last4,
            cvc: card.cvc,
            holder: card.holder,
            exp_month: parseInt(card.exp_month),
            exp_year: parseInt(card.exp_year)
          }
          addPaymentMethod(temp_new, data.id);
          let newCard = {
            cardId: res.data.id,
            stripeId: data.stripeId
          }
          const attach = httpsCallable(functions, 'attachPaymentMethodStripe');
          await attach(newCard).then((res) => {
            setLoader(false);
            handleClick(true);
          })
        }
      })
    }
  }
  useEffect(() => {

  }, [card])

  const detachPayment = async (card: any) => {
    setLoader(!loader);
    if (data.membership.paymentMethod == card.cardId) {
      alert('Esta tarjeta es su método de pago predeterminado, por favor de asiganar otra tarjeta como método de pago predeterminado antes de eliminar esta tarjeta!')
      setLoader(false);
    } else {
      const detach = httpsCallable(functions, 'detachPaymentMethod');
      detach(card.cardId).then(async (res: any) => {
        deletePaymentMethod(data.id, card.id).then(() => {
          setLoader(false);
          handleClick(true);
        })
      })
    }
  }
  return (
    <PaymentMethodContainer add={addPayment}>
      <div className="main-container">
        <div className="title">
          Métodos de pago
        </div>

        <>
          {pm.length > 0 ? <>
            {pm.map((pm: any, index: any) => {
              return (
                <React.Fragment key={"pmUser " + index}>
                  <div className="card-contain" >
                    <div className="card">
                      <CardIconResp brand={pm.brand} />
                      <p className="text-card">Tarjeta de débito | <span className="last-digits">Terminación</span><span className="last-4"> •••• {pm.last4}</span></p>
                    </div>
                    <div className="circle" onClick={() => { setEditCard(index) }}>
                      <  FaTrashAlt />
                    </div>

                  </div>
                  {/* {
                      editCard == index + 1 &&
                      <div className="edit-mode">
                        <div className="info"
                          style={{ paddingRight: 60 }}
                        >
                          <div className="date">
                            <p>
                              Fecha de expiración
                            </p>
                            <div className="inputs">
                              <input
                                placeholder="Mes"
                                className="date-inputs"
                              />
                              <input
                                placeholder="Año"
                                className="date-inputs"
                              />
                            </div>
                          </div>
                          <div className="date">
                            <p>CVV</p>
                            <input
                              placeholder="***"
                              className="date-inputs"
                            />
                          </div>
                        </div>
                      </div>
                    } */}
                </React.Fragment>
              )
            })
            }
          </> :
            <p>Sin métodos de pago...</p>}
        </>

        <div className="bottom-contain" onClick={() => { setAddPayment(!addPayment) }}>
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
              : <LoaderContain />
          }

        </div>
      }

    </PaymentMethodContainer>
    // <ProfilePayment>
    //   <PaymentTitle>
    //     Métodos de Pago
    //   </PaymentTitle>
    //   {loader ? <LoaderContain /> :
    //     <>
    //       {pm.length > 0 ? <PayContainer>
    //         {pm.map((pm: any, index: any) => {
    //           return (
    //             <PaymentBox key={"pmUser" + index}>
    //               <PayBox>
    //                 <CardIconResp brand={pm.brand} />
    //                 <PaymentText>
    //                   {pm.brand} terminada en {pm.last4}
    //                 </PaymentText>
    //               </PayBox>
    //               <DeleteContain onClick={() => {
    //                 detachPayment(pm)
    //               }}>
    //                 <DeleteText>
    //                   Eliminar método
    //                 </DeleteText>
    //                 <TrashIcon />
    //               </DeleteContain>
    //             </PaymentBox>
    //           )
    //         })
    //         }
    //       </PayContainer> :
    //         <p>Sin métodos de pago...</p>}
    //     </>
    //   }
    //   <AddPay onClick={handleShow}>
    //     Añadir método de pago
    //   </AddPay>
    //   <Modal1 show={show} setShow={setShow} data={data} handleClick={handleClick} />
    // </ProfilePayment>
  )
}
export default PaymentMethod;