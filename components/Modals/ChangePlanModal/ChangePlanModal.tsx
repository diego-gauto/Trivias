import { Modal } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';
import { ChangePlanModalContain } from './ChangePlanModal.styled';
import { IUser } from '../../../interfaces/IUserData';
import { updateConektaCustomerInfo } from '../../api/profile';
import router from 'next/router';
import {
  changePaypalApiPlan,
  changePaypalPlan,
  paypalToken,
  token,
} from '../../api/paypal';
import { useState } from 'react';
import { LoaderContainSpinner } from '../../../containers/Profile/Purchase/Purchase.styled';
import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align';

type PlanOption = 'anual_v1_1' | 'cuatrimestre';

interface IModal {
  user: IUser;
  show: boolean;
  onHide: () => void;
  planOption: PlanOption;
}
const ChangePlanModal = (props: IModal) => {
  const { show, onHide, user, planOption } = props;
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);

  const update = () => {
    setLoading(true);
    if (user.method === 'conekta') {
      let body = {
        conekta_id: user.conekta_id,
        plan_id: planOption,
      };
      updateConektaCustomerInfo(body).then((res) => {
        window.location.href = '/preview';
      });
    } else if (user.method === 'paypal') {
      token().then((res) => {
        let paypaltoken = res.data.access_token;
        let body = {
          token: paypaltoken,
          subscription_id: user.plan_id,
          plan_id:
            planOption === 'anual_v1_1'
              ? 'P-0ND16663SN6195536MVEUMXI'
              : 'P-6RT70377G6729623WMVJLPYQ',
          user_id: user.id,
          final_date: user.final_date,
        };
        changePaypalApiPlan(body).then((res) => {
          changePaypalPlan(body).then((res) => {
            setLink(res.data.links[0].href);
            setLoading(false);
          });
        });
      });
    }
  };

  const renderTextAnual = () => {
    return (
      <>
        Ahorra $2011 𝗠𝗫𝗡 al adquirir nuestra suscripción anual. <br></br>
        ¡No pierdas esta oportunidad!
      </>
    );
  };

  const renderTextQuarterly = () => {
    return (
      <>
        Ahorra $711 𝗠𝗫𝗡 al adquirir nuestra suscripción cuatrimestral. <br></br>
        ¡No pierdas esta oportunidad!
      </>
    );
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        setLink('');
      }}
      centered
    >
      <ChangePlanModalContain>
        <p style={{ textAlign: 'center' }}>
          {planOption === 'anual_v1_1'
            ? renderTextAnual()
            : renderTextQuarterly()}
        </p>
        <IoClose className='close-icon' onClick={onHide} />
        <div className='buttons-container'>
          {!loading ? (
            <button className='left' onClick={update}>
              {planOption === 'anual_v1_1'
                ? 'Comprar a Anualidad'
                : 'Comprar a Cuatrimestralidad'}
            </button>
          ) : (
            <LoaderContainSpinner />
          )}
          {/* <button className="right" onClick={onHide}>Mantener membresia actual</button> */}
        </div>
        {link && (
          <p className='link'>
            Accede al link para poder continuar con el proceso: <br></br>
            <a href={link}>{link}</a>
          </p>
        )}
      </ChangePlanModalContain>
    </Modal>
  );
};
export default ChangePlanModal;
