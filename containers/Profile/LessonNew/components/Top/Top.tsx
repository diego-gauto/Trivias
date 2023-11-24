import React, { useEffect, useState } from "react";
import { MainContainer, TextColor } from "./Top.styled";
import { returnLevel } from "../../utils/functions";
import { ICourseResponse } from "../../../../../interfaces/ICourseNew";

interface ITop {
  course: ICourseResponse,
}

const Top = (props: ITop) => {
  const { course } = props;

  return (
    <MainContainer>
      <h2>{course.title}</h2>
      <p>Un curso de <span>{course.professors[0]!.name}</span></p>
      <div className='level-container'>
        <img src={returnLevel(course.difficulty)} alt="" />
        <TextColor level={course.difficulty}>{course.difficulty}</TextColor>
      </div>
    </MainContainer>
  )
}
export default Top;