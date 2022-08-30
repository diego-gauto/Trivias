

import { useMediaQuery } from "react-responsive";

import {
  Container,
  MainContain,
  MainTitle,
  OffContainer,
  RewardContainer,
} from "./RewardComp.styled";
import TimePrizes from "./TimePrizes";
import Times from "./Times";

const TimeRewards = ({ rewards, setRewards, scoreLevel, level, currentLevel, levels }: any) => {
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  return (
    <>
      <MainContain>
        <OffContainer onClick={() => { setRewards(true) }}>
          <MainTitle>
            {responsive1023 ? "Por Puntuaje" : "Recompensas por Puntuaje"}
          </MainTitle>
        </OffContainer>
        <Container>
          <MainTitle>
            {responsive1023 ? "Por Tiempo" : "Recompensas por Tiempo"}
          </MainTitle>
        </Container>
      </MainContain>
      <RewardContainer>
        <Times score={scoreLevel} level={level} currentLevel={currentLevel} rewards={rewards} levels={levels} />
      </RewardContainer>
      <TimePrizes />
    </>
  )
}
export default TimeRewards;