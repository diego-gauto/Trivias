import React, { useEffect, useState } from "react";

import {
  Circle,
  CompleteCircle,
  CompleteDivisor,
  CompleteText,
  ContainLevel,
  Divisor,
  LevelText,
} from "./RewardComp.styled";

const Points = ({ userData, level, locked, unLocked }: any) => {



  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const data = localStorage.getItem("activeLvl");
    if (data) {
      setRows(JSON.parse(data));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("activeLvl", JSON.stringify(rows));
  });

  return (

    <>
      {
        unLocked.map((val: any) => {
          return (
            <>
              <ContainLevel>
                <CompleteCircle />
                <CompleteText >
                  Nivel {val.name} <br /> {val.maximum + 1} puntos
                </CompleteText>
              </ContainLevel>
              <CompleteDivisor />
            </>
          )
        })
      }
      <Divisor style={{ backgroundColor: 'white', border: '1px solid #8E2DE2' }} />
      <ContainLevel>
        <Circle id="activeLvl" style={{ width: 50, height: 50, border: '2px solid #8E2DE2' }} />
        <LevelText style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Montserrat', color: '#8E2DE2', bottom: 5 }}>
          Nivel {level.name} <br /> {level.maximum + 1} puntos
        </LevelText>
      </ContainLevel>
      {
        locked.map((val: any) => {
          return (
            <>
              <ContainLevel>
                <Circle />
                <LevelText >
                  Nivel {val.name} <br /> {val.maximum + 1} puntos
                </LevelText>
              </ContainLevel>
              <Divisor />
            </>
          )
        })
      }
    </>
  )


}
export default Points;