import React from 'react';
import { MainContain } from '../../screens/Styles.styled';
import { PurchaseNew2 } from '../../components/RetryPayment/PurchaseNew2';

const retryPayment = () => {
  return (
    <MainContain
      style={{
        width: '100%',
        padding: '0',
        maxWidth: '100% !important',
      }}
    >
      <PurchaseNew2 />
    </MainContain>
  );
};
export default retryPayment;