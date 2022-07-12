import React from 'react'
import { Container } from 'react-bootstrap';
import Lesson from '../../containers/Profile/Lesson/Lesson';
const Landings = () => {
  return (

    <Container
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <Lesson></Lesson>

    </Container>
  )
}
export default Landings;