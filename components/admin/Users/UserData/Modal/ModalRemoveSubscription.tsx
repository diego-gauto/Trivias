import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { updateUserPlan } from '../../../../../store/actions/UserActions';
import { removeMembershipApi } from '../../../../api/users';

import { CloseIcon } from '../UsersCardData.styled';
import {
  ButtonContain,
  Container,
  Input,
  InputContain,
  Label,
  PurpleButton,
  Title,
  TitleContain,
} from './Modal.styled';

interface IUserWithMembership {
  id: number;
  level: number;
  name: string;
  country: string;
  come_from: string;
  last_name: string;
  last_sign_in: string;
  photo: string;
  final_date: number;
  start_date: number;
  email: string;
  score: number;
  created_at: string;
  phone_number: string;
  plan_name: string;
  spent: number;
  method: string;
  user_courses: any[];
}

interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
  user: IUserWithMembership;
}

const ModalRemoveSubscription = ({ show, setShow, user }: Props) => {
  const handleClose = () => setShow(false);

  const removeMembership = async (id: number) => {
    try {
      const result = await removeMembershipApi({ user_id: user.id });
      alert(`Se ha removido la suscripción al usuario '${user.name}'`);
      console.log(result);
    } catch (error) {
      alert(`No he logró remover la suscripción al usuario '${user.name}'`);
      console.error(error);
    }
  };

  const getMembershipTextByLevel = (level: number) => {
    let text = '';
    if (level === 1 || level === 6) {
      text = 'Mensual';
    } else if (level === 7 || level === 8) {
      text = 'Cuatrimestral';
    } else if (level === 4 || level === 5) {
      text = 'Anual';
    }

    if (text.length !== 0) {
      return text;
    }

    return `Caso especial, nivel ${level}`;
  };

  const convertToFormalDate = (miliseconds: number) => {
    const date = new Date(miliseconds * 1000);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const monthsOfYear = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    return `${day} de ${monthsOfYear[month]} de ${year}`;
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Container>
        <TitleContain>
          <Title>
            ¿Esta seguro que desea quitar la suscripción del usuario{' '}
            <strong>{user.name}</strong>?
          </Title>
          <CloseIcon onClick={handleClose} />
        </TitleContain>
        <div>
          <p
            style={{
              margin: '0',
              marginBottom: '5px',
              fontSize: '20px',
              fontWeight: '500',
            }}
          >
            Datos:
          </p>
          <p style={{ margin: '0', fontSize: '18px' }}>Tipo de membresía:</p>
          <p>{getMembershipTextByLevel(user.level)}</p>
          {user.start_date !== 0 && (
            <>
              <p style={{ margin: '0', fontSize: '18px' }}>Fecha de inicio:</p>
              <p>{convertToFormalDate(user.start_date)}</p>
            </>
          )}
          <p style={{ margin: '0', fontSize: '18px' }}>Fecha final:</p>
          <p>{convertToFormalDate(user.final_date)}</p>
        </div>
        <ButtonContain>
          <PurpleButton
            onClick={() => {
              removeMembership(user.id);
              handleClose();
            }}
            style={{ backgroundColor: '#FF3D57' }}
          >
            Si, deseo continuar
          </PurpleButton>
          <PurpleButton onClick={handleClose} style={{ background: '#1740cd' }}>
            No, quiero cancelar
          </PurpleButton>
        </ButtonContain>
      </Container>
    </Modal>
  );
};
export default ModalRemoveSubscription;
