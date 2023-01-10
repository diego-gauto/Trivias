import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { addHomework, getHomework } from '../../../../../store/actions/courseActions'
import { DownlowadContain, DownloadText, FileIcon, Weight, Pdf } from './Extra.styled'
import { TaskTitle, TaskText, ButtonDiv, UploadButton, UploadIcon, HomeWorkContain, ReviewButton, Answer } from './HomeWork.styled'
import { TitleContain, PositionTitle, Titles, ListIcon, BookIcon, ChatboxIcon, EaselIcon, IconContain, SelectContain, UnSelected } from './Module.styled'
import { BiDownload } from "react-icons/bi";
import { BsFileArrowUp } from "react-icons/bs";
import { BsPlayBtn } from 'react-icons/bs';
import { SlNotebook } from 'react-icons/sl';
import { TfiCommentAlt } from 'react-icons/tfi';
import { number } from 'yup';

const HomeWork = ({ value, setValue, data, user, season, lesson, teacherCreds }: any) => {
  const [status, setStatus] = useState("");
  const [step, setStep] = useState(0);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<any>([]);
  const [verify, setVerify] = useState(false);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    let tempAnswers: any = [];
    data.quiz.questions.forEach((element: any) => {
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
        answerDiv.style.background = "black";
        answerDiv.style.color = "white";
      } else {
        let answerDiv: any = document.getElementById(index + "answer" + idxAnswer)
        answerDiv.style.background = "none";
        answerDiv.style.color = "black";
      }
    });

    answers[index] = value;
    setAnswers(answers);
  }

  const checkAnswer = () => {
    let score = data.quiz.points / data.quiz.questions.length;
    if (answers[index].length == 0) {
      alert("Seleccione una opción!")
    } else {
      setVerify(true);
      if (data.quiz.questions[index].answers[answers[index]].status) {
        let tempPoints = points;
        tempPoints += score;
        setPoints(tempPoints);
      }
    }
  }

  const nextQuestion = () => {
    setVerify(false);
    setIndex(index + 1);
    data.quiz.questions[index].answers.forEach((element: any, idxAnswer: number) => {
      let answerDiv: any = document.getElementById(index + "answer" + idxAnswer)
      answerDiv.style.background = "none";
      answerDiv.style.color = "black";
    });
  }

  const checkQuiz = () => {
    setVerify(false);
    console.log(points);
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
              <p>Quiz: {data.quiz.title}</p>
              <p>Para aprobar el quiz es necesario obtener {data.quiz.passingGrade} puntos o más</p>
              <button onClick={() => { setStep(1) }}>Comenzar quiz</button>
            </div>}
            {step == 1 && <div className='question-container'>
              <div className='question-title'>
                <p>{index + 1}.</p>
                <p dangerouslySetInnerHTML={{ __html: data.quiz.questions[index].question }}></p>
              </div>
              <div className='answers'>
                {data.quiz.questions[index].answers.map((x: any, idx: number) => {
                  return (
                    <Answer id={index + "answer" + idx} key={"answers" + idx} veryfy={verify} correct={x.status} onClick={() => {
                      addAnswer(idx);
                    }}>
                      {x.answer}
                    </Answer>
                  )
                })}
              </div>
              {!verify ? <button onClick={() => {
                checkAnswer()
              }}>Verificar</button> :
                index !== data.quiz.questions.length - 1 ? <button onClick={nextQuestion}>Siguiente</button> :
                  <button onClick={() => {
                  }}>Terminar Quiz</button>}
            </div>}
          </div>}
      </HomeWorkContain>
    </>

  )
}
export default HomeWork;