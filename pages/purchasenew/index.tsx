import React from 'react';
import { MainContain } from '../../screens/Styles.styled';
import { PurchaseNew } from '../../components/RetryPayment/PurchaseNew';

const retryPayment = () => {
  return (
    <MainContain
      style={{
        width: '100%',
        padding: '0',
        maxWidth: '100% !important',
      }}
    >
      <PurchaseNew />
    </MainContain>
  );
};
export default retryPayment;