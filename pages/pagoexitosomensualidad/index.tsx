import React from 'react'
import ThankYouSubscriptionMonth from '../../components/ThankYou/ThankYouSubscriptionMonth';
import { MainContain } from '../../screens/Styles.styled';
const paymentSuccessSubscriptionMonthScreen = () => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
        height: "100vh"
      }}>
      <ThankYouSubscriptionMonth></ThankYouSubscriptionMonth>
    </MainContain>
  )
}
export default paymentSuccessSubscriptionMonthScreen;