import React from 'react'
import { MainContain } from '../../screens/Styles.styled';
import PaymentFailedAlineacion from '../../components/PaymentFailed/PaymentFailedAlineacion';

const paymentFailedAlineacionScreen = () => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <PaymentFailedAlineacion></PaymentFailedAlineacion>
    </MainContain>
  )
}
export default paymentFailedAlineacionScreen;