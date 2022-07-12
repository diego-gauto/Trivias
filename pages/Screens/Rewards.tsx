import React from 'react'
import { Container } from 'react-bootstrap';
import Rewards from '../../containers/Profile/Rewards/Rewards';
const Landings = () => {
  return (

    <Container
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <Rewards></Rewards>

    </Container>
  )
}
export default Landings;