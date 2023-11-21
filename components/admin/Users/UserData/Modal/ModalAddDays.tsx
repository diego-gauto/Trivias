



import { useState } from "react";
import { Modal } from "react-bootstrap";
import { updateUserPlan } from "../../../../../store/actions/UserActions";
import { updateMembershipAnualApi, updateMembershipDaysApi, updateMembershipPlanApi } from "../../../../api/users";

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
  // const addYearSubscription = () => {
  //   if (confirm(`Estas seguro que quieres agregar anualidad al usuario ${user.email}?`)) {
  //     let tempFinalDate = 0;
  //     if (user.final_date > today) {
  //       tempFinalDate = user.final_date + 365 * 86400;
  //       user.final_date = tempFinalDate;
  //     }
  //     if (user.final_date < today) {
  //       tempFinalDate = today + 365 * 86400;
  //       user.final_date = tempFinalDate;
  //     }
  //     updateMembershipAnualApi(user).then((res: any) => {
  //       console.log(res);
  //       alert("Se agrego la anualidad correctamente!")
  //       handleClose();
  //     });
  //   }
  // }
  const addMembership = async (type: number) => {
    if (confirm("Seguro que quieres agregar una " + (type === 1 ? "Mensualidad" : "Anualidad"))) {
      if (type === 1) {
        //mensual
        let body = {
          user_final_date: user.final_date,
          start_date: user.start_date,
          level: 6,
          id: user.id,
          days: 30,
        }
        await updateMembershipPlanApi(body).then((res) => {
          if (res.response) {
            alert(res.response.data.data)
          }
          else {
            alert("Membresia Actualizada con exito!")
          }
        });
      }
      if (type === 2) {
        //anual
        let body = {
          user_final_date: user.final_date,
          start_date: user.start_date,
          level: 5,
          id: user.id,
          days: 365,
        }
        await updateMembershipPlanApi(body).then((res) => {
          if (res.response) {
            alert(res.response.data.data)
          }
          else {
            alert("Anualidad Actualizada con exito!")
          }
        });
      }
      if (type === 3) {
        //cuatrimestral
        let body = {
          user_final_date: user.final_date,
          start_date: user.start_date,
          level: 8,
          id: user.id,
          days: 120,
        }
        await updateMembershipPlanApi(body).then((res) => {
          if (res.response) {
            alert(res.response.data.data)
          }
          else {
            alert("Plan Cuatrimestral Actualizado con exito!")
          }
        });
      }
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
          <PurpleButton onClick={addDays} style={{ background: "#17cd46" }} >Agregar Dias</PurpleButton>
          <PurpleButton onClick={() => addMembership(1)}>Agregar Mensualidad</PurpleButton>
          <PurpleButton onClick={() => addMembership(2)} style={{ background: "#1740cd" }}>
            Agregar Anualidad</PurpleButton>
          <PurpleButton onClick={() => addMembership(3)} style={{ background: "#a317cd" }}>
            Agregar Plan Cuatrimestral
          </PurpleButton>
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