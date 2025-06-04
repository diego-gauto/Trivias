import React, { useState } from "react";

import { getGenericQueryResponse } from "../../api/admin";
import { updateMembershipPlanApi, IUpdateMembershipData } from "../../api/users";
import { ActivateSubscriptionModal as Container } from "./Modals.styled";

type ISubscriptionOption = 'month' | 'cuatri' | 'annual';

interface ActivateSubscriptionModalProps {
  clientUserId: number,
  clientFinalDate: number,
  clientStartDate: number,
  clientCurrentLevel: number,
  onCancelEvent: () => void,
  onSuccessEvent: () => void,
}

export const ActivateSubscriptionModal = ({
  clientUserId,
  clientFinalDate,
  clientStartDate,
  clientCurrentLevel,
  onCancelEvent,
  onSuccessEvent
}: ActivateSubscriptionModalProps): JSX.Element => {

  const [subscription, setSubscription] = useState<ISubscriptionOption>('month');
  const [selectedPrice, setSelectedPrice] = useState<number>(-1);
  const [canContinue, setCanContinue] = useState<boolean>(false);

  const generatePricesByOption = () => {
    const pricesMounth = [749, 459, 249, 149, 0];
    const pricesCuatri = [2599, 2000, 1599, 999, 0];
    const pricesAnnual = [5697, 3497, 2500, 1599, 0];

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
      const newElement = <option value={price} key={`subscription_price_${price}`}>
        {
          Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price)
        }
      </option>;
      options.push(newElement);
    }
    return options;
  };

  const activeSubscription = async () => {

    const userAdminEmail = localStorage.getItem('email') || '';
    const getAdminIdQuery = `select id from users where email like '${userAdminEmail}';`;

    const generateBody = (suscription: ISubscriptionOption, price: number, adminUserId: number, finalDate: number): IUpdateMembershipData => {
      const level = suscription === 'month' ? 6 : (suscription === 'annual' ? 5 : 8);
      const days = suscription === 'month' ? 30 : (suscription === 'annual' ? 365 : 120);
      return {
        current_final_date: finalDate,
        level,
        current_level: clientCurrentLevel,
        user_id: clientUserId,
        days,
        type: `${price * 100}`,
        current_start_date: clientStartDate,
        admin_update_id: adminUserId
      }
    }

    try {
      const adminIdResponse = await getGenericQueryResponse(getAdminIdQuery);
      const adminId = adminIdResponse.data.data[0].id;

      const body = generateBody(subscription, selectedPrice, adminId, clientFinalDate);

      if (selectedPrice === -1) {
        return;
      }

      updateMembershipPlanApi(body);

      onSuccessEvent();
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <Container>
      <div className='activate-subscription-modal__body'>
        <p className='activate-subscription-modal__title'>
          Activar suscripción
        </p>
        <div className='activate-subscription-modal__section'>
          <p className='activate-subscription-modal__label'>
            Tipo de suscripción:
          </p>
          <select
            className='activate-subscription-modal__select-input'
            onChange={(e) => {
              setSubscription(e.target.value as any);
              setCanContinue(false);
              setSelectedPrice(-1);
            }}
            value={subscription}
          >
            <option
              value="month"
              key={`subscription_month`}
            >Mensual</option>
            <option
              value="cuatri"
              key={`subscription_cuatri`}
            >Cuatrimestral</option>
            <option
              value="annual"
              key={`subscription_annual`}
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
              const newValue = parseInt(e.target.value);
              console.log({ newValue });
              if (newValue === -1) {
                setCanContinue(false);
              } else if (selectedPrice !== -1 && newValue === -1) {
                return;
              } else {
                setSelectedPrice(parseInt(e.target.value))
                setCanContinue(true);
              }
            }}
            value={selectedPrice}
          >
            <option
              value={'-1'}
              key={`subscription_price_${0}`}
              defaultChecked
            >
              Seleccione un precio
            </option>;
            {
              generatePricesByOption()
            }
          </select>
        </div>
        {
          !canContinue &&
          <div>
            <p
              style={{
                margin: '0',
                color: 'red',
              }}
            >No puede continuar hasta que seleccione un precio</p>
          </div>
        }
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
            className={
              (canContinue && selectedPrice !== -1) ?
                `gonvar-button gonvar-button--purple`
                :
                `gonvar-button gonvar-button--disabled`
            }
            disabled={!canContinue}
            type="button"
            onClick={() => {
              activeSubscription();
            }}
          >
            Continuar
          </button>
        </div>
      </div>
    </Container>
  )
}