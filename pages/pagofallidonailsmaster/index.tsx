import React from 'react'
import PaymentFailedNailsMaster from '../../components/PaymentFailed/PaymentFailedNailsMaster';
import { MainContain } from '../../screens/Styles.styled';

const paymentFailedNailsMasterScreen = () => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <PaymentFailedNailsMaster></PaymentFailedNailsMaster>
    </MainContain>
  )
}
export default paymentFailedNailsMasterScreen;