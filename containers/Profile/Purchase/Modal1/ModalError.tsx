import React from 'react';
import { Modal } from 'react-bootstrap';
import {
  ButtonsDiv2,
  Container,
  ModalContain,
  PurpleButton,
} from './ModalError.styled';

export const ModalError = ({ error, setError, errorMsg }: any) => {
  const handleClose = () => setError(false);

  return (
    <ModalContain>
      <Modal
        show={error}
        onHide={handleClose}
        centered
        dialogClassName='custom-dialog'
      >
        <Container>
          <div className='top-section'>
            <h1>
              ¡Oh, no! <span>Tenemos un problema</span>
            </h1>
            <p>
              <span>Tu pago ha sido rechazado.</span> {errorMsg}.
              {/* Puede ser un error en el método de <br />
              pago o porque no cumple con ciertos requisitos de seguridad <br />
              <span className='opacity'>(saldo insuficiente o un movimiento inusual).</span> */}
            </p>
          </div>
          <div className='bottom-section'>
            <p>
              <span>
                Verifica que los datos de tu tarjeta sean correctos e inténtalo
                de nuevo.{' '}
              </span>{' '}
              <br />
              Si el problema persiste, <b>intenta otro método de pago</b> o
              contacta <br />a tu banco para más información.
            </p>
          </div>
          <button onClick={handleClose}>x</button>
        </Container>
      </Modal>
    </ModalContain>
  );
};
export default ModalError;
