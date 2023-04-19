import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { deleteProduct, updateRewards, updRewardImage } from "../../../../store/actions/RewardActions";
import { deleteRewardApi, updateRewardApi } from "../../../api/rewards";
import { CloseIcon } from "../../Category/Category.styled";

import {
  Button,
  ButtonContain,
  ButtonTransparent,
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
  const [reward, setReward] = useState<any>({
    title: '',
    about: '',
    image: '',
    product_type: 'fisico',
    type: 'points',
    published: 'publicado',
    month: 0,
    points: 0,
    price: 0
  });
  const [image, setImage] = useState<any>("");
  const [errors, setErrors] = useState<any>({
    title: false,
    about: false,
    image: false,
    month: false,
    points: false
  });
  const getImage = (file: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      setReward({ ...reward, image: reader.result })
      setImage(reader.result);
    };
  }
  const editReward = async () => {
    if (reward.type === "points") {
      reward.month = 0;
    }
    if (reward.type == "months") {
      reward.points = 0;
    }
    let tempErrors = {
      title: reward.title === "" ? true : false,
      about: reward.about === "" ? true : false,
      image: reward.image === "" ? true : false,
      month: reward.type === "months" ? (reward.month === 0 ? true : false) : false,
      points: reward.type === "points" ? (reward.points === 0 ? true : false) : false,
    }
    if (image !== "") {
      await updRewardImage(image, reward.id).then((res) => {
        reward.image = res;
      })
    }
    setErrors(tempErrors)
    let checkErrors = Object.values(tempErrors).includes(true);
    if (!checkErrors) {
      updateRewardApi(reward).then(() => {
        handleClose();
        handleEvent();
      })
    }
  }
  const deleteReward = (reward: any) => {
    if (confirm("Desea eliminar esta recompensa?")) {
      deleteRewardApi(reward).then((res) => {
        handleClose();
        handleEvent();
      })
    }
  }

  useEffect(() => {
    setReward({ ...data });

  }, [data])

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
            style={errors.title ? { border: "1px solid red" } : {}}
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
            style={errors.about ? { border: "1px solid red" } : {}}
            defaultValue={data.about}
            onChange={(e: any) => {
              setReward({ ...reward, about: e.target.value })
            }}
          />
        </InputContain>
        <InputContain>
          <Label>Producto</Label>
          <select value={reward?.product_type} onChange={(e) => { setReward({ ...reward, product_type: e.target.value }) }}>
            <option value="fisico">Fisico</option>
            <option value="digital">Digital</option>
          </select>
        </InputContain>
        <InputContain>
          <Label>Tipo</Label>
          <select value={reward.type} onChange={(e) => { setReward({ ...reward, type: e.target.value }) }}>
            <option value="points">Puntos</option>
            <option value="months">Tiempo</option>
          </select>
        </InputContain>
        <InputContain>
          <Label>Publicado</Label>
          <select onChange={(e) => { setReward({ ...reward, published: e.target.value }) }}>
            <option value="publicado">Publicado</option>
            <option value="no-publicado">No Publicado</option>
          </select>
        </InputContain>
        {
          reward.type == "points" && <InputContain>
            <Label>Puntos</Label>
            <Input placeholder="7"
              defaultValue={data.points}
              style={errors.points ? { border: "1px solid red" } : {}}
              onChange={(e: any) => {
                setReward({ ...reward, points: parseInt(e.target.value) })
              }} />
          </InputContain>
        }
        {
          reward.type == "months" &&
          <InputContain>
            <Label>Meses</Label>
            <Input placeholder="7"
              defaultValue={data.months}
              style={errors.month ? { border: "1px solid red" } : {}}
              onChange={(e: any) => {
                setReward({ ...reward, months: parseInt(e.target.value) })
              }} />
          </InputContain>
        }
        <InputContain>
          <Label>Precio</Label>
          <Input placeholder="7"
            style={errors.points ? { border: "1px solid red" } : {}}
            onChange={(e: any) => {
              setReward({ ...reward, price: parseInt(e.target.value) })
            }} />
        </InputContain>
        <InputContain>
          <Label>Imagen del Producto</Label>
          <IconContain>
            <Folder />
            <input
              className="input-file"
              type="file"
              placeholder="Seleccionar archivo"
              onChange={(e) => { getImage(e.target.files) }}>
            </input>
          </IconContain>
        </InputContain>
        <ButtonContain>
          <ButtonTransparent onClick={() => {
            deleteReward(reward)
          }}
          >Eliminar</ButtonTransparent>
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