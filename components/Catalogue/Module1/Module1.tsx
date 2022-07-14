import React from 'react'
import { Title, Banner, Container, TextContain } from './Module1.styled';

const Module1 = () => {
  return (
    <Container>
      <Banner
        src="/images/Preview/fondo1.png"
        width={1400}
        height={650}
      />
      <TextContain>
        <Title>
          Curso 1: Episodio 05 “El Regreso”
        </Title>
      </TextContain>

    </Container>
  )
}
export default Module1;