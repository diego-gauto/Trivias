import React, { useState } from "react";

import { Modal } from "react-bootstrap";

import { addReward } from "../../../../../store/actions/RewardActions";
import { CloseIcon } from "../../../Users/UserData/UsersCardData.styled";
import {
  Button,
  ButtonContain,
  CaretD,
  Folder,
  IconContain,
  Input,
  Input2,
  InputBig,
  InputContain,
  Label,
  LabelSelect,
  ModalContain,
  Option,
  OptionContain,
  Selected,
  SelectContain,
  Title,
  TitleContain,
} from "./Modal.styled";

const Modal2 = ({ show, setShow }: any) => {

  const [open, setOpen] = useState(false);

  const [reward, setReward] = useState<any>({
    title: "",
    points: "",
    about: "",
    path: "",
    type: ""
  })

  const getImage = (file: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      setReward({ ...reward, path: reader.result })
    };
  }
  const createReward = () => {
    if (Object.keys(reward).some(key => reward[key] === '')) {
      alert("Complete todos los campos")

    }
    else {
      addReward(reward).then((res) => {
        console.log(res)
      })
    }
  }
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
          <Input
            placeholder="Gonvar Nails Leonardo Da Vinci"
            onChange={(e: any) => {
              setReward({ ...reward, title: e.target.value })
            }}
          />
        </InputContain>
        <InputContain>
          <Label>Puntos</Label>
          <Input placeholder="1100"
            onChange={(e: any) => {
              setReward({ ...reward, points: parseInt(e.target.value) })
            }} />
        </InputContain>
        <SelectContain>
          <Label>Tipo</Label>
          <Selected
            onClick={() => { setOpen(!open) }}
          >
            {
              reward.type == "" ? "Elige un tipo" : reward.type
            }
            <CaretD />
          </Selected>
          {
            open == true &&
            <OptionContain>
              <Option onClick={() => { setReward({ ...reward, type: "Físico" }); setOpen(false) }}>
                <input
                  type="radio"
                  id="Físico"
                  name="category"
                  value="Físico"
                />
                <LabelSelect >Físico</LabelSelect>
              </Option>
              <Option onClick={() => { setReward({ ...reward, type: "Digital" }); setOpen(false) }}>
                <input
                  type="radio"
                  id="Digital"
                  name="category"
                  value="Digital"
                />
                <LabelSelect>Digital</LabelSelect>
              </Option>
            </OptionContain>
          }
        </SelectContain>
        <InputContain>
          <Label>Descripción</Label>
          <InputBig
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Tellus ultrices id feugiat cursus velit. Aliquam pulvinar in orci 
            malesuada. Pellentesque aliquam aliquam nulla sodales tortor pretium 
            aliquet ultricies. Interdum et suspendisse nunc gravida. "
            onChange={(e: any) => {
              setReward({ ...reward, about: e.target.value })
            }}
          />
        </InputContain>
        <InputContain>
          <Label>Imagen del Producto</Label>
          <IconContain>
            <Folder />
            <Input2>
              <input
                type="file"
                placeholder="Seleccionar archivo"
                onChange={(e) => { getImage(e.target.files) }}>
              </input>
            </Input2>
          </IconContain>
        </InputContain>
        <ButtonContain>
          <Button
            onClick={() => {
              createReward();
            }}
          >Guardar</Button>
        </ButtonContain>
      </ModalContain>
    </Modal>
  )
}
export default Modal2;