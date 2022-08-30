import React, { useEffect, useState } from "react";

import { getBanner, updateBanner } from "../../../store/actions/RewardActions";
import SideBar from "../SideBar";
import { AdminContain } from "../SideBar.styled";
import Prize from "./Prizes/Prize";
import {
  ButtonPosition,
  Container,
  ImageContain,
  PriceContain,
  PriceTitle,
  RewardContain,
  Title,
  TitleContain,
} from "./Rewards.styled";
import Points from "./Rewards/Points";
import Request from "./Rewards/Request";
import Time from "./Rewards/Time";

const Rewards = () => {

  const [place, setPlace] = useState("points");
  const [banner, setBanner] = useState<any>({
    path: "",
  })
  const [image, setImage] = useState<any>()

  const getRewardBanner = () => {
    getBanner().then((res) => {
      setImage(res?.path)
      setBanner(res);
      console.log(res);
    })
  }

  const update = () => {
    updateBanner(banner);
  }
  const getImage = (file: any) => {
    console.log(file)
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      setImage(reader.result)
      setBanner({ ...banner, format: reader.result })
    };
  }
  console.log(banner.path)

  useEffect(() => {
    console.log('hola')
    getRewardBanner();
  }, [])
  return (
    <AdminContain>
      <SideBar />
      <RewardContain>
        <ImageContain>
          <img src={image} />
        </ImageContain>
        <TitleContain>
          <Title >Centro de Recompensas</Title>
        </TitleContain>
        <ButtonPosition >
          <label htmlFor="input">
            Seleccionar Imagen
            <input
              type="file"
              id="input"
              onChange={(e) => { getImage(e.target.files) }}
            />
          </label>
          {
            banner.path != ""
              ?
              <button onClick={() => { update() }}>
                Guardar
              </button>
              : <></>
          }
        </ButtonPosition>
        <Container>
          {place == "points" && <Points setPlace={setPlace} place={place} />}
          {place == "time" && <Time setPlace={setPlace} />}
          {place == "request" && <Request setPlace={setPlace} />}
        </Container>
        {
          (place == "points" || place == "time") &&
          <PriceContain>
            <PriceTitle>Precios por reclamar</PriceTitle>
            <Prize />
          </PriceContain>
        }

      </RewardContain>
    </AdminContain>
  )
}
export default Rewards;