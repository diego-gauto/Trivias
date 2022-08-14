

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

const PointRewards = ({ setRewards, level, levels, score }: any) => {

  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });

  return (
    <>
      <MainContain>
        <Container>
          <MainTitle>
            {responsive1023 ? "Por Puntuaje" : "Recompensas por Puntuaje"}
          </MainTitle>
        </Container>
        <OffContainer onClick={() => { setRewards(false) }}>
          <MainTitle>
            {responsive1023 ? "Por Tiempo" : "Recompensas por Tiempo"}
          </MainTitle>
        </OffContainer>
      </MainContain>
      <RewardContainer style={{ borderRadius: responsive1023 ? "" : "0 10px 10px 10px" }}>
        <Points
          level={level}
          levels={levels}
          score={score}
        />
      </RewardContainer>
      <PointPrizes />
    </>
  )
}
export default PointRewards