

import { useMediaQuery } from "react-responsive";

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
import { useState } from "react";

const NextReward = () => {
  const [reward, setReward] = useState(false);

  const responsive470 = useMediaQuery({ query: "(max-width: 470px)" });

  return (
    <RewardContain>
      <DataTitle>
        Siguiente Recompensa...
      </DataTitle>
      <RewardBox>
        <VectorLeft onClick={() => { setReward(!reward) }} />
        {
          reward == false &&
          <RewardTitle>
            Recompensas por puntuaje
          </RewardTitle>
        }
        {
          reward == true &&
          <RewardTitle>
            Recompensas por tiempo
          </RewardTitle>
        }
        <VectorRight onClick={() => { setReward(!reward) }} />
      </RewardBox>
      {
        reward == false &&
        <>
          <Pointbox>
            <Currentlvl>
              4
            </Currentlvl>
            <CompleteBar>
              <ProgressBar1 style={{ width: "30%" }}>
                <PointsBox>
                  <UserPoints style={{ display: responsive470 ? "none" : "" }}>
                    1,100
                  </UserPoints>
                  <PolygonDown />
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
        </>
      }
      {
        reward == true &&
        <>
          <Pointbox>
            <Currentlvl>
              4
            </Currentlvl>
            <CompleteBar>
              <ProgressBar1 style={{ width: "40%" }}>
                <PointsBox>
                  <UserPoints style={{ display: responsive470 ? "none" : "" }}>
                    8 meses
                  </UserPoints>
                  <PolygonDown />
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
                20% en una membresía
              </RewardTitleBox>
              <RewardPoints>
                9 meses
              </RewardPoints>
              <RewardParagraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus ultrices id feugiat cursus velit. Aliquam pulvinar in orci malesuada.
              </RewardParagraph>
            </RewardInfo>
          </RewardData>
        </>
      }

      <Link href="/Rewards">
        <AddPay>
          Ir al Centro de Recompensas
          <ArrowRight />
        </AddPay>
      </Link>
    </RewardContain>
  )
}
export default NextReward;