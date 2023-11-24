import React, { useEffect, useState } from "react";

import router, { useRouter } from "next/router";
import { ArrowUpIcon, Circle, CourseLength, DetailContain, LessonCard, LessonContainer, Line, MainContainer, SeasonCard, SeasonInfo } from "./Menu.styled";
import { IUser } from "../../../../../interfaces/IUserData";
import { Progress, Space } from "antd";
import { checkLessons, goTo, hms, returnProgress, returnStatus } from "../../utils/functions";
import { AiOutlineClockCircle } from "react-icons/ai";
import { DOWNLOAD_MATERIAL, HW_ICON, LOCK_ICON } from "../../../../../utils/Constants";
import { ILesson, ICourseResponse, ISeason } from "../../../../../interfaces/ICourseNew";
import { IUserHomework } from "../../../../../interfaces/IUserHomeworks";
import { IUserInfoResult } from "../../../../../interfaces/IUser";
import { getCourseHomeworksOfUser, getHomeworkUserApi } from "../../../../../components/api/homeworks";
import { IReducedHomework } from "../../../../../interfaces/IHomeworkByUser";

interface IMenu {
  course: ICourseResponse,
  user: IUserInfoResult
}
const Menu = (props: IMenu) => {
  const { course, user } = props;
  const [selected, setSelected] = useState<any>([]);
  const [homeworks, setHomeworks] = useState<IReducedHomework[]>([]);
  const params = useRouter();

  useEffect(() => {
    getUserHomework();
  }, []);

  const getUserHomework = async () => {
    let tempData = {
      course_id: course.id,
      user_id: user.id,
    }

    try {
      const userHomeworksResponse = await getCourseHomeworksOfUser(tempData);
      const userHomeworks: IReducedHomework[] = userHomeworksResponse.data;
      setHomeworks(userHomeworks);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.stack);
        console.error(error.message);
      }
    }
  }

  useEffect(() => {
    let temp_selected: boolean[] = [];
    course.seasons.forEach((_element) => {
      temp_selected.push(true)
    });
    setSelected(temp_selected);
  }, [])

  const toggleHandler = (index: any) => {
    let temp = [...selected]
    temp[index] = !temp[index];
    setSelected(temp)
  }

  const handleGotTo = (season: number, lesson: number) => {
    if ((course.type === "Mensual" && course.sequential === 0) || course.type === "Gratis") {
      goTo(course.id, season, lesson)
    }
    if (course.type === "Mensual" && course.sequential === 1) {
      if (checkLessons(user, course, season, lesson)) {
        goTo(course.id, season, lesson)
      }
    }
    if (course.type === "Producto" && course.sequential === 1) {
      if (checkLessons(user, course, season, lesson)) {
        console.log(course);
        goTo(course.id, season, lesson)
      }
    }
  }

  interface ITextAux {
    classname: string;
    text: string;
  }

  const getClassNameByStatus = (status: number, approve: number): ITextAux => {
    if (status === 0) {
      return { classname: 'activity--in-review', text: 'Tarea en revisión' }
    }
    if (status === 1 && approve === 1) {
      return { classname: 'activity--approve', text: 'Tarea aprobada' }
    }
    if (status === 1 && approve === 0) {

      return { classname: 'activity--not-approve', text: 'Tarea rechazada' }
    }
    return { classname: 'activity--default', text: 'Esta lección tiene una tarea' }
  }

  const getHomeworkText = (lesson: ILesson) => {
    if (lesson.homework !== 1) {
      return undefined;
    }
    const { id: lessonId } = lesson;
    console.log({ lesson });
    const homeworkWithLessonId = homeworks.find((homework) => homework.lesson_id == lessonId);
    let values: ITextAux = { classname: 'activity--default', text: 'Esta lección tiene una tarea' };
    if (homeworkWithLessonId !== undefined) {
      const { status, approved } = homeworkWithLessonId;
      values = getClassNameByStatus(status, approved);
    }
    const { classname, text } = values;
    return (
      <div className={`activity ${classname}`}>
        <img src={HW_ICON} />
        <strong>{text}</strong>
      </div>
    )
  }

  return (
    <MainContainer>
      {
        course.seasons.map((season: ISeason, indexSeason: number) => {
          return (
            <SeasonCard key={'lesson_date' + indexSeason}>
              <SeasonInfo active={selected[indexSeason]} onClick={() => { toggleHandler(indexSeason) }}>
                <Space wrap>
                  {
                    selected[indexSeason] && <Progress
                      width={60}
                      strokeWidth={10}
                      trailColor="#3F1168"
                      strokeColor="#FF9B00"
                      type="circle"
                      percent={Math.ceil((returnProgress(season, user.id) * 100) / course.seasons[indexSeason]!.lessons.length)}
                    />
                  }
                  <div className="seasonDetail">
                    <h4>{season.name}</h4>
                    <p>{season.lessons.length > 1 ? `${season.lessons.length} Lecciones` : `${season.lessons.length} Lección`}</p>
                  </div>
                </Space>
                <ArrowUpIcon active={selected[indexSeason]} />
              </SeasonInfo>
              {/* 
                Lesson
              */}
              {selected[indexSeason] && <LessonContainer>
                {season.lessons.map((lesson, indexLesson: number) => {
                  return (
                    <LessonCard onClick={() => { handleGotTo(indexSeason, indexLesson) }} style={{ cursor: checkLessons(user, course, indexSeason, indexLesson) ? "pointer" : "not-allowed" }} key={"lesson_data_sub_" + indexSeason + indexLesson}>
                      <div className="left">
                        {checkLessons(user, course, indexSeason, indexLesson) ? <Circle status={returnStatus(indexSeason, indexLesson, params, course, user.id)}>
                        </Circle> :
                          <img style={{ width: "10px" }} src={LOCK_ICON} />}
                        {(season.lessons.length - 1) !== indexLesson && <Line status={returnStatus(indexSeason, indexLesson, params, course, user.id)} />}
                      </div>
                      <div className="right">
                        <p>{lesson.title}</p>
                        <DetailContain>
                          {getHomeworkText(lesson)}
                          {
                            lesson.quiz === 1 &&
                            <div className='activity'>
                              <img src={HW_ICON} />
                              Esta lección tiene un quiz
                            </div>
                          }
                          {
                            lesson.lesson_material.length > 0 &&
                            <div className='activity'>
                              <img src={DOWNLOAD_MATERIAL} />
                              Esta lección tiene material descargable
                            </div>
                          }
                        </DetailContain>
                        <CourseLength>
                          <AiOutlineClockCircle className='icon' />
                          <p>{hms(lesson.duration)}</p>
                        </CourseLength>
                      </div>
                    </LessonCard>
                  )
                })}
              </LessonContainer>}
            </SeasonCard>
          )
        })
      }
    </MainContainer>
  )
}
export default Menu