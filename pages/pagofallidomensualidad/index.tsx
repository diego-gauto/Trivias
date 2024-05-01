import React from 'react';
import PaymentFailedSubscriptionMonth from '../../components/PaymentFailed/PaymentFailedSubscriptionMonth';
import { MainContain } from '../../screens/Styles.styled';

const paymentFailedMonthScreen = () => {
  return (
    <MainContain
      style={{
        width: '100%',
        padding: '0',
        maxWidth: '100% !important',
      }}
    >
      <PaymentFailedSubscriptionMonth></PaymentFailedSubscriptionMonth>
    </MainContain>
  );
};
export default paymentFailedMonthScreen;
