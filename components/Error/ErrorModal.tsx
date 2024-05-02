import React from 'react';
import { ErrorContainer, ModalContainer } from './ErrorModal.styled';
import { PurpleButton } from '../Courses/Courses.styled';

const ErrorModal = ({ setShow, show, error, user }: any) => {
  const handleClose = () => setShow(false);

  const returnMessage = () => {
    if (error === 'Este usuario ya existe!') {
      return 'Este usuario ya existe. Haz click en el botón de abajo e inicia sesión.';
    } else {
      return error;
    }
  };
  return (
    <ModalContainer show={show} onHide={handleClose} centered>
      <ErrorContainer>
        <div className='close'>
          <button
            onClick={handleClose}
            type='button'
            className='btn-close btn-close-white'
            aria-label='Close'
          ></button>
        </div>
        <div className='title'>
          <p>
            ¡Oh, no!
            <span>&nbsp; Tenemos un problema</span>
          </p>
        </div>
        <div className='error'>
          <p>{returnMessage()}</p>
        </div>
        {error === 'Este usuario ya existe!' && (
          <PurpleButton
            onClick={() => {
              window.location.href = '/auth/login';
            }}
          >
            Ir a login
          </PurpleButton>
        )}
      </ErrorContainer>
    </ModalContainer>
  );
};
export default ErrorModal;
