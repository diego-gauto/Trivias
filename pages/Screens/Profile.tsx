import React from 'react'
import { Container } from 'react-bootstrap';
import { MainContain } from '../../screens/Styles.styled';
import User from '../../containers/Profile/User/User';
const Landings = () => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <User></User>

    </MainContain>
  )
}
export default Landings;