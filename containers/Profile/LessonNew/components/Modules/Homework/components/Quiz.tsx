import React, { useEffect, useState } from "react";

import { BsArrowRepeat, BsCheckCircleFill, BsFileArrowUp } from "react-icons/bs";

import router from "next/router";
import { Bottom, DoneContainer, QuestionContainer, QuizContainer, QuizStatus, Top } from "./Quiz.styled";
import progress from "antd/es/progress";
import { verify } from "crypto";
import { Answer } from "../Homework.styled";
import { UserQuiz, getUserQuizApi, updateUserProgressByQuizApi, updateUserQuizApi, updateUserScoreApi } from "../../../../../../../components/api/lessons";
import { useCourse } from "../../../../../../../hooks/useLesson";
import { GiDonerKebab } from "react-icons/gi";
import { user } from "firebase-functions/v1/auth";
import { reload } from "firebase/auth";
import next from "next";
import lesson from "../../../../../../../pages/lesson";

export interface Lesson {
  id: number
  about: string
  banner: string
  duration: number
  homework: number
  quiz: number
  link: string
  number: number
  points: number
  title: string
  seasons_id: number
  objectives: string
  extra_material: string
  lesson_material: LessonMaterial[]
  users: number[]
  progress: Progress[]
  lesson_quizzes: LessonQuizzes
}

export interface LessonMaterial {
  material: string
  title: string
}

export interface Progress {
  id: number
  user_id: number
  seconds: number
  time?: number
  lessons_id: number
  status: number
}

export interface LessonQuizzes {
  lessons_id: number
  title: string
  points: number
  passing_grade: number
  id: number
  questions: Question[]
}

export interface Question {
  quizzes_id: number
  question: string
  id: number
  answers: Answer[]
}

export interface Answer {
  questions_id: number
  answer: string
  status: number
  id: number
}

interface IQuiz {
  lesson: Lesson,
  user: any;
}

