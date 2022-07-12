import React from 'react'
import PointPrizes from './PointPrizes'
import Points from './Points'
import { Container, MainContain, MainTitle, OffContainer, RewardContainer } from './RewardComp.styled'

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
        <Points />
      </RewardContainer>
      <PointPrizes />
    </>
  )
}
export default PointRewards