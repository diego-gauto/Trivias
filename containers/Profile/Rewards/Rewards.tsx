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
  OuterProgress,
  PointsText,
  ProgressCircle,
  ProgressContain,
  ProgressSvg,
  RewardContainer,
  UpNarrow,
  UpNarrow2,
} from "./Rewards.styled";

const Rewards = () => {

  const [rewards, setRewards] = useState(true);
  const responsive870 = useMediaQuery({ query: "(max-width: 870px)" });

  return (
    <RewardContainer>
      <BannerContain>
        <Banner
          src="/images/Rewards/banner.png"
          width={responsive870 ? "420" : "1900"}
          height={responsive870 ? "272" : "450"}
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
                  <UpNarrow />
                  <UpNarrow2 />
                </LevelContain>
              </InnerProgress>
              <ProgressSvg width={responsive870 ? "96px" : "130px"} height={responsive870 ? "96px" : "130px"}>
                <ProgressCircle
                  cx={responsive870 ? "47.5" : "65"}
                  cy={responsive870 ? "47.5" : "65"}
                  r={responsive870 ? "42.5" : "60"}
                  stroke-linecap="round" />
              </ProgressSvg>
            </OuterProgress>
          </ProgressContain>
        </InsideContain>
      </BannerContain>
      {
        rewards
          ? <PointRewards setRewards={setRewards} />
          : <TimeRewards setRewards={setRewards} />
      }
    </RewardContainer>
  )
}
export default Rewards;