import React from "react";

import {
  Circle,

  ContainLevel,
  Divisor,
  LevelContainer,
  LevelText,
} from "./RewardComp.styled";

const Points = ({ level, levels }: any) => {
  return (
    <>
      {
        levels.map((val: any, i: any) => {
          return (
            <LevelContainer key={"levels" + val.name}>
              <ContainLevel>
                <Circle val={val.minimum} level={level.minimum} />
                <LevelText val={val.minimum} level={level.minimum}>
                  Nivel {val.name} <br /> {val.maximum + 1} puntos
                </LevelText>
              </ContainLevel>
              <Divisor val={val.minimum} i={i + 1} size={levels.length} level={level.minimum} />
            </LevelContainer>
          )
        })
      }
    </>
  )


}
export default Points;