import React, { useEffect, useState } from 'react';
import { SuccessModalContainer } from './Modals.styled';

interface SuccessModalProps {
  successMessage: string;
  acceptEvent: () => void;
}

export const SuccessModal = ({ successMessage, acceptEvent }: SuccessModalProps): JSX.Element => {
  return (
    <>
      <SuccessModalContainer>
        <div className='header-modal'>
          <div className='header-modal__success-circle'>
            {'✓'}
          </div>
          <p className='header-modal__title'>Felicidades</p>
        </div>
        <div className='body-modal '>
          <p className='body-modal__text'>
            {
              successMessage
            }
          </p>
        </div>
        <button
          className='gonvar-button gonvar-button--purple'
          type="button"
          onClick={(e) => {
            acceptEvent();
          }}
        >
          Aceptar
        </button>
      </SuccessModalContainer>
    </>
  );
}