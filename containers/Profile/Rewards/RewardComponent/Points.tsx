import React from "react";

import {
  Circle,
  ContainLevel,
  Divisor,
  LevelContainer,
  LevelText,
} from "./RewardComp.styled";

const Points = ({ level, levels, score }: any) => {
  return (
    <>
      {
        levels.map((val: any, i: any) => {
          return (
            <LevelContainer key={"levels" + val.level}>
              <ContainLevel>
                <Circle val={val.minimum} level={level.minimum} />
                <LevelText val={val.minimum} level={level.minimum}>
                  Nivel {val.level} <br /> {val.maximum} puntos
                </LevelText>
              </ContainLevel>
              <Divisor min={val.minimum} i={i} size={levels.length - 1} level={level.minimum} name={level.level} score={score} max={val.maximum} />
            </LevelContainer>
          )
        })
      }
    </>
  )
}
export default Points;