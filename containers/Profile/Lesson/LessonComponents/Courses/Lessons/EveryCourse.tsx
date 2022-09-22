import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { CourseLength, DocIcon, CoursePoints, CourseTitle, CurrentCircle, CurrentCourse, CurrentDivider, DetailContain, Details, DividerComplete, DividerIncomplete, IncompleteCircle, LessonContain, ProgressCircle } from './EveryCourse.styled';

const EveryCourse = ({ id, lessons, season, data, userId }: any) => {
  const router = useRouter();

  const goTo = (lIndex: any, idx: any) => {
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
            goTo(index, less.id)
          }}>
            {data?.id == less.id && <CurrentCircle>
              <DividerIncomplete />
            </CurrentCircle>
            }
            {(data?.id !== less.id && !less.users?.includes(userId)) && <IncompleteCircle>
              <DividerIncomplete />
            </IncompleteCircle>}
            {(less.users?.includes(userId) && data?.id !== less.id) &&
              <ProgressCircle>
                <DividerComplete />
              </ProgressCircle>
            }
            <Details>
              <CourseTitle active={data?.id == less.id}>
                {index + 1}: {less.title}.
                <br></br>
                <br></br>
              </CourseTitle>
              <DetailContain>
                <CourseLength>
                  5 minutos
                  {less.extra.length > 0 && <DocIcon></DocIcon>}
                </CourseLength>
                <CoursePoints>
                  +{less.points} puntos
                </CoursePoints>
              </DetailContain>
            </Details>
          </LessonContain>
        )
      })}
    </>
  )
}
export default EveryCourse;