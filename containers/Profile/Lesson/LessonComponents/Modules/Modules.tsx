import React, { useState } from 'react'
import About from './About'
import Comments from './Comments'
import Extra from './Extra'
import HomeWork from './HomeWork'
import { MainContainer } from './Module.styled'

const Modules = ({ }: any) => {

  const [position, setPosition] = useState(1)

  return (
    <MainContainer>
      {
        position === 1
          ? <About value={position} setValue={setPosition} /> :
          position === 2
            ? <Extra value={position} setValue={setPosition} /> :
            position === 3
              ? <HomeWork value={position} setValue={setPosition} /> :
              position === 4
                ? <Comments value={position} setValue={setPosition} />
                : <About value={position} setValue={setPosition} />
      }
    </MainContainer>
  )
}
export default Modules