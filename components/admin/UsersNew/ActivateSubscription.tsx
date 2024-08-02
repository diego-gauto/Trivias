import React, { useEffect, useState } from 'react';
import { ActivateSubscriptionModal as Container } from './Modals.styled';

type ISubscriptionOption = 'month' | 'cuatri' | 'annual';

interface ActivateSubscriptionModalProps {
  clientUserId: number,
  onCancelEvent: () => void,
  onSuccessEvent: () => void,
}

export const ActivateSubscriptionModal = ({
  clientUserId,
  onCancelEvent,
  onSuccessEvent
}: ActivateSubscriptionModalProps): JSX.Element => {

  const [subscription, setSubscription] = useState<ISubscriptionOption>('month');
  const [selectedPrice, setSelectedPrice] = useState<number>(459);

  const generatePricesByOption = () => {
    const pricesMounth = [459, 249, 149];
    const pricesCuatri = [1599, 999];
    const pricesAnnual = [3497, 1599];

    let prices: number[] = [];
    if (subscription === 'month') {
      prices = pricesMounth;
    } else if (subscription === 'annual') {
      prices = pricesAnnual;
    } else if (subscription === 'cuatri') {
      prices = pricesCuatri;
    }

    const options: JSX.Element[] = [];
    for (const price of prices) {
      const newElement = <option value={price} key={`subscription_price_${price}`}>{price}</option>;
      options.push(newElement);
    }
    return options;
  };

  return (
    <Container>
      <div className='activate-subscription-modal__body'>
        <p className='activate-subscription-modal__title'>Activar suscripción</p>
        <div className='activate-subscription-modal__section'>
          <p className='activate-subscription-modal__label'>
            Tipo de suscripción:
          </p>
          <select
            className='activate-subscription-modal__select-input'
            onChange={(e) => {
              setSubscription(e.target.value as any);
            }}
          >
            <option
              value="month"
              selected={subscription === 'month'}
            >Mensual</option>
            <option
              value="cuatri"
              selected={subscription === 'cuatri'}
            >Cuatrimestral</option>
            <option
              value="annual"
              selected={subscription === 'annual'}
            >Anual</option>
          </select>
        </div>
        <div>
          <p className='activate-subscription-modal__label'>
            Precio de suscripción:
          </p>
          <select
            className='activate-subscription-modal__select-input'
            onChange={(e) => {
              setSelectedPrice(parseInt(e.target.value))
            }}
          >
            {
              generatePricesByOption()
            }
          </select>
        </div>
        <div className='activate-subscription-modal__buttons'>
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
              onSuccessEvent();
            }}
          >
            Continuar
          </button>
        </div>
      </div>
    </Container>
  )
}