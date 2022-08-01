import React, { useState } from 'react'
import Modal1 from './Modal/Modal1';
import Modal2 from './Modal/Modal2';
import { Add, Container, CreateIcon, D1, D2, D3, ImageContain, ItemContain, NewPrize, PrizeText, SubTitle, Title } from './Prize.styled';

const Prize = () => {

  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <Container>
      <ItemContain >
        <ImageContain>
          <D1 />
          <CreateIcon onClick={() => { setShow(true) }} />
        </ImageContain>
        <Title>Gonvar Nails Leonardo Da Vinci</Title>
        <SubTitle>1,100 puntos</SubTitle>
      </ItemContain>
      <ItemContain>
        <ImageContain>
          <D2 />
          <CreateIcon />
        </ImageContain>
        <Title>Gonvar Nails Leonardo Da Vinci</Title>
        <SubTitle>1,100 puntos</SubTitle>
      </ItemContain>
      <ItemContain>
        <ImageContain>
          <D3 />
          <CreateIcon />
        </ImageContain>
        <Title>Gonvar Nails Leonardo Da Vinci</Title>
        <SubTitle>1,100 puntos</SubTitle>
      </ItemContain>

      <NewPrize onClick={() => { setEdit(true) }} >
        <Add />
        <PrizeText>
          Añadir nueva recompesa
        </PrizeText>
      </NewPrize>
      <Modal1 show={show} setShow={setShow} />
      <Modal2 show={edit} setShow={setEdit} />
    </Container>
  )
}
export default Prize;