import React, { useEffect, useState } from "react";
import { getTimeLevels } from "../../../../store/actions/RewardActions";

import {
  Circle,
  ContainLevel,
  Divisor,
  LevelText,
  LevelContainer
} from "./Times.styled";

const Times = ({ rewards, score, level, currentLevel, levels }: any) => {

  console.log(level);

  return (

    <>
      {
        levels.map((val: any, i: any) => {
          return (
            <LevelContainer key={"levels" + i} i={i} level={currentLevel} size={levels.length - 1}>
              <ContainLevel>
                <Circle val={i} level={level.index} />
                <LevelText val={i} level={level.index}>
                  Nivel {i + 1} <br /> {val.minimum} {i == 0 ? "mes" : "meses"}
                </LevelText>
              </ContainLevel>
              <Divisor
                min={val.minimum}
                i={i}
                size={levels.length - 1}
                level={level.index}
                score={score}
                max={val.maximum}
              />
            </LevelContainer>
          )
        })
      }
    </>

  )
}
export default Times;