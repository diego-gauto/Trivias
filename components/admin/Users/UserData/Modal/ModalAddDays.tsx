import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { updateUserPlan } from '../../../../../store/actions/UserActions';
import {
  updateMembershipAnualApi,
  updateMembershipDaysApi,
  updateMembershipPlanApi,
} from '../../../../api/users';

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

export interface IUserWithMembership {
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
  user: IUserWithMembership;
  show: boolean;
  setShow: (value: boolean) => void;
  adminUserId: number;
}

const ModalAddDays = ({ show, setShow, user, adminUserId }: Props) => {
  const handleClose = () => setShow(false);
  const [days, setDays] = useState(0);
  const today = new Date().getTime() / 1000;

  const addDays = () => {
    if (!days) {
      alert('Agregue dias');
      return;
    }
    const today = new Date().getTime() / 1000;
    let tempFinalDate = 0;
    if (user.final_date > today) {
      tempFinalDate = user.final_date + days * 86400;
      user.final_date = tempFinalDate;
    } else {
      tempFinalDate = today + days * 86400;
      user.final_date = tempFinalDate;
    }
    updateMembershipDaysApi({
      final_date: user.final_date,
      id: user.id,
      admin_update_id: adminUserId
    }).then(
      (res: any) => {
        alert(
          `Se ${days === 1 ? 'agregó' : 'agregaron'}: ${days} ${days === 1 ? 'día' : 'días'} del usuario ${user.name}`,
        );
        handleClose();
      },
    );
  };

  const deleteDays = () => {
    if (!days) {
      alert('Agregue dias');
      return;
    }
    let tempFinalDate = 0;
    tempFinalDate = user.final_date - days * 86400;
    user.final_date = tempFinalDate;

    updateMembershipDaysApi({
      final_date: user.final_date,
      id: user.id,
      admin_update_id: adminUserId
    }).then(
      (res: any) => {
        alert(
          `Se ${days === 1 ? 'eliminó' : 'eliminaron'}: ${days} ${days === 1 ? 'día' : 'días'} del usuario ${user.name}`,
        );
        handleClose();
      },
    );
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Container>
        <TitleContain>
          <Title>Editar días de suscripción</Title>
          <CloseIcon onClick={handleClose} />
        </TitleContain>
        <InputContain>
          <Label>Días por agregar / restar</Label>
          <Input
            placeholder='7'
            type='number'
            onChange={(e: any) => {
              setDays(parseInt(e.target.value));
            }}
            min={0}
            max={365}
          />
        </InputContain>
        <ButtonContain>
          <PurpleButton onClick={addDays} style={{ background: '#17cd46' }}>
            Agregar Dias
          </PurpleButton>
        </ButtonContain>
        {user.final_date > today && (
          <ButtonContain>
            <PurpleButton
              onClick={() => {
                deleteDays();
              }}
              style={{ backgroundColor: '#FF3D57' }}
            >
              Restar días
            </PurpleButton>
          </ButtonContain>
        )}
      </Container>
    </Modal>
  );
};
export default ModalAddDays;
