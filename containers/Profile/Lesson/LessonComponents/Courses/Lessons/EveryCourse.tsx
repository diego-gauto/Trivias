import React from 'react'
import { CourseLength, CoursePoints, CourseTitle, CurrentCircle, CurrentCourse, CurrentDivider, DetailContain, Details, DividerComplete, DividerIncomplete, IncompleteCircle, LessonContain, ProgressCircle } from './EveryCourse.styled';

const EveryCourse = () => {
  return (
    <>
      <LessonContain>
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
        <ProgressCircle>
          <DividerComplete />
        </ProgressCircle>
        <Details>
          <CourseTitle>
            02: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </CourseTitle>
          <DetailContain>
            <CourseLength>
              5 minutos
            </CourseLength>
            <CoursePoints>
              +100 puntos
            </CoursePoints>
          </DetailContain>
        </Details>
      </LessonContain>

      <LessonContain>
        <ProgressCircle>
          <DividerComplete />
        </ProgressCircle>
        <Details>
          <CourseTitle>
            03: Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam          </CourseTitle>
          <DetailContain>
            <CourseLength>
              15 minutos
            </CourseLength>
            <CoursePoints>
              +400 puntos
            </CoursePoints>
          </DetailContain>
        </Details>
      </LessonContain>

      <LessonContain>
        <ProgressCircle>
          <DividerComplete />
        </ProgressCircle>
        <Details>
          <CourseTitle>
            04: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </CourseTitle>
          <DetailContain>
            <CourseLength>
              8 minutos
            </CourseLength>
            <CoursePoints>
              +200 puntos
            </CoursePoints>
          </DetailContain>
        </Details>
      </LessonContain>

      <LessonContain>
        <ProgressCircle>
          <CurrentDivider />
        </ProgressCircle>
        <Details>
          <CourseTitle>
            05: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </CourseTitle>
          <DetailContain>
            <CourseLength>
              5 minutos
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
      </LessonContain>

      <LessonContain>
        <IncompleteCircle>
          <DividerIncomplete />
        </IncompleteCircle>
        <Details>
          <CourseTitle>
            07: Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam
          </CourseTitle>
          <DetailContain>
            <CourseLength>
              15 minutos
            </CourseLength>
          </DetailContain>
        </Details>
      </LessonContain>

      <LessonContain>
        <IncompleteCircle>
          <DividerIncomplete />
        </IncompleteCircle>
        <Details>
          <CourseTitle>
            08: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </CourseTitle>
          <DetailContain>
            <CourseLength>
              5 minutos
            </CourseLength>
          </DetailContain>
        </Details>
      </LessonContain>

      <LessonContain>
        <IncompleteCircle>
          <DividerIncomplete />
        </IncompleteCircle>
        <Details>
          <CourseTitle>
            09: Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam
          </CourseTitle>
          <DetailContain>
            <CourseLength>
              15 minutos
            </CourseLength>
          </DetailContain>
        </Details>
      </LessonContain>

      <LessonContain>
        <IncompleteCircle>
        </IncompleteCircle>
        <Details>
          <CourseTitle>
            10: Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam
          </CourseTitle>
          <DetailContain>
            <CourseLength>
              10 minutos
            </CourseLength>
          </DetailContain>
        </Details>
      </LessonContain>

    </>
  )
}
export default EveryCourse;