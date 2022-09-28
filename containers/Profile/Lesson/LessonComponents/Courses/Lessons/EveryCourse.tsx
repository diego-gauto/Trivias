import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { CourseLength, DocIcon, CoursePoints, CourseTitle, CurrentCircle, CurrentCourse, CurrentDivider, DetailContain, Details, DividerComplete, DividerIncomplete, IncompleteCircle, LessonContain, ProgressCircle } from './EveryCourse.styled';

const EveryCourse = ({ id, lessons, season, data, userId, course }: any) => {
  const router = useRouter();

  const goTo = (lIndex: any, less: any) => {
    let tempIndex;
    let lastIndex;
    let tempPreviousSeason;
    if (userId && lIndex > 0) {
      tempIndex = lessons[lIndex - 1].progress.findIndex((x: any) => x.id == userId);
    }
    if (userId && lIndex == 0) {
      if (season > 0) {
        tempPreviousSeason = course.seasons[season - 1].lessons[course.seasons[season - 1].lessons.length - 1];
        lastIndex = tempPreviousSeason.progress.findIndex((x: any) => x.id == userId);
      }
    }
    if (season == 0 && lIndex == 0 ||
      season == 0 && lIndex > 0 && lessons[lIndex - 1].homeworkAvailable && "progress" in lessons[lIndex - 1] && lessons[lIndex - 1].progress[tempIndex] && lessons[lIndex - 1].progress[tempIndex].status ||
      season == 0 && lIndex > 0 && !lessons[lIndex - 1].homeworkAvailable && "progress" in lessons[lIndex - 1] && lessons[lIndex - 1].progress[tempIndex] ||
      season > 0 && lIndex == 0 && tempPreviousSeason.homeworkAvailable && "progress" in tempPreviousSeason && tempPreviousSeason.progress[lastIndex] && tempPreviousSeason.progress[lastIndex].status ||
      season > 0 && lIndex == 0 && !tempPreviousSeason.homeworkAvailable && "progress" in tempPreviousSeason && tempPreviousSeason.progress[lastIndex] ||
      season > 0 && lIndex > 0 && lessons[lIndex - 1].homeworkAvailable && "progress" in lessons[lIndex - 1] && lessons[lIndex - 1].progress[tempIndex] && lessons[lIndex - 1].progress[tempIndex].status ||
      season > 0 && lIndex > 0 && !lessons[lIndex - 1].homeworkAvailable && "progress" in lessons[lIndex - 1] && lessons[lIndex - 1].progress[tempIndex]
    ) {
      router.push({
        pathname: 'Lesson',
        query: { id: id, season: season, lesson: lIndex },
      });
    }
    // if (season == 0 && lIndex > 0 && lessons[lIndex - 1].homeworkAvailable && "progress" in lessons[lIndex - 1] && lessons[lIndex - 1].progress[tempIndex] && lessons[lIndex - 1].progress[tempIndex].status) {
    //   router.push({
    //     pathname: 'Lesson',
    //     query: { id: id, season: season, lesson: lIndex },
    //   });
    // }
    // if (season == 0 && lIndex > 0 && !lessons[lIndex - 1].homeworkAvailable && "progress" in lessons[lIndex - 1] && lessons[lIndex - 1].progress[tempIndex]) {
    //   router.push({
    //     pathname: 'Lesson',
    //     query: { id: id, season: season, lesson: lIndex },
    //   });
    // }
    // if (season > 0 && lIndex == 0 && tempPreviousSeason.homeworkAvailable && "progress" in tempPreviousSeason && tempPreviousSeason.progress[lastIndex] && tempPreviousSeason.progress[lastIndex].status) {
    //   router.push({
    //     pathname: 'Lesson',
    //     query: { id: id, season: season, lesson: lIndex },
    //   });
    // }
    // if (season > 0 && lIndex == 0 && !tempPreviousSeason.homeworkAvailable && "progress" in tempPreviousSeason && tempPreviousSeason.progress[lastIndex]) {
    //   router.push({
    //     pathname: 'Lesson',
    //     query: { id: id, season: season, lesson: lIndex },
    //   });
    // }
    // if (season > 0 && lIndex > 0 && lessons[lIndex - 1].homeworkAvailable && "progress" in lessons[lIndex - 1] && lessons[lIndex - 1].progress[tempIndex] && lessons[lIndex - 1].progress[tempIndex].status) {
    //   router.push({
    //     pathname: 'Lesson',
    //     query: { id: id, season: season, lesson: lIndex },
    //   });
    // }
    // if (season > 0 && lIndex > 0 && !lessons[lIndex - 1].homeworkAvailable && "progress" in lessons[lIndex - 1] && lessons[lIndex - 1].progress[tempIndex]) {
    //   router.push({
    //     pathname: 'Lesson',
    //     query: { id: id, season: season, lesson: lIndex },
    //   });
    // }
    conditionalDiv(less, lIndex)
  }
  const conditionalDiv = (less: any, index: number) => {
    let tempIndex;
    let lastIndex;
    let tempPreviousSeason;
    if (userId && index > 0 && lessons[index - 1].progress) {
      tempIndex = lessons[index - 1].progress.findIndex((x: any) => x.id == userId);
    }
    if (userId && index == 0 && season > 0) {
      tempPreviousSeason = course.seasons[season - 1].lessons[course.seasons[season - 1].lessons.length - 1];
      if (tempPreviousSeason.progress) {
        lastIndex = tempPreviousSeason.progress.findIndex((x: any) => x.id == userId);
      }
    }
    if (season == 0 && index == 0 ||
      season == 0 && index > 0 && lessons[index - 1].homeworkAvailable && "progress" in lessons[index - 1] && lessons[index - 1].progress[tempIndex] && lessons[index - 1].progress[tempIndex].status ||
      season == 0 && index > 0 && !lessons[index - 1].homeworkAvailable && "progress" in lessons[index - 1] && lessons[index - 1].progress[tempIndex] ||
      season > 0 && index == 0 && tempPreviousSeason.homeworkAvailable && "progress" in tempPreviousSeason && tempPreviousSeason.progress[lastIndex] && tempPreviousSeason.progress[lastIndex].status ||
      season > 0 && index == 0 && !tempPreviousSeason.homeworkAvailable && "progress" in tempPreviousSeason && tempPreviousSeason.progress[lastIndex] ||
      season > 0 && index > 0 && lessons[index - 1].homeworkAvailable && "progress" in lessons[index - 1] && lessons[index - 1].progress[tempIndex] && lessons[index - 1].progress[tempIndex].status ||
      season > 0 && index > 0 && !lessons[index - 1].homeworkAvailable && "progress" in lessons[index - 1] && lessons[index - 1].progress[tempIndex]
    ) {
      return (<Details style={{ cursor: 'pointer' }} onClick={() => {
        goTo(index, less)
      }}>
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
      </Details>)
    }
    return (<Details style={{ 'background': '#d6d4d499', borderRadius: '5px', cursor: 'auto' }}>
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
    </Details>)
  }

  return (
    <>
      {lessons.map((less: any, index: any) => {
        return (
          <LessonContain>
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
            {conditionalDiv(less, index)}
          </LessonContain>
        )
      })}
    </>
  )
}
export default EveryCourse;