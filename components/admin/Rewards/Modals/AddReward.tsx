import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { addReward } from "../../../../store/actions/RewardActions";
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

const AddReward = ({ show, setShow, handleEvent }: any) => {
  const handleClose = () => setShow(false);
  const [reward, setReward] = useState<any>();
  const [type, setType] = useState("points");
  const [productType, setProductType] = useState("fisico");

  const getImage = (file: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      setReward({ ...reward, path: reader.result })
    };
  }

  const createReward = () => {
    let tempReward: any = {
      title: reward?.title || "",
      type: type,
      about: reward?.about || "",
      path: reward?.path || "",
      productType: productType
    }
    if (type == "points") {
      tempReward.points = reward?.points || "";
    } else if (type == "months") {
      tempReward.months = reward?.months || "";
    } else if (type == "certificates") {
      tempReward.certificates = reward?.certificates || ""
    }

    if (Object.keys(tempReward).some(key => tempReward[key] === '')) {
      alert("Complete todos los campos")
    } else {
      addReward(tempReward).then(() => {
        handleClose();
        handleEvent();
      })
    }
  }


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
          <Label>Producto</Label>
          <select onChange={(e) => { setProductType(e.target.value) }}>
            <option value="fisico">Fisico</option>
            <option value="digital">Digital</option>
          </select>
        </InputContain>
        <InputContain>
          <Label>Tipo</Label>
          <select onChange={(e) => { setType(e.target.value) }}>
            <option value="points">Puntos</option>
            <option value="months">Tiempo</option>
            <option value="certificates">Certificados</option>
          </select>
        </InputContain>
        {type == "points" && <InputContain>
          <Label>Puntos</Label>
          <Input placeholder="7"
            onChange={(e: any) => {
              setReward({ ...reward, points: parseInt(e.target.value) })
            }} />
        </InputContain>}
        {type == "months" && <InputContain>
          <Label>Meses</Label>
          <Input placeholder="7"
            onChange={(e: any) => {
              setReward({ ...reward, months: parseInt(e.target.value) })
            }} />
        </InputContain>}
        {type == "certificates" && <InputContain>
          <Label>Certificados</Label>
          <Input placeholder="7"
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
              createReward();
            }}
          >Guardar</Button>
        </ButtonContain>
      </ModalContain>
    </Modal>
  )
}
export default AddReward;