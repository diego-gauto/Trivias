import React from 'react';
import ThankYouSubscriptionCuatri from '../../components/ThankYou/ThankYouSubscriptionCuatri';
import { MainContain } from '../../screens/Styles.styled';

const paymentSuccessSubscriptionCuatriScreen = () => {
  return (
    <MainContain
      style={{
        width: '100%',
        padding: '0',
        maxWidth: '100% !important',
      }}
    >
      <ThankYouSubscriptionCuatri></ThankYouSubscriptionCuatri>
    </MainContain>
  );
};
export default paymentSuccessSubscriptionCuatriScreen;
