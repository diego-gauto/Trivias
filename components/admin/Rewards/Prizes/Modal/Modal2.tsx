import React from 'react'
import { Modal } from 'react-bootstrap'
import { CloseIcon } from '../../../Users/UserData/AllUsers.styled';

import { Button, ButtonContain, Folder, IconContain, Input, Input2, InputBig, InputContain, Label, ModalContain, Title, TitleContain } from './Modal.styled';

const Modal2 = ({ show, setShow }: any) => {

  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose} centered>
      <ModalContain>
        <TitleContain>
          <Title>Nueva Recompensa</Title>
          <CloseIcon onClick={() => { setShow(false) }} />
        </TitleContain>
        <InputContain>
          <Label>Nombre de la Recompensa</Label>
          <Input placeholder="Gonvar Nails Leonardo Da Vinci" />
        </InputContain>
        <InputContain>
          <Label>Puntos</Label>
          <Input placeholder="1100" />
        </InputContain>
        <InputContain>
          <Label>Puntos</Label>
          <InputBig placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus ultrices id feugiat cursus velit. Aliquam pulvinar in orci malesuada. Pellentesque aliquam aliquam nulla sodales tortor pretium aliquet ultricies. Interdum et suspendisse nunc gravida. " />
        </InputContain>
        <InputContain>
          <Label>Imagen del Producto</Label>
          <IconContain>
            <Folder />
            <Input2 placeholder="Seleccionar archivo" />
          </IconContain>
        </InputContain>
        <ButtonContain>
          <Button>Guardar</Button>
        </ButtonContain>
      </ModalContain>
    </Modal>
  )
}
export default Modal2;