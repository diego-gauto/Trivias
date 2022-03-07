import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

export const NavBar = () => {
  return (
    <Container>
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand href="#">Navbar</Navbar.Brand>
        </Container>
      </Navbar>
    </Container>
  )
}
