import Image from 'next/image';
import React, { useState } from 'react'
import SideBar from '../SideBar';
import { AdminContain } from '../SideBar.styled';
import Prize from './Prizes/Prize';
import { Banner, Container, ImageContain, InputContain, PriceContain, PriceTitle, RewardContain, Tab, Title, TitleContain } from './Rewards.styled';
import Points from './Rewards/Points';
import Request from './Rewards/Request';
import Time from './Rewards/Time';
const Rewards = () => {

  const [place, setPlace] = useState("points");
  return (
    <AdminContain>
      <SideBar />
      <RewardContain>
        <ImageContain>
          <Banner
            src="/images/Rewards/banner.png"
            layout="fill"
            priority
          />
        </ImageContain>
        <TitleContain>
          <Title>Centro de Recompensas</Title>
        </TitleContain>
        <Container>
          {place == "points" && <Points setPlace={setPlace} />}
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