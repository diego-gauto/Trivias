

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { addLesson } from "../../../../store/actions/AdminActions";
import { IconContain } from "./CourseForm.styled";
import {
  ButtonContain,
  Contain1,
  Contain2,
  Contain3,
  Container,
  EditContain,
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
} from "./Edit.styled";
import {
  CaretD2,
  Label2,
  Option,
  OptionContain,
  Selected,
  SelectContain,
} from "./Select/SelectStyles.styled";
import ReactPlayer from "react-player";
import dynamic from "next/dynamic";
import uuid from 'react-uuid';


const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css';
import { LoaderContain } from "../../../Footer/Footer.styled";
import { MdDelete } from "react-icons/md";
import { QuizContainer, FormContainer, InputContainer, QuestionContainer, Content } from "../../Quiz/Quiz.styled";
import { Input2 } from "../../Rewards/Modals/AddReward.styled";


const AddLesson = () => {
  const router = useRouter();
  const routerState = useRouter().query
  const { courseID, seasonID } = router.query;
  const [lesson, setLesson] = useState<any>({
    title: '',
    duration: 0,
    number: '',
    banner: '',
    link: '',
    image: "",
    extra: [],
    points: 0,
    about: '',
    homeWork: '',
    homeWorkAbout: '',
    objective: '',
    description: '',
    quiz: {}
  });
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState(false);
  const [question, setQuestion] = useState<any>({
    question: "",
    answers: []
  })
  const [type, setType] = useState("homework");
  const [quill, setQuill] = useState("");
  const [quiz, setQuiz] = useState<any>({
    questions: [],
    passingGrade: '',
    points: '',
    title: '',
    folio: uuid()
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

  const newLesson = () => {
    setLoader(true);
    lesson.type = type;
    if (!value) {
      if (lesson.title == '' ||
        lesson.number == '' ||
        lesson.link == '' ||
        lesson.image == '' ||
        lesson.objective == '' ||
        lesson.description == '' ||
        lesson.about == ''
      ) {
        setLoader(false);
        alert("Por favor complete todo los campos!");
      } else {
        lesson.homeworkAvailable = false;
        if (type == "homework") {
          lesson.quiz = {}
        } else {
          lesson.quiz = quiz;
        }
        addLesson(lesson, courseID, seasonID).then(() => {
          setLoader(false);
          alert(
            "Lección Creada"
          )
          router.push({
            pathname: `/admin/Edit`,
            query: { documentID: courseID }
          });
        })
      }
    } else {
      if (lesson.title == '' ||
        lesson.number == '' ||
        lesson.link == '' ||
        lesson.image == '' ||
        lesson.about == '' ||
        lesson.homeWork == '' ||
        lesson.objective == '' ||
        lesson.description == '' ||
        quill == '') {
        setLoader(false);
        alert("Por favor complete todo los campos!");
      } else {
        lesson.homeworkAvailable = true;
        if (type == "homework") {
          lesson.quiz = {}
        } else {
          quiz.folio = uuid()
          lesson.quiz = quiz;
        }
        addLesson(lesson, courseID, seasonID).then(() => {
          setLoader(false);
          alert(
            "Lección Creada"
          )
          router.push({
            pathname: `/admin/Edit`,
            query: { documentID: courseID }
          });
        })
      }
    }
  }
  const getDocuments = (file: any) => {
    let tempExtra: any = [];

    file = Object.values(file);
    file.forEach((element: any) => {
      var reader = new FileReader();
      reader.readAsDataURL(element);
      reader.onload = (_event) => {
        tempExtra.push({ path: reader.result, title: element.name })
      }
    });
    setLesson({ ...lesson, extra: tempExtra })
  }
  const getImage = (file: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      setLesson({ ...lesson, image: reader.result })
    };
  }

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
    setQuiz({ ...tempQuiz })
  }

  const editQuestion = (index: number, content: any) => {
    let tempQuiz = quiz;
    tempQuiz.questions[index].question = content;
  }

  return (
    <Container>
      <TitleContain>
        <Title>Nueva Lección</Title>
      </TitleContain>
      <EditContain>
        <div className="top">
          <Contain1>
            <InputContain>
              <Label>Título de la Lección</Label>
              <Input
                placeholder="Lorem Ipsum"
                onChange={(e) => {
                  setLesson({
                    ...lesson, title: e.target.value
                  })
                }}
              />
            </InputContain>
            <InputContain>
              <Label>Número de Lección</Label>
              <Input
                placeholder="1"
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
                onChange={(e) => {
                  setLesson({
                    ...lesson, link: e.target.value
                  })
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
            <InputContain>
              <Label>Puntos Acreditados</Label>
              <Input
                type="number"
                placeholder="200"
                defaultValue={0}
                onChange={(e) => {
                  setLesson({
                    ...lesson, points: parseInt(e.target.value)
                  })
                }}
              />
            </InputContain>
            <InputContain>
              <Label>Descripción de Lección</Label>
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
                onChange={(e) => {
                  setLesson({
                    ...lesson, about: e.target.value
                  })
                }}
              />
            </InputContain>
            <InputContain>
              <Label>Objetivos</Label>
              <InputBig style={{ height: 100 }}
                placeholder="Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit. Pharetra, cursus sapien ac magna. 
            Consectetur amet eu tincidunt quis."
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
            <QuizContainer>
              <TitleContain>
                <Title>Nuevo Quiz</Title>
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
            </QuizContainer>
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
        ><TransparentButton>Regresar</TransparentButton></Link>
        {
          !loader
            ?
            <PurpleButton
              onClick={newLesson}
            >Guardar</PurpleButton>
            :
            <LoaderContain />
        }

      </ButtonContain>
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
export default AddLesson;