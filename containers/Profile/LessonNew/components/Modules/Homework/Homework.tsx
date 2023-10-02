import React, { useEffect, useState } from "react";

import { BsArrowRepeat, BsFileArrowUp } from "react-icons/bs";

import router from "next/router";
import { HomeWorkContain, TaskTitle } from "./Homework.styled";
import { LoaderContainSpinner } from "../../../../Purchase/Purchase.styled";
import { useAuth } from "../../../../../../hooks/useAuth";
import { uploadImageHomework } from "../../../../../../store/actions/courseActions";
import { addHomeworkApi, getHomeworkUserApi } from "../../../../../../components/api/homeworks";
import { ICourse } from "../../../../../../interfaces/ICourse";
import ImagePreview from "../imagePreview/imagePreview";

interface IHomeWork {
  course: ICourse,
  lesson: any,
  // handleClick: any,
}
const HomeWork = (props: IHomeWork) => {
  const { lesson, course } = props;
  const [status, setStatus] = useState("");
  const [loader, setLoader] = useState(false);
  const [homework, setHomework] = useState<any>();
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [imageDisplay, setImageDisplay] = useState<any>('');
  const [imageLoader, setImageLoader] = useState<boolean>(false);
  const [typeFile, setTypeFile] = useState("");

  const context = useAuth();
  const user = context.user;

  const approvalHomeWork = (file: any) => {
    if (file.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = async (_event) => {
        setImageDisplay(reader.result);
        setImageModal(true);
        setTypeFile(file[0].type)
      }
    }
  }

  const getImage = async (imageAccepted: any) => {
    setImageLoader(true);
    let tempHomework: any = {
      approved: false,
      comment: "",
      image: "",
      lessonId: lesson.id,
      courseId: course.id,
      // seasonId: courseIds.seasonId,
      season: router.query.season,
      lesson: lesson,
      status: false,
      user_id: user.user_id,
      title: lesson.lesson_homeworks.title,
    }
    let tempData = {
      path: imageAccepted,
      lessonId: lesson.id,
      userId: user.user_id
    }
    const url = await uploadImageHomework(tempData);
    tempHomework.image = url;
    //Homework create notification
    addHomeworkApi(tempHomework).then(() => {
      setImageLoader(false);
      alert("Tarea enviada")
      setImageModal(false);
      setStatus("pending");
    })
  }

  useEffect(() => {
    let tempData = {
      lessonId: lesson.id,
      user_id: user.user_id
    }
    getHomeworkUserApi(tempData).then((res) => {
      if (res.data.data.length > 0) {
        let temp = res.data.data[0]
        if (temp.user_id === user.user_id && temp.status === 1 && temp.approved === 0) {
          setHomework(temp);
          setStatus("");
        }
        if (temp.user_id === user.user_id && temp.status === 0) {
          setStatus("pending");
          setHomework("");
        }
        if (temp.user_id === user.user_id && temp.approved === 1) {
          setStatus("approved");
          setHomework("");
        }
      } else {
        setStatus("");
        setHomework("");
      }
    })
  }, [lesson])

  return (
    <>
      <HomeWorkContain >
        {(lesson.quiz === 0) &&
          <div className="complete-hw">
            <div className='right'>
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
              {lesson.homework === 1 ? <div className='upload-container'>
                <p>Tarea: <span>{lesson.lesson_homeworks.title}</span></p>
              </div> :
                <p>Lección sin tarea...</p>}
            </div>
            {
              lesson.homework === 1 &&
              <>
                <p dangerouslySetInnerHTML={{ __html: lesson.lesson_homeworks.about }} className="quill-hw" />
                {(homework && homework.status === 1 && homework.approved === 0 && status !== "pending") && <>
                  <p style={{ color: "#bc1515" }}>Tarea Rechazada</p>
                  <p style={{ color: "#8e2de2" }}>{homework.comment}</p>
                </>}
                {
                  status === "" &&
                  <p style={{ margin: 0 }}>Haz click en el botón “Entregar tarea” para subir tu archivo.</p>
                }
                {status == "" && <div className='homework' onClick={() => { document.getElementById('hide')?.click() }} >
                  <BsFileArrowUp></BsFileArrowUp>
                  Entregar Tarea
                  <input id="hide" type="file" onChange={(e) => { approvalHomeWork(e.target.files) }} onClick={(e: any) => { e.target.value = '' }} hidden />
                </div>}
                {status == "pending" && <div className='homework' style={{ cursor: "none" }}>
                  Tu tarea ha sido enviada y está en espera de evaluación y retroalimentación. En aproximadamente 24 horas obtendrás una respuesta.
                </div>}
                {status == "approved" && <div>
                  <p style={{ color: "#0a980a" }}>Tarea Aprobada</p>
                  <p style={{ color: "#8e2de2" }}>{homework?.comment}</p>
                  {/* Felicidades. Buen trabajo!!! Has aprobado tu tarea. Te invitamos a seguir con la próxima lección. */}
                </div>}
              </>
            }
          </div>}
        {loader && <LoaderContainSpinner />}
        {/* {(data.quiz === 1 && !loader) && <div className='quiz'>
          {step == 0 && <div className='quiz-info'>
            <div className='top'>
              {data.lesson_quizzes?.title && <p className='title'>{data.lesson_quizzes.title}</p>}
              {(!data.lesson_quizzes?.title && userQuizzes?.find((x: any) => x.lesson_id == data.id)) &&
                <p>
                  Ahorita no hay un quiz disponible, su calificación anterior fue: {userQuizzes.find((x: any) => x.lesson_id == data.id).grade}
                </p>}
              {(!data.lesson_quizzes?.title && !userQuizzes?.find((x: any) => x.lesson_id == data.id)) &&
                <p> Ahorita no hay un quiz disponible!
                </p>}
              {data.lesson_quizzes?.title && <div className='circle'>
                <p className='points'>{data.lesson_quizzes.questions.length}</p>
                <p className='sub'>PREGUNTAS</p>
              </div>}
            </div>
            <div className='bottom'>
              {(data.lesson_quizzes?.title) &&
                <div className='quiz-bar-container'>
                  <div className='quiz-bar'>
                    {userQuizzes?.find((x: any) => x.lesson_id == data.id)
                      && <div className='quiz-bar-progress'
                        style={{ width: `${userQuizzes?.find((x: any) => x.lesson_id == data.id).grade}%` }}>
                        <div className='line'>
                          <p className='max'>{Math.floor(userQuizzes?.find((x: any) => x.lesson_id == data.id).grade)} pts</p>
                        </div>
                      </div>}
                    <div className='passing-grade' style={{ left: `calc(${data.lesson_quizzes.passing_grade}% - 58px)` }}>
                      <p style={{
                        color: userQuizzes?.find((x: any) => x.lesson_id == data.id) ? "#FFB800" : "#8628e2"
                      }}
                      >{data.lesson_quizzes?.passing_grade} pts</p>
                      <div className='line'>
                        <p className='minimum'>MINIMO</p>
                      </div>
                    </div>
                  </div>
                  <div className='quiz-bar-points'>{data.lesson_quizzes.points} pts</div>
                </div>}
              {(!userQuizzes?.find((x: any) => x.lesson_id == data.id) && data.lesson_quizzes?.questions.length > 0)
                && <button onClick={() => { setStep(1) }}>Comenzar quiz</button>}

              {(userQuizzes?.find((x: any) => x.lesson_id == data.id) && data.lesson_quizzes?.questions.length > 0) &&
                <button onClick={() => { setStep(1) }}><BsArrowRepeat /> Repetir quiz</button>}
            </div>
          </div>}
          {step == 1 && <div className='question-container'>
            <div className='question-bar'>
              <div className='progress' style={{ width: `${progress}%` }}></div>
            </div>
            <div className='question-title'>
              <p className='title' dangerouslySetInnerHTML={{ __html: data.lesson_quizzes.questions[index].question }}></p>
              <div className='grade'>
                <div className="circle">
                  {Math.floor(points)}
                </div>
                <p>PUNTAJE</p>
              </div>
            </div>
            <ol className='answers' type="a">
              {data.lesson_quizzes.questions[index].answers.map((x: any, idx: number) => {
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
              index !== data.lesson_quizzes.questions.length - 1 ? <button onClick={nextQuestion}>Siguiente</button> :
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
                  <p className='title'>{points >= data.lesson_quizzes.passing_grade ? "FELICIDADES !!!" : "SIGUE INTENTANDO"}</p>
                  <p>{points >= data.lesson_quizzes.passing_grade ? "Aprobaste el quiz" : "No aprobaste la evaluación"} {data.lesson_quizzes?.title} con {counter} {counter == 1 ? "respuesta correcta" : "respuestas correctas"}</p>
                </div>
                <div className="right">
                  <p className='porcent'>{Math.floor(points)}%</p>
                  <p>{counter}/{data.lesson_quizzes?.questions.length} Correctas</p>
                </div>
              </div>
              <div className='quiz-bar-container'>
                <div className='quiz-bar'>
                  {userQuizzes?.find((x: any) => x.lesson_id == data.id)
                    && <div className='quiz-bar-progress'
                      style={{ width: `${userQuizzes?.find((x: any) => x.lesson_id == data.id).grade}%` }}>
                      <div className='line'>
                        <p className='max'>{Math.floor(userQuizzes?.find((x: any) => x.lesson_id == data.id).grade)} pts</p>
                      </div>
                    </div>}
                  <div className='passing-grade' style={{ left: `calc(${data.lesson_quizzes.passing_grade}% - 58px)` }}>
                    <p style={{
                      color: userQuizzes?.find((x: any) => x.lesson_id == data.id) ? "#FFB800" : "#8628e2"
                    }}
                    >{data.lesson_quizzes.passing_grade} pts</p>
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
        </div>} */}
      </HomeWorkContain>
      <ImagePreview
        lesson={lesson.title}
        user={user.name}
        show={imageModal}
        setShow={setImageModal}
        imageDisplay={imageDisplay}
        type={typeFile}
        getImage={getImage}
        loader={imageLoader}
        setImageDisplay={setImageDisplay}
        setTypeFile={setTypeFile}
      />
    </>

  )
}
export default HomeWork;