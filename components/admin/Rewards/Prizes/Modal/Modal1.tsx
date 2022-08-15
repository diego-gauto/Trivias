

import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { updateRewards } from "../../../../../store/actions/RewardActions";

import { CloseIcon } from "../../../Users/UserData/AllUsers.styled";
import {
  Button,
  ButtonContain,
  Folder,
  IconContain,
  Input,
  Input2,
  InputBig,
  InputContain,
  Label,
  ModalContain,
  Title,
  TitleContain,
} from "./Modal.styled";

const Modal1 = ({ show, setShow, data }: any) => {
  const [reward, setReward] = useState<any>({ data })
  const getImage = (file: any) => {
    console.log(file)
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      setReward({ ...reward, format: reader.result })
    };
  }
  const update = () => {
    if (Object.keys(reward).some(key => reward[key] === '')) {
      alert("Complete todos los campos")
    }
    else {
      updateRewards(reward, reward.id);
      console.log(reward)
    }
  }
  useEffect(() => {
    setReward({ ...data })
  }, [data])

  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose} centered>
      <ModalContain>
        <TitleContain>
          <Title>Editar Recompensa</Title>
          <CloseIcon onClick={() => { setShow(false) }} />
        </TitleContain>
        <InputContain>
          <Label>Nombre de la Recompensa</Label>
          <Input
            placeholder="Gonvar Nails Leonardo Da Vinci"
            defaultValue={data.title}
            onChange={(e) => {
              setReward({ ...reward, title: e.target.value })
            }}
          />
        </InputContain>
        <InputContain>
          <Label>Puntos</Label>
          <Input
            placeholder="1100"
            defaultValue={reward.points}
            onChange={(e) => {
              setReward({ ...reward, points: e.target.value })
            }}
          />
        </InputContain>
        <InputContain>
          <Label>Descripción</Label>
          <InputBig
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus ultrices id feugiat cursus velit. Aliquam pulvinar in orci malesuada. Pellentesque aliquam aliquam nulla sodales tortor pretium aliquet ultricies. Interdum et suspendisse nunc gravida. "
            defaultValue={reward.about}
            onChange={(e) => {
              setReward({ ...reward, about: e.target.value })
            }}
          />
        </InputContain>
        <InputContain>
          <Label>Imagen del Producto</Label>
          <IconContain>
            <Folder />
            <Input2
              type="file"
              placeholder="Seleccionar archivo"
              onChange={(e) => { getImage(e.target.files) }}
            />
          </IconContain>
        </InputContain>
        <ButtonContain>
          <Button onClick={() => {
            update()
          }}>Guardar</Button>
        </ButtonContain>
      </ModalContain>
    </Modal>
  )
}
export default Modal1;