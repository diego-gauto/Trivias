



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
  console.log(user);
  const addDays = () => {
    let tempFinalDate = 0;
    if (user.final_date < today) {
      tempFinalDate = today + days * 86400;
      user.final_date = tempFinalDate;
    }
    if (user.final_date > today) {
      tempFinalDate = user.final_date + days * 86400;
      user.final_date = tempFinalDate;
    }
    let newDate = new Date(tempFinalDate * 1000);
    let tempDay = newDate.getDate()
    let tempMonth = newDate.getMonth() + 1;
    let tempYear = newDate.getFullYear()
    let formatDate = `${tempDay}/${tempMonth}/${tempYear}`
    updateMembershipDaysApi(user).then((res: any) => {
      alert("Nueva Fecha de finalizacion: " + formatDate)
      handleClose();
    });
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