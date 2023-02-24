import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import {
  deleteLessonMaterial,
  deleteQuiz,
  getLesson,
  updateLesson,
} from "../../../../store/actions/courseActions";
import {
  CaretD2,
  Label2,
  Option,
  OptionContain,
  Selected,
  SelectContain,
} from "./Select/SelectStyles.styled";
import { IconContain } from "./CourseForm.styled";
import Delete from "./Delete/Delete";
import {
  Button,
  ButtonContain,
  Contain1,
  Contain2,
  Contain3,
  Container,
  EditContain,
  Extra,
  Folder,
  ImageContain,
  Input,
  InputBig,
  InputContain,
  Label,
  PurpleButton,
  Title,
  TitleContain,
  TransparentButton,
  TrashIcon,
} from "./Edit.styled";
import ReactPlayer from "react-player";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css';
import { addQuiz, editQuiz, getQuiz } from "../../../../store/actions/AdminActions";
import { MdDelete } from "react-icons/md";
import { LoaderContain } from "../../../Footer/Footer.styled";
import { QuizContainer, FormContainer, InputContainer, QuestionContainer, Content } from "../../Quiz/Quiz.styled";
import { BackgroundLoader, LoaderImage } from "../../../../screens/Login.styled";
import uuid from 'react-uuid';
import { Input2 } from "../../Rewards/Modals/AddReward.styled";

