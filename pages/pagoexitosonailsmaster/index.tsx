import React from 'react';
import ThankYouNailsMaster from '../../components/ThankYou/ThankYouNailsMaster';
import { MainContain } from '../../screens/Styles.styled';
const paymentSuccessNailsMasterScreen = () => {
  return (
    <MainContain
      style={{
        width: '100%',
        padding: '0',
        maxWidth: '100% !important',
      }}
    >
      <ThankYouNailsMaster></ThankYouNailsMaster>
    </MainContain>
  );
};
export default paymentSuccessNailsMasterScreen;
