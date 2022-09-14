



import { Modal } from "react-bootstrap";

import { CloseIcon } from "../UsersCardData.styled";
import {
  ButtonContain,
  Container,
  Input,
  InputContain,
  Label,
  PurpleButton,
  Title,
  TitleContain,
} from "./Modal.styled";

const ModalAddDays = ({ show, setShow }: any) => {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Container>
        <TitleContain>
          <Title>Agregar días de suscripción</Title>
          <CloseIcon onClick={handleClose} />
        </TitleContain>
        <InputContain >
          <Label>Días por agregar</Label>
          <Input
            placeholder="7"
            type="number"
          />
        </InputContain>
        <ButtonContain>
          <PurpleButton >Agregar días</PurpleButton>
        </ButtonContain>
      </Container>
    </Modal>
  )
}
export default ModalAddDays;