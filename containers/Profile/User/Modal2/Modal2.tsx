import React, { useState } from "react";

import { Modal } from "react-bootstrap";
import ModalFinish from "../Modal3/ModalFinish";

import {
  ButtonsDiv,
  CardInfo,
  CardText,
  ChangeMethod,
  Container,
  Membership,
  MemberText,
  Modal2Contain,
  PaymentMethod,
  PayMethod,
  PurpleButton,
  RenewalText,
  Title,
  VisaIcon,
} from "./Modal2.styled";

const Modal2 = ({ show, setShow }: any) => {

  const handleClose = () => setShow(false);



  return (
    <Modal2Contain>
      <Modal show={show} onHide={handleClose} centered>
        <Container>
          <Title closeButton>
            Tu Sucripción
          </Title>
          <Membership>
            <MemberText>
              Gonvar Plus
            </MemberText>
            <RenewalText>
              Renovación el 01/07/22
            </RenewalText>
          </Membership>
          <PaymentMethod>
            <MemberText>
              Método de Pago
            </MemberText>
            <PayMethod>
              <CardInfo>
                <VisaIcon />
                <CardText>
                  Visa terminada en 1486
                </CardText>
              </CardInfo>
              <ChangeMethod>
                Cambiar método
              </ChangeMethod>
            </PayMethod>
          </PaymentMethod>
          <ButtonsDiv>
            {/* <TransparentButton onClick={() => { setShow(false); setShow3(true) }}>
              Terminar suscripción
            </TransparentButton> */}
            <PurpleButton onClick={() => {
              setShow(false)
            }} >
              Aceptar
            </PurpleButton>
          </ButtonsDiv>
        </Container>
      </Modal>

    </Modal2Contain>
  )
}
export default Modal2;