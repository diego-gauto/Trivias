import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { IoMdExit } from 'react-icons/io';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { AdminContain } from '../../../SideBar.styled';
import { SelectOption } from '../../Courses.styled';
import { LessonContainer } from './Lessons.styled';

const Lessons = () => {
  const [selectQuizHw, setSelectQuizHw] = useState<boolean>(false);
  const router = useRouter();
  let courseID = router.query.course;
  let seasonID = router.query.season;
  const HwQuiz = [
    "No",
    "Si",
  ];
  const returnToSeasons = () => {
    router.push({
      pathname: "/admin/Courses/Seasons",
      query: { course: courseID },
    })
  }
  const deleteLesson = () => {

  }

  return (
    <AdminContain style={{ flexDirection: "column" }}>
      <IoMdExit className="icon-exit" onClick={returnToSeasons} />
      <div className="courses-header">
        <h1 className="main-title">Agregar Lección</h1>
        <div className="courses-buttons">
          <button onClick={deleteLesson}>Eliminar Lección</button>
        </div>
      </div>
      <LessonContainer>
        <div className="lesson-contain">
          <div className="rows">
            <div className="input-contain">
              <label className="input-label">
                Título de la Lección
              </label>
              <input
                placeholder="Título de la Lección"
                className="input-create"
              />
            </div>
            <div className="input-contain">
              <label className="input-label">
                Número de Lección
              </label>
              <input
                placeholder="Número de Lección"
                className="input-create"
              />
            </div>
            <div className="input-contain">
              <label className="input-label">
                Frase descriptiva de la Lección
              </label>
              <input
                placeholder="Frase descriptiva de la Lección"
                className="input-create"
              />
            </div>
          </div>
          <div className="rows">
            <div className="input-contain">
              <label className="input-label">
                Hipervínculo del video
              </label>
              <input
                placeholder="https://video.gonvar.io/media/instrucciones/1_01/master.m3u8"
                className="input-create"
              />
            </div>
            <div className="input-contain">
              <label className="input-label">
                Puntos Acreditados
              </label>
              <input
                type="number"
                placeholder="100"
                className="input-create"
              />
            </div>
            <div className="input-contain">
              <label className="input-label">
                Portada de la Lección
              </label>
              <input
                type="file"
                className="input-create"
              />
            </div>
          </div>
          <div className="rows">
            <div className="input-contain">
              <label className="input-label">
                Material Adicional
              </label>
              <textarea
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                anim id est laborum."
                className="input-textarea"
              />
            </div>
            <div className="input-contain">
              <label className="input-label">
                Objetivos
              </label>
              <textarea
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                anim id est laborum."
                className="input-textarea"
              />
            </div>
            <div className="input-contain">
              <label className="input-label" style={{ textAlign: "center" }}>
                Vista previa de imagen
              </label>
            </div>
          </div>
          <div className="rows">
            <div className="input-contain">
              <label className="input-label">
                Material Adicional
              </label>
              <input
                type="file"
                className="input-create"
              />
            </div>
            <div className="input-contain">
              <label className="input-label">
                Tarea o Quiz
              </label>
              <SelectOption onClick={() => setSelectQuizHw(!selectQuizHw)}>
                {
                  "Si"
                }
                {
                  selectQuizHw
                    ? <RiArrowDropUpLine className="arrow" />
                    : <RiArrowDropDownLine className="arrow" />
                }
                {
                  selectQuizHw &&
                  <div className="options">
                    {
                      HwQuiz.map((val: string, index: number) => {
                        return (
                          <div
                            className="map-options"
                            key={"hwQuiz " + index}
                          // onClick={() => setCourse({
                          //   ...course, type: val
                          // })}
                          >
                            {val}
                          </div>
                        )
                      })
                    }
                  </div>
                }
              </SelectOption>
            </div>

          </div>
        </div>
      </LessonContainer>
    </AdminContain>
  )
}
export default Lessons;