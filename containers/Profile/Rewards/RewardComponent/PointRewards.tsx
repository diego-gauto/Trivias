import React from 'react'
import PointPrizes from './PointPrizes'
import { Circle1, Container, MainContain, MainTitle, OffContainer, RewardContainer } from './RewardComp.styled'

const PointRewards = ({ setRewards }: any) => {

  return (
    <>
      <MainContain>
        <Container>
          <MainTitle>
            Recompensas por Puntuaje
          </MainTitle>
        </Container>
        <OffContainer onClick={() => { setRewards(false) }}>
          <MainTitle>
            Recompensas por tiempo
          </MainTitle>
        </OffContainer>
      </MainContain>
      <RewardContainer>
        <Circle1>
        </Circle1>
      </RewardContainer>

      <PointPrizes />
    </>
  )
}
export default PointRewards