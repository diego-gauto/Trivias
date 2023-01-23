import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { addReward, deleteTimePrize, updateRewards } from "../../../../store/actions/RewardActions";
import { CloseIcon } from "../../Category/Category.styled";

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
} from "./AddReward.styled";

const EditReward = ({ show, setShow, handleEvent, data }: any) => {
  const handleClose = () => setShow(false);
  const [reward, setReward] = useState<any>();
  const [type, setType] = useState("points");
  const [productType, setProductType] = useState("fisico");

  const getImage = (file: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      setReward({ ...reward, format: reader.result })
    };
  }
  const editReward = () => {
    console.log(reward);

    // updateRewards(reward, reward.id).then(() => {
    //   handleClose();
    //   handleEvent();
    // })
  }
  const deletePrize = (reward: any) => {
    deleteTimePrize(reward)
  }

  useEffect(() => {
    setReward({ ...data });
    setProductType(data.productType);
    setType(data.type);

  }, [data])

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
            defaultValue={data.title}
            onChange={(e: any) => {
              setReward({ ...reward, title: e.target.value })
            }}
          />
        </InputContain>
        <InputContain>
          <Label>Descripción</Label>
          <InputBig
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Tellus ultrices id feugiat cursus velit. Aliquam pulvinar in orci 
          malesuada. Pellentesque aliquam aliquam nulla sodales tortor pretium 
          aliquet ultricies. Interdum et suspendisse nunc gravida. "
            defaultValue={data.about}
            onChange={(e: any) => {
              setReward({ ...reward, about: e.target.value })
            }}
          />
        </InputContain>
        <InputContain>
          <Label>Producto</Label>
          <select value={productType} onChange={(e) => { setProductType(e.target.value) }}>
            <option value="fisico">Fisico</option>
            <option value="digital">Digital</option>
          </select>
        </InputContain>
        <InputContain>
          <Label>Tipo</Label>
          <select value={type} onChange={(e) => { setType(e.target.value) }}>
            <option value="points">Puntos</option>
            <option value="months">Tiempo</option>
            <option value="certificates">Certificados</option>
          </select>
        </InputContain>
        {type == "points" && <InputContain>
          <Label>Puntos</Label>
          <Input placeholder="7"
            defaultValue={data.points}
            onChange={(e: any) => {
              setReward({ ...reward, points: parseInt(e.target.value) })
            }} />
        </InputContain>}
        {type == "months" && <InputContain>
          <Label>Meses</Label>
          <Input placeholder="7"
            defaultValue={data.months}
            onChange={(e: any) => {
              setReward({ ...reward, months: parseInt(e.target.value) })
            }} />
        </InputContain>}
        {type == "certificates" && <InputContain>
          <Label>Certificados</Label>
          <Input placeholder="7"
            defaultValue={data.certificates}
            onChange={(e: any) => {
              setReward({ ...reward, certificates: parseInt(e.target.value) })
            }} />
        </InputContain>}
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
              editReward();
            }}
          >Guardar</Button>
        </ButtonContain>
      </ModalContain>
    </Modal>
  )
}
export default EditReward;