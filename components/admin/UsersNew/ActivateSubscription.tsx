import React, { useEffect, useState } from 'react';
import { ActivateSubscriptionModal as Container } from './Modals.styled';
import { getGenericQueryResponse } from '../../api/admin';

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

  const updateFinalDateToUser = async () => {
    const userAdminEmail = localStorage.getItem('email') || '';
    const getAdminIdQuery = `select id from users where email like '${userAdminEmail}';`;

    try {
      const adminIdResponse = await getGenericQueryResponse(getAdminIdQuery);
      const adminId = adminIdResponse.data.data[0].id;

      //const updateUserFinalDateQuery = `update memberships set final_date = ${newFinalDate}, admin_update_id = ${adminId} where user_id = ${userId};`;
      //const updateUserFinalDateResponse = await getGenericQueryResponse(updateUserFinalDateQuery);

      onSuccessEvent();
    } catch (error) {
      console.log({ error });
    }
  }

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
            defaultValue={'month'}
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
            defaultValue={459}
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