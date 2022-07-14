import React from 'react'
import { ContainText, MainContainer, ProgressBar, ProgressBar2, ProgressContain, SeasonContain, SeasonSpan, SeasonText, Subtitle, TitleCourse } from './CourseProgress.styled';

const CourseProgress = () => {
  return (
    <MainContainer>
      <TitleCourse>
        Cursos de Uñas Francesas
      </TitleCourse>
      <Subtitle>
        Temporada 1: Episodio 6
      </Subtitle>
      <ProgressContain>
        <ProgressBar2 />
        <ProgressBar />
      </ProgressContain>
      <SeasonContain>
        <ContainText>
          <SeasonText>
            50%
          </SeasonText>
          <SeasonSpan>
            temporada completada
          </SeasonSpan>
        </ContainText>
        <ContainText>
          <SeasonText>
            1/3
          </SeasonText>
          <SeasonSpan>
            temporada completada
          </SeasonSpan>
        </ContainText>
      </SeasonContain>
    </MainContainer>
  )
}
export default CourseProgress;