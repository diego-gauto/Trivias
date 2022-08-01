import React, { useState } from "react";

import { useMediaQuery } from "react-responsive";

import PointRewards from "./RewardComponent/PointRewards";
import TimeRewards from "./RewardComponent/TimeRewards";
import {
  Banner,
  BannerContain,
  BannerTitle,
  CurrentLevel,
  InnerProgress,
  InsideContain,
  LevelContain,
  MainContain,
  OuterProgress,
  PointsText,
  ProgressCircle,
  ProgressContain,
  ProgressSvg,
  RewardContainer,
  Vector,
  Vector2
} from "./Rewards.styled";

const Rewards = () => {

  const [rewards, setRewards] = useState(true);
  const responsive420 = useMediaQuery({ query: "(max-width: 420px)" });
  const responsive870 = useMediaQuery({ query: "(max-width: 870px)" });

  return (
    <RewardContainer>

      <BannerContain>
        <Banner
          src="/images/Rewards/banner.png"
          width={responsive420 ? "550" : "1900"}
          height={responsive420 ? "350" : "450"}
        />
        <InsideContain>
          <BannerTitle>
            Centro de Recompensas
          </BannerTitle>
          <ProgressContain>
            <PointsText>
              1,100 puntos
            </PointsText>
            <OuterProgress>
              <InnerProgress>
                <LevelContain>
                  <CurrentLevel>
                    5
                  </CurrentLevel>
                  <Vector />
                  <Vector2 />
                </LevelContain>
              </InnerProgress>
              <ProgressSvg width={responsive420 ? "96px" : "130px"} height={responsive420 ? "96px" : "130px"}>
                <ProgressCircle
                  cx={responsive420 ? "47.5" : "65"}
                  cy={responsive420 ? "47.5" : "65"}
                  r={responsive420 ? "42.5" : "60"}
                  stroke-linecap="round" />
              </ProgressSvg>
            </OuterProgress>
          </ProgressContain>
        </InsideContain>
      </BannerContain>
      <MainContain>
        {
          rewards
            ? <PointRewards setRewards={setRewards} />
            : <TimeRewards setRewards={setRewards} />
        }
      </MainContain>
    </RewardContainer>
  )
}
export default Rewards;