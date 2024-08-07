import React, { useEffect, useState } from 'react';
import { RemoveSubscriptionModal as Container } from './Modals.styled';
import { removeMembershipApi } from '../../api/users';

type SubscriptionType = 'Mensual' | 'Cruatrimestral' | 'Anual';

interface RemoveSubscriptionModalProps {
  clientUserId: number,
  clientUserLevel: number,
  clientStartDate: number,
  clientFinalDate: number,
  onCancelEvent: () => void,
  onSuccessEvent: () => void,
}

const convertToPrettyDateFormat = (value: number) => {
  const d = new Date(value);

  const SPANISH_MONTHS = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'];

  const day = d.getDate();
  const monthIndex = d.getMonth();
  const year = d.getFullYear();

  const result = `${day} de ${SPANISH_MONTHS[monthIndex]} de ${year}`;
  return result;
}

const getSubscriptionByUserLevel = (level: number): SubscriptionType => {
  if ([1, 6].includes(level)) {
    return 'Mensual';
  }
  if ([7, 8].includes(level)) {
    return 'Cruatrimestral';
  }

  if ([4, 5].includes(level)) {
    return 'Anual';
  }

  return 'Cruatrimestral';
}

export const RemoveSubscriptionModal = ({
  clientUserId,
  clientStartDate,
  clientFinalDate,
  clientUserLevel,
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
          <p className='remove-subscription-modal__paragraph'>Tipo de membresia: {getSubscriptionByUserLevel(clientUserLevel)}</p>
        </div>
        {
          clientStartDate !== 0 &&
          <div>
            <p className='remove-subscription-modal__label'>
              Fecha de inicio:
            </p>
            <p className='remove-subscription-modal__paragraph'>{convertToPrettyDateFormat(clientStartDate * 1000)}</p>
          </div>
        }
        <div>
          <p className='remove-subscription-modal__label'>
            Fecha de final:
          </p>
          <p className='remove-subscription-modal__paragraph'>{convertToPrettyDateFormat(clientFinalDate * 1000)}</p>
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
