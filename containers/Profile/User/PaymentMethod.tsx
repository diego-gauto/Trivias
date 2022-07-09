import React, { useState } from 'react'
import Modal1 from './Modal1/Modal1';
import { ProfilePayment, PaymentTitle, PayContainer, PaymentBox, PayBox, VisaIcon, PaymentText, DeleteContain, DeleteText, TrashIcon, PaypalIcon, AddPay } from './User.styled';

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
            <PaypalIcon />
            <PaymentText>
              Paypal Mofupiyo
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