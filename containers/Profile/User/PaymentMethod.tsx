import React, { useState } from "react";

import Modal1 from "./Modal1/Modal1";
import {
  AddPay,
  DeleteContain,
  DeleteText,
  PaymentBox,
  PaymentText,
  PaymentTitle,
  PaypalIcon,
  PayBox,
  PayContainer,
  ProfilePayment,
  TrashIcon,
  VisaIcon,
} from "./User.styled";

const PaymentMethod = () => {

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <ProfilePayment>
      <PaymentTitle>
        Métodos de Pago
      </PaymentTitle>
      <PayContainer>
        <PaymentBox>
          <PayBox>
            <VisaIcon />
            <PaymentText>
              Visa terminada en 1486
            </PaymentText>
          </PayBox>
          <DeleteContain>
            <DeleteText>
              Eliminar método
            </DeleteText>
            <TrashIcon />
          </DeleteContain>
        </PaymentBox>
        <PaymentBox>
          <PayBox>
            <VisaIcon />
            <PaymentText>
              Visa terminada en 1098
            </PaymentText>
          </PayBox>
          <DeleteContain>
            <DeleteText>
              Eliminar método
            </DeleteText>
            <TrashIcon />
          </DeleteContain>
        </PaymentBox>
      </PayContainer>
      <AddPay onClick={handleShow}>
        Añadir método de pago
      </AddPay>
      <Modal1 show={show} setShow={setShow} />
    </ProfilePayment>
  )
}
export default PaymentMethod;