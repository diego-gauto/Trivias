



import { useState } from "react";
import { Modal } from "react-bootstrap";
import { updateUserPlan } from "../../../../../store/actions/UserActions";
import { updateMembershipDaysApi } from "../../../../api/users";

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
    if (!days) {
      alert("Agregue dias");
    }
    else {
      let tempFinalDate = 0;
      if (user.final_date > today) {
        tempFinalDate = user.final_date + days * 86400;
        user.final_date = tempFinalDate;
      }
      if (user.final_date < today) {
        tempFinalDate = today + days * 86400;
        user.final_date = tempFinalDate;
      }

      updateMembershipDaysApi(user).then((res: any) => {
        alert("Se agregaron: " + days + " días")
        handleClose();
      });
    }
  }

  const deleteDays = () => {
    if (!days) {
      alert("Agregue dias");
    }
    else {
      let tempFinalDate = 0;
      tempFinalDate = user.final_date - days * 86400;
      user.final_date = tempFinalDate;

      updateMembershipDaysApi(user).then((res: any) => {
        alert("Se eliminaron: " + days + " días")
        handleClose();
      });
    }
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
              setDays(parseInt(e.target.value));
            }}
          />
        </InputContain>
        <ButtonContain>
          <PurpleButton onClick={() => {
            addDays()
          }}>Agregar días</PurpleButton>
        </ButtonContain>
        {(user.final_date > today && user.level === 0) && <ButtonContain>
          <PurpleButton onClick={() => {
            deleteDays()
          }}>Restar días</PurpleButton>
        </ButtonContain>}
      </Container>
    </Modal>
  )
}
export default ModalAddDays;