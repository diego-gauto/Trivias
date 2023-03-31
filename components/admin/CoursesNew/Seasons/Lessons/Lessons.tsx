import { useRouter } from 'next/router';
import { type } from 'os';
import React, { useState } from 'react'
import { IoMdExit } from 'react-icons/io';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css';
import { AdminContain } from '../../../SideBar.styled';
import { SelectOption } from '../../Courses.styled';
import { LessonContainer } from './Lessons.styled';
import { MdDelete } from 'react-icons/md';
import { IAnswer, ILesson, IQuestion } from './ILessons';

const Lessons = () => {
  const [selectQuizHw, setSelectQuizHw] = useState<boolean>(false);
  const [quill, setQuill] = useState("");
  const router = useRouter();
  let courseID: any = router.query.course;
  let seasonID: any = router.query.season;
  const [lesson, setLesson] = useState<any>({
    title: "",
    number: 0,
    about: "",
    link: "",
    points: 0,
    banner: "",
    objectives: "",
    duration: 0,
    quiz: false,
    homework: false,
    seasons_id: +seasonID,
    quizzes: [],
    lesson_homeworks: [],
  });
  const [homeWorkData, sethomeWorkData] = useState({
    title: "",
    about: ""
  })
  const [quiz, setQuiz] = useState<any>({
    title: "",
    passing_grade: 0,
    points: 0,
    questions: [],
  });
  const [questions, setQuestions] = useState<any>({
    question: "",
    answers: []
  })
  const [answers, setAnswers] = useState<any>({
    answer: "",
    status: false,
  })
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ size: ["small", false, "large", "huge"] }, {
          color: [
            "red",
            "blue",
            "#6717cd",
          ]
        }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
          { align: [] }
        ],
        ["clean"]
      ],
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "size",
    "color",
    "list",
    "bullet",
    "indent",
    "align"
  ];
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
  const startQuizHw = (val: string) => {
    let currentState: boolean = val === "Si" ? true : false;
    setLesson({ ...lesson, homework: currentState, quiz: false })
  }
  const homeWorkTrue = () => {
    setLesson({ ...lesson, homework: true, quiz: false })
  }
  const quizTrue = () => {
    setLesson({ ...lesson, homework: false, quiz: true })
  }
  const changeStatus = (index: number, ind: number) => {
    let tempQuiz: any = quiz;
    tempQuiz.questions[index].answers.forEach((element: any, idx: number) => {
      if (ind == idx) {
        tempQuiz.questions[index].answers[ind].status = true;
      }
      else {
        tempQuiz.questions[index].answers[idx].status = false;
      }
    });
    setQuiz({ ...tempQuiz })
  }
  const addQuestion = () => {
    let tempQuiz: any = quiz;
    if (questions.question !== "") {
      tempQuiz.questions.push(questions)
    }
    setQuiz({ ...tempQuiz })
    setQuestions({ ...questions, question: "" })
  }
  const removeQuestion = (index: number) => {
    let tempQuiz: any = quiz;
    tempQuiz.questions.splice(index, 1)
    setQuiz({ ...tempQuiz })
  }
  const addAnswer = (index: number) => {
    let tempQuiz: any = quiz;
    if (answers.answer !== "") {
      tempQuiz.questions[index].answers.push({ answer: answers.answer, status: false });
    }
    setQuiz({ ...tempQuiz })
    setAnswers({ ...answers, answer: "" })
  }
  const removeAnswer = (index: number, ind: number) => {
    let tempQuiz: any = quiz;
    tempQuiz.questions[index].answers.splice(ind, 1)
    setQuiz({ ...tempQuiz })
  }
  const createLesson = () => {
    if (lesson.quiz === true) {
      lesson.quizzes.push(quiz);
    }
    if (lesson.homework === true) {
      lesson.lesson_homeworks.push(homeWorkData);
    }
    console.log(lesson)
  }
  const deleteLesson = () => {

  }
  return (
    <AdminContain style={{ flexDirection: "column" }}>
      <IoMdExit className="icon-exit" onClick={returnToSeasons} />
      <div className="courses-header">
        <h1 className="main-title">Agregar Lección</h1>
        <div className="courses-buttons">
          <button onClick={deleteLesson} style={{ backgroundColor: "red" }} className="delete-btn">Eliminar Lección</button>
        </div>
      </div>
      <LessonContainer>
        <div className="lesson-contain">
          <div className="rows" style={{ justifyContent: "flex-end" }}>
            <div className="input-contain" style={{ width: "unset" }}>
              <button className="save-button" onClick={createLesson}>Guardar</button>
            </div>
          </div>
          <div className="rows">
            <div className="input-contain">
              <label className="input-label">
                Título de la Lección
              </label>
              <input
                placeholder="Título de la Lección"
                className="input-create"
                onChange={(e: any) => {
                  setLesson({
                    ...lesson, title: e.target.value
                  })
                }}
              />
            </div>
            <div className="input-contain">
              <label className="input-label">
                Número de Lección
              </label>
              <input
                type="number"
                placeholder="Número de Lección"
                className="input-create"
                onChange={(e: any) => {
                  setLesson({
                    ...lesson, number: parseInt(e.target.value)
                  })
                }}
              />
            </div>
            <div className="input-contain">
              <label className="input-label">
                Frase descriptiva de la Lección
              </label>
              <input
                placeholder="Frase descriptiva de la Lección"
                className="input-create"
                onChange={(e: any) => {
                  setLesson({
                    ...lesson, about: e.target.value
                  })
                }}
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
                onChange={(e: any) => {
                  setLesson({
                    ...lesson, link: e.target.value
                  })
                }}
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
                onChange={(e: any) => {
                  setLesson({
                    ...lesson, points: parseInt(e.target.value)
                  })
                }}
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
                onChange={(e: any) => {
                  setLesson({
                    ...lesson, objectives: e.target.value
                  })
                }}
              />
            </div>
            <div className="input-contain">
              <label className="input-label" style={{ textAlign: "center" }}>
                Vista previa de imagen
              </label>
              <div>
                <img />
              </div>
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
                  (lesson.quiz || lesson.homework) ? "Si" : "No"
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
                            onClick={() => { startQuizHw(val) }}
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
          {
            (lesson.quiz || lesson.homework) &&
            <div className="rows">
              <div className="toggle">
                <div className="left" onClick={() => { homeWorkTrue() }} style={{ background: lesson.homework === true ? "#6717cd" : "none", color: lesson.homework === true ? "#fff" : "#6717cd" }}>Tarea</div>
                <div className="right" onClick={() => { quizTrue() }} style={{ background: lesson.quiz === true ? "#6717cd" : "none", color: lesson.quiz === true ? "#fff" : "#6717cd" }}>Quiz</div>
              </div>
            </div>
          }
          {
            lesson.homework &&
            <div className="rows">
              <div className="input-contain">
                <label className="input-label">
                  Título de la Tarea
                </label>
                <input
                  placeholder="Tarea 23: Intro a uñas francesas"
                  className="input-create"
                  onChange={(e: any) => {
                    sethomeWorkData({
                      ...homeWorkData, title: e.target.value
                    })
                  }}
                />
              </div>
              <div className="input-contain" style={{ width: "64%" }}>
                <label className="input-label">
                  Descripción de la Tarea
                </label>
                <ReactQuill placeholder="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit. Pharetra, cursus sapien ac magna. 
            Consectetur amet eu tincidunt quis. Non habitasse viverra 
            malesuada facilisi vel nunc. Mattis euismod nisi, id bibendum 
            adipiscing morbi mattis eget." id="quill" theme="snow" className="quill-lesson"
                  formats={formats} modules={modules}
                  // defaultValue={homeWorkData.about} 
                  onChange={(content, delta, source, editor) => {
                    setQuill(editor.getText()); sethomeWorkData({
                      ...homeWorkData, about: content
                    })
                  }} />
              </div>
            </div>
          }
          {
            lesson.quiz &&
            <>
              <div className="rows">
                <div className="input-contain">
                  <label className="input-label">
                    Nombre del Quiz
                  </label>
                  <input
                    placeholder="Nombre del Quiz"
                    className="input-create"
                    onChange={(e: any) => {
                      setQuiz({
                        ...quiz, title: e.target.value
                      })
                    }}
                  />
                </div>
                <div className="input-contain">
                  <label className="input-label">
                    Calificación Aprobatoria
                  </label>
                  <input
                    type="number"
                    placeholder="70"
                    className="input-create"
                    onChange={(e: any) => {
                      setQuiz({
                        ...quiz, passing_grade: parseInt(e.target.value)
                      })
                    }}
                  />
                </div>
                <div className="input-contain">
                  <label className="input-label">
                    Puntos
                  </label>
                  <input
                    type="number"
                    placeholder="100"
                    className="input-create"
                    onChange={(e: any) => {
                      setQuiz({
                        ...quiz, points: e.target.value
                      })
                    }}
                  />
                </div>
              </div>
              <div className="rows">
                <div className="input-contain" style={{ width: "100%" }}>
                  <label className="input-label">
                    Pregunta
                  </label>
                  <ReactQuill placeholder="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit. Pharetra, cursus sapien ac magna. 
            Consectetur amet eu tincidunt quis. Non habitasse viverra 
            malesuada facilisi vel nunc. Mattis euismod nisi, id bibendum 
            adipiscing morbi mattis eget." id="quill" theme="snow" className="quill-lesson"
                    formats={formats} modules={modules}
                    // defaultValue={homeWorkData.about} 
                    onChange={(content, delta, source, editor) => {
                      setQuill(editor.getText()); setQuestions({
                        ...questions, question: content
                      })
                    }} />
                  <button
                    className="button"
                    onClick={addQuestion}
                  > Crear Pregunta
                  </button>
                </div>
              </div>
              {
                quiz.questions.map((quest: IQuestion, index: number) => {
                  return (
                    <div className="rows" key={"questions_" + index}>
                      <div className="input-contain" style={{ width: "100%" }}>
                        <div className="question-title">
                          <p>
                            Pregunta: {index + 1}
                          </p>
                          <div className="answer-data">
                            <input
                              placeholder="Respuesta"
                              className="answer-input"
                              onChange={(e: any) => {
                                setAnswers({
                                  ...answers, answer: e.target.value
                                })
                              }}
                            />
                            <button className="add-btn" onClick={() => addAnswer(index)}>
                              Agregar Respuesta
                            </button>
                            <button className="delete-btn" onClick={() => removeQuestion(index)}>
                              Eliminar Pregunta
                            </button>
                          </div>
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: quest.question }} />
                        <ReactQuill placeholder="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit. Pharetra, cursus sapien ac magna. 
            Consectetur amet eu tincidunt quis. Non habitasse viverra 
            malesuada facilisi vel nunc. Mattis euismod nisi, id bibendum 
            adipiscing morbi mattis eget." id="quill" theme="snow" className="quill-lesson"
                          formats={formats} modules={modules}
                          defaultValue={quest.question}
                          onChange={(content, delta, source, editor) => {
                            setQuill(editor.getText()); setQuestions({
                              ...questions, question: content
                            })
                          }} />

                        {
                          quest.answers.length > 0 &&
                          <div className="answer-contain">
                            <p className="answer-text">
                              Respuestas
                            </p>
                            {
                              quest.answers.map((ans: IAnswer, ind: number) => {
                                return (
                                  <div className="all-answers" key={"quest_ans" + index + ind}>
                                    <div
                                      style={{ backgroundColor: ans.status ? "#00d14d" : "#D10000" }}
                                      className="circle"
                                      onClick={() => { changeStatus(index, ind) }}
                                    />
                                    <p className="answer">{ind + 1}: {ans.answer}</p>
                                    <MdDelete className="trash" onClick={() => { removeAnswer(index, ind) }} />
                                  </div>
                                )
                              })
                            }
                          </div>

                        }
                      </div>
                    </div>
                  )
                })
              }
            </>
          }
        </div>
      </LessonContainer>
    </AdminContain>
  )
}
export default Lessons;