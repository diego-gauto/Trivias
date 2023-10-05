import React, { useEffect, useState } from "react";

import router, { useRouter } from "next/router";
import { ArrowUpIcon, Circle, CourseLength, DetailContain, LessonCard, LessonContainer, Line, MainContainer, SeasonCard, SeasonInfo } from "./Menu.styled";
import { IUser } from "../../../../../interfaces/IUserData";
import { Progress, Space } from "antd";
import { goTo, hms, returnProgress, returnStatus } from "../../utils/functions";
import { AiOutlineClockCircle } from "react-icons/ai";
import { DOWNLOAD_MATERIAL, HW_ICON } from "../../../../../utils/Constants";


interface IMenu {
  course: any,
  user: IUser
}
const Menu = (props: IMenu) => {
  const { course, user } = props;
  const [selected, setSelected] = useState<any>([]);
  const params = useRouter()
  useEffect(() => {
    let temp_selected: any = [];
    course.seasons.forEach((element: any) => {
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
    if (course.type === "Mensual" && course.sequential === 0) {
      goTo(course.id, season, lesson)
    }
    if (course.type === "Mensual" && course.sequential === 1) {
      console.log(1);

    }
  }

  return (
    <MainContainer>
      {
        course.seasons.map((x: any, indexSeason: number) => {
          return (
            <SeasonCard>
              <SeasonInfo active={selected[indexSeason]} onClick={() => { toggleHandler(indexSeason) }}>
                <Space wrap>
                  {
                    selected[indexSeason] && <Progress width={60} strokeWidth={10} trailColor="#3F1168" strokeColor="#FF9B00" type="circle" percent={Math.ceil((returnProgress(x, user.id) * 100) / course.seasons[indexSeason]?.lessons.length)} />
                  }
                  <div className="seasonDetail">
                    <h4>{x.name}</h4>
                    <p>{x.lessons.length > 1 ? `${x.lessons.length} Lecciones` : `${x.lessons.length} Lección`}</p>
                  </div>
                </Space>
                <ArrowUpIcon active={selected[indexSeason]} />
              </SeasonInfo>
              {/* 
                Lesson
              */}
              {selected[indexSeason] && <LessonContainer>
                {x.lessons.map((l: any, indexLesson: number) => {
                  return (
                    <LessonCard onClick={() => { handleGotTo(indexSeason, indexLesson) }}>
                      <div className="left">
                        <Circle status={returnStatus(indexSeason, indexLesson, params, course, user.id)}>
                        </Circle>
                        {(x.lessons.length - 1) !== indexLesson && <Line status={returnStatus(indexSeason, indexLesson, params, course, user.id)} />}
                      </div>
                      <div className="right">
                        <p>{l.title}</p>
                        <DetailContain>
                          {
                            l.homework === 1 &&
                            <div className='activity'>
                              <img src={HW_ICON} />
                              Esta lección tiene una tarea
                            </div>
                          }
                          {
                            l.quiz === 1 &&
                            <div className='activity'>
                              <img src={HW_ICON} />
                              Esta lección tiene un quiz
                            </div>
                          }
                          {
                            l.lesson_material.length > 0 &&
                            <div className='activity'>
                              <img src={DOWNLOAD_MATERIAL} />
                              Esta lección tiene material descargable
                            </div>
                          }
                        </DetailContain>
                        <CourseLength>
                          <AiOutlineClockCircle className='icon' />
                          <p>{hms(l.duration)}</p>
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