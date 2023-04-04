import React, { useEffect, useState } from 'react'
import About from './About'
import Comments from './Comments'
import Extra from './Extra'
import HomeWork from './HomeWork'
import { MainContainer } from './Module.styled'

const Modules = ({ data, user, season, lesson, teacherCreds, courseIds }: any) => {

  const [position, setPosition] = useState(1)

  return (
    <MainContainer>
      {
        position === 1
          ? <About value={position} setValue={setPosition} data={data} teacherCreds={teacherCreds} /> :
          position === 3
            ? <HomeWork value={position} setValue={setPosition} data={data} user={user} season={season} lesson={lesson} courseIds={courseIds} /> :
            position === 4
        // ? <Comments value={position} setValue={setPosition} data={data} user={user} />
        // : <About value={position} setValue={setPosition} user={user} />
      }
    </MainContainer>
  )
}
export default Modules