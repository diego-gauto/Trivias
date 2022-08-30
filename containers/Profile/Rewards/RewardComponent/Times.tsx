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


  return (

    <>
      {
        levels.map((val: any, i: any) => {
          return (
            <LevelContainer key={"levels" + i} i={i + 1} level={currentLevel}>
              <Divisor
                min={val.minimum}
                i={i}
                size={levels.length - 1}
                level={level.minimum}
                score={score}
                max={val.maximum}
              />
              <ContainLevel>
                <Circle val={val.minimum} level={level.minimum} />
                <LevelText val={val.minimum} level={level.minimum}>
                  Nivel {i + 1} <br /> {val.maximum} {i == 0 ? "mes" : "meses"}
                </LevelText>
              </ContainLevel>
            </LevelContainer>
          )
        })
      }
    </>

  )
}
export default Times;