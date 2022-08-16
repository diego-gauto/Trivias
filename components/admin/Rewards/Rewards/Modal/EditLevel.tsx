import React, { useState } from "react";

import { Modal } from "react-bootstrap";

import { addLevel, deleteLevel, updateLevel } from "../../../../../store/actions/RewardActions";
import { CloseIcon } from "../../../Users/UserData/UsersCardData.styled";
import {
  Add,
  AddIcon,
  AddText,
  Button,
  ButtonContain,
  Close,
  Contain,
  Input,
  InputContain,
  Label,
  Level,
  LevelContain,
  ModalContain,
  Title,
  TitleContain,
} from "./EditLevel.styled";

const EditLevel = ({ show, setShow, levels }: any) => {
  const handleClose = () => setShow(false);
  const [level, setLevel] = useState({
    minimum: 0,
    maximum: 0
  })
  const AddNewLevel = () => {
    console.log(level)
    console.log(levels)
    if (levels.some((lvl: any) =>
      lvl.minimum == level.minimum || lvl.maximum == level.maximum
    )) {
      alert("Verifique que el minimo o maximo no exista")
    }
    else {
      addLevel(level)
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <ModalContain>
        <TitleContain>
          <Title>Editar Niveles</Title>
          <CloseIcon onClick={() => { setShow(false) }} />
        </TitleContain>
        <LevelContain>
          <TitleContain>
            <Level>Nuevo Nivel </Level>
          </TitleContain>
          <Contain>
            <InputContain>
              <Label>Mínimo</Label>
              <Input
                type="number"
                placeholder="0"
                onChange={(e: any) => {
                  setLevel({ ...level, minimum: parseInt(e.target.value) })
                }}
              />
            </InputContain>
            <InputContain>
              <Label>Máximo</Label>
              <Input
                type="number"
                placeholder="100"
                onChange={(e: any) => {
                  setLevel({ ...level, maximum: parseInt(e.target.value) })
                }}
              />
            </InputContain>
          </Contain>
          <Add>
            <AddText onClick={() => {
              AddNewLevel();
            }}>
              <AddIcon />
              Añadir nuevo nivel
            </AddText>
          </Add>
        </LevelContain>
        {
          levels.map((level: any, index: any) => {
            return (
              <LevelContain key={"editLevel" + index}>
                <TitleContain>
                  <Level>Nivel {index + 1}</Level>

                  {
                    index > 0 &&
                    <Close onClick={() => {
                      deleteLevel(level)
                    }} />
                  }
                </TitleContain>
                <Contain>
                  <InputContain>
                    <Label>Mínimo</Label>
                    <Input
                      placeholder="0"
                      defaultValue={level.minimum}
                      onChange={(e: any) => {
                        levels[index].minimum = parseInt(e.target.value)
                      }}
                    />
                  </InputContain>
                  <InputContain>
                    <Label>Máximo</Label>
                    <Input
                      placeholder="100"
                      defaultValue={level.maximum}
                      onChange={(e: any) => {
                        levels[index].maximum = parseInt(e.target.value)
                      }}
                    />
                  </InputContain>
                </Contain>
                <ButtonContain>
                  <Button onClick={() => {
                    updateLevel(level, level.id)
                  }}>Guardar</Button>
                </ButtonContain>
              </LevelContain>
            )
          })
        }



      </ModalContain>
    </Modal>
  )
}
export default EditLevel;