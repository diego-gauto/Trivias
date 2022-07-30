import React from 'react'
import { Modal } from 'react-bootstrap';
import { ButtonContain, Container, Content, Cross, PurpleButton, Title, TitleContain, TransparentButton, Trash } from './Delete.styled';

const Delete = ({ show, setShow }: any) => {

  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Container>
        <TitleContain>
          <Title>Eliminar Lección</Title>
          <Cross onClick={handleClose}>x</Cross>
        </TitleContain>
        <Content>¿Estas seguro de eliminar la lección? Esta acción es irreversible.</Content>
        <ButtonContain>
          <TransparentButton>Cancelar</TransparentButton>
          <PurpleButton>Eliminar<Trash /></PurpleButton>
        </ButtonContain>
      </Container>
    </Modal>
  )
}
export default Delete;