import React from 'react'
import { Container, MainContain, MainTitle, OffContainer, RewardContainer, Circle1, Circle2 } from './RewardComp.styled';
import TimePrizes from './TimePrizes';

const TimeRewards = ({ setRewards }: any) => {
  return (
    <>
      <MainContain>
        <OffContainer onClick={() => { setRewards(true) }}>
          <MainTitle>
            Recompensas por Puntuaje
          </MainTitle>
        </OffContainer>
        <Container>
          <MainTitle>
            Recompensas por tiempo
          </MainTitle>
        </Container>
      </MainContain>
      <RewardContainer>
        <Circle1>

        </Circle1>
        <Circle2>

        </Circle2>
      </RewardContainer>
      <TimePrizes />
    </>
  )
}
export default TimeRewards;