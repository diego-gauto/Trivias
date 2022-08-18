import React, { useEffect, useState } from "react";
import { getLevels } from "../../../../store/actions/RewardActions";

import {
  Circle,
  ContainLevel,
  Divisor,
  LevelContainer,
  LevelText,
} from "./RewardComp.styled";

const Points = ({ level, score }: any) => {


  const [levels, setLevels] = useState<any>([]);

  const getAllLevels = () => {
    getLevels().then((res) => {
      setLevels(res);
    })
  }
  useEffect(() => {
    getAllLevels();

  }, [])

  return (
    <>
      {
        levels.map((val: any, i: any) => {
          return (
            <LevelContainer key={"levels" + i}>
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
  )
}
export default Points;