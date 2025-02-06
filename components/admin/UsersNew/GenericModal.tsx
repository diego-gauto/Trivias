import React, { useState } from 'react';
import styles from './GenericModal.module.css';

interface IModalProps {
  show: boolean,
  onClose: () => void,
  child: JSX.Element
}

export const Modal = ({ show, onClose, child }: IModalProps) => {
  if (!show) return null;

  const handleBackdropClick = (e: any) => {
    if (e.target.className === 'modal-backdrop') {
      onClose();
    }
  };

  return (
    <div className={styles['modal-backdrop']} onClick={handleBackdropClick}>
      <div className={styles['modal-content']}>
        {
          /*
          <h2>Este es el Modal</h2>
        <p>Contenido del modal...</p>
        <button onClick={onClose}>Cerrar</button>
          */
        }
        {
          child
        }
      </div>
    </div>
  );
};