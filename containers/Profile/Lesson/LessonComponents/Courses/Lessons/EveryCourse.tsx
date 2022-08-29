import { useRouter } from 'next/router';
import React from 'react'
import { CourseLength, CoursePoints, CourseTitle, CurrentCircle, CurrentCourse, CurrentDivider, DetailContain, Details, DividerComplete, DividerIncomplete, IncompleteCircle, LessonContain, ProgressCircle } from './EveryCourse.styled';

const EveryCourse = ({ id, lessons, season }: any) => {
  const router = useRouter()

  const goTo = (lIndex: any) => {
    router.push({
      pathname: 'Lesson',
      query: { id: id, season: season, lesson: lIndex },
    });
  }
  return (
    <>
      {lessons.map((less: any, index: any) => {
        return (
          <LessonContain onClick={() => {
            goTo(index)
          }}>
            <IncompleteCircle>
              <DividerIncomplete />
            </IncompleteCircle>
            <Details>
              <CourseTitle>
                {index + 1}: {less.title}.
                <br></br>
                <br></br>
              </CourseTitle>
              <DetailContain>
                <CourseLength>
                  5 minutos
                </CourseLength>
                <CoursePoints>
                  +{less.points} puntos
                </CoursePoints>
              </DetailContain>
            </Details>
          </LessonContain>
        )
      })}

      {/* <LessonContain>
        <ProgressCircle>
          <DividerComplete />
        </ProgressCircle>
        <Details>
          <CourseTitle>
            01: Bienvenida y presentación del curso de uñas con técnica express
          </CourseTitle>
          <DetailContain>
            <CourseLength>
              10 minutos
            </CourseLength>
            <CoursePoints>
              +200 puntos
            </CoursePoints>
          </DetailContain>
        </Details>
      </LessonContain>

      <LessonContain>
        <CurrentCircle>
          <DividerIncomplete />
        </CurrentCircle>
        <Details>
          <CurrentCourse>
            06: Bienvenida y presentación del curso de uñas con técnica express
          </CurrentCourse>
          <DetailContain>
            <CourseLength style={{ fontWeight: 600 }}>
              10 minutos
            </CourseLength>
          </DetailContain>
        </Details>
      </LessonContain> */}
    </>
  )
}
export default EveryCourse;