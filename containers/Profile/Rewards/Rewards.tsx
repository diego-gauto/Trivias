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
  ProgressBackground,
  ProgressCircle,
  ProgressContain,
  ProgressSvg,
  RewardContainer,
  Vector,
  Vector2,
} from "./Rewards.styled";

const Rewards = () => {

  const [rewards, setRewards] = useState(true);
  const responsive560 = useMediaQuery({ query: "(max-width: 560px)" });
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });

  return (
    <RewardContainer>

      <BannerContain>
        <Banner
          src="/images/Rewards/banner.png"
          width={responsive560 ? "750" : "1900"}
          height={responsive560 ? "500" : "450"}
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
              <LevelContain>
                <CurrentLevel>
                  5
                </CurrentLevel>
                <Vector />
                <Vector2 />
              </LevelContain>
              <ProgressSvg width={responsive560 ? "96px" : "120px"} height={responsive560 ? "96px" : "120px"}>
                <ProgressBackground
                  cx={responsive560 ? "47.5" : "60"}
                  cy={responsive560 ? "47.5" : "60"}
                  r={responsive560 ? "42.5" : "55"}
                  stroke-linecap="round" />
                <ProgressCircle
                  cx={responsive560 ? "47.5" : "60"}
                  cy={responsive560 ? "47.5" : "60"}
                  r={responsive560 ? "42.5" : "55"}
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