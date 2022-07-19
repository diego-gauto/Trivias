import React from 'react'
import { Circle, CompleteCircle, CompleteDivisor, CompleteText, ContainLevel, Divisor, LevelText } from './RewardComp.styled';


const Points = () => {
  let UserPoints = 600;

  if (UserPoints >= 100 && UserPoints <= 399) {
    return (
      <>
        <ContainLevel>
          <Circle style={{ width: 50, height: 50, border: '2px solid #8E2DE2' }} />
          <LevelText style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Montserrat', color: '#8E2DE2', bottom: 5 }}>
            Nivel 1 <br /> 100 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 2 <br /> 400 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 3 <br /> 800 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 4 <br /> 1,000 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 5 <br /> 2,000 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 6 <br /> 3,500 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 7 <br /> 4,800 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 8 <br /> 6,000 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 9 <br /> 8,000 puntos
          </LevelText>
        </ContainLevel>
      </>
    )
  }
  if (UserPoints >= 400 && UserPoints <= 799) {
    return (
      <>
        <ContainLevel>
          <CompleteCircle />
          <CompleteText>
            Nivel 1 <br /> 100 puntos
          </CompleteText>
        </ContainLevel>
        <Divisor style={{ backgroundColor: 'white', border: '1px solid #8E2DE2' }} />
        <ContainLevel>
          <Circle style={{ width: 50, height: 50, border: '2px solid #8E2DE2' }} />
          <LevelText style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Montserrat', color: '#8E2DE2', bottom: 5 }}>
            Nivel 2 <br /> 400 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 3 <br /> 800 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 4 <br /> 1,000 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 5 <br /> 2,000 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 6 <br /> 3,500 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 7 <br /> 4,800 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 8 <br /> 6,000 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 9 <br /> 8,000 puntos
          </LevelText>
        </ContainLevel>
      </>
    )
  }
  if (UserPoints >= 800 && UserPoints <= 999) {
    return (
      <>
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 1 <br /> 100 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText>
            Nivel 2 <br /> 400 puntos
          </CompleteText>
        </ContainLevel>
        <Divisor style={{ backgroundColor: 'white', border: '1px solid #8E2DE2' }} />
        <ContainLevel>
          <Circle style={{ width: 50, height: 50, border: '2px solid #8E2DE2' }} />
          <LevelText style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Montserrat', color: '#8E2DE2', bottom: 5 }}>
            Nivel 3 <br /> 800 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 4 <br /> 1,000 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 5 <br /> 2,000 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 6 <br /> 3,500 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 7 <br /> 4,800 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 8 <br /> 6,000 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 9 <br /> 8,000 puntos
          </LevelText>
        </ContainLevel>
      </>
    )
  }
  if (UserPoints >= 1000 && UserPoints <= 1999) {
    return (
      <>
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 1 <br /> 100 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText>
            Nivel 2 <br /> 400 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 3 <br /> 800 puntos
          </CompleteText>
        </ContainLevel>
        <Divisor style={{ backgroundColor: 'white', border: '1px solid #8E2DE2' }} />
        <ContainLevel>
          <Circle style={{ width: 50, height: 50, border: '2px solid #8E2DE2' }} />
          <LevelText style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Montserrat', color: '#8E2DE2', bottom: 5 }}>
            Nivel 4 <br /> 1,000 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 5 <br /> 2,000 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 6 <br /> 3,500 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 7 <br /> 4,800 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 8 <br /> 6,000 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 9 <br /> 8,000 puntos
          </LevelText>
        </ContainLevel>
      </>
    )
  }
  if (UserPoints >= 2000 && UserPoints <= 3499) {
    return (
      <>
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 1 <br /> 100 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText>
            Nivel 2 <br /> 400 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 3 <br /> 800 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 4 <br /> 1,000 puntos
          </CompleteText>
        </ContainLevel>
        <Divisor style={{ backgroundColor: 'white', border: '1px solid #8E2DE2' }} />
        <ContainLevel>
          <Circle style={{ width: 50, height: 50, border: '2px solid #8E2DE2' }} />
          <LevelText style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Montserrat', color: '#8E2DE2', bottom: 5 }}>
            Nivel 5 <br /> 2,000 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 6 <br /> 3,500 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 7 <br /> 4,800 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 8 <br /> 6,000 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 9 <br /> 8,000 puntos
          </LevelText>
        </ContainLevel>
      </>
    )
  }
  if (UserPoints >= 3500 && UserPoints <= 4799) {
    return (
      <>
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 1 <br /> 100 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText>
            Nivel 2 <br /> 400 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 3 <br /> 800 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 4 <br /> 1,000 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 5 <br /> 2,000 puntos
          </CompleteText>
        </ContainLevel>
        <Divisor style={{ backgroundColor: 'white', border: '1px solid #8E2DE2' }} />
        <ContainLevel>
          <Circle style={{ width: 50, height: 50, border: '2px solid #8E2DE2' }} />
          <LevelText style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Montserrat', color: '#8E2DE2', bottom: 5 }}>
            Nivel 6 <br /> 3,500 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 7 <br /> 4,800 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 8 <br /> 6,000 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 9 <br /> 8,000 puntos
          </LevelText>
        </ContainLevel>
      </>
    )
  }
  if (UserPoints >= 4800 && UserPoints <= 5999) {
    return (
      <>
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 1 <br /> 100 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText>
            Nivel 2 <br /> 400 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 3 <br /> 800 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 4 <br /> 1,000 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 5 <br /> 2,000 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 6 <br /> 3,500 puntos
          </CompleteText>
        </ContainLevel>
        <Divisor style={{ backgroundColor: 'white', border: '1px solid #8E2DE2' }} />
        <ContainLevel>
          <Circle style={{ width: 50, height: 50, border: '2px solid #8E2DE2' }} />
          <LevelText style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Montserrat', color: '#8E2DE2', bottom: 5 }}>
            Nivel 7 <br /> 4,800 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 8 <br /> 6,000 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 9 <br /> 8,000 puntos
          </LevelText>
        </ContainLevel>
      </>
    )
  }
  if (UserPoints >= 6000 && UserPoints <= 7999) {
    return (
      <>
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 1 <br /> 100 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText>
            Nivel 2 <br /> 400 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 3 <br /> 800 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 4 <br /> 1,000 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 5 <br /> 2,000 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 6 <br /> 3,500 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 7 <br /> 4,800 puntos
          </CompleteText>
        </ContainLevel>
        <Divisor style={{ backgroundColor: 'white', border: '1px solid #8E2DE2' }} />
        <ContainLevel>
          <Circle style={{ width: 50, height: 50, border: '2px solid #8E2DE2' }} />
          <LevelText style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Montserrat', color: '#8E2DE2', bottom: 5 }}>
            Nivel 8 <br /> 6,000 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 9 <br /> 8,000 puntos
          </LevelText>
        </ContainLevel>
      </>
    )
  }
  if (UserPoints >= 8000) {
    return (
      <>
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 1 <br /> 100 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText>
            Nivel 2 <br /> 400 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 3 <br /> 800 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 4 <br /> 1,000 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 5 <br /> 2,000 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 6 <br /> 3,500 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 7 <br /> 4,800 puntos
          </CompleteText>
        </ContainLevel>
        <CompleteDivisor />
        <ContainLevel>
          <CompleteCircle />
          <CompleteText >
            Nivel 8 <br /> 6,000 puntos
          </CompleteText>
        </ContainLevel>
        <Divisor style={{ backgroundColor: 'white', border: '1px solid #8E2DE2' }} />
        <ContainLevel>
          <Circle style={{ width: 50, height: 50, border: '2px solid #8E2DE2' }} />
          <LevelText style={{ fontSize: 16, fontWeight: 600, fontFamily: 'Montserrat', color: '#8E2DE2', bottom: 5 }}>
            Nivel 9 <br /> 8,000 puntos
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
            Nivel 1 <br /> 100 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 2 <br /> 400 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 3 <br /> 800 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 4 <br /> 1,000 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 5 <br /> 2,000 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 6 <br /> 3,500 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 7 <br /> 4,800 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 8 <br /> 6,000 puntos
          </LevelText>
        </ContainLevel>
        <Divisor />
        <ContainLevel>
          <Circle />
          <LevelText>
            Nivel 9 <br /> 8,000 puntos
          </LevelText>
        </ContainLevel>
      </>
    )
  }

}
export default Points;