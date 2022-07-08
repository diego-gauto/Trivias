import React from 'react'
import { Modal } from 'react-bootstrap';
import { ButtonsDiv, Container, Expire, Modal3Contain, PurpleButton, Text, TextContainer, Title, TransparentButton } from './Modal3.styled';

const Modal3 = ({ show, setShow, setShow2 }: any) => {

  const handleClose = () => setShow(false);

  return (
    <Modal3Contain>
      <Modal show={show} onHide={handleClose} centered>
        <Container>
          <Title closeButton>
            Tu Sucripción
          </Title>
          <TextContainer>
            <Text>
              Tu suscripción será terminada.
            </Text>
            <Text>
              Seguiras teniendo acceso hasta la fecha de renovación.
            </Text>
          </TextContainer>
          <Expire>
            01/07/22
          </Expire>
          <ButtonsDiv>
            <TransparentButton onClick={() => {
              setShow2(true); setShow(false)
            }}>
              Regresar
            </TransparentButton>
            <PurpleButton>
              Continuar
            </PurpleButton>
          </ButtonsDiv>
        </Container>
      </Modal>
    </Modal3Contain>
  )
}
export default Modal3;