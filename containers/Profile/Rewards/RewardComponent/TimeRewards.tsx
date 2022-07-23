

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

const TimeRewards = ({ setRewards }: any) => {
  const responsive870 = useMediaQuery({ query: "(max-width: 870px)" });
  return (
    <>
      <MainContain>
        <OffContainer onClick={() => { setRewards(true) }}>
          <MainTitle>
            {responsive870 ? "Por Puntuaje" : "Recompensas por Puntuaje"}
          </MainTitle>
        </OffContainer>
        <Container>
          <MainTitle>
            {responsive870 ? "Por Tiempo" : "Recompensas por Tiempo"}
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