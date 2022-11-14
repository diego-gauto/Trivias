

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
  ProgressBar2,
  RewardBox,
  RewardCenterLink,
  RewardCenterLinkNoReward,
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
import { getRewards, getTimeRewards } from "../../../store/actions/ProfileActions";
import { getTimeLevel } from "../../../store/actions/RewardActions";

const NextReward = ({ score, barProgress, level, timeIndex, timeProgress, timeLevel }: any) => {
  const [reward, setReward] = useState(false);
  const [prize, setPrize] = useState<any>([]);
  const [timePrize, setTimePrize] = useState<any>([]);
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
  const getNextTimeReward = async () => {
    getTimeRewards().then(async (res) => {
      const timeLevels = await getTimeLevel()
      let tempRewards: any;
      tempRewards = res.filter((data: any) => (data.month >= timeLevels[timeIndex]?.minimum && data.month < timeLevels[timeIndex].maximum));
      setTimePrize(tempRewards[0]);
    })
  }

  useEffect(() => {
    getNextReward();
  }, [])

  useEffect(() => {
    if (timeLevel) {
      getNextTimeReward()
    }
  }, [timeLevel])

  const rewardCenter = (
    <Link href="/Rewards">
      <RewardCenterLink>
        Ir al Centro de Recompensas
        <ArrowRight />
      </RewardCenterLink>
    </Link>
  )

  const rewardCenterNoReward = (
    <Link href="/Rewards">
      <RewardCenterLinkNoReward>
        Ir al Centro de Recompensas
        <ArrowRight />
      </RewardCenterLinkNoReward>
    </Link>
  )

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
                level - 1
              }
            </Currentlvl>
            <CompleteBar>
              <ProgressBar1 barProgress={barProgress}>
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
          {rewardCenter}
        </>
      }
      {
        reward == true &&
        <>
          <Pointbox>
            <Currentlvl>
              {timeLevel}
            </Currentlvl>
            <CompleteBar>
              <ProgressBar2 barProgress={timeProgress}>
                <PointsBox>
                  <UserPoints style={{ display: responsive470 ? "none" : "" }}>

                  </UserPoints>
                  <PolygonDown />
                </PointsBox>
              </ProgressBar2>
            </CompleteBar>
            <Nextlvl>
              {timeLevel + 1}
            </Nextlvl>
          </Pointbox>
          {timeLevel > 0 ? <RewardData>
            <ImageContain>
              <RewardImage src={timePrize.path} />
            </ImageContain>
            <RewardInfo>
              <RewardTitleBox>
                {timePrize.title}
              </RewardTitleBox>
              <RewardPoints>
                {
                  timePrize.month <= 1 ? timePrize.month + " mes" : timePrize.month + " meses"
                }
              </RewardPoints>
              <RewardParagraph>
                {timePrize.about}
              </RewardParagraph>
              {rewardCenter}
            </RewardInfo>
          </RewardData> :
            <>
              <p>No hay premios en este nivel...</p>
              {rewardCenterNoReward}
            </>
          }
        </>
      }
    </RewardContain>
  )
}
export default NextReward;