const Edit = () => {
  const routerState = useRouter().query
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(0);
  const [lesson, setLesson] = useState<any>({})
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(false);
  const [quill, setQuill] = useState("");
  const [type, setType] = useState("homework");
  console.log(routerState)
  const { courseID, seasonID, lessonID } = router.query;
  const [mandatory, setMandatory] = useState<boolean>(false)
  const [openSelect, setOpenSelect] = useState<boolean>(false)
  const [loader, setLoader] = useState(false);
  const [quizLoader, setQuizLoader] = useState(false);
  const [question, setQuestion] = useState<any>({
    question: "",
    answers: []
  })
  const [quiz, setQuiz] = useState<any>({
    questions: [],
    passingGrade: '',
    points: '',
    title: '',
    folio: ''
  });

  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ size: ["small", false, "large", "huge"] }, {
          color: [
            "red",
            "blue"
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

  const getThisLesson = () => {
    getLesson(routerState.courseID, routerState.seasonID, routerState.lessonID).then((res: any) => {
      if (!("quiz" in res)) {
        res.quiz = {}
      } else {
        setQuiz(res.quiz);
      }
      if (!("type" in res)) {
        res.type = type
      } else {
        setType(res.type)
      }
      setLesson(res)
      if ("homeworkAvailable" in res) {
        setValue(res.homeworkAvailable)
        setQuill(res.homeWorkAbout)
      }
    })
  }
  const updateThisLesson = async () => {
    if (type == "homework") {
      lesson.homeworkAvailable = value;
      lesson.quiz = {}
    } else {
      lesson.homeworkAvailable = false;
      lesson.quiz = quiz;
      if (!lesson.quiz.folio) {
        lesson.quiz.folio = uuid();
      }
    }
    await updateLesson(lesson, routerState.courseID, routerState.seasonID, routerState.lessonID).then(() => {
      router.push({
        pathname: `/admin/Edit`,
        query: { documentID: routerState.courseID }
      });
    })
  }

  const getDocuments = (file: any) => {
    let tempExtra: any = lesson.extra;
    file = Object.values(file);
    file.forEach((element: any) => {
      var reader = new FileReader();
      reader.readAsDataURL(element);
      reader.onload = (_event) => {
        tempExtra.push({ path: reader.result, format: reader.result, title: element.name })
        setLesson({ ...lesson, extra: tempExtra })
      }
    });

  }
  const getImage = (file: any) => {
    var reader = new FileReader();
    var imageComp: any = new Image();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      imageComp.src = reader.result;
    };
    setTimeout(() => {
      if ((imageComp.width == 760 && imageComp.height == 420) || (imageComp.width == 4000 && imageComp.height == 2250)) {
        setLesson({ ...lesson, image: reader.result, format: reader.result })
        alert("Imagen aceptada")
      }
      else {
        alert("La imagen debe tener una resolución de 4000 px x 2250 px o 760 px × 420 px")
      }
    }, 1000);
  }
  const deleteImage = (material: any, index: any) => {
    let tempExtra = lesson.extra;
    deleteLessonMaterial(material).then(res => {
      tempExtra.splice(index, 1);
      setLesson({ ...lesson, extra: tempExtra })
    })
  }

  useEffect(() => {
    getThisLesson();
  }, [])

  useEffect(() => {
  }, [quill])

  const addQuestion = () => {
    let tempQuiz: any = quiz;
    if (question.question !== "") {
      tempQuiz.questions.push(question)
    }
    setQuiz({ ...tempQuiz })
  }
  const removeQuestion = (index: number) => {
    let tempQuiz: any = quiz;
    tempQuiz.questions.splice(index, 1)
    setQuiz({ ...tempQuiz })
  }

  const addAnswer = (index: number) => {
    let tempQuiz: any = quiz;
    let inpAnswer: any = document.getElementById("answer" + index) as HTMLInputElement;
    if (inpAnswer.value) {
      tempQuiz.questions[index].answers.push({ answer: inpAnswer.value, status: false });
    }
    setQuiz({ ...tempQuiz })
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
  const removeAnswer = (index: number, ind: number) => {
    let tempQuiz: any = quiz;
    tempQuiz.questions[index].answers.splice(ind, 1)
    console.log({ ...tempQuiz })
    setQuiz({ ...tempQuiz })
  }

  const deleteActualQuiz = () => {
    setQuizLoader(true);
    let tempQuiz = JSON.parse(JSON.stringify(quiz));
    tempQuiz.points = '';
    tempQuiz.folio = '';
    tempQuiz.title = '';
    tempQuiz.passingGrade = '';
    tempQuiz.questions = [];
    setQuiz(tempQuiz);
    setTimeout(() => {
      setQuizLoader(false);
    }, 500)
  }

  const editQuestion = (index: number, content: any) => {
    let tempQuiz = quiz;
    tempQuiz.questions[index].question = content;
  }

  return (
    <Container>
      <TitleContain>
        <Title>Editar Lección</Title>
        <Button onClick={() => { setShow(true), setDeleteMessage(1) }}>Eliminar Lección <TrashIcon /></Button>
      </TitleContain>
      <EditContain>
        <div className="top">
          <Contain1>
            <InputContain>
              <Label>Título de la Lección</Label>
              <Input
                placeholder="Epidosio 1: Lorem Ipsum"
                defaultValue={lesson.title}
                onChange={(e: any) => {
                  setLesson({ ...lesson, title: e.target.value })
                }}
              />
            </InputContain>
            <InputContain>
              <Label>Número de Lección</Label>
              <Input
                placeholder="1"
                defaultValue={lesson.number}
                onChange={(e) => {
                  setLesson({
                    ...lesson, number: parseInt(e.target.value)
                  })
                }}
              />
            </InputContain>
            <InputContain>
              <Label>Portada de la Lección</Label>
              <IconContain>
                <Folder />
                <Input2>
                  <input
                    type="file"
                    placeholder="Seleccionar archivo"
                    onChange={(e) => { getImage(e.target.files) }}>
                  </input>
                </Input2>
              </IconContain>
            </InputContain>
            <ImageContain>
              <img src={lesson.image} />
            </ImageContain>
            <InputContain>
              <Label>Hipervínculo del video</Label>
              <Input
                placeholder="https://www.youtube.com/watch?v=RfR2Eh3fGxA&t=218s"
                defaultValue={lesson.link}
                onChange={(e: any) => {
                  setLesson({ ...lesson, link: e.target.value })
                }}
              />
            </InputContain>
          </Contain1>
          <Contain2>
            <InputContain>
              <Label>Material Adicional</Label>
              <IconContain>
                <Folder />
                <Input2>
                  <input
                    type="file"
                    placeholder="Seleccionar archivo"
                    onChange={(e) => { getDocuments(e.target.files) }}>
                  </input>
                </Input2>
              </IconContain>
            </InputContain>
            {
              lesson.extra?.length > 0 &&
              <InputContain>
                <Label>Materiales Adicionales</Label>
                <Extra>
                  {
                    lesson.extra?.map((val: any, index: any) => {
                      return (
                        <p
                          key={"Lesson Extra Material" + index}
                        >{val.title} <i
                          onClick={() => {
                            deleteImage(val, index)
                          }}
                        > x</i></p>
                      )
                    })
                  }
                </Extra>
              </InputContain>
            }

            <InputContain>
              <Label>Puntos Acreditados</Label>
              <Input
                placeholder="200"
                defaultValue={lesson.points}
                onChange={(e: any) => {
                  setLesson({ ...lesson, points: e.target.value })
                }}
              />
            </InputContain>
            <InputContain>
              <Label>Material Adicional</Label>
              <InputBig
                placeholder="Lorem ipsum dolor sit amet, consectetur 
              adipiscing elit. Pharetra, cursus sapien ac magna. 
              Consectetur amet eu tincidunt quis. Non habitasse viverra 
              malesuada facilisi vel nunc. Mattis euismod nisi, id bibendum 
              adipiscing morbi mattis eget. Sed accumsan quisque mi sodales 
              malesuada fusce scelerisque urna. Enim sit pulvinar dui ipsum 
              feugiat. Ac enim ultrices venenatis imperdiet suspendisse mattis 
              enim. Mauris odio sit id curabitur enim mi. Orci id pharetra morbi 
              quisque."
                defaultValue={lesson.about}
                onChange={(e: any) => {
                  setLesson({ ...lesson, about: e.target.value })
                }}
              />
            </InputContain>
            <InputContain>
              <Label>Objetivos</Label>
              <InputBig style={{ height: 100 }}
                placeholder="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit. Pharetra, cursus sapien ac magna. 
            Consectetur amet eu tincidunt quis."
                defaultValue={lesson.objective}
                onChange={(e) => {
                  setLesson({
                    ...lesson, objective: e.target.value
                  })
                }}
              />
            </InputContain>
          </Contain2>
          <Contain3>
            <InputContain>
              <Label>Frase descriptiva</Label>
              <Input
                placeholder="Frase descriptiva"
                defaultValue={lesson.description}
                onChange={(e) => {
                  setLesson({
                    ...lesson, description: e.target.value
                  })
                }}
              />
            </InputContain>
          </Contain3>
        </div>
        <div className="bottom">
          <div className="toggle">
            <div className="left" onClick={() => { setType("homework") }} style={{ background: type == "homework" ? "#6717cd" : "none", color: type == "homework" ? "#fff" : "#6717cd" }}>Tarea</div>
            <div className="right" onClick={() => { setType("quiz") }} style={{ background: type == "quiz" ? "#6717cd" : "none", color: type == "quiz" ? "#fff" : "#6717cd" }}>Quiz</div>
          </div>
          {type == "homework" ? <div className="homework-container">
            <InputContain>
              <Label>Agregar Tarea</Label>
              <SelectContain key={3}>
                <Selected onClick={() => { setOpen(!open) }}>
                  {!value ? 'No' : 'Si'}
                  <CaretD2 />
                </Selected>
                {
                  open == true &&
                  <OptionContain>
                    <Option onClick={() => { setValue(true); setOpen(false); }}>
                      <input
                        type="radio"
                        id="Temporada1"
                        name="category"
                        value="Temporada 1"
                      />
                      <Label2 > Si</Label2>
                    </Option>
                    <Option onClick={() => { setValue(false); setOpen(false); }}>
                      <input
                        type="radio"
                        id="Temporada1"
                        name="category"
                        value="Temporada 1"
                      />
                      <Label2 > No</Label2>
                    </Option>
                  </OptionContain>
                }
              </SelectContain>
            </InputContain>
            {value && <>
              <InputContain>
                <Label>Título de la Tarea</Label>
                <Input
                  placeholder="Tarea 23: Intro a uñas francesas"
                  defaultValue={lesson.homeWork}
                  onChange={(e: any) => {
                    setLesson({ ...lesson, homeWork: e.target.value })
                  }}
                />
              </InputContain>
              <InputContain>
                <Label>Descripción de la Tarea</Label>
                <ReactQuill placeholder="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit. Pharetra, cursus sapien ac magna. 
            Consectetur amet eu tincidunt quis. Non habitasse viverra 
            malesuada facilisi vel nunc. Mattis euismod nisi, id bibendum 
            adipiscing morbi mattis eget." id="quill" theme="snow"
                  formats={formats} modules={modules}
                  defaultValue={lesson.homeWorkAbout} onChange={(content, delta, source, editor) => {
                    setQuill(editor.getText()); setLesson({
                      ...lesson, homeWorkAbout: content
                    })
                  }} />
              </InputContain></>}
          </div> :
            !quizLoader ?
              <QuizContainer>
                <TitleContain>
                  {
                    JSON.stringify(quiz) == '{}'
                      ? <Title>Nuevo Quiz</Title>
                      : <Title>Editar Quiz</Title>
                  }
                  {
                    !loader
                      ?
                      <div className='button-container'>
                        {JSON.stringify(quiz) !== '{}' &&
                          <button className="button-delete" onClick={deleteActualQuiz}> Eliminar Quiz</button>
                        }
                      </div>
                      : <LoaderContain />
                  }

                </TitleContain>
                <FormContainer>
                  <Content>
                    <InputContainer>
                      <label>Nombre del Quiz</label>
                      <input
                        placeholder="Nombre del Quiz"
                        defaultValue={quiz.title}
                        onChange={(e: any) => {
                          setQuiz({
                            ...quiz, title: e.target.value
                          })
                        }}
                      />
                    </InputContainer>
                    <InputContainer>
                      <label>Calificación Aprobatoria</label>
                      <input
                        placeholder="70"
                        defaultValue={quiz.passingGrade}
                        onChange={(e: any) => {
                          setQuiz({
                            ...quiz, passingGrade: parseInt(e.target.value)
                          })
                        }}
                      />
                    </InputContainer>
                    <InputContainer>
                      <label>Puntos</label>
                      <input
                        placeholder="100"
                        defaultValue={quiz.points}
                        onChange={(e: any) => {
                          setQuiz({
                            ...quiz, points: parseInt(e.target.value)
                          })
                        }}
                      />
                    </InputContainer>
                  </Content>
                  <QuestionContainer>
                    <p className="title">
                      Preguntas
                    </p>
                    <div className="first-container">
                      <div className="input-contain">
                        <label>Pregunta</label>
                        <ReactQuill
                          placeholder="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit. Pharetra, cursus sapien ac magna. 
            Consectetur amet eu tincidunt quis. Non habitasse viverra 
            malesuada facilisi vel nunc." theme="snow" id='quill'
                          formats={formats} modules={modules}
                          defaultValue="" onChange={(content, delta, source, editor) => {
                            setQuill(editor.getText()); setQuestion({
                              ...question, question: content, answers: []
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
                      quiz.questions.map((question: any, index: any) => {
                        return (
                          <div className="question-content" key={"Preguntas " + index}>
                            <div className="questions">
                              <p className="question-title">Pregunta {index + 1}:</p>
                              <div className="button-contain">
                                <input type="text" id={"answer" + index} placeholder="Respuesta" />
                                <button className="button-add" onClick={() => { addAnswer(index) }}>
                                  Agregar Respuesta
                                </button>
                                <button className="button-delete" onClick={() => {
                                  removeQuestion(index);
                                }}>
                                  Eliminar
                                </button>
                              </div>
                            </div>
                            <p dangerouslySetInnerHTML={{ __html: question.question }} />
                            <ReactQuill
                              placeholder="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit. Pharetra, cursus sapien ac magna. 
            Consectetur amet eu tincidunt quis. Non habitasse viverra 
            malesuada facilisi vel nunc." theme="snow" id='quill'
                              formats={formats} modules={modules}
                              defaultValue={question.question} onChange={(content, delta, source, editor) => {
                                editQuestion(index, content)
                              }} />
                            {
                              question.answers.length > 0 &&
                              <p className="question-title" style={{ fontWeight: "bold" }}>Respuestas</p>
                            }

                            {question.answers.map((answer: any, ind: any) => {
                              return (
                                <div className='answers' key={"answers" + ind}>
                                  <div
                                    className='status' style={{ backgroundColor: answer.status ? "#00d14d" : "#D10000" }}
                                    onClick={() => { changeStatus(index, ind) }}
                                  />
                                  <p> {ind + 1 + ": "}</p>
                                  <p>{answer.answer}</p>
                                  <MdDelete
                                    className="trash" style={{ cursor: "pointer", fontSize: 20 }}
                                    onClick={() => { removeAnswer(index, ind) }}
                                  />
                                </div>

                              )
                            })}
                          </div>
                        )
                      })
                    }

                  </QuestionContainer>
                </FormContainer>
              </QuizContainer> :
              <BackgroundLoader>
                <LoaderImage>
                  <LoaderContain />
                </LoaderImage>
              </BackgroundLoader>
          }
        </div>
      </EditContain>
      <ButtonContain>
        <Link href={{
          pathname: "/admin/Edit",
          query: {
            documentID: routerState.courseID
          }
        }}
        >
          <TransparentButton>
            Regresar
          </TransparentButton>
        </Link>
        <PurpleButton onClick={updateThisLesson}>Guardar</PurpleButton>
      </ButtonContain>
      <Delete setShow={setShow}
        show={show}
        deleteMessage={deleteMessage}
        courseID={routerState.courseID}
        lessonID={routerState.lessonID}
        seasonID={routerState.seasonID} />
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
    </Container>
  )
}
export default Edit;