

import { useMediaQuery } from "react-responsive";

import Link from "next/link";

import {
  AddPay,
  ArrowRight,
  CompleteBar,
  Currentlvl,
  DataTitle,
  ImageContain,
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
import { useEffect, useState } from "react";
import { getRewards } from "../../../store/actions/ProfileActions";
import Image from "next/image";

const NextReward = ({ score, barProgress, level, max }: any) => {
  const [reward, setReward] = useState(false);
  const [prize, setPrize] = useState<any>([]);
  const responsive470 = useMediaQuery({ query: "(max-width: 470px)" });

  const getNextReward = () => {
    getRewards().then((res) => {
      res = res.filter((data: any) => (data.points > score));
      if (res[0] == null) {
        setPrize([])
      }
      else {
        setPrize(res[0])
      }
    })
  }

  useEffect(() => {
    getNextReward();
  }, [])

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
              {
                score > max ? level : level - 1
              }
            </Currentlvl>
            <CompleteBar>
              <ProgressBar1 barProgress={barProgress} reward={reward}>
                <PointsBox>
                  <UserPoints style={{ display: responsive470 ? "none" : "" }}>
                    {score}
                  </UserPoints>
                  <PolygonDown />
                </PointsBox>
              </ProgressBar1>
            </CompleteBar>
            <Nextlvl>
              {
                level
              }
            </Nextlvl>
          </Pointbox>
          <RewardData>
            <ImageContain>
              <RewardImage src={prize.path} />
            </ImageContain>
            <RewardInfo>
              <RewardTitleBox>
                {prize.title}
              </RewardTitleBox>
              <RewardPoints>
                {prize.points} puntos
              </RewardPoints>
              <RewardParagraph>
                {prize.about}
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
              <ProgressBar1 barProgress={barProgress} reward={reward}>
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
            {/* <RewardImage /> */}
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