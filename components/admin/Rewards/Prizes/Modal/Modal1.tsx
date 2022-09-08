import { useEffect, useState } from "react";

import { Modal } from "react-bootstrap";

import { deletePointPrize, updateRewards } from "../../../../../store/actions/RewardActions";
import { CloseIcon } from "../../../Users/UserData/UsersCardData.styled";
import {
  Button,
  ButtonContain,
  ButtonTransparent,
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

const Modal1 = ({ show, setShow, data }: any) => {

  const [open, setOpen] = useState(false);
  const [reward, setReward] = useState<any>({ data })
  const getImage = (file: any) => {
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
    }
  }
  const deletePrize = (reward: any) => {
    deletePointPrize(reward)
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
              setReward({ ...reward, points: parseInt(e.target.value) })
            }}
          />
        </InputContain>
        <SelectContain>
          <Label>Tipo</Label>
          <Selected
            onClick={() => { setOpen(!open) }}
          >
            {
              reward.type
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
            <Input2>
              <input
                type="file"
                placeholder="Seleccionar archivo"
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e) => { getImage(e.target.files) }}>
              </input>
            </Input2>
          </IconContain>
        </InputContain>
        <ButtonContain>
          <ButtonTransparent onClick={() => {
            deletePrize(reward)
          }}
          >Eliminar</ButtonTransparent>
          <Button onClick={() => {
            update()
          }}>Guardar</Button>
        </ButtonContain>
      </ModalContain>
    </Modal>
  )
}
export default Modal1;