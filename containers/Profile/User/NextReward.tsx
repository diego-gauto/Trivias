

import Link from "next/link";

import {
  AddPay,
  ArrowRight,
  CompleteBar,
  Currentlvl,
  DataTitle,
  Nextlvl,
  Pointbox,
  PointsBox,
  PolygonDown,
  ProgressBar1,
  RewardBox,
  RewardContain,
  RewardData,
  RewardImage,
  RewardInfo,
  RewardParagraph,
  RewardPoints,
  RewardTitle,
  RewardTitleBox,
  UserPoints,
  VectorLeft,
  VectorRight,
} from "./User.styled";

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