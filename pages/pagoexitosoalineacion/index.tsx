import React from 'react'
import ThankYouAlineacion from '../../components/ThankYou/ThankYouAlineacion';
import { MainContain } from '../../screens/Styles.styled';
const paymentSuccessAlineacionScreen = () => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
        height: "100vh"
      }}>
      <ThankYouAlineacion></ThankYouAlineacion>
    </MainContain>
  )
}
export default paymentSuccessAlineacionScreen;