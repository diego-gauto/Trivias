

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
import Modal2 from "./Modal1/Modal2";

const PointPrizes = () => {

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleShow1 = () => setShow1(true);
  const handleShow2 = () => setShow2(true);

  return (
    <MainContainer>
      <TitleClaim>
        Premios por reclamar
      </TitleClaim>
      <AllPrizes>
        <PrizeContain >
          <PrizeImage onClick={handleShow1}>
            <Image src="/images/GonvarReward1.png" width={150} height={150} />
          </PrizeImage>
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
          <PrizeImage onClick={handleShow2}>
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
      <Modal1 show={show1} setShow={setShow1} />
      <Modal2 show={show2} setShow={setShow2} />
    </MainContainer>
  )
}
export default PointPrizes;