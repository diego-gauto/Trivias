import React from 'react';
import { MainContain } from '../../screens/Styles.styled';
import { RetryPayment } from '../../components/RetryPayment/RetryPayment';

const retryPayment = () => {
  return (
    <MainContain
      style={{
        width: '100%',
        padding: '0',
        maxWidth: '100% !important',
      }}
    >
      <RetryPayment />
    </MainContain>
  );
};
export default retryPayment;
