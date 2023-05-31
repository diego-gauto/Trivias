import router from 'next/router'
import React, { useEffect, useState } from 'react'
import About from './About'
import Comments from './Comments'
import HomeWork from './HomeWork'
import { MainContainer } from './Module.styled'

const Modules = ({ data, blockForNextSeason, user, season, lesson, teacherCreds, courseIds, handleClick, course, previousLesson, nextLesson, firstLesson, lastLesson }: any) => {
  const { admin }: any = router.query;
  const [position, setPosition] = useState(1)
  console.log(user);
  console.log(course);
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
      {
        position === 1
          ? <About previousLesson={previousLesson} blockForNextSeason={blockForNextSeason} firstLesson={firstLesson} lastLesson={lastLesson} nextLesson={nextLesson} value={position} changeValue={changePosition} data={data} teacherCreds={teacherCreds} course={course} /> :
          position === 3
            ? <HomeWork previousLesson={previousLesson} blockForNextSeason={blockForNextSeason} nextLesson={nextLesson} firstLesson={firstLesson} lastLesson={lastLesson} course={course} handleClick={handleClick} value={position} changeValue={changePosition} data={data} user={user} season={season} lesson={lesson} courseIds={courseIds} /> :
            position === 4
              ? <Comments previousLesson={previousLesson} blockForNextSeason={blockForNextSeason} nextLesson={nextLesson} firstLesson={firstLesson} lastLesson={lastLesson} value={position} changeValue={changePosition} data={data} user={user} course={course} season={season} lesson={lesson} />
              : <About previousLesson={previousLesson} blockForNextSeason={blockForNextSeason} nextLesson={nextLesson} firstLesson={firstLesson} lastLesson={lastLesson} value={position} changeValue={changePosition} data={data} teacherCreds={teacherCreds} course={course} />
      }
    </MainContainer>
  )
}
export default Modules