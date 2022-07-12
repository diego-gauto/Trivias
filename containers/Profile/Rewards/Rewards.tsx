import React, { useState } from 'react'
import ClaimPrizes from './RewardComponent/PointPrizes';
import PointRewards from './RewardComponent/PointRewards';
import TimeRewards from './RewardComponent/TimeRewards';
import { Banner, BannerContain, BannerTitle, CurrentLevel, InnerProgress, InsideContain, LevelContain, OuterProgress, PointsText, ProgressCircle, ProgressContain, ProgressSvg, RewardContainer, UpNarrow, UpNarrow2 } from './Rewards.styled';

const Rewards = () => {

  const [rewards, setRewards] = useState(true);

  return (
    <RewardContainer>
      <BannerContain>
        <Banner
          src="/images/Rewards/banner.png"
          width={1400}
          height={350}
        />
        <InsideContain>
          <BannerTitle>
            Centro de recompensas
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
              <ProgressSvg width="130px" height="130px">
                <ProgressCircle cx="65" cy="65" r="60" stroke-linecap="round" />
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