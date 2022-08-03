import React from 'react'
import { Modal } from 'react-bootstrap';
import { CloseIcon } from '../../../Users/UserData/AllUsers';
import { ModalContain, Title, ButtonContain, TitleContain, Button, LevelContain, Level, Contain, InputContain, Label, Input, Add, AddText, AddIcon, Close } from './EditLevel.styled';

const EditLevel = ({ show, setShow }: any) => {
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <ModalContain>
        <TitleContain>
          <Title>Editar Niveles</Title>
          <CloseIcon onClick={() => { setShow(false) }} />
        </TitleContain>
        <LevelContain>
          <TitleContain>
            <Level>Nivel 1</Level>
          </TitleContain>
          <Contain>
            <InputContain>
              <Label>Mínimo</Label>
              <Input placeholder="0" />
            </InputContain>
            <InputContain>
              <Label>Máximo</Label>
              <Input placeholder="100" />
            </InputContain>
          </Contain>
        </LevelContain>
        <LevelContain>
          <TitleContain>
            <Level>Nivel 2</Level>
            <Close />
          </TitleContain>
          <Contain>
            <InputContain>
              <Label>Mínimo</Label>
              <Input placeholder="101" />
            </InputContain>
            <InputContain>
              <Label>Máximo</Label>
              <Input placeholder="400" />
            </InputContain>
          </Contain>
        </LevelContain>
        <LevelContain>
          <TitleContain>
            <Level>Nivel 3</Level>
            <Close />
          </TitleContain>
          <Contain>
            <InputContain>
              <Label>Mínimo</Label>
              <Input placeholder="401" />
            </InputContain>
            <InputContain>
              <Label>Máximo</Label>
              <Input placeholder="1000" />
            </InputContain>
          </Contain>
        </LevelContain>
        <LevelContain>
          <TitleContain>
            <Level>Nivel 4</Level>
            <Close />
          </TitleContain>
          <Contain>
            <InputContain>
              <Label>Mínimo</Label>
              <Input placeholder="1001" />
            </InputContain>
            <InputContain>
              <Label>Máximo</Label>
              <Input placeholder="Máximo" />
            </InputContain>
          </Contain>
        </LevelContain>
        <Add>
          <AddText>
            <AddIcon />
            Añadir nuevo nivel
          </AddText>
        </Add>

        <ButtonContain>
          <Button>Guardar</Button>
        </ButtonContain>
      </ModalContain>
    </Modal>
  )
}
export default EditLevel;