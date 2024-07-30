import React, { useEffect, useState } from 'react';

interface SuccessModalProps {
  successMessage: string;
  acceptEvent: () => void;
}

const SuccessModal = ({ successMessage, acceptEvent }: SuccessModalProps): JSX.Element => {
  return (
    <div
      style={{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '25px',
        color: '#691aca'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '25px'
        }}>
        <div style={{
          borderRadius: '50%',
          backgroundColor: '#0EAD69',
          width: '50px',
          height: '50px',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: '24px'
        }}>
          {'✓'}
        </div>
        <p
          style={{
            margin: '0',
            fontWeight: 'bold',
            fontSize: '20px'
          }}
        >Felicidades</p>
      </div>
      <div>
        <p style={{
          fontWeight: 'bold',
          color: '#8C4FD7',
          textAlign: 'center',
          margin: '0'
        }}>
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
    </div>);
}