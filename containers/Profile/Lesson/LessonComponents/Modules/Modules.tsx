import router from 'next/router'
import React, { useEffect, useState } from 'react'
import About from './About'
import Comments from './Comments'
import HomeWork from './HomeWork'
import { MainContainer } from './Module.styled'

const Modules = ({ data, user, season, lesson, teacherCreds, courseIds, handleClick, course }: any) => {
  const { admin }: any = router.query;
  const [position, setPosition] = useState(1)

  useEffect(() => {
    if (admin) {
      setPosition(4)
    }
  }, [])

  return (
    <MainContainer>
      {
        position === 1
          ? <About value={position} setValue={setPosition} data={data} teacherCreds={teacherCreds} course={course} /> :
          position === 3
            ? <HomeWork handleClick={handleClick} value={position} setValue={setPosition} data={data} user={user} season={season} lesson={lesson} courseIds={courseIds} /> :
            position === 4
              ? <Comments value={position} setValue={setPosition} data={data} user={user} course={course} season={season} lesson={lesson} />
              : <About value={position} setValue={setPosition} data={data} teacherCreds={teacherCreds} course={course} />
      }
    </MainContainer>
  )
}
export default Modules