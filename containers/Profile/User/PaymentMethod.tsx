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
import { AiOutlinePlus } from "react-icons/ai";

const PaymentMethod = ({ data, pm, handleClick }: any) => {

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [loader, setLoader] = useState<any>(false);

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
    <PaymentMethodContainer>
      <div className="title">
        Métodos de pago
      </div>
      {loader ? <LoaderContain /> :
        <>
          {pm.length > 0 ? <>
            {pm.map((pm: any, index: any) => {
              return (
                <div className="card-contain" key={"pmUser" + index}>
                  <div className="card">
                    <CardIconResp brand={pm.brand} />
                    <p className="text-card">Tarjeta de débito | <span className="last-digits">Terminación</span><span className="last-4"> •••• {pm.last4}</span></p>
                  </div>
                  <div className="circle">
                    <MdModeEdit />
                  </div>
                </div>
              )
            })
            }
          </> :
            <p>Sin métodos de pago...</p>}
        </>
      }
      <div className="bottom-contain">
        <AiOutlinePlus />
        <p>Agregar nueva <span>tarjeta de crédito o débito</span> </p>
      </div>
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