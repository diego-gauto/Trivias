import React, { useEffect, useState } from "react";

import router from "next/router";

import About from "./About";
import Comments from "./Comments";
import HomeWork from "./HomeWork";
import { MainContainer, TitleContain } from "./Module.styled";
import Help from "./Help";
import ModuleTabs from "./ModuleTabs/ModuleTabs";

interface IModules {
  data: any,
  blockForNextSeason: any,
  user: any,
  lesson: any,
  teacherCreds: any,
  courseIds: any,
  handleClick: any,
  course: any,
  previousLesson: any,
  nextLesson: any,
  firstLesson: any,
  lastLesson: any,
}
const Modules = (props: IModules) => {
  const { data, blockForNextSeason, user, lesson, teacherCreds, courseIds, handleClick, course, previousLesson, nextLesson, firstLesson, lastLesson } = props;
  const { admin }: any = router.query;
  const [position, setPosition] = useState(1)
  const changePosition = (value: number) => {
    setPosition(value);
  }
  useEffect(() => {
    if (admin) {
      setPosition(4)
    }
  }, [])

  return (
    <MainContainer>
      <TitleContain>
        <ModuleTabs data={data} user={user} value={position} blockForNextSeason={blockForNextSeason} changeValue={changePosition} nextLesson={nextLesson} previousLesson={previousLesson} course={course} firstLesson={firstLesson} lastLesson={lastLesson} />
        <div className='line'></div>
      </TitleContain>
      {
        position === 1
          ? <About data={data} teacherCreds={teacherCreds} course={course} /> :
          position === 3
            ? <HomeWork handleClick={handleClick} data={data} user={user} lesson={lesson} courseIds={courseIds} /> :
            position === 4
              ? <Comments data={data} user={user} course={course} lesson={lesson} /> :
              position === 5
                ? <Help />
                : <About data={data} teacherCreds={teacherCreds} course={course} />
      }
    </MainContainer>
  )
}
export default Modules