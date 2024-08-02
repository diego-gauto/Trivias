import React, { useEffect, useState } from 'react';
import { RemoveSubscriptionModal as Container } from './Modals.styled';
import { removeMembershipApi } from '../../api/users';

interface RemoveSubscriptionModalProps {
  clientUserId: number,
  onCancelEvent: () => void,
  onSuccessEvent: () => void,
}

export const RemoveSubscriptionModal = ({
  clientUserId,
  onCancelEvent,
  onSuccessEvent
}: RemoveSubscriptionModalProps) => {

  const removeSubscription = async () => {
    try {
      const response = removeMembershipApi({ user_id: clientUserId });
      onSuccessEvent();
    } catch (error) {
      console.log({ error });
    }
  }

  return (<>
    <Container>
      <div className='remove-subscription-modal__body'>
        <p className='remove-subscription-modal__title'>¿Estas seguro de quitar la suscripción de este usuario?</p>
        <div>
          <p className='remove-subscription-modal__label'>
            Datos:
          </p>
          <p className='remove-subscription-modal__paragraph'>Tipo de membresia: {'Cuatrimestral'}</p>
        </div>
        <div>
          <p className='remove-subscription-modal__label'>
            Fecha de inicio:
          </p>
          <p className='remove-subscription-modal__paragraph'>{'24 de Febrero de 2024'}</p>
        </div>
        <div>
          <p className='remove-subscription-modal__label'>
            Fecha de final:
          </p>
          <p className='remove-subscription-modal__paragraph'>{'23 de Junio de 2024'}</p>
        </div>
        <div className='remove-subscription-modal__buttons'>
          <button
            className='gonvar-button gonvar-button--ghost'
            type="button"
            onClick={() => {
              onCancelEvent();
            }}
          >
            Cancelar
          </button>
          <button
            className='gonvar-button gonvar-button--purple'
            type="button"
            onClick={() => {
              removeSubscription();
            }}
          >
            Continuar
          </button>
        </div>
      </div>
    </Container>
  </>)
}
