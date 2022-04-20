import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { INavBar } from './INavBar'
import { PurpleButton } from './NavBar.styled'

export const NavBar = (props: INavBar) => {
  const { title } = props;
  return (
    <Container>
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand href="#">{title}</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <PurpleButton>Suscribirse Ya</PurpleButton>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  )
}
