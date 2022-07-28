

import { useMediaQuery } from "react-responsive";

import PointPrizes from "./PointPrizes";
import Points from "./Points";
import {
  Container,
  MainContain,
  MainTitle,
  OffContainer,
  RewardContainer,
} from "./RewardComp.styled";

const PointRewards = ({ setRewards }: any) => {

  const responsive870 = useMediaQuery({ query: "(max-width: 870px)" });

  return (
    <>
      <MainContain>
        <Container>
          <MainTitle>
            {responsive870 ? "Por Puntuaje" : "Recompensas por Puntuaje"}
          </MainTitle>
        </Container>
        <OffContainer onClick={() => { setRewards(false) }}>
          <MainTitle>
            {responsive870 ? "Por Tiempo" : "Recompensas por Tiempo"}
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