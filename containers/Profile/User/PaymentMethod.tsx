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
} from "./User.styled";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../firebase/firebaseConfig";
import { deletePaymentMethod } from "../../../store/actions/ProfileActions";
import { MdModeEdit } from "react-icons/md";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const PaymentMethod = ({ data, pm, handleClick }: any) => {

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [loader, setLoader] = useState<any>(false);
  const [addPayment, setAddPayment] = useState<boolean>(false);
  const [editCard, setEditCard] = useState(0);

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
        {loader ? <LoaderContain /> :
          <>
            {pm.length > 0 ? <>
              {pm.map((pm: any, index: any) => {
                return (
                  <React.Fragment key={"pmUser " + index}>
                    <div className="card-contain" >
                      <div className="card"
                        style={editCard == index + 1 ? { backgroundColor: "transparent", border: "1px solid #942ced" } : {}}>
                        <CardIconResp brand={pm.brand} />
                        {
                          editCard == index + 1
                            ?
                            <>
                              <div className="separate" />
                              <input
                                placeholder="**** **** **** ****"
                              />
                            </>

                            : <p className="text-card">Tarjeta de débito | <span className="last-digits">Terminación</span><span className="last-4"> •••• {pm.last4}</span></p>
                        }
                      </div>
                      {
                        editCard == index + 1
                          ?
                          <div className="circle" onClick={() => { setEditCard(0) }}>
                            <AiOutlineClose />
                          </div>
                          :
                          <div className="circle" onClick={() => { setEditCard(index + 1) }}>
                            <MdModeEdit />
                          </div>
                      }
                    </div>
                    {
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
                    }
                  </React.Fragment>
                )
              })
              }
            </> :
              <p>Sin métodos de pago...</p>}
          </>
        }
        {
          editCard != 0 &&
          <div className="edit-button"><button>Guardar</button></div>
        }
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
              <p>Número de tarjeta</p>
              <input
                placeholder="**** **** **** ****"
              />
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
          <div className="button-contain">
            <button>Guardar</button>
          </div>
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