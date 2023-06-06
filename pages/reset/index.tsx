import React from 'react'
import ResetPassword from '../../components/ResetPassword/ResetPassword';
import { MainContain } from '../../screens/Styles.styled';
const ResetScreen = () => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <ResetPassword></ResetPassword>

    </MainContain>
  )
}
export default ResetScreen;