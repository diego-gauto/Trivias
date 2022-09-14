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
} from "./User.styled";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../firebase/firebaseConfig";
import { deletePaymentMethod } from "../../../store/actions/ProfileActions";


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
      await detach(card.cardId).then(async (res: any) => {
        deletePaymentMethod(data.id, card.id).then(() => {
          setLoader(false);
          handleClick(true);
        })
      })
    }
  }

  return (
    <ProfilePayment>
      <PaymentTitle>
        Métodos de Pago
      </PaymentTitle>
      {loader ? <LoaderContain /> :
        <>
          {pm.length > 0 ? <PayContainer>
            {pm.map((pm: any, index: any) => {
              return (
                <PaymentBox key={"pmUser" + index}>
                  <PayBox>
                    <CardIconResp brand={pm.brand} />
                    <PaymentText>
                      {pm.brand} terminada en {pm.last4}
                    </PaymentText>
                  </PayBox>
                  <DeleteContain onClick={() => {
                    detachPayment(pm)
                  }}>
                    <DeleteText>
                      Eliminar método
                    </DeleteText>
                    <TrashIcon />
                  </DeleteContain>
                </PaymentBox>
              )
            })
            }
          </PayContainer> :
            <p>Sin métodos de pago...</p>}
        </>
      }
      <AddPay onClick={handleShow}>
        Añadir método de pago
      </AddPay>
      <Modal1 show={show} setShow={setShow} data={data} handleClick={handleClick} />
    </ProfilePayment>
  )
}
export default PaymentMethod;