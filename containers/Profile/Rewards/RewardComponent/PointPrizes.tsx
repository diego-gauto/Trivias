

import { useState } from "react";

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

const PointPrizes = () => {

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <MainContainer>
      <TitleClaim>
        Premios por reclamar
      </TitleClaim>
      <AllPrizes>
        <PrizeContain >
          <PrizeImage onClick={handleShow}>
            <Image src="/images/Rewards/reward2.png" width={250} height={250} />
          </PrizeImage>
          <Modal1 show={show} setShow={setShow} />
          <PrizeTitle>
            Gonvar Nails Leonardo Da Vinci
          </PrizeTitle>
          <PrizeInfo>
            1,100 puntos
          </PrizeInfo>
        </PrizeContain>
        <PrizeContain>
          <PrizeImage>
            <Image src="/images/Rewards/reward1.png" width={250} height={250} />
          </PrizeImage>
          <PrizeTitle>
            2 Monómeros Gonval
          </PrizeTitle>
          <PrizeInfo>
            1,500 puntos
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
            2,000 puntos
          </PrizeInfo>
        </PrizeContain>
      </AllPrizes>
    </MainContainer>
  )
}
export default PointPrizes;