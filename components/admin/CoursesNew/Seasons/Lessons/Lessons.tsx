import { useRouter } from 'next/router';
import { type } from 'os';
import React, { useEffect, useState } from 'react'
import { IoMdExit } from 'react-icons/io';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css';
import { AdminContain } from '../../../SideBar.styled';
import { LoaderButton, SelectOption } from '../../Courses.styled';
import { LessonContainer } from './Lessons.styled';
import { MdDelete } from 'react-icons/md';
import { IAnswer, ILesson, IQuestion } from './ILessons';
import { createLessonFromApi, deleteLessonFromApi, getLessonFromApi, updateLessonFromApi, updateLessonImageFromApi, updateLessonMaterialContect } from '../../../../api/courses';
import ReactPlayer from 'react-player';
import { updateLessonHomeWorks, updateLessonImage } from '../../../../../store/actions/courseActions';
import { AiOutlineClose } from 'react-icons/ai';

const Lessons = () => {
  const [selectQuizHw, setSelectQuizHw] = useState<boolean>(false);
  const [quill, setQuill] = useState("");
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [updateLoader, setUpdateLoader] = useState<boolean>(false);
  const [materialLoader, setMaterialLoader] = useState<boolean>(false);
  const [bannerImage, setBannerImage] = useState<any>("");
  const [oldQuiz, setOldQuiz] = useState<any>({});
  const [title, setTitle] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();
  const [errors, setErrors] = useState<any>({
    title: false,
    number: false,
    about: false,
    link: false,
    points: false,
    banner: false,
    objectives: false,
    // homeWorkTitle:false,
    // hoemWorkAbout: false,
    // quizTitle: false,
    // quizPassingGrade:false,
    // quizPoints: false,
    // questions:false,
    // answers: false,
  });
  let courseID: any = router.query.course;
  let seasonID: any = router.query.season;
  let lessonID: any = router.query.lesson;
  const [lesson, setLesson] = useState<any>({
    title: "",
    number: 0,
    about: "",
    link: "",
    points: 0,
    banner: "",
    objectives: "",
    extra_material: "",
    duration: 0,
    quiz: false,
    homework: false,
    seasons_id: +seasonID,
  });
  const [homeWorkData, sethomeWorkData] = useState<any>({
    title: "",
    about: "",
    points: 0,
  })
  const [extraMaterial, setExtraMaterial] = useState<any>([]);
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
      pathname: "/admin/CourseSeason",
      query: { course: courseID },
    })
  }
  const getImage = (file: any) => {
    var reader = new FileReader();
    var imageComp: any = new Image();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      imageComp.src = reader.result;
    };
    setTimeout(() => {
      // if ((imageComp.width == 760 && imageComp.height == 420) || (imageComp.width == 4000 && imageComp.height == 2250)) {
      setLesson({ ...lesson, banner: reader.result })
      setBannerImage(reader.result);
      //   alert("Imagen aceptada")
      // }
      // else {
      //   alert("La imagen debe tener una resolución de 4000 px x 2250 px o 760 px × 420 px")
      // }
    }, 1000);
  }
  const getExtraMaterial = (file: any) => {
    setMaterialLoader(true);
    if (file.length > 0) {
      var reader = new FileReader();
      var imageComp: any = new Image();
      let tempExtraMaterial = extraMaterial;
      reader.readAsDataURL(file[0]);
      reader.onload = (_event) => {
        imageComp.src = reader.result;
        tempExtraMaterial.push(reader.result)
        setExtraMaterial(tempExtraMaterial);
        setMaterialLoader(false);
      };
    }
  }
  const removeExtraMaterial = (index: number) => {
    setMaterialLoader(true);
    let tempExtraMaterial: any = extraMaterial;
    tempExtraMaterial.splice(index, 1)
    setExtraMaterial(tempExtraMaterial)
    setTimeout(() => {
      setMaterialLoader(false);
    }, 100);
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
    let tempQuiz: any = JSON.parse(JSON.stringify(quiz));
    if (answers.answer !== "") {
      tempQuiz.questions[index].answers.push(answers);
    }
    setQuiz({ ...tempQuiz })
    setAnswers({
      answer: "",
      status: false,
    })
  }
  const removeAnswer = (index: number, ind: number) => {
    let tempQuiz: any = quiz;
    tempQuiz.questions[index].answers.splice(ind, 1)
    setQuiz({ ...tempQuiz })
  }
  const createLesson = () => {
    setLoader(true);
    if (lesson.quiz === true) {
      lesson.quizzes = quiz;
    }
    if (lesson.homework === true) {
      lesson.lesson_homeworks = homeWorkData;
    }
    lesson.extraMaterial = extraMaterial;
    let tempErrors: any = {
      title: lesson.title === "" ? true : false,
      number: lesson.number === 0 ? true : false,
      about: lesson.about === "" ? true : false,
      link: lesson.link === "" ? true : false,
      // points: lesson.points === 0 ? true : false,
      // banner: lesson.banner === "" ? true : false,
      objectives: lesson.objectives === "" ? true : false,
      // homeWorkTitle:lesson.lesson_homeworks.title ==="" ? true :false,
      // hoemWorkAbout:lesson.lesson_homeworks.about ==="" ? true : false,
      // quizTitle:lesson.quizzes.title ==="" ? true : false,
      // quizPassingGrade:lesson.quizzes.passing_grade ===0 ?true : false,
      // quizPoints: lesson.quizzes.points ===0 ? true :false,
      // questions:lesson.quizzes.questions.length === 0 ? true : false,
      // answers: false,
    }
    setErrors(tempErrors)
    let checkErrors = Object.values(tempErrors).includes(true);
    if (!checkErrors) {
      let tempImage = lesson.banner;
      lesson.banner = "";
      let materialContent = extraMaterial;
      lesson.extraMaterial = extraMaterial.map((b: any) => {
        let extraMat = {
          image: '',
        }
        return extraMat
      })
      createLessonFromApi(lesson).then(async (res) => {
        lesson.id = res.data;
        await updateLessonImage(courseID, seasonID, tempImage, res.data).then((banner) => {
          lesson.banner = banner;
          updateLessonImageFromApi(lesson).then(() => {
          })
        })
        if (materialContent.length > 0) {
          materialContent.forEach(async (image: any) => {
            await updateLessonHomeWorks(courseID, seasonID, image, res.data).then((url) => {
              image = url
            })
          });
          materialContent.forEach(async (image: any, index: number,) => {
            await updateLessonHomeWorks(courseID, seasonID, image, res.data).then((url) => {
              let sentData = {
                material: url,
                id: res.lesson_material[index]
              }
              updateLessonMaterialContect(sentData);
            })
          });
        }
      }).then(() => {
        returnToSeasons();
      })
    }
    else {
      setLoader(false);
    }

  }
  const updateLesson = async () => {
    if (lesson.quiz === true) {
      lesson.quizzes = quiz;
      lesson.old_quiz = oldQuiz;
    }
    if (lesson.homework === true) {
      lesson.lesson_homeworks = homeWorkData;
    }
    lesson.extraMaterial = extraMaterial;
    if (bannerImage !== "") {
      await updateLessonImage(courseID, seasonID, lesson.banner, +lessonID).then((res) => {
        lesson.banner = res;
      })
    }
    setLoader(true);
    let tempErrors: any = {
      title: lesson.title === "" ? true : false,
      number: lesson.number === 0 ? true : false,
      about: lesson.about === "" ? true : false,
      link: lesson.link === "" ? true : false,
      points: lesson.points === 0 ? true : false,
      banner: lesson.banner === "" ? true : false,
      objectives: lesson.objectives === "" ? true : false,
      // homeWorkTitle:lesson.lesson_homeworks.title ==="" ? true :false,
      // hoemWorkAbout:lesson.lesson_homeworks.about ==="" ? true : false,
      // quizTitle:lesson.quizzes.title ==="" ? true : false,
      // quizPassingGrade:lesson.quizzes.passing_grade ===0 ?true : false,
      // quizPoints: lesson.quizzes.points ===0 ? true :false,
      // questions:lesson.quizzes.questions.length === 0 ? true : false,
      // answers: false,
    }
    setErrors(tempErrors)
    let checkErrors = Object.values(tempErrors).includes(true);
    lesson.id = +lessonID;
    if (!checkErrors) {
      updateLessonFromApi(lesson).then(() => {
        setLoader(false);
        returnToSeasons();
      })
    }
    else {
      setLoader(false);
    }

  }
  const deleteLesson = () => {
    if (confirm(`¿Desea eliminar la leccion ${lesson.name}?, esta accion no tiene marcha atras`)) {
      lesson.quizzes = quiz;
      lesson.lesson_homeworks = homeWorkData;
      lesson.id = +lessonID;
      deleteLessonFromApi(lesson).then(() => {
        returnToSeasons();
      })
    }
  }
  useEffect(() => {
    if (lessonID) {
      setUpdateMode(true);
      setUpdateLoader(true);
      getLessonFromApi(lessonID).then((res) => {
        setTitle(res.title);
        setLesson({
          title: res.title,
          number: res.number,
          about: res.about,
          link: res.link,
          points: res.points,
          banner: res.banner,
          objectives: res.objectives,
          duration: res.duration,
          quiz: res.quiz ? true : false,
          homework: res.homework ? true : false,
          seasons_id: res.seasons_id,
        })
        if (res.lesson_homeworks) {
          sethomeWorkData({
            id: res.lesson_homeworks.id,
            title: res.lesson_homeworks.title,
            about: res.lesson_homeworks.about,
            lessons_id: res.lesson_homeworks.lessons_id,
            points: res.lesson_homeworks.points,
          })
        }
        if (res.quizzes) {
          let tempQuiz: any = JSON.parse(JSON.stringify({
            id: res.quizzes.id,
            lessons_id: res.quizzes.lessons_id,
            title: res.quizzes.title,
            passing_grade: res.quizzes.passing_grade,
            points: res.quizzes.points,
            questions: res.quizzes.questions,
          }));
          setQuiz({
            id: res.quizzes.id,
            lessons_id: res.quizzes.lessons_id,
            title: res.quizzes.title,
            passing_grade: res.quizzes.passing_grade,
            points: res.quizzes.points,
            questions: res.quizzes.questions,
          })
          setOldQuiz(tempQuiz);
        }
        setUpdateLoader(false);
      })
    }
  }, [])
  if (updateLoader) {
    return (
      <LoaderButton />
    )
  }
  return (
    <AdminContain style={{ flexDirection: "column" }}>
      <IoMdExit className="icon-exit" onClick={returnToSeasons} />
      <div className="courses-header">
        <h1 className="main-title">{!updateMode ? "Agregar Lección" : "Editar Lección: " + title}</h1>
        {
          updateMode &&
          <div className="courses-buttons">
            <button onClick={deleteLesson} style={{ backgroundColor: "red" }} className="delete-btn">Eliminar Lección</button>
          </div>
        }
      </div>
      <LessonContainer>
        <div className="lesson-contain">
          <div className="rows" style={{ justifyContent: "flex-end" }}>
            <div className="input-contain" style={{ width: "unset" }}>
              {
                !loader ?
                  <>
                    {
                      !updateMode
                        ? <button className="save-button" onClick={createLesson}>Guardar</button>
                        : <button className="save-button" onClick={updateLesson}>Editar</button>
                    }
                  </>
                  : <LoaderButton />
              }

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
                defaultValue={lesson.title}
                style={errors.title ? { border: "1px solid red" } : {}}
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
                defaultValue={lesson.number}
                style={errors.number ? { border: "1px solid red" } : {}}
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
                defaultValue={lesson.about}
                style={errors.about ? { border: "1px solid red" } : {}}
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
                defaultValue={lesson.link}
                style={errors.link ? { border: "1px solid red" } : {}}
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
                defaultValue={lesson.points}
                style={errors.points ? { border: "1px solid red" } : {}}
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
                style={errors.banner ? { border: "1px solid red" } : {}}
                onChange={(e) => { getImage(e.target.files) }}
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
                onChange={(e: any) => {
                  setLesson({
                    ...lesson, extra_material: e.target.value
                  })
                }}
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
                defaultValue={lesson.objectives}
                style={errors.objectives ? { border: "1px solid red" } : {}}
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
              <img className="img-preview" src={lesson.banner} />
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
                onChange={(e) => { getExtraMaterial(e.target.files) }}
              />
              <div className='extra-materials'>
                {
                  (extraMaterial.length > 0 && !materialLoader) &&
                  extraMaterial.map((extra: any, index: number) => {
                    return (
                      <div key={"hwks_" + index} className="hw-contain">
                        <AiOutlineClose className='close' onClick={() => { removeExtraMaterial(index) }} />
                        <p className="extra-hmk">Tarea {index + 1}</p>
                      </div>
                    )
                  })
                }
              </div>
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
                <div className="left" onClick={() => { homeWorkTrue() }} style={{ background: lesson.homework ? "#6717cd" : "none", color: lesson.homework ? "#fff" : "#6717cd" }}>Tarea</div>
                <div className="right" onClick={() => { quizTrue() }} style={{ background: lesson.quiz ? "#6717cd" : "none", color: lesson.quiz ? "#fff" : "#6717cd" }}>Quiz</div>
              </div>
            </div>
          }
          {
            lesson.homework &&
            <>
              <div className="rows">
                <div className="input-contain">
                  <label className="input-label">
                    Título de la Tarea
                  </label>
                  <input
                    placeholder="Tarea 23: Intro a uñas francesas"
                    className="input-create"
                    defaultValue={homeWorkData.title}
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
                    defaultValue={homeWorkData.about}
                    onChange={(content, delta, source, editor) => {
                      setQuill(editor.getText()); sethomeWorkData({
                        ...homeWorkData, about: content
                      })
                    }} />
                </div>
              </div>
              <div className="rows">
                <div className="input-contain">
                  <label className="input-label">
                    Puntos de la Tarea
                  </label>
                  <input
                    placeholder="50"
                    className="input-create"
                    type="number"
                    defaultValue={homeWorkData.points}
                    onChange={(e: any) => {
                      sethomeWorkData({
                        ...homeWorkData, points: parseInt(e.target.value)
                      })
                    }}
                  />
                </div>
              </div>
            </>

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
                    defaultValue={quiz.title}
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
                    defaultValue={quiz.passing_grade}
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
                    defaultValue={quiz.points}
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
                    defaultValue={questions.question}
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
                            }); quest.question = content;
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
      {lesson.link && <ReactPlayer hidden
        url={lesson.link}
        onError={e => {
          alert("El formato del video es incorrecto!");
          setLesson({ ...lesson, duration: 0 })
        }
        }
        onDuration={(duration) =>
          setLesson({ ...lesson, duration: duration })
        }
      ></ReactPlayer>}
    </AdminContain>
  )
}
export default Lessons;