import React, { useState } from "react";

import Image from "next/image";

import {
  AllPrizes,
  MainContainer,
  PrizeContain,
  PrizeImage,
  PrizeInfo,
  PrizeTitle,
  TitleClaim,
} from "./ClaimPrizes.styled";
import Modal1 from "./Modal1/Modal1";

const TimePrizes = () => {

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  return (
    <MainContainer>
      <TitleClaim>
        Premios por reclamar
      </TitleClaim>
      <AllPrizes>
        <PrizeContain>
          <PrizeImage onClick={handleShow}>
            <Image src="/images/GonvarReward1.png" width={250} height={250} />
          </PrizeImage>
          <Modal1 show={show} setShow={setShow} />
          <PrizeTitle>
            Gonvar Nails Leonardo Da Vinci
          </PrizeTitle>
          <PrizeInfo>
            7 meses
          </PrizeInfo>
        </PrizeContain>
        <PrizeContain>
          <PrizeImage>
            <Image src="/images/Rewards/reward3.png" width={250} height={250} />
          </PrizeImage>
          <PrizeTitle>
            20% en una membresía
          </PrizeTitle>
          <PrizeInfo>
            9 meses
          </PrizeInfo>
        </PrizeContain>
      </AllPrizes>
    </MainContainer>
  )
}
export default TimePrizes;