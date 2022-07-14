import React from 'react'
import { Container } from 'react-bootstrap';
import Preview from '../../components/Catalogue/Preview';
import Lesson from '../../containers/Profile/Lesson/Lesson';

const Landings = () => {
  return (

    <Container
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <Preview></Preview>

    </Container>
  )
}
export default Landings;