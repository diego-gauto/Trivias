import React from 'react'
import PaymentFailedSubscriptionAnual from '../../components/PaymentFailed/PaymentFailedSubscriptionAnual';
import { MainContain } from '../../screens/Styles.styled';

const paymentFailedAnualScreen = () => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
        height: "100vh"
      }}>
      <PaymentFailedSubscriptionAnual></PaymentFailedSubscriptionAnual>
    </MainContain>
  )
}
export default paymentFailedAnualScreen;