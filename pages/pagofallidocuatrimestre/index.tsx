import React from 'react';
import PaymentFailedSubscriptionCuatri from '../../components/PaymentFailed/PaymentFailedSubscriptionCuatri';
import { MainContain } from '../../screens/Styles.styled';

const paymentFailedCuatriScreen = () => {
  return (
    <MainContain
      style={{
        width: '100%',
        padding: '0',
        maxWidth: '100% !important',
      }}
    >
      <PaymentFailedSubscriptionCuatri></PaymentFailedSubscriptionCuatri>
    </MainContain>
  );
};
export default paymentFailedCuatriScreen;
