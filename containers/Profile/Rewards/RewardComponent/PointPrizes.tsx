import Image from 'next/image';
import React from 'react'
import { AllPrizes, MainContainer, PrizeContain, PrizeImage, PrizeInfo, PrizeTitle, TitleClaim } from './ClaimPrizes.styled';

const PointPrizes = () => {
  return (
    <MainContainer>
      <TitleClaim>
        Premios por reclamar
      </TitleClaim>
      <AllPrizes>
        <PrizeContain>
          <PrizeImage>
            <Image src="/images/Rewards/reward2.png" width={250} height={250} />
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