import React from "react";

import {
  Circle,
  ContainLevel,
  Divisor,
  LevelText,
} from "./RewardComp.styled";

const Times = () => {
  let UserTime = 5;
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

  const currentLevel = document.querySelector("#activeLvl");
  currentLevel?.scrollIntoView({ inline: "center", block: "end" });

  return (
    <></>
  )
}
export default Times;