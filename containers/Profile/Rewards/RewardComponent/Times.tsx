import React, { useEffect, useState } from "react";
import { getTimeLevels } from "../../../../store/actions/RewardActions";

import {
  Circle,
  ContainLevel,
  Divisor,
  LevelText,
  LevelContainer
} from "./RewardComp.styled";

const Times = () => {
  const [levels, setLevels] = useState<any>()

  const getLevels = () => {
    getTimeLevels().then(res => {
      setLevels(res)
    })
  }
  useEffect(() => {
    getLevels();
  }, [])

  return (
    <>
      {/* {
        levels.length > 0 &&
        <>
          {
            levels.map((val: any, i: any) => {
              return (
                <LevelContainer key={"levels" + i} i={i} level={level.level} levels={val.level}>
                  <Divisor min={val.minimum} i={i} size={levels.length - 1} level={level.minimum} score={score} max={val.maximum} />
                  <ContainLevel>
                    <Circle val={val.minimum} level={level.minimum} />
                    <LevelText val={val.minimum} level={level.minimum}>
                      Nivel {i + 1} <br /> {val.maximum} puntos
                    </LevelText>
                  </ContainLevel>
                </LevelContainer>
              )
            })
          }
        </>
      } */}
    </>
  )
}
export default Times;