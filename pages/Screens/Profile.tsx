import React from 'react'
import { Container } from 'react-bootstrap';
import { Profile } from '../../containers/Profile/Profile';

const Landings = () => {
  return (

    <Container
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <Profile></Profile>

    </Container>
  )
}
export default Landings;