import { Modal } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';
import { PaymentMethodModalContain } from './PaymentMethodModal.styled';
import router from 'next/router';

interface IModal {
  show: boolean;
  message: string;
  onHide: () => void;
  newCard: () => void;
}
const PaymentMethodModal = (props: IModal) => {
  const { show, onHide, message, newCard } = props;

  const cancelSubscription = async () => {
    router.push({
      pathname: '/cancel-suscription',
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <PaymentMethodModalContain>
        <h2>Ingresa un nuevo método de pago para continuar.</h2>
        <p>
          No pierdas la oportunidad de seguir aprendiendo <br />
          y convertirte en una experta en belleza, <br />
          <span className='light'>
            por favor agrega un nuevo método de pago para continuar.
          </span>{' '}
          <br />
          <br />
          También puedes cancelar tu suscripción, solo recuerda que <br />
          con esta acción{' '}
          <span className='dark'>perderás todos tus avances y beneficios.</span>
        </p>
        <div className='button-section'>
          <button onClick={newCard}>Añadir nuevo método de pago</button>
          <button onClick={cancelSubscription}>Perder mis Beneficios </button>
        </div>
      </PaymentMethodModalContain>
    </Modal>
  );
};
export default PaymentMethodModal;
