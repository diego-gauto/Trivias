



import { useState } from "react";
import { Modal } from "react-bootstrap";
import { updateUserPlan } from "../../../../../store/actions/UserActions";

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

const ModalAddDays = ({ show, setShow, user }: any) => {
  const handleClose = () => setShow(false);
  let today = new Date().getTime() / 1000;
  const [days, setDays] = useState(0);

  const addDays = () => {
    let tempFinalDate = 0;
    if (user.membership.finalDate == 0) {
      tempFinalDate = today + days * 86400;
    } else {
      tempFinalDate = user.membership.finalDate + days * 86400;
    }
    updateUserPlan(tempFinalDate, user.id).then(() => {
      alert(`El usuario ahora cuenta con ${days} días de suscripción`);
      handleClose();
    })
  }

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
            onChange={(e: any) => {
              setDays(e.target.value);
            }}
          />
        </InputContain>
        <ButtonContain>
          <PurpleButton onClick={() => {
            addDays()
          }}>Agregar días</PurpleButton>
        </ButtonContain>
      </Container>
    </Modal>
  )
}
export default ModalAddDays;