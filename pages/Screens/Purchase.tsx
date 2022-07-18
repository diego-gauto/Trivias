import React from 'react'
import { MainContain } from './Styles.styled';
import Purchase from '../../containers/Profile/Purchase/Purchase';
const PurchaseScreen = () => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <Purchase></Purchase>

    </MainContain>
  )
}
export default PurchaseScreen;