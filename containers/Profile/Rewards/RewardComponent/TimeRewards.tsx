import React from 'react'
import { Container, MainContain, MainTitle, OffContainer, RewardContainer } from './RewardComp.styled';
import TimePrizes from './TimePrizes';
import Times from './Times';

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
        <Times />
      </RewardContainer>
      <TimePrizes />
    </>
  )
}
export default TimeRewards;