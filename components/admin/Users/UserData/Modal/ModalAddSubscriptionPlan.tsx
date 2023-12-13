import { useState } from "react";
import { Modal } from "react-bootstrap";
import { updateMembershipPlanApi } from "../../../../api/users";

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

export interface IUserWithMembership {
  id: number
  level: number
  name: string
  country: string
  come_from: string
  last_name: string
  last_sign_in: string
  photo: string
  final_date: number
  start_date: number
  email: string
  score: number
  created_at: string
  phone_number: string
  plan_name: string
  spent: number
  method: string
  user_courses: any[]
}

interface Props {
  user: IUserWithMembership;
  show: boolean;
  setShow: (value: boolean) => void;
}

const ModalAddSubscriptionPlan = ({ show, setShow, user }: Props) => {
  const handleClose = () => setShow(false);

  const addMembership = async (type: number) => {
    if (confirm("Seguro que quieres agregar un plan" + (type === 1 ? "Mensual" : (type === 2 ? "Anual" : "Cuatrimestral")))) {
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
          window.location.reload();
        });
      }
    }
  }

  const generateMembershipsButtons = () => {
    return (<>
      <PurpleButton onClick={() => addMembership(1)}>Agregar Mensualidad</PurpleButton>
      <PurpleButton onClick={() => addMembership(2)} style={{ background: "#1740cd" }}>
        Agregar Anualidad</PurpleButton>
      <PurpleButton onClick={() => addMembership(3)} style={{ background: "#a317cd" }}>
        Agregar Plan Cuatrimestral
      </PurpleButton>
    </>);
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Container>
        <TitleContain>
          <Title>Activar plan de suscripción</Title>
          <CloseIcon onClick={handleClose} />
        </TitleContain>
        <ButtonContain>
          {
            generateMembershipsButtons()
          }
        </ButtonContain>
      </Container>
    </Modal>
  )
}
export default ModalAddSubscriptionPlan;