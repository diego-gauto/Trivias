import React from "react";

import {
  Circle,

  ContainLevel,
  Divisor,
  LevelText,
} from "./RewardComp.styled";

const Points = ({ level, levels }: any) => {
  return (
    <>
      {
        levels.map((val: any, i: any) => {
          return (
            <>
              <ContainLevel>
                <Circle />
                <LevelText >
                  Nivel {val.name} <br /> {val.maximum + 1} puntos
                </LevelText>
              </ContainLevel>
              <Divisor />
              {/* <Divisor val={val} i={i + 1} size={levels.length} /> */}
            </>
          )
        })
      }
    </>
  )


}
export default Points;