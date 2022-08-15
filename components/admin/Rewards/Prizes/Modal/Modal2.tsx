import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { addReward } from '../../../../../store/actions/RewardActions';
import { CloseIcon } from '../../../Users/UserData/AllUsers.styled';

import { Button, ButtonContain, Folder, IconContain, Input, Input2, InputBig, InputContain, Label, ModalContain, Title, TitleContain } from './Modal.styled';

const Modal2 = ({ show, setShow }: any) => {

  const [reward, setReward] = useState<any>({
    title: "",
    points: "",
    about: "",
    path: ""
  })

  const getImage = (file: any) => {
    console.log(file)
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
        <InputContain>
          <Label>Descripción</Label>
          <InputBig
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus ultrices id feugiat cursus velit. Aliquam pulvinar in orci malesuada. Pellentesque aliquam aliquam nulla sodales tortor pretium aliquet ultricies. Interdum et suspendisse nunc gravida. "
            onChange={(e: any) => {
              setReward({ ...reward, about: e.target.value })
            }}
          />
        </InputContain>
        <InputContain>
          <Label>Imagen del Producto</Label>
          <IconContain>
            <Folder />
            <Input2 placeholder="Seleccionar archivo" type="file" onChange={(e) => { getImage(e.target.files) }} />
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