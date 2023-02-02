import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { addHomework, getHomework, updateProgressStatus } from '../../../../../store/actions/courseActions'
import { DownlowadContain, DownloadText, FileIcon, Weight, Pdf } from './Extra.styled'
import { TaskTitle, TaskText, ButtonDiv, UploadButton, UploadIcon, HomeWorkContain, ReviewButton, Answer } from './HomeWork.styled'
import { TitleContain, PositionTitle, Titles, ListIcon, BookIcon, ChatboxIcon, EaselIcon, IconContain, SelectContain, UnSelected } from './Module.styled'
import { BsArrowRepeat } from "react-icons/bs";
import { BsFileArrowUp } from "react-icons/bs";
import { BsPlayBtn } from 'react-icons/bs';
import { SlNotebook } from 'react-icons/sl';
import { TfiCommentAlt } from 'react-icons/tfi';
import { updateUser } from '../../../../../store/actions/UserActions';
import progress from 'antd/es/progress';


const HomeWork = ({ value, setValue, data, user, season, lesson, teacherCreds }: any) => {
  const [status, setStatus] = useState("");
  const [step, setStep] = useState(0);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<any>([]);
  const [verify, setVerify] = useState(false);
  const [points, setPoints] = useState(0);
  const [grade, setGrade] = useState(0);
  const [next, setNext] = useState(0);
  const [progress, setProgress] = useState(0);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let tempAnswers: any = [];
    setNext(100 / data.quiz?.questions.length);
    setProgress(100 / data.quiz?.questions.length)
    data.quiz?.questions.forEach((element: any) => {
      tempAnswers.push([]);
    });
    setAnswers(tempAnswers);
  }, [])


  useEffect(() => {
    getHomework(data.id, user.id).then((res: any) => {
      if (res) {
        if (!res.status) {
          setStatus("pending");
        }
        if (res.status && res.aproved) {
          setStatus("aproved")
        }
        if (res.status && !res.aproved) {
          setStatus("")
        }
      } else {
        setStatus("")
      }
    })
  }, [data])

  const getImage = (file: any) => {
    let tempHomework: any = {}
    tempHomework.userName = user.name;
    tempHomework.userEmail = user.email;
    tempHomework.title = data.homeWork;
    tempHomework.path = '';
    tempHomework.season = parseInt(season);
    tempHomework.lesson = parseInt(lesson);
    tempHomework.createdAt = new Date();
    tempHomework.courseId = data.courseId;
    tempHomework.userId = user.id;
    tempHomework.lessonId = data.id;
    tempHomework.seasonId = ""
    tempHomework.aproved = false
    tempHomework.comment = ""
    tempHomework.teacherCreds = teacherCreds;
    tempHomework.status = false;

    if (file.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = (_event) => {
        tempHomework.path = reader.result;
        addHomework(tempHomework, user.id).then(() => {
          alert("Su tarea se subió correctamente!");
          setStatus("pending");
        })
      };
    }
  }

  const uploadHwk = () => {
    document.getElementById('hide')?.click()
  }

  const addAnswer = (value: number) => {
    data.quiz.questions[index].answers.forEach((element: any, idxAnswer: number) => {
      if (value == idxAnswer) {
        let answerDiv: any = document.getElementById(index + "answer" + idxAnswer)
        answerDiv.style.background = "#a14cf5";
        answerDiv.style.color = "white";
      } else {
        let answerDiv: any = document.getElementById(index + "answer" + idxAnswer)
        answerDiv.style.background = "linear-gradient(270deg, #d0b1ee 0.52%, #d7beef 100%)";
        answerDiv.style.color = "#8100f0";
      }
    });

    answers[index] = value;
    setAnswers(answers);
  }

  const checkAnswer = () => {
    let score = 100 / data.quiz.questions.length;
    let total = data.quiz.points / data.quiz.questions.length;

    if (answers[index].length == 0) {
      alert("Seleccione una opción!")
    } else {
      setVerify(true);
      if (data.quiz.questions[index].answers[answers[index]].status) {
        let tempPoints = points;
        tempPoints += score;
        let tempTotal = grade;
        tempTotal += total;
        let tempCounter = counter;
        tempCounter++;
        setGrade(tempTotal);
        setPoints(tempPoints);
        setCounter(tempCounter);
      }
    }
  }

  const nextQuestion = () => {
    setVerify(false);
    setIndex(index + 1);
    setProgress(progress + next);
    data.quiz.questions[index].answers.forEach((element: any, idxAnswer: number) => {
      let answerDiv: any = document.getElementById(index + "answer" + idxAnswer)
      answerDiv.style.background = "linear-gradient(270deg, #d0b1ee 0.52%, #d7beef 100%)";
      answerDiv.style.color = "#8100f0";
    });
  }

  const checkQuiz = () => {
    setStep(2);
    if (!("quizzes" in user)) {
      user.score = user.score + grade;
      if (points >= data.quiz.passingGrade) {
        let tempIndex = data.progress.findIndex((x: any) => x.id == user.id);
        data.progress[tempIndex].status = true;
        updateProgressStatus(data.progress, data.courseId, data.seasonId, data.id);
      }
      user.quizzes = [];
      user.quizzes.push({ courseId: data.courseId, grade: points, lesson: parseInt(lesson), season: parseInt(season), folio: "" });
      updateUser(user, user.id);
    } else {
      if (points >= data.quiz.passingGrade) {
        let tempIndex = data.progress.findIndex((x: any) => x.id == user.id);
        data.progress[tempIndex].status = true;
        updateProgressStatus(data.progress, data.courseId, data.seasonId, data.id);
      }
      if (user.quizzes.find((x: any) => x.courseId == data.courseId && x.season == season && x.lesson == lesson)) {
        let tempIndex = user.quizzes.findIndex((x: any) => x.courseId == data.courseId && x.season == season && x.lesson == lesson);
        // user.quizzes[tempIndex].grade = points;
      } else {
        user.score = user.score + grade;
        user.quizzes.push({ courseId: data.courseId, grade: points, lesson: parseInt(lesson), season: parseInt(season), folio: "" });
      }
      updateUser(user, user.id);
    }
  }

  const finish = () => {
    setStep(0);
    setIndex(0);
    setVerify(false);
    setProgress(next);
    setPoints(0);
    setGrade(0);
    setCounter(0);
    let tempAnswers: any = [];
    data.quiz.questions.forEach((element: any) => {
      tempAnswers.push([]);
    });
    setAnswers(tempAnswers);
  }

  return (
    <>
      <TitleContain >
        <Titles onClick={() => {
          setValue(1)
        }}>
          <BsPlayBtn></BsPlayBtn>
          Acerca del curso
        </Titles>
        {<PositionTitle position={value}>
          <SlNotebook></SlNotebook>
          Evaluación
        </PositionTitle>}
        <Titles onClick={() => {
          setValue(4)
        }}>
          <TfiCommentAlt></TfiCommentAlt>
          Comentarios
        </Titles>
        <div className='line'></div>
      </TitleContain>
      <HomeWorkContain>
        {(data.type == "homework" || !("type" in data)) ? <div className='right'>
          <TaskTitle style={{ color: "#f78803" }}>
            Sube aquí tus prácticas <br />
            <span>
              Da click en el botón correspondiente <br />
              y sube tu tarea manualmente.
            </span>
          </TaskTitle>
          <div className='upload-info'>
            <p className='title'>Tamaño máximo: <b>5 Mb</b></p>
            <p className='title'>Formatos permitidos:</p>
            <div className='files'>
              <p>PNG</p>
              <div className='line'></div>
              <p>JPG</p>
              <div className='line'></div>
              <p>DOC</p>
              <div className='line'></div>
              <p>DOCX</p>
              <div className='line'></div>
              <p>PPT</p>
              <div className='line'></div>
              <p>PPTX</p>
              <div className='line'></div>
              <p>PDF</p>
            </div>
          </div>
          <div className='line'></div>
          {data.homeworkAvailable ? <div className='upload-container'>
            <p>a. Módulo {parseInt(season) + 1} - Lección {parseInt(lesson) + 1}</p>
            <p>Tarea: <span>{data.homeWork}</span></p>
            {status == "" && <div className='homework' onClick={uploadHwk}>
              <BsFileArrowUp></BsFileArrowUp>
              Subir Tarea
              <input id="hide" type="file" onChange={(e) => { getImage(e.target.files) }} hidden />
            </div>}
            {status == "pending" && <div className='homework'>
              <BsFileArrowUp></BsFileArrowUp>
              En Revisión
            </div>}
            {status == "aproved" && <div className='homework'>
              <BsFileArrowUp></BsFileArrowUp>
              Tarea Aprobada
            </div>}
          </div> :
            <p>Lección sin tarea...</p>}
        </div> :
          <div className='quiz'>
            {step == 0 && <div className='quiz-info'>
              <div className='top'>
                {data.quiz?.title && <p className='title'>{data.quiz.title}</p>}
                {(!data.quiz?.title && user.quizzes?.find((x: any) => x.courseId == data.courseId && x.season == season && x.lesson == lesson)) &&
                  <p>
                    Ahorita no hay un quiz disponible, su calificación anterior fue: {user.quizzes.find((x: any) => x.courseId == data.courseId && x.season == season && x.lesson == lesson).grade}
                  </p>}
                {(!data.quiz?.title && !user.quizzes?.find((x: any) => x.courseId == data.courseId && x.season == season && x.lesson == lesson)) &&
                  <p> Ahorita no hay un quiz disponible!
                  </p>}
                {data.quiz?.title && <div className='circle'>
                  <p className='points'>{data.quiz.questions.length}</p>
                  <p className='sub'>PREGUNTAS</p>
                </div>}
              </div>
              <div className='bottom'>
                {(data.quiz?.title) &&
                  <div className='quiz-bar-container'>
                    <div className='quiz-bar'>
                      {user.quizzes?.find((x: any) => x.courseId == data.courseId && x.season == season && x.lesson == lesson)
                        && <div className='quiz-bar-progress'
                          style={{ width: `${user.quizzes?.find((x: any) => x.courseId == data.courseId && x.season == season && x.lesson == lesson).grade}%` }}>
                          <div className='line'>
                            <p className='max'>{Math.floor(user.quizzes?.find((x: any) => x.courseId == data.courseId && x.season == season && x.lesson == lesson).grade)} pts</p>
                          </div>
                        </div>}
                      <div className='passing-grade' style={{ left: `calc(${data.quiz.passingGrade}% - 58px)` }}>
                        <p style={{
                          color: user.quizzes?.find((x: any) => x.courseId == data.courseId && x.season == season && x.lesson == lesson) ? "#FFB800" : "#8628e2"
                        }}
                        >{data.quiz?.passingGrade} pts</p>
                        <div className='line'>
                          <p className='minimum'>MINIMO</p>
                        </div>
                      </div>
                    </div>
                    <div className='quiz-bar-points'>100 pts</div>
                  </div>}
                {(!user.quizzes?.find((x: any) => x.courseId == data.courseId && x.season == season && x.lesson == lesson) && data.quiz?.questions.length > 0)
                  && <button onClick={() => { setStep(1) }}>Comenzar quiz</button>}

                {(user.quizzes?.find((x: any) => x.courseId == data.courseId && x.season == season && x.lesson == lesson) && data.quiz?.questions.length > 0) &&
                  <button onClick={() => { setStep(1) }}><BsArrowRepeat /> Repetir quiz</button>}
              </div>
            </div>}
            {step == 1 && <div className='question-container'>
              <div className='question-bar'>
                <div className='progress' style={{ width: `${progress}%` }}></div>
              </div>
              <div className='question-title'>
                <p className='title' dangerouslySetInnerHTML={{ __html: data.quiz.questions[index].question }}></p>
                <div className='grade'>
                  <div className="circle">
                    {Math.floor(points)}
                  </div>
                  <p>PUNTAJE</p>
                </div>
              </div>
              <ol className='answers' type="a">
                {data.quiz.questions[index].answers.map((x: any, idx: number) => {
                  return (
                    <Answer id={index + "answer" + idx} key={"answers" + idx} veryfy={verify} correct={x.status} onClick={() => {
                      addAnswer(idx);
                    }}>
                      {idx == 0 && <div className='left'>A</div>}
                      {idx == 1 && <div className='left'>B</div>}
                      {idx == 2 && <div className='left'>C</div>}
                      {idx == 3 && <div className='left'>D</div>}
                      {idx == 4 && <div className='left'>E</div>}
                      {idx == 5 && <div className='left'>F</div>}
                      <p>{x.answer}</p>
                    </Answer>
                  )
                })}
              </ol>
              {!verify ? <button onClick={() => {
                checkAnswer()
              }}>VERIFICAR</button> :
                index !== data.quiz.questions.length - 1 ? <button onClick={nextQuestion}>Siguiente</button> :
                  <button onClick={() => {
                    checkQuiz()
                  }}>Terminar Quiz</button>}
            </div>}
            {step == 2 &&
              <div className='done-container'>
                <div className='bar'>
                  <div className='progress' style={{ width: `${progress}%` }}></div>
                </div>
                <div className='quiz-results'>
                  <div className="left">
                    <p className='title'>{points >= data.quiz.passingGrade ? "FELICIDADES !!!" : "SIGUE INTENTANDO"}</p>
                    <p>{points >= data.quiz.passingGrade ? "Aprobaste el quiz" : "No aprobaste la evaluación"} {data.quiz?.title} con {counter} {counter == 1 ? "respuesta correcta" : "respuestas correctas"}</p>
                  </div>
                  <div className="right">
                    <p className='porcent'>{Math.floor(points)}%</p>
                    <p>{counter}/{data.quiz?.questions.length} Correctas</p>
                  </div>
                </div>
                <div className='quiz-bar-container'>
                  <div className='quiz-bar'>
                    {user.quizzes?.find((x: any) => x.courseId == data.courseId && x.season == season && x.lesson == lesson)
                      && <div className='quiz-bar-progress'
                        style={{ width: `${user.quizzes?.find((x: any) => x.courseId == data.courseId && x.season == season && x.lesson == lesson).grade}%` }}>
                        <div className='line'>
                          <p className='max'>{Math.floor(user.quizzes?.find((x: any) => x.courseId == data.courseId && x.season == season && x.lesson == lesson).grade)} pts</p>
                        </div>
                      </div>}
                    <div className='passing-grade' style={{ left: `calc(${data.quiz.passingGrade}% - 58px)` }}>
                      <p style={{
                        color: user.quizzes?.find((x: any) => x.courseId == data.courseId && x.season == season && x.lesson == lesson) ? "#FFB800" : "#8628e2"
                      }}
                      >{data.quiz.passingGrade} pts</p>
                      <div className='line'>
                        <p className='minimum'>MINIMO</p>
                      </div>
                    </div>
                  </div>
                  <div className='quiz-bar-points'>100 pts</div>
                </div>
                <button onClick={() => { finish() }}>FINALIZAR</button>
              </div>
            }
          </div>}
      </HomeWorkContain>
    </>

  )
}
export default HomeWork;