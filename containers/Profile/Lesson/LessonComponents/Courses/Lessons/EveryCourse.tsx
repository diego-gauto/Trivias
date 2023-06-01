import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { CourseLength, DocIcon, CoursePoints, CourseTitle, CurrentCircle, CurrentCourse, CurrentDivider, DetailContain, Details, DividerComplete, DividerIncomplete, IncompleteCircle, LessonContain, ProgressCircle } from './EveryCourse.styled';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { DOWNLOAD_MATERIAL, HW_ICON } from '../../../../../../utils/Constants';

const EveryCourse = ({ lessons, season, data, userId, course }: any) => {

  const router = useRouter();

  const hms = (totalSeconds: any) => {
    if (typeof totalSeconds == 'string') return totalSeconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    let result = `${minutes
      .toString()
      .padStart(1, '0')} min`;
    if (!!hours) {
      result = `${hours.toString()} hr ${minutes} min`;
    }
    return result;
  }
  const goTo = (lIndex: any, less: any) => {
    let tempIndex;
    let lastIndex;
    let tempPreviousSeason;
    return router.push({
      pathname: 'Lesson',
      query: { id: course.id, season: season, lesson: lIndex },
    })
    // if (course.type == "Gratis" || !course.courseHomeWork) {
    //   return router.push({
    //     pathname: 'Lesson',
    //     query: { id: id, season: season, lesson: lIndex },
    //   })
    // }
    // if (userId) {
    //   if (userId && lIndex > 0) {
    //     tempIndex = lessons[lIndex - 1].progress.findIndex((x: any) => x.id == userId);
    //   }
    //   if (userId && lIndex == 0) {
    //     if (season > 0) {
    //       tempPreviousSeason = course.seasons[season - 1].lessons[course.seasons[season - 1].lessons.length - 1];
    //       lastIndex = tempPreviousSeason.progress.findIndex((x: any) => x.id == userId);
    //     }
    //   }
    //   if (season == 0 && lIndex == 0 ||
    //     season == 0 && lIndex > 0 && lessons[lIndex - 1].homeworkAvailable && "progress" in lessons[lIndex - 1] && lessons[lIndex - 1].progress[tempIndex] && lessons[lIndex - 1].progress[tempIndex].status ||
    //     season == 0 && lIndex > 0 && !lessons[lIndex - 1].homeworkAvailable && "progress" in lessons[lIndex - 1] && lessons[lIndex - 1].progress[tempIndex] ||
    //     season > 0 && lIndex == 0 && tempPreviousSeason.homeworkAvailable && "progress" in tempPreviousSeason && tempPreviousSeason.progress[lastIndex] && tempPreviousSeason.progress[lastIndex].status ||
    //     season > 0 && lIndex == 0 && !tempPreviousSeason.homeworkAvailable && "progress" in tempPreviousSeason && tempPreviousSeason.progress[lastIndex] ||
    //     season > 0 && lIndex > 0 && lessons[lIndex - 1].homeworkAvailable && "progress" in lessons[lIndex - 1] && lessons[lIndex - 1].progress[tempIndex] && lessons[lIndex - 1].progress[tempIndex].status ||
    //     season > 0 && lIndex > 0 && !lessons[lIndex - 1].homeworkAvailable && "progress" in lessons[lIndex - 1] && lessons[lIndex - 1].progress[tempIndex]
    //   ) {
    //     router.push({
    //       pathname: 'Lesson',
    //       query: { id: id, season: season, lesson: lIndex },
    //     });
    //   }
    // }
    // conditionalDiv(less, lIndex);
    // return 'okey';
  }
  const conditionalDiv = (less: any, index: number) => {
    console.log(less);
    let tempIndex;
    let lastIndex;
    let tempPreviousSeason;
    if (course.type == "Gratis" || course.sequential === 0) {
      return (<Details style={{ cursor: 'pointer' }} onClick={() => {
        goTo(index, less)
      }}>
        {<CourseTitle active={data?.id == less.id}>
          {"mandatory" in less ? "Quiz" : `Lección ${index + 1}.`} {less.title}.
        </CourseTitle>}
        <DetailContain>
          {
            less.homework === 1 &&
            <div className='activity'>
              <img src={HW_ICON} />
              Esta lección tiene una tarea
            </div>
          }
          {
            less.lesson_material.length > 0 &&
            <div className='activity'>
              <img src={DOWNLOAD_MATERIAL} />
              Esta lección tiene material descargable
            </div>
          }
          {!("mandatory" in less) &&
            <CourseLength>
              <AiOutlineClockCircle className='icon' />
              {hms(less.duration)}
              {/* {less.extra.length > 0 && <DocIcon></DocIcon>} */}
            </CourseLength>}
          {/* {less.points > 0 && <CoursePoints>
            +{less.points} puntos
          </CoursePoints>} */}
        </DetailContain>
      </Details>)
    }
    if (userId && index > 0 && lessons[index - 1].progress) {
      tempIndex = lessons[index - 1].progress.findIndex((x: any) => x.user_id == userId);
    }

    if (userId && index == 0 && season > 0) {
      tempPreviousSeason = course.seasons[season - 1].lessons[course.seasons[season - 1].lessons.length - 1];
      if (tempPreviousSeason.progress) {
        lastIndex = tempPreviousSeason.progress.findIndex((x: any) => x.user_id == userId);
      }
    }

    if (season == 0 && index == 0 ||
      season == 0 && index > 0 && lessons[index - 1].homework === 1 && "progress" in lessons[index - 1] && lessons[index - 1].progress[tempIndex] && lessons[index - 1].progress[tempIndex].status === 1 ||
      season == 0 && index > 0 && lessons[index - 1].homework === 0 && "progress" in lessons[index - 1] && lessons[index - 1].progress[tempIndex] ||
      // (season == 0 && index > 0 && lessons[index - 1].homework === 0 && "progress" in lessons[index - 1] && lessons[index - 1].progress[tempIndex]) && (season == 0 && index > 0 && lessons[index].homework === 0)
      season > 0 && index == 0 && tempPreviousSeason.homework === 1 && "progress" in tempPreviousSeason && tempPreviousSeason.progress[lastIndex] && tempPreviousSeason.progress[lastIndex].status === 1 ||
      season > 0 && index == 0 && tempPreviousSeason.homework === 0 && "progress" in tempPreviousSeason && tempPreviousSeason.progress[lastIndex] ||
      season > 0 && index > 0 && lessons[index - 1].homework === 1 && "progress" in lessons[index - 1] && lessons[index - 1].progress[tempIndex] && lessons[index - 1].progress[tempIndex].status === 1 ||
      season > 0 && index > 0 && lessons[index - 1].homework === 0 && "progress" in lessons[index - 1] && lessons[index - 1].progress[tempIndex]
    ) {
      return (<Details style={{ cursor: 'pointer' }} onClick={() => {
        goTo(index, less)
      }}>
        {<CourseTitle active={data?.id == less.id}>
          {"mandatory" in less ? "Quiz" : `Lección ${index + 1}.`} {less.title}.
        </CourseTitle>}
        <DetailContain>
          {
            less.homework === 1 &&
            <div className='activity'>
              <img src={HW_ICON} />
              Esta lección tiene una tarea
            </div>
          }
          {
            less.lesson_material.length > 0 &&
            <div className='activity'>
              <img src={DOWNLOAD_MATERIAL} />
              Esta lección tiene material descargable
            </div>
          }
          <CourseLength>
            <AiOutlineClockCircle />
            {hms(less.duration)}
            {/* {less.extra.length > 0 && <DocIcon></DocIcon>} */}
          </CourseLength>
          {/* {less.points > 0 && <CoursePoints>
            +{less.points} puntos
          </CoursePoints>} */}
        </DetailContain>
      </Details>)
    }
    return (<Details style={{ 'background': '#84848499', borderRadius: '5px', cursor: 'auto' }}>
      <CourseTitle active={data?.id == less.id}>
        {"mandatory" in less ? "Quiz" : `Lección ${index + 1}.`} {less.title}.
      </CourseTitle>
      <DetailContain>
        {
          less.homework === 1 &&
          <div className='activity'>
            <img src={HW_ICON} />
            Esta lección tiene una tarea
          </div>
        }
        {
          less.lesson_material.length > 0 &&
          <div className='activity'>
            <img src={DOWNLOAD_MATERIAL} />
            Esta lección tiene material descargable
          </div>
        }
        <CourseLength>
          <AiOutlineClockCircle />
          {hms(less.duration)}
          {/* {less.extra.length > 0 && <DocIcon></DocIcon>} */}
        </CourseLength>
        {/* {less.points > 0 && <CoursePoints>
          +{less.points} puntos
        </CoursePoints>} */}
      </DetailContain>
    </Details>)
  }

  return (
    <>
      {lessons.map((less: any, index: any) => {
        return (
          <LessonContain key={"All lesson " + index} style={{
            borderBottomRightRadius: index == lessons.length - 1 ? "35px" : 0,
            borderBottomLeftRadius: index == lessons.length - 1 ? "35px" : 0,
            boxShadow: index == lessons.length - 1 ? "0px 10px 20px -7px rgb(0 0 0 / 35%)" : "none"
          }}>
            {data?.id == less.id && <CurrentCircle>
              {index !== (lessons.length - 1) && <DividerIncomplete />}
            </CurrentCircle>
            }
            {(data?.id !== less.id && !less.users?.includes(userId)) && <IncompleteCircle>
              {index !== (lessons.length - 1) && <DividerIncomplete />}
            </IncompleteCircle>}
            {(less.users?.includes(userId) && data?.id !== less.id) &&
              <ProgressCircle>
                {(index !== (lessons.length - 1)) && <DividerComplete />}
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