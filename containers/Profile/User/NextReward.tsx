import Link from 'next/link';
import React from 'react'
import { DataTitle, RewardBox, VectorLeft, RewardTitle, VectorRight, Pointbox, Currentlvl, CompleteBar, ProgressBar1, PointsBox, UserPoints, PolygonDown, Nextlvl, RewardData, RewardImage, RewardInfo, RewardTitleBox, RewardPoints, RewardParagraph, AddPay, ArrowRight, RewardContain } from './User.styled';

const NextReward = () => {
  return (
    <RewardContain>
      <DataTitle>
        Siguiente Recompensa...
      </DataTitle>
      <RewardBox>
        <VectorLeft />
        <RewardTitle>
          Recompensas por puntuaje
        </RewardTitle>
        <VectorRight />
      </RewardBox>
      <Pointbox>
        <Currentlvl>
          4
        </Currentlvl>
        <CompleteBar>
          <ProgressBar1>
            <PointsBox>
              <UserPoints>
                1,100
                <PolygonDown />
              </UserPoints>
            </PointsBox>
          </ProgressBar1>
        </CompleteBar>
        <Nextlvl>
          5
        </Nextlvl>
      </Pointbox>
      <RewardData>
        <RewardImage />
        <RewardInfo>
          <RewardTitleBox>
            2 Monómeros Gonval
          </RewardTitleBox>
          <RewardPoints>
            1,500 puntos
          </RewardPoints>
          <RewardParagraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus ultrices id feugiat cursus velit. Aliquam pulvinar in orci malesuada.
          </RewardParagraph>
        </RewardInfo>
      </RewardData>
      <Link href="/Screens/Rewards">
        <AddPay>
          Ir al Centro de Recompensas
          <ArrowRight />
        </AddPay>
      </Link>
    </RewardContain>
  )
}
export default NextReward;