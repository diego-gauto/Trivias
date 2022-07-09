import React from 'react'
import { Container } from 'react-bootstrap';
import Purchase from '../../containers/Profile/Purchase/Purchase';
const Landings = () => {
  return (

    <Container
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <Purchase></Purchase>

    </Container>
  )
}
export default Landings;