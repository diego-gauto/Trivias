import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { AiFillEdit, AiOutlinePlus } from 'react-icons/ai';
import { IoMdExit } from 'react-icons/io';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { createSeason, getLessonsFromApi, getSeasonsFromCourseApi, getSingleCourseApi } from '../../../api/courses';
import { AdminContain, AdminLoader } from '../../SideBar.styled';
import { ILesson, ISeason } from './ISeasons';
import { SeasonContainer } from './Seasons.styled';

const Seasons = () => {
  const [course, setCourse] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [editSeasonName, setEditSeasonName] = useState<number>(-1);
  const [openSeason, setOpenSeason] = useState<number>(-1);
  const [seasons, setSeasons] = useState<any>([])
  const router = useRouter();
  let courseID: any = router.query.course;
  const returnToCourses = () => {
    router.push({
      pathname: "/admin/Courses",
    })
  }
  const addSeason = () => {
    let newSeasons: any = {
      season: seasons.length + 1,
      name: "Modulo " + (seasons.length + 1),
      course_id: +courseID,
    }
    createSeason(newSeasons).then(() => {
      setLoader(false);
      getSeasonsFromCourseApi(+courseID).then((resSeason) => {
        setSeasons(resSeason);
        setLoader(true);
      })
    })
  }
  const addLesson = (seasonID: number) => {
    router.push({
      pathname: "/admin/Courses/Seasons/Lessons",
      query: {
        course: courseID,
        season: seasonID,
      }
    })
  }
  const editLesson = (seasonID: number, lessonID: number) => {
    router.push({
      pathname: "/admin/Courses/Seasons/Lessons",
      query: {
        course: courseID,
        season: seasonID,
        lesson: lessonID,
      }
    })
  }
  const changeOpenSeasonState = (courseIndex: number) => {
    if (openSeason === courseIndex) {
      setOpenSeason(-1);
    }
    else {
      setOpenSeason(courseIndex);
    }
  }
  const startSeasonUpdate = (courseIndex: number) => {
    if (editSeasonName === courseIndex) {
      setEditSeasonName(-1);
    }
    else {
      setEditSeasonName(courseIndex);
    }
  }
  useEffect(() => {
    getSingleCourseApi(+courseID).then((res) => {
      setCourse(res);
      getSeasonsFromCourseApi(+courseID).then((resSeason) => {
        setSeasons(resSeason);
        resSeason.forEach((season: any, index: number) => {
          getLessonsFromApi(season.id).then((resLesson) => {
            season.lessons = resLesson
          })
          if (resSeason.length - 1 === index) {
            setLoader(true);
          }
        })

      })
    })
  }, [])

  return (
    <AdminContain style={{ flexDirection: "column" }}>
      <IoMdExit className="icon-exit" onClick={returnToCourses} />
      {
        loader
          ?
          <>
            <div className="courses-header">
              <h1 className="main-title">Temporadas: {course.title} </h1>
              <div className="courses-buttons">
                <button onClick={addSeason}>Agregar Temporada <AiOutlinePlus style={{ fontSize: 20 }} /></button>
              </div>
            </div>
            <SeasonContainer>
              {
                seasons.map((seasonData: ISeason, index: number) => {
                  return (
                    <div className="season-contain" key={"Seasons_" + index}>
                      <div className="title-contain" >
                        {
                          (editSeasonName === index)
                            ?
                            <div className="title-complete-contain" >
                              <input
                                className="season-input"
                                placeholder="Nombre de la temporada"
                                defaultValue={seasonData.name}
                              />
                              <button className="button-save">Guardar</button>
                              <AiFillEdit className="edit-icon" onClick={() => { startSeasonUpdate(index) }} />
                            </div>

                            :
                            <div className="title-complete-contain">
                              <p className="season-title" >
                                {seasonData.name}
                              </p>
                              <AiFillEdit className="edit-icon" onClick={() => { startSeasonUpdate(index) }} />
                            </div>

                        }

                        <div className="arrow-button">
                          <button className="button-edit" onClick={() => addLesson(seasonData.id)}>Añadir lección<AiOutlinePlus style={{ fontSize: 20 }} /></button>
                          {
                            openSeason === index
                              ? <RiArrowDropUpLine className="arrow" onClick={() => { changeOpenSeasonState(index) }} />
                              : <RiArrowDropDownLine className="arrow" onClick={() => { changeOpenSeasonState(index) }} />
                          }
                        </div>

                      </div>
                      {
                        (openSeason === index && seasonData.lessons?.length > 0) &&
                        <div className="lesson-content">
                          {
                            seasonData.lessons.map((lesson: ILesson, ind: number) => {
                              return (
                                <div className="lesson-contain" key={"LessonShow_" + ind}>
                                  <img className="img-banner" />
                                  <div className="lesson-data">
                                    <p className="lesson-title">{lesson.title}</p>
                                    <p className="lesson-about">{lesson.about}</p>
                                    <p className="lesson-duration">{lesson.duration + " min"}</p>
                                    <p className="lesson-edit" onClick={() => { editLesson(index + 1, ind + 1) }}>Editar Leccion</p>
                                  </div>
                                </div>
                              )
                            })
                          }
                        </div>
                      }
                    </div>
                  )
                })
              }
            </SeasonContainer>
          </>

          :
          <AdminLoader>
            <div className="loader-image">
              <div className="loader-contain" />
            </div>
          </AdminLoader>
      }

    </AdminContain>
  )
}
export default Seasons;