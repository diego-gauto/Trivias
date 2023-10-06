import React, { useEffect, useState } from "react";

import { BsArrowRepeat, BsFileArrowUp } from "react-icons/bs";

import router from "next/router";
import { Bottom, DoneContainer, QuestionContainer, QuizContainer, Top } from "./Quiz.styled";
import progress from "antd/es/progress";
import { verify } from "crypto";
import { Answer } from "../Homework.styled";
import { getUserQuizApi, updateUserProgressByQuizApi, updateUserQuizApi, updateUserScoreApi } from "../../../../../../../components/api/lessons";
import { useCourse } from "../../../../../../../hooks/useLesson";

interface IQuiz {
  lesson: any,
  user: any;
}
const Quiz = (props: IQuiz) => {
  const { lesson, user } = props;
  const { reload } = useCourse();
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [next, setNext] = useState(0);
  const [progress, setProgress] = useState(0);
  const [counter, setCounter] = useState(0);
  const [answers, setAnswers] = useState<any>([]);
  const [userQuizzes, setUserQuizzes] = useState<any>([]);
  const [verify, setVerify] = useState(false);
  const [points, setPoints] = useState(0);
  const [grade, setGrade] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getUserQuiz();
    let tempAnswers: any = [];
    setNext(100 / lesson.lesson_quizzes?.questions.length);
    setProgress(100 / lesson.lesson_quizzes?.questions.length)
    lesson.lesson_quizzes?.questions.forEach((element: any) => {
      tempAnswers.push([]);
    });
    setAnswers(tempAnswers);

  }, [lesson])

  const getUserQuiz = () => {
    let temp = {
      lessonId: lesson.id,
      userId: user.user_id
    }
    getUserQuizApi(temp).then((res) => {
      setUserQuizzes([...res.data.data])
    })
  }

  const nextQuestion = () => {
    setVerify(false);
    setIndex(index + 1);
    setProgress(progress + next);
    lesson.lesson_quizzes.questions[index].answers.forEach((element: any, idxAnswer: number) => {
      let answerDiv: any = document.getElementById(index + "answer" + idxAnswer)
      answerDiv.style.background = "linear-gradient(270deg, #d0b1ee 0.52%, #d7beef 100%)";
      answerDiv.style.color = "#8100f0";
    });
  }

  const addAnswer = (value: number) => {
    lesson.lesson_quizzes.questions[index].answers.forEach((element: any, idxAnswer: number) => {
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
    let score = 100 / lesson.lesson_quizzes.questions.length;
    let total = lesson.lesson_quizzes.points / lesson.lesson_quizzes.questions.length;

    if (answers[index].length == 0) {
      alert("Seleccione una opción!")
    } else {
      setVerify(true);
      if (lesson.lesson_quizzes.questions[index].answers[answers[index]].status) {
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

  const checkQuiz = async () => {
    setLoader(true);
    let progress = {
      lessonId: lesson.id,
      user_id: user.user_id
    }
    let tempQuiz = {
      lessonId: lesson.id,
      userId: user.user_id,
      grade: grade,
      quizId: lesson.lesson_quizzes.id
    }
    let tempData = {
      points: user.score + grade,
      userId: user.user_id,
    }
    setStep(2);
    if (userQuizzes.length === 0) {
      if (points >= lesson.lesson_quizzes.passing_grade) {
        let tempIndex = lesson.progress.findIndex((x: any) => x.user_id === user.user_id);
        lesson.progress[tempIndex].status = true;
        await updateUserProgressByQuizApi(progress);
      }
      await updateUserScoreApi(tempData);
      await updateUserQuizApi(tempQuiz);
    } else {
      if (points >= lesson.lesson_quizzes.passing_grade) {
        let tempIndex = lesson.progress.findIndex((x: any) => x.user_id === user.user_id);
        lesson.progress[tempIndex].status = true;
        await updateUserProgressByQuizApi(progress);
        if (userQuizzes.find((x: any) => x.lesson_id == lesson.id)) {
          await updateUserQuizApi(tempQuiz);
        } else {
          await updateUserScoreApi(tempData);
          await updateUserQuizApi(tempQuiz);
        }
      }
    }
    reload()
    setLoader(false);
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
    lesson.lesson_quizzes.questions.forEach((element: any) => {
      tempAnswers.push([]);
    });
    setAnswers(tempAnswers);
  }

  return (
    <QuizContainer>
      {step == 0 && <div className='quiz-info'>
        <Top>
          {lesson.lesson_quizzes.title && <h2>{lesson.lesson_quizzes.title}</h2>}
          {(!lesson.lesson_quizzes?.title && userQuizzes?.find((x: any) => x.lesson_id == lesson.id)) &&
            <p>
              Ahorita no hay un quiz disponible, su calificación anterior fue: {userQuizzes.find((x: any) => x.lesson_id == lesson.id).grade}
            </p>}
          {(!lesson.lesson_quizzes?.title && !userQuizzes?.find((x: any) => x.lesson_id == lesson.id)) &&
            <p> Ahorita no hay un quiz disponible!
            </p>}
          {lesson.lesson_quizzes?.title && <div className='circle'>
            <p className='points'>{lesson.lesson_quizzes.questions.length}</p>
            <p className='sub'>PREGUNTAS</p>
          </div>}
        </Top>
        <Bottom>
          {(lesson.lesson_quizzes?.title) &&
            <div className='quiz-bar-container'>
              <div className='quiz-bar'>
                {userQuizzes?.find((x: any) => x.lesson_id == lesson.id)
                  && <div className='quiz-bar-progress'
                    style={{ width: `${userQuizzes?.find((x: any) => x.lesson_id == lesson.id).grade}%` }}>
                    <div className='line'>
                      <p className='max'>{Math.floor(userQuizzes?.find((x: any) => x.lesson_id == lesson.id).grade)} pts</p>
                    </div>
                  </div>}
                <div className='passing-grade' style={{ left: `calc(${lesson.lesson_quizzes.passing_grade}% - 58px)` }}>
                  <p style={{
                    color: userQuizzes?.find((x: any) => x.lesson_id == lesson.id) ? "#FFB800" : "#8628e2"
                  }}
                  >{lesson.lesson_quizzes?.passing_grade} pts</p>
                  <div className='line'>
                    <p className='minimum'>MINIMO</p>
                  </div>
                </div>
              </div>
              <div className='quiz-bar-points'>{lesson.lesson_quizzes.points} pts</div>
            </div>}
          {(!userQuizzes?.find((x: any) => x.lesson_id == lesson.id) && lesson.lesson_quizzes?.questions.length > 0)
            && <button onClick={() => { setStep(1) }}>Comenzar quiz</button>}

          {(userQuizzes?.find((x: any) => x.lesson_id == lesson.id) && lesson.lesson_quizzes?.questions.length > 0) &&
            <button onClick={() => { setStep(1) }}><BsArrowRepeat /> Repetir quiz</button>}
        </Bottom>
      </div>}

      {step == 1 && <QuestionContainer >
        <div className='question-bar'>
          <div className='progress' style={{ width: `${progress}%` }}></div>
        </div>
        <div className='question-title'>
          <h2 dangerouslySetInnerHTML={{ __html: lesson.lesson_quizzes.questions[index].question }}></h2>
          <div className='grade'>
            <div className="circle">
              {Math.floor(points)}
            </div>
            <p>PUNTAJE</p>
          </div>
        </div>
        <ol className='answers' type="a">
          {lesson.lesson_quizzes.questions[index].answers.map((x: any, idx: number) => {
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
          index !== lesson.lesson_quizzes.questions.length - 1 ? <button onClick={nextQuestion}>Siguiente</button> :
            <button onClick={() => {
              checkQuiz()
            }}>Terminar Quiz</button>}
      </QuestionContainer>}
      {step == 2 &&
        <DoneContainer >
          <div className='bar'>
            <div className='progress' style={{ width: `${progress}%` }}></div>
          </div>
          <div className='quiz-results'>
            <div className="left">
              <h2>{points >= lesson.lesson_quizzes.passing_grade ? "FELICIDADES !!!" : "SIGUE INTENTANDO"}</h2>
              <p>{points >= lesson.lesson_quizzes.passing_grade ? "Aprobaste el quiz" : "No aprobaste la evaluación"} {lesson.lesson_quizzes?.title} con {counter} {counter == 1 ? "respuesta correcta" : "respuestas correctas"}</p>
            </div>
            <div className="right">
              <p className='porcent'>{Math.floor(points)}%</p>
              <p>{counter}/{lesson.lesson_quizzes?.questions.length} Correctas</p>
            </div>
          </div>
          <div className='quiz-bar-container'>
            <div className='quiz-bar'>
              {userQuizzes?.find((x: any) => x.lesson_id == lesson.id)
                && <div className='quiz-bar-progress'
                  style={{ width: `${userQuizzes?.find((x: any) => x.lesson_id == lesson.id).grade}%` }}>
                  <div className='line'>
                    <p className='max'>{Math.floor(userQuizzes?.find((x: any) => x.lesson_id == lesson.id).grade)} pts</p>
                  </div>
                </div>}
              <div className='passing-grade' style={{ left: `calc(${lesson.lesson_quizzes.passing_grade}% - 58px)` }}>
                <p style={{
                  color: userQuizzes?.find((x: any) => x.lesson_id == lesson.id) ? "#FFB800" : "#8628e2"
                }}
                >{lesson.lesson_quizzes.passing_grade} pts</p>
                <div className='line'>
                  <p className='minimum'>MINIMO</p>
                </div>
              </div>
            </div>
            <div className='quiz-bar-points'>100 pts</div>
          </div>
          <button onClick={() => { finish() }}>FINALIZAR</button>
        </DoneContainer>
      }
    </QuizContainer>
  )
}
export default Quiz;