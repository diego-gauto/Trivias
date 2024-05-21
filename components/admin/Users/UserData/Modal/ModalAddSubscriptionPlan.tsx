import { CSSProperties, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { IUpdateMembershipPlanApi, updateMembershipPlanApi } from '../../../../api/users';

import { CloseIcon } from '../UsersCardData.styled';
import {
  ButtonContain,
  Container,
  GreenButton,
  CustomButton,
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

type SuscriptionOption = 'Month' | 'Cuatri' | 'Annual' | 'None';

const ModalAddSubscriptionPlan = ({ show, setShow, user, adminUserId }: Props) => {
  const [suscription, setSuscription] = useState<SuscriptionOption>('None');
  const [price, setPrice] = useState<number>(0);
  const handleClose = () => setShow(false);

  const addMembership = async () => {
    if (suscription === 'None') {
      return;
    }

    const generateBody = (suscription: SuscriptionOption, price: number): IUpdateMembershipPlanApi => {
      const level = suscription === 'Month' ? 6 : (suscription === 'Annual' ? 5 : 8);
      const days = suscription === 'Month' ? 30 : (suscription === 'Annual' ? 365 : 120);
      return {
        user_final_date: user.final_date,
        start_date: user.start_date,
        level,
        id: user.id,
        days,
        type: price * 100,
        admin_update_id: adminUserId
      }
    }

    let body = generateBody(suscription, price);
    const suscriptionTypeString =
      suscription === 'Month'
        ? 'Mensual'
        : suscription === 'Annual'
          ? 'Anual'
          : 'Cuatrimestral';
    const message =
      'Seguro que quieres agregar un plan ' + suscriptionTypeString;
    if (!confirm(message)) {
      return;
    }
    try {
      const response = await updateMembershipPlanApi(body);
      console.log(response);
      alert(`Plan ${suscriptionTypeString} actualizado con exito!`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const generateCSSPropertiesToButton = (
    hexColor: string,
    selected: boolean,
  ) => {
    const noSelectedValues: CSSProperties = {
      border: `2px #${hexColor} solid`,
      backgroundColor: `transparent`,
    };

    const selectedValues: CSSProperties = {
      border: `none`,
      backgroundColor: `#${hexColor}`,
      color: 'white',
    };

    return selected ? selectedValues : noSelectedValues;
  };

  const generateMembershipsButtons = () => {
    return (
      <>
        <CustomButton
          onClick={() => setSuscription('Month')}
          style={generateCSSPropertiesToButton(
            '6717CD',
            suscription === 'Month',
          )}
        >
          Agregar Mensualidad
        </CustomButton>
        <CustomButton
          onClick={() => setSuscription('Cuatri')}
          style={generateCSSPropertiesToButton(
            'a317cd',
            suscription === 'Cuatri',
          )}
        >
          Agregar Plan Cuatrimestral
        </CustomButton>
        <CustomButton
          onClick={() => setSuscription('Annual')}
          style={generateCSSPropertiesToButton(
            '1740cd',
            suscription === 'Annual',
          )}
        >
          Agregar Anualidad
        </CustomButton>
      </>
    );
  };

  const generatePricesByOption = () => {
    const pricesMounth = [459, 249, 149];
    const pricesCuatri = [1599];
    const pricesAnnual = [3497, 1599];

    let prices: number[] = [];
    if (suscription === 'Month') {
      prices = pricesMounth;
    } else if (suscription === 'Annual') {
      prices = pricesAnnual;
    } else if (suscription === 'Cuatri') {
      prices = pricesCuatri;
    }

    if (suscription === 'None') {
      return [];
    }

    const options: JSX.Element[] = [];
    for (const price of prices) {
      const newElement = <option value={price}>{price}</option>;
      options.push(newElement);
    }
    return options;
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Container>
        <TitleContain>
          <Title>Activar plan de suscripción</Title>
          <CloseIcon onClick={handleClose} />
        </TitleContain>
        <ButtonContain>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
            >
              <p>Seleccione un tipo de suscripción</p>
              {generateMembershipsButtons()}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  padding: '5px',
                }}
              >
                <p
                  style={{
                    textAlign: 'center',
                  }}
                >
                  Seleccione un precio
                </p>
                <select
                  style={{
                    width: '100%',
                    borderRadius: '35px',
                    paddingLeft: '10px',
                    height: '50px',
                  }}
                  name=''
                  id=''
                  onChange={(event) => {
                    setPrice(parseInt(event.target.value));
                  }}
                >
                  <option value='0' disabled selected>
                    Seleccione un precio
                  </option>
                  {generatePricesByOption()}
                </select>
              </div>
            </div>
          </div>
          <div
            style={{
              paddingTop: '20px',
            }}
          >
            {price !== 0 && suscription !== 'None' && (
              <GreenButton onClick={() => addMembership()}>
                Continuar
              </GreenButton>
            )}
            {(price === 0 || suscription === 'None') && (
              <p>
                Una vez seleccione una suscripción y un precio podrá continuar
              </p>
            )}
          </div>
        </ButtonContain>
      </Container>
    </Modal>
  );
};
export default ModalAddSubscriptionPlan;
