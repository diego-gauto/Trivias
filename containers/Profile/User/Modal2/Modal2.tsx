import React, { useState } from "react";

import { Modal } from "react-bootstrap";

import Modal3 from "../Modal3/Modal3";
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

  const [show3, setShow3] = useState(false);
  const handleShow = () => setShow3(true);

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
              setShow3(true); setShow(false)
            }} >
              Aceptar
            </PurpleButton>
          </ButtonsDiv>
        </Container>
      </Modal>
      <Modal3 show={show3} setShow={setShow3} setShow2={setShow} />
    </Modal2Contain>
  )
}
export default Modal2;