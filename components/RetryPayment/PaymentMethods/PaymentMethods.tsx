import React from 'react';
import { PaymentMethodsContainer } from './PaymentMethods.styled';
import { IPaymentMethods } from './IPaymentMethods';
const master_card = '/images/RetryPayment/mastercard.png';

export const PaymentMethods = (props: IPaymentMethods) => {
  const { pm, index, pm_size, changePaymentMethod, handleDelete, isOnlyOne } = props;

  return (
    <PaymentMethodsContainer>
      <div className='payment-method'>
        <img src={master_card} />
        <p className='dots'>**** **** ****</p>
        <p className='text'>{pm.last4}</p>
      </div>
      {
        isOnlyOne &&
        <p className='description-2'>Para quitarla, agrega otra forma de pago </p>
      }
      <div className='edit'>
        {pm_size > 1 ? (
          <div className='default'>
            <div
              className={'input-radio ' + (pm.default ? 'selected-radio' : '')}
              onClick={() => {
                changePaymentMethod(pm);
              }}
            >
              <div className='dot' />
            </div>
            <p>Predeterminada</p>
          </div>
        ) : (
          <div style={{ width: 197 }} />
        )}

        <div className='right'>
          {!pm.default ? (
            <p
              className='actives'
              onClick={() => {
                handleDelete(pm);
              }}
            >
              Eliminar
            </p>
          ) : (
            <div style={{ width: 80 }} />
          )}
        </div>
      </div>
    </PaymentMethodsContainer>
  );
};
