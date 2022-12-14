import React from 'react'
import { ErrorContainer, ModalContainer } from './ErrorModal.styled';

const ErrorModal = ({ setShow, show, error, user }: any) => {

  const handleClose = () => setShow(false);
  return (
    <ModalContainer show={show} onHide={handleClose} centered>
      <ErrorContainer>
        <div className="close">
          <button onClick={handleClose}
            type="button" className="btn-close btn-close-white" aria-label="Close">
          </button>
        </div>
        <div className="title">
          <p>
            ¡Oh, no!
            <span>
              &nbsp; Tenemos un problema
            </span>
          </p>
        </div>
        <div className="error">
          <p>
            {error}
          </p>
        </div>
      </ErrorContainer>
    </ModalContainer>
  )
}
export default ErrorModal;