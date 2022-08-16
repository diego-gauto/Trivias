

import { Modal } from "react-bootstrap";

import {
  ButtonsDiv,
  Container,
  Expire,
  Modal3Contain,
  PurpleButton,
  Text,
  TextContainer,
  Title,
  TransparentButton,
} from "./Modal3.styled";

const ModalFinish = ({ show, setShow }: any) => {

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
              setShow(false)
            }}>
              Regresar
            </TransparentButton>
            <PurpleButton onClick={handleClose}>
              Continuar
            </PurpleButton>
          </ButtonsDiv>
        </Container>
      </Modal>
    </Modal3Contain>
  )
}
export default ModalFinish;