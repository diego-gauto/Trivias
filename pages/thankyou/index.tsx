import React from 'react'
import ThankYou from '../../components/ThankYou/ThankYou';
import { MainContain } from '../../screens/Styles.styled';
const ThankYouScreen = () => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
        height: "100vh"
      }}>
      <ThankYou></ThankYou>
    </MainContain>
  )
}
export default ThankYouScreen;