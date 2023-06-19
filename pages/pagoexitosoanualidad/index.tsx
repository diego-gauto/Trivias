import React from 'react'
import ThankYouSubscriptionAnual from '../../components/ThankYou/ThankYouSubscriptionAnual';
import { MainContain } from '../../screens/Styles.styled';
const paymentSuccessSubscriptionAnualScreen = () => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
        height: "100vh"
      }}>
      <ThankYouSubscriptionAnual></ThankYouSubscriptionAnual>
    </MainContain>
  )
}
export default paymentSuccessSubscriptionAnualScreen;