const Quiz = (props: IQuiz) => {
  const { lesson, user } = props;
  const { reload } = useCourse();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [next, setNext] = useState(0);
  const [progress, setProgress] = useState(0);
  const [counter, setCounter] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [userQuizzes, setUserQuizzes] = useState<UserQuiz[]>([]);
  const [verify, setVerify] = useState(false);
  const [points, setPoints] = useState(0);
  const [grade, setGrade] = useState(0);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(true);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getUserQuiz();
    let tempAnswers: any = [];
    setNext(100 / lesson.lesson_quizzes?.questions.length);
    setProgress(100 / lesson.lesson_quizzes?.questions.length);
    lesson.lesson_quizzes?.questions.forEach((element: any) => {
      tempAnswers.push([]);
    });
    setAnswers(tempAnswers);

  }, [lesson])

  const getUserQuiz = async () => {
    let temp = {
      lessonId: lesson.id,
      userId: user.user_id
    }
    try {
      const res = await getUserQuizApi(temp);
      setUserQuizzes([...res.data.data]);
      setIsLoadingQuiz(false);
    } catch (error) {
      console.error(error);
    }
  }

  const nextQuestion = () => {
    setVerify(false);
    setQuestionIndex(questionIndex + 1);
    setProgress(progress + next);
    const question = lesson.lesson_quizzes.questions[questionIndex];
    if (question !== undefined) {
      question.answers.forEach((element, idxAnswer: number) => {
        let answerDiv = document.getElementById(questionIndex + "answer" + idxAnswer)
        if (answerDiv !== null) {
          answerDiv.style.background = "linear-gradient(270deg, #d0b1ee 0.52%, #d7beef 100%)";
          answerDiv.style.color = "#8100f0";
        }
      });
    }

  }

  const addAnswer = (value: number) => {
    const question = lesson.lesson_quizzes.questions[questionIndex];
    if (question === undefined) {
      return;
    }
    question.answers.forEach((element: any, idxAnswer: number) => {
      if (value == idxAnswer) {
        let answerDiv: any = document.getElementById(questionIndex + "answer" + idxAnswer)
        answerDiv.style.background = "#a14cf5";
        answerDiv.style.color = "white";
      } else {
        let answerDiv: any = document.getElementById(questionIndex + "answer" + idxAnswer)
        answerDiv.style.background = "linear-gradient(270deg, #d0b1ee 0.52%, #d7beef 100%)";
        answerDiv.style.color = "#8100f0";
      }
    });

    answers[questionIndex] = value;
    setAnswers(answers);
  };

  const checkAnswer = () => {
    debugger;
    let score = 100 / lesson.lesson_quizzes.questions.length;
    let total =
      lesson.lesson_quizzes.points / lesson.lesson_quizzes.questions.length;

    const selectedAnswer = answers[questionIndex];
    if (selectedAnswer === undefined) {
      alert("Seleccione una opción!");
      return;
    }
    const question = lesson.lesson_quizzes.questions[questionIndex];
    if (question === undefined) {
      return;
    }
    setVerify(true);
    const answerIndex = answers[questionIndex];
    if (answerIndex === undefined) {
      return;
    }
    const answer = question.answers[answerIndex];
    if (answer === undefined) {
      return;
    }
    if (answer.status) {
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

  const checkQuiz = async () => {
    if (!lesson) {
      return;
    }
    setLoader(true);
    let progress = {
      lessonId: lesson.id,
      user_id: user.user_id,
    };
    let quiz = {
      lessonId: lesson.id,
      userId: user.user_id,
      grade: grade,
      quizId: lesson.lesson_quizzes.id,
    };
    let score = {
      points: user.score + grade,
      userId: user.user_id,
    };
    debugger;
    setStep(2);
    await updateUserQuizApi(quiz);
    const gradePercent = generateGradePercent(lesson.id);
    if (gradePercent >= lesson.lesson_quizzes?.passing_grade) {
      let currentUserIndex = lesson.progress.findIndex((progress) => progress.user_id === user.user_id);
      if (lesson.progress[currentUserIndex]) {
        lesson.progress[currentUserIndex].status = 1;
      }
      // Actualiza para que el usuario tiene el progreso de esa lección, solo si existe el registro
      await updateUserProgressByQuizApi(progress);
    }
    if (!userQuizzes.find((quiz) => quiz.lesson_id == lesson.id)) {
      await updateUserScoreApi(score);
    }
    reload();
    setLoader(false);
  };

  const finish = () => {
    setStep(0);
    setQuestionIndex(0);
    setVerify(false);
    setProgress(next);
    setPoints(0);
    setGrade(0);
    setCounter(0);
    const tempAnswers: any[] = [];
    lesson.lesson_quizzes.questions.forEach((element: any) => {
      tempAnswers.push([]);
    });
    setAnswers(tempAnswers);
  }

  const generateGradePercent = (lessonId: number) => {
    const quiz = userQuizzes.find((quiz) => quiz.lesson_id == lessonId);
    const grade = quiz ? quiz.grade : 0;
    const { points } = lesson.lesson_quizzes;

    return (grade / points) * 100;
  }

  const getUserQuizGrade = () => {
    const quiz = userQuizzes.find((quiz) => quiz.lesson_id == lesson.id);
    return quiz ? quiz.grade : 0;
  }

  if (isLoadingQuiz) {
    return (<>
    </>);
  }

  if (Math.floor(generateGradePercent(lesson.id)) >= lesson.lesson_quizzes?.passing_grade) {
    return (
      <QuizStatus color="#00CC99" rgb={"rgb(213,227,232)"} text="#006b51" icon="#00CC99">
        <BsCheckCircleFill className="icon" />
        <div className="right-data">
          <p className="title">Quiz aprobado</p>
          <p className="content">
            Haz logrado finalizar este examen con el puntaje necesario, ¡felicidades!
          </p>
        </div>
      </QuizStatus>
    )
  }

  return (
    <QuizContainer>
      {step == 0 && (
        <div className="quiz-info">
          <Top>
            {lesson.lesson_quizzes.title && <h2>{lesson.lesson_quizzes.title}</h2>}
            {(!lesson.lesson_quizzes?.title && userQuizzes?.find((x: any) => x.lesson_id == lesson.id)) &&
              <p>
                Ahorita no hay un quiz disponible, su calificación anterior fue: {getUserQuizGrade()}
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
                      style={{ width: `${generateGradePercent(lesson.id)}%` }}>
                      <div className='line'>
                        <p className='max'>{
                          Math.floor(generateGradePercent(lesson.id))
                        } pts</p>
                      </div>
                    </div>}
                  <div
                    className='passing-grade'
                    style={{
                      left: `calc(${lesson.lesson_quizzes.passing_grade}% - 8px)`
                    }}>
                    <div className='line'>
                      <p className='minimum-top'>{lesson.lesson_quizzes?.passing_grade}%</p>
                      <p className='minimum'>MINIMO</p>
                    </div>
                  </div>
                  <div className="quiz-bar-points">
                    {lesson.lesson_quizzes.points} pts
                  </div>
                </div>
              </div>
            }
            {!userQuizzes?.find((x: any) => x.lesson_id == lesson.id) &&
              lesson.lesson_quizzes?.questions.length > 0 && (
                <button
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  Comenzar quiz
                </button>
              )}

            {userQuizzes?.find((x: any) => x.lesson_id == lesson.id) &&
              lesson.lesson_quizzes?.questions.length > 0 && (
                <button
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  <BsArrowRepeat /> Repetir quiz
                </button>
              )}
          </Bottom>
        </div>
      )}
      {step == 1 && (
        <QuestionContainer>
          <div className="question-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="question-title">
            <h2 dangerouslySetInnerHTML={
              { __html: lesson!.lesson_quizzes.questions[questionIndex]!.question }
            }></h2>

            <div className="grade">
              <div className="circle">{Math.floor(points)}</div>
              <p>PUNTAJE</p>
            </div>
          </div>
          <ol className="answers" type="a">
            {
              lesson.lesson_quizzes.questions[questionIndex] !== undefined &&
              lesson.lesson_quizzes.questions[questionIndex]!.answers.map((answer, index) => {
                return (
                  <Answer id={questionIndex + "answer" + index} key={"answers" + index} veryfy={verify} correct={answer.status === 1} onClick={() => {
                    addAnswer(index);
                  }}>
                    {index == 0 && <div className='left'>A</div>}
                    {index == 1 && <div className='left'>B</div>}
                    {index == 2 && <div className='left'>C</div>}
                    {index == 3 && <div className='left'>D</div>}
                    {index == 4 && <div className='left'>E</div>}
                    {index == 5 && <div className='left'>F</div>}
                    <p>{answer.answer}</p>
                  </Answer>
                )
              })}
          </ol>
          {!verify ? (
            <button
              onClick={() => {
                checkAnswer();
              }}
            >
              VERIFICAR
            </button>
          ) : questionIndex !== lesson.lesson_quizzes.questions.length - 1 ? (
            <button onClick={nextQuestion}>Siguiente</button>
          ) : (
            <button
              onClick={() => {
                checkQuiz();
              }}
            >
              Terminar Quiz
            </button>
          )}
        </QuestionContainer>
      )}
      {step == 2 && (
        <DoneContainer>
          <div className="bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="quiz-results">
            <div className="left">
              <h2>
                {points >= lesson.lesson_quizzes.passing_grade
                  ? "FELICIDADES !!!"
                  : "SIGUE INTENTANDO"}
              </h2>
              <p>
                {points >= lesson.lesson_quizzes.passing_grade
                  ? "Aprobaste el quiz"
                  : "No aprobaste la evaluación"}{" "}
                {lesson.lesson_quizzes?.title} con {counter}{" "}
                {counter == 1 ? "respuesta correcta" : "respuestas correctas"}
              </p>
            </div>
            <div className="right">
              <p className="porcent">{Math.floor(points)}%</p>
              <p>
                {counter}/{lesson.lesson_quizzes?.questions.length} Correctas
              </p>
            </div>
          </div>
          <div className="quiz-bar-container">
            <div className="quiz-bar">
              {userQuizzes?.find((x: any) => x.lesson_id == lesson.id) && (
                <div
                  className="quiz-bar-progress"
                  style={{ width: `${generateGradePercent(lesson.id)}%` }}>

                  <div className="line">
                    <p className='max'>
                      {
                        Math.floor(generateGradePercent(lesson.id))
                      } %</p>
                  </div>
                </div>
              )}
              <div
                className="passing-grade"
                style={{
                  left: `calc(${lesson.lesson_quizzes.passing_grade}% - 13px)`,
                }}
              >
                <div className='line'>
                  <p className='minimum-top'>{lesson.lesson_quizzes?.passing_grade}%</p>
                  <p className='minimum'>MINIMO</p>
                </div>
              </div>
            </div>
            <div className="quiz-bar-points">100 pts</div>
          </div>
          <button
            onClick={() => {
              finish();
            }}
          >
            FINALIZAR
          </button>
        </DoneContainer>
      )}
    </QuizContainer>
  );
};
export default Quiz;