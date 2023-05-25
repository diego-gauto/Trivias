import React from 'react'
import { MainContain } from '../../screens/Styles.styled';
import Trivias from '../../components/Trivias/Trivias';
const TriviaScreen = () => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <Trivias></Trivias>

    </MainContain>
  )
}
export default TriviaScreen;