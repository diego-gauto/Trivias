import React, { useEffect, useState } from 'react'
import { ContainText, MainContainer, ProgressBar, ProgressBar2, ProgressContain, SeasonContain, SeasonSpan, SeasonText, Subtitle, TitleCourse } from './CourseProgress.styled';

const CourseProgress = ({ title, season, lesson, course, userId }: any) => {
  const [totalViewed, setTotalViewed] = useState(0)

  const checkLecture = () => {
    let tempViewd = 0;
    course?.seasons[season].lessons.forEach((element: any) => {
      if (element.users.includes(userId)) {
        tempViewd++;
      }
    });
    setTotalViewed(tempViewd);
  }
  useEffect(() => {
    if (course) {
      checkLecture()
    }
  }, [course])

  return (
    <MainContainer>
      <TitleCourse>
        Cursos de {title}
      </TitleCourse>
      <Subtitle>
        Temporada {parseInt(season) + 1}: Episodio {parseInt(lesson) + 1}
      </Subtitle>
      <ProgressContain>
        <ProgressBar2 />
        <ProgressBar progress={(totalViewed * 100) / course?.seasons[season].lessons.length} />
      </ProgressContain>
      <SeasonContain>
        <ContainText>
          <SeasonText>
            {Math.ceil((totalViewed * 100) / course?.seasons[season].lessons.length)}%
          </SeasonText>
          <SeasonSpan>
            temporada completada
          </SeasonSpan>
        </ContainText>
        {/* <ContainText>
          <SeasonText>
            1/3
          </SeasonText>
          <SeasonSpan>
            temporada completada
          </SeasonSpan>
        </ContainText> */}
      </SeasonContain>
    </MainContainer>
  )
}
export default CourseProgress;