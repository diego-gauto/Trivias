import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { AiFillEdit, AiOutlinePlus } from 'react-icons/ai';
import { IoMdExit } from 'react-icons/io';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { createSeason, deleteLessonFromApi, deleteSeasonFromApi, getLessonFromApi, getLessonsFromApi, getSeasonsFromCourseApi, getSingleCourseApi, updateSeasonNameApi } from '../../../api/courses';
import { getUserApi } from '../../../api/users';
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
  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    if (localStorage.getItem("email")) {
      getUserApi(localStorage.getItem("email")).then((res) => {
        setUserData(res);
      })
    }
  }, [])
  const returnToCourses = () => {
    router.push({
      pathname: "/admin/Courses",
    })
  }
  const addSeason = () => {
    if (userData.role === "admin" && userData.roles[1].create === 0) {
      alert("No tienes permisos para esta acción");
      return;
    }
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
      pathname: "/admin/CourseLesson",
      query: {
        course: courseID,
        season: seasonID,
      }
    })
  }
  const editLesson = (seasonID: number, lessonID: number) => {
    router.push({
      pathname: "/admin/CourseLesson",
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
  const deleteSeaons = (seasonData: ISeason) => {
    if (userData.role === "admin" && userData.roles[1].delete === 0) {
      alert("No tienes permisos para esta acción");
      return;
    }
    if (confirm(`¿Desea eliminar temporada ${seasonData.name}?, esto eliminara todas las lecciones`)) {
      seasonData.lessons.map((lessonData: ILesson) => {
        getLessonFromApi(lessonData.id).then((lesson) => {
          if (lesson.quizzes) {
            lessonData.quizzes = lesson.quizzes;
          }
          if (lesson.lesson_homeworks) {
            lessonData.lesson_homeworks = lesson.lesson_homeworks;
          }
        })
      })
      // deleteSeasonFromApi(seasonData).then(() => {
      // })
    }
  }
  const saveData = (seasonData: ISeason, index: number) => {
    let inpAnswer: any = document.getElementById("module-name" + index) as HTMLInputElement;
    seasonData.name = inpAnswer.value;
    updateSeasonNameApi(seasonData).then(() => {
      window.location.reload();
    })
  }
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
      setLoader(true);
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
                                id={"module-name" + index}
                              />
                              <button className="button-save" onClick={() => saveData(seasonData, index)}>Guardar</button>
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
                              ? <>
                                <button className="button-delete" onClick={() => { deleteSeaons(seasonData) }}>Eliminar Temporada</button>
                                <RiArrowDropUpLine className="arrow" onClick={() => { changeOpenSeasonState(index) }} />
                              </>
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
                                  <img className="img-banner" src={lesson.banner} />
                                  <div className="lesson-data">
                                    <p className="lesson-title">{lesson.title}</p>
                                    <p className="lesson-about">{lesson.about}</p>
                                    <p className="lesson-duration">{hms(lesson.duration)}</p>
                                    <p className="lesson-edit" onClick={() => { editLesson(seasonData.id, lesson.id) }}>Editar Leccion</p>
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