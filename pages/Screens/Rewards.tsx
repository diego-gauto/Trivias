import React from 'react'
import { Container } from 'react-bootstrap';
import { MainContain } from './Styles.styled';
import Rewards from '../../containers/Profile/Rewards/Rewards';
const Landings = () => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <Rewards></Rewards>

    </MainContain>
  )
}
export default Landings;