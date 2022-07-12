import React from 'react'
import { Circle, CompleteCircle, CompleteDivisor, CompleteText, ContainLevel, Divisor, LevelText } from './RewardComp.styled';


const Times = () => {
  let UserTime = 5;

  if (UserTime == 1) {
    return (
      <>
        <ContainLevel>
          <Circle style={{ width: 50, height: 50, border: '2px solid #8E2DE2' }} />
          <LevelText style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Montserrat', color: '#8E2DE2', bottom: 5 }}>
            Nivel 1 <br /> 1 mes
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 2 <br /> 2 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 3 <br /> 3 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 4 <br /> 6 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 5 <br /> 9 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 6 <br /> 12 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 7 <br /> 18 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 8 <br /> 24 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 9 <br /> 36 meses
          </LevelText>
        </ContainLevel>
      </>
    )
  }
  if (UserTime == 2) {
    return (
      <>
        <ContainLevel>
          <CompleteCircle />
          <CompleteText>
            Nivel 1 <br /> 1 mes
          </CompleteText>
        </ContainLevel>
        <Divisor style={{ backgroundColor: 'white', border: '1px solid #8E2DE2' }} />
        <ContainLevel>
          <Circle style={{ width: 50, height: 50, border: '2px solid #8E2DE2' }} />
          <LevelText style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Montserrat', color: '#8E2DE2', bottom: 5 }}>
            Nivel 2 <br /> 2 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 3 <br /> 3 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 4 <br /> 6 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 5 <br /> 9 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 6 <br /> 12 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 7 <br /> 18 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 8 <br /> 24 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 9 <br /> 36 meses
          </LevelText>
        </ContainLevel>
      </>
    )
  }
  if (UserTime == 3) {
    return (
      <>
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 1 <br /> 1 mes
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText>
            Nivel 2 <br /> 2 meses
          </CompleteText>
        </ContainLevel>
        <Divisor style={{ backgroundColor: 'white', border: '1px solid #8E2DE2' }} />
        <ContainLevel>
          <Circle style={{ width: 50, height: 50, border: '2px solid #8E2DE2' }} />
          <LevelText style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Montserrat', color: '#8E2DE2', bottom: 5 }}>
            Nivel 3 <br /> 3 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 4 <br /> 6 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 5 <br /> 9 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 6 <br /> 12 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 7 <br /> 18 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 8 <br /> 24 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 9 <br /> 36 meses
          </LevelText>
        </ContainLevel>
      </>
    )
  }
  if (UserTime == 4) {
    return (
      <>
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 1 <br /> 1 mes
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText>
            Nivel 2 <br /> 2 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 3 <br /> 3 meses
          </CompleteText>
        </ContainLevel>
        <Divisor style={{ backgroundColor: 'white', border: '1px solid #8E2DE2' }} />
        <ContainLevel>
          <Circle style={{ width: 50, height: 50, border: '2px solid #8E2DE2' }} />
          <LevelText style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Montserrat', color: '#8E2DE2', bottom: 5 }}>
            Nivel 4 <br /> 6 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 5 <br /> 9 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 6 <br /> 12 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 7 <br /> 18 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 8 <br /> 24 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 9 <br /> 36 meses
          </LevelText>
        </ContainLevel>
      </>
    )
  }
  if (UserTime == 5) {
    return (
      <>
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 1 <br /> 1 mes
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText>
            Nivel 2 <br /> 2 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 3 <br /> 3 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 4 <br /> 6 meses
          </CompleteText>
        </ContainLevel>
        <Divisor style={{ backgroundColor: 'white', border: '1px solid #8E2DE2' }} />
        <ContainLevel>
          <Circle style={{ width: 50, height: 50, border: '2px solid #8E2DE2' }} />
          <LevelText style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Montserrat', color: '#8E2DE2', bottom: 5 }}>
            Nivel 5 <br /> 9 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 6 <br /> 12 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 7 <br /> 18 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 8 <br /> 24 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 9 <br /> 36 meses
          </LevelText>
        </ContainLevel>
      </>
    )
  }
  if (UserTime == 6) {
    return (
      <>
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 1 <br /> 1 mes
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText>
            Nivel 2 <br /> 2 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 3 <br /> 3 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 4 <br /> 6 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 5 <br /> 9 meses
          </CompleteText>
        </ContainLevel>
        <Divisor style={{ backgroundColor: 'white', border: '1px solid #8E2DE2' }} />
        <ContainLevel>
          <Circle style={{ width: 50, height: 50, border: '2px solid #8E2DE2' }} />
          <LevelText style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Montserrat', color: '#8E2DE2', bottom: 5 }}>
            Nivel 6 <br /> 12 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 7 <br /> 18 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 8 <br /> 24 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 9 <br /> 36 meses
          </LevelText>
        </ContainLevel>
      </>
    )
  }
  if (UserTime == 7) {
    return (
      <>
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 1 <br /> 1 mes
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText>
            Nivel 2 <br /> 2 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 3 <br /> 3 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 4 <br /> 6 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 5 <br /> 9 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 6 <br /> 12 meses
          </CompleteText>
        </ContainLevel>
        <Divisor style={{ backgroundColor: 'white', border: '1px solid #8E2DE2' }} />
        <ContainLevel>
          <Circle style={{ width: 50, height: 50, border: '2px solid #8E2DE2' }} />
          <LevelText style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Montserrat', color: '#8E2DE2', bottom: 5 }}>
            Nivel 7 <br /> 18 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 8 <br /> 24 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 9 <br /> 36 meses
          </LevelText>
        </ContainLevel>
      </>
    )
  }
  if (UserTime == 8) {
    return (
      <>
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 1 <br /> 1 mes
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText>
            Nivel 2 <br /> 2 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 3 <br /> 3 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 4 <br /> 6 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 5 <br /> 9 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 6 <br /> 12 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 7 <br /> 18 meses
          </CompleteText>
        </ContainLevel>
        <Divisor style={{ backgroundColor: 'white', border: '1px solid #8E2DE2' }} />
        <ContainLevel>
          <Circle style={{ width: 50, height: 50, border: '2px solid #8E2DE2' }} />
          <LevelText style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Montserrat', color: '#8E2DE2', bottom: 5 }}>
            Nivel 8 <br /> 24 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 9 <br /> 36 meses
          </LevelText>
        </ContainLevel>
      </>
    )
  }
  if (UserTime == 9) {
    return (
      <>
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 1 <br /> 1 mes
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText>
            Nivel 2 <br /> 2 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 3 <br /> 3 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 4 <br /> 6 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 5 <br /> 9 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 6 <br /> 12 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 7 <br /> 18 meses
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 8 <br /> 24 meses
          </CompleteText>
        </ContainLevel>
        <Divisor style={{ backgroundColor: 'white', border: '1px solid #8E2DE2' }} />
        <ContainLevel>
          <Circle style={{ width: 50, height: 50, border: '2px solid #8E2DE2' }} />
          <LevelText style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Montserrat', color: '#8E2DE2', bottom: 5 }}>
            Nivel 9 <br /> 36 meses
          </LevelText>
        </ContainLevel>
      </>
    )
  }
  else {
    return (
      <>
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 1 <br /> 1 mes
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 2 <br /> 2 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 3 <br /> 3 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 4 <br /> 6 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 5 <br /> 9 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 6 <br /> 12 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 7 <br /> 18 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 8 <br /> 24 meses
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 9 <br /> 36 meses
          </LevelText>
        </ContainLevel>
      </>
    )
  }

}
export default Times;