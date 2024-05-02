import React, { useEffect, useState } from 'react';

import { BsArrowRepeat, BsFileArrowUp } from 'react-icons/bs';

import {
  addHomeworkApi,
  getHomeworkUserApi,
} from '../../../../../components/api/homeworks';
import {
  getUserQuizApi,
  updateUserProgressByQuizApi,
  updateUserQuizApi,
  updateUserScoreApi,
} from '../../../../../components/api/lessons';
import { createNotification } from '../../../../../components/api/notifications';
import { uploadImageHomework } from '../../../../../store/actions/courseActions';
import { LoaderContainSpinner } from '../../../Purchase/Purchase.styled';
import { Answer, HomeWorkContain, TaskTitle } from './HomeWork.styled';
import ImagePreview from './imagePreview/imagePreview';
import { TitleContain } from './Module.styled';
import ModuleTabs from './ModuleTabs/ModuleTabs';
import router from 'next/router';

interface IHomeWork {
  data: any;
  user: any;
  lesson: any;
  courseIds: any;
  handleClick: any;
}
const HomeWork = (props: IHomeWork) => {
  const { data, user, lesson, courseIds, handleClick } = props;
  const [status, setStatus] = useState('');
  const [step, setStep] = useState(0);
  const [index, setIndex] = useState(0);
  const [userQuizzes, setUserQuizzes] = useState<any>([]);
  const [answers, setAnswers] = useState<any>([]);
  const [verify, setVerify] = useState(false);
  const [points, setPoints] = useState(0);
  const [grade, setGrade] = useState(0);
  const [next, setNext] = useState(0);
  const [progress, setProgress] = useState(0);
  const [counter, setCounter] = useState(0);
  const [loader, setLoader] = useState(false);
  const [homework, setHomework] = useState<any>();
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [imageDisplay, setImageDisplay] = useState<any>('');
  const [imageLoader, setImageLoader] = useState<boolean>(false);
  const [typeFile, setTypeFile] = useState('');
  useEffect(() => {
    if (data.quiz === 1) {
      getUserQuiz();
      let tempAnswers: any = [];
      setNext(100 / data.lesson_quizzes?.questions.length);
      setProgress(100 / data.lesson_quizzes?.questions.length);
      data.lesson_quizzes?.questions.forEach((element: any) => {
        tempAnswers.push([]);
      });
      setAnswers(tempAnswers);
    }
  }, [data]);

  const getUserQuiz = () => {
    let temp = {
      lessonId: data.id,
      userId: user.user_id,
    };
    getUserQuizApi(temp).then((res) => {
      setUserQuizzes([...res.data.data]);
    });
  };
  const approvalHomeWork = (file: any) => {
    if (file.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = async (_event) => {
        setImageDisplay(reader.result);
        setImageModal(true);
        setTypeFile(file[0].type);
      };
    }
  };
  const getImage = async (imageAccepted: any) => {
    setImageLoader(true);
    let tempHomework: any = {
      approved: false,
      comment: '',
      image: '',
      lessonId: data.id,
      courseId: parseInt(courseIds.courseId),
      seasonId: courseIds.seasonId,
      season: router.query.season,
      lesson: lesson,
      status: false,
      user_id: user.user_id,
      title: data.lesson_homeworks.title,
    };
    let tempData = {
      path: imageAccepted,
      lessonId: data.id,
      userId: user.user_id,
    };
    const url = await uploadImageHomework(tempData);
    tempHomework.image = url;
    //Homework create notification
    addHomeworkApi(tempHomework).then(() => {
      setImageLoader(false);
      alert('Tarea enviada');
      setImageModal(false);
      setStatus('pending');
    });
  };
  const uploadHwk = () => {
    document.getElementById('hide')?.click();
  };

  const addAnswer = (value: number) => {
    data.lesson_quizzes.questions[index].answers.forEach(
      (element: any, idxAnswer: number) => {
        if (value == idxAnswer) {
          let answerDiv: any = document.getElementById(
            index + 'answer' + idxAnswer,
          );
          answerDiv.style.background = '#a14cf5';
          answerDiv.style.color = 'white';
        } else {
          let answerDiv: any = document.getElementById(
            index + 'answer' + idxAnswer,
          );
          answerDiv.style.background =
            'linear-gradient(270deg, #d0b1ee 0.52%, #d7beef 100%)';
          answerDiv.style.color = '#8100f0';
        }
      },
    );

    answers[index] = value;
    setAnswers(answers);
  };

  const checkAnswer = () => {
    let score = 100 / data.lesson_quizzes.questions.length;
    let total =
      data.lesson_quizzes.points / data.lesson_quizzes.questions.length;

    if (answers[index].length == 0) {
      alert('Seleccione una opción!');
    } else {
      setVerify(true);
      if (data.lesson_quizzes.questions[index].answers[answers[index]].status) {
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
  };

  const nextQuestion = () => {
    setVerify(false);
    setIndex(index + 1);
    setProgress(progress + next);
    data.lesson_quizzes.questions[index].answers.forEach(
      (element: any, idxAnswer: number) => {
        let answerDiv: any = document.getElementById(
          index + 'answer' + idxAnswer,
        );
        answerDiv.style.background =
          'linear-gradient(270deg, #d0b1ee 0.52%, #d7beef 100%)';
        answerDiv.style.color = '#8100f0';
      },
    );
  };

  const checkQuiz = async () => {
    setLoader(true);
    let progress = {
      lessonId: data.id,
      user_id: user.user_id,
    };
    let tempQuiz = {
      lessonId: data.id,
      userId: user.user_id,
      grade: grade,
      quizId: data.lesson_quizzes.id,
    };
    let tempData = {
      points: user.score + grade,
      userId: user.user_id,
    };
    setStep(2);
    if (userQuizzes.length === 0) {
      if (points >= data.lesson_quizzes.passing_grade) {
        let tempIndex = data.progress.findIndex(
          (x: any) => x.user_id === user.user_id,
        );
        data.progress[tempIndex].status = true;
        await updateUserProgressByQuizApi(progress);
      }
      await updateUserScoreApi(tempData);
      await updateUserQuizApi(tempQuiz);
    } else {
      if (points >= data.lesson_quizzes.passing_grade) {
        let tempIndex = data.progress.findIndex(
          (x: any) => x.user_id === user.user_id,
        );
        data.progress[tempIndex].status = true;
        await updateUserProgressByQuizApi(progress);
        if (userQuizzes.find((x: any) => x.lesson_id == data.id)) {
          await updateUserQuizApi(tempQuiz);
        } else {
          await updateUserScoreApi(tempData);
          await updateUserQuizApi(tempQuiz);
        }
      }
    }
    handleClick();
    setLoader(false);
  };

  const finish = () => {
    setStep(0);
    setIndex(0);
    setVerify(false);
    setProgress(next);
    setPoints(0);
    setGrade(0);
    setCounter(0);
    let tempAnswers: any = [];
    data.lesson_quizzes.questions.forEach((element: any) => {
      tempAnswers.push([]);
    });
    setAnswers(tempAnswers);
  };

  useEffect(() => {
    let tempData = {
      lessonId: data.id,
      user_id: user.user_id,
    };
    getHomeworkUserApi(tempData).then((res: any) => {
      if (res.data.data.length > 0) {
        let temp = res.data.data[0];
        if (
          temp.user_id === user.user_id &&
          temp.status === 1 &&
          temp.approved === 0
        ) {
          setHomework(temp);
          setStatus('');
        }
        if (temp.user_id === user.user_id && temp.status === 0) {
          setStatus('pending');
          setHomework('');
        }
        if (temp.user_id === user.user_id && temp.approved === 1) {
          setStatus('approved');
          setHomework('');
        }
      } else {
        setStatus('');
        setHomework('');
      }
    });
  }, [data]);

  return (
    <>
      <HomeWorkContain>
        {data.quiz === 0 && (
          <div className='complete-hw'>
            <div className='right'>
              <TaskTitle style={{ color: '#f78803' }}>
                Sube aquí tus prácticas <br />
                <span>
                  Da click en el botón correspondiente <br />y sube tu tarea
                  manualmente.
                </span>
              </TaskTitle>
              <div className='upload-info'>
                <p className='title'>
                  Tamaño máximo: <b>5 Mb</b>
                </p>
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
              {data.homework === 1 ? (
                <div className='upload-container'>
                  <p>
                    Tarea: <span>{data.lesson_homeworks.title}</span>
                  </p>
                </div>
              ) : (
                <p>Lección sin tarea...</p>
              )}
            </div>
            {data.homework === 1 && (
              <>
                <p
                  dangerouslySetInnerHTML={{
                    __html: data.lesson_homeworks.about,
                  }}
                  className='quill-hw'
                />
                {homework &&
                  homework.status === 1 &&
                  homework.approved === 0 &&
                  status !== 'pending' && (
                    <>
                      <p style={{ color: '#bc1515' }}>Tarea Rechazada</p>
                      <p style={{ color: '#8e2de2' }}>{homework.comment}</p>
                    </>
                  )}
                {status === '' && (
                  <p style={{ margin: 0 }}>
                    Haz click en el botón “Entregar tarea” para subir tu
                    archivo.
                  </p>
                )}
                {status == '' && (
                  <div className='homework' onClick={uploadHwk}>
                    <BsFileArrowUp></BsFileArrowUp>
                    Entregar Tarea
                    <input
                      id='hide'
                      type='file'
                      onChange={(e) => {
                        approvalHomeWork(e.target.files);
                      }}
                      onClick={(e: any) => {
                        e.target.value = '';
                      }}
                      hidden
                    />
                  </div>
                )}
                {status == 'pending' && (
                  <div className='homework' style={{ cursor: 'none' }}>
                    Tu tarea ha sido enviada y está en espera de evaluación y
                    retroalimentación. En aproximadamente 24 horas obtendrás una
                    respuesta.
                  </div>
                )}
                {status == 'approved' && (
                  <div>
                    <p style={{ color: '#0a980a' }}>Tarea Aprobada</p>
                    <p style={{ color: '#8e2de2' }}>{homework?.comment}</p>
                    {/* Felicidades. Buen trabajo!!! Has aprobado tu tarea. Te invitamos a seguir con la próxima lección. */}
                  </div>
                )}
              </>
            )}
          </div>
        )}
        {loader && <LoaderContainSpinner />}
        {data.quiz === 1 && !loader && (
          <div className='quiz'>
            {step == 0 && (
              <div className='quiz-info'>
                <div className='top'>
                  {data.lesson_quizzes?.title && (
                    <p className='title'>{data.lesson_quizzes.title}</p>
                  )}
                  {!data.lesson_quizzes?.title &&
                    userQuizzes?.find((x: any) => x.lesson_id == data.id) && (
                      <p>
                        Ahorita no hay un quiz disponible, su calificación
                        anterior fue:{' '}
                        {
                          userQuizzes.find((x: any) => x.lesson_id == data.id)
                            .grade
                        }
                      </p>
                    )}
                  {!data.lesson_quizzes?.title &&
                    !userQuizzes?.find((x: any) => x.lesson_id == data.id) && (
                      <p> Ahorita no hay un quiz disponible!</p>
                    )}
                  {data.lesson_quizzes?.title && (
                    <div className='circle'>
                      <p className='points'>
                        {data.lesson_quizzes.questions.length}
                      </p>
                      <p className='sub'>PREGUNTAS</p>
                    </div>
                  )}
                </div>
                <div className='bottom'>
                  {data.lesson_quizzes?.title && (
                    <div className='quiz-bar-container'>
                      <div className='quiz-bar'>
                        {userQuizzes?.find(
                          (x: any) => x.lesson_id == data.id,
                        ) && (
                          <div
                            className='quiz-bar-progress'
                            style={{
                              width: `${userQuizzes?.find((x: any) => x.lesson_id == data.id).grade}%`,
                            }}
                          >
                            <div className='line'>
                              <p className='max'>
                                {Math.floor(
                                  userQuizzes?.find(
                                    (x: any) => x.lesson_id == data.id,
                                  ).grade,
                                )}{' '}
                                pts
                              </p>
                            </div>
                          </div>
                        )}
                        <div
                          className='passing-grade'
                          style={{
                            left: `calc(${data.lesson_quizzes.passing_grade}% - 58px)`,
                          }}
                        >
                          <p
                            style={{
                              color: userQuizzes?.find(
                                (x: any) => x.lesson_id == data.id,
                              )
                                ? '#FFB800'
                                : '#8628e2',
                            }}
                          >
                            {data.lesson_quizzes?.passing_grade} pts
                          </p>
                          <div className='line'>
                            <p className='minimum'>MINIMO</p>
                          </div>
                        </div>
                      </div>
                      <div className='quiz-bar-points'>
                        {data.lesson_quizzes.points} pts
                      </div>
                    </div>
                  )}
                  {!userQuizzes?.find((x: any) => x.lesson_id == data.id) &&
                    data.lesson_quizzes?.questions.length > 0 && (
                      <button
                        onClick={() => {
                          setStep(1);
                        }}
                      >
                        Comenzar quiz
                      </button>
                    )}

                  {userQuizzes?.find((x: any) => x.lesson_id == data.id) &&
                    data.lesson_quizzes?.questions.length > 0 && (
                      <button
                        onClick={() => {
                          setStep(1);
                        }}
                      >
                        <BsArrowRepeat /> Repetir quiz
                      </button>
                    )}
                </div>
              </div>
            )}
            {step == 1 && (
              <div className='question-container'>
                <div className='question-bar'>
                  <div
                    className='progress'
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className='question-title'>
                  <p
                    className='title'
                    dangerouslySetInnerHTML={{
                      __html: data.lesson_quizzes.questions[index].question,
                    }}
                  ></p>
                  <div className='grade'>
                    <div className='circle'>{Math.floor(points)}</div>
                    <p>PUNTAJE</p>
                  </div>
                </div>
                <ol className='answers' type='a'>
                  {data.lesson_quizzes.questions[index].answers.map(
                    (x: any, idx: number) => {
                      return (
                        <Answer
                          id={index + 'answer' + idx}
                          key={'answers' + idx}
                          veryfy={verify}
                          correct={x.status}
                          onClick={() => {
                            addAnswer(idx);
                          }}
                        >
                          {idx == 0 && <div className='left'>A</div>}
                          {idx == 1 && <div className='left'>B</div>}
                          {idx == 2 && <div className='left'>C</div>}
                          {idx == 3 && <div className='left'>D</div>}
                          {idx == 4 && <div className='left'>E</div>}
                          {idx == 5 && <div className='left'>F</div>}
                          <p>{x.answer}</p>
                        </Answer>
                      );
                    },
                  )}
                </ol>
                {!verify ? (
                  <button
                    onClick={() => {
                      checkAnswer();
                    }}
                  >
                    VERIFICAR
                  </button>
                ) : index !== data.lesson_quizzes.questions.length - 1 ? (
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
              </div>
            )}
            {step == 2 && (
              <div className='done-container'>
                <div className='bar'>
                  <div
                    className='progress'
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className='quiz-results'>
                  <div className='left'>
                    <p className='title'>
                      {points >= data.lesson_quizzes.passing_grade
                        ? 'FELICIDADES !!!'
                        : 'SIGUE INTENTANDO'}
                    </p>
                    <p>
                      {points >= data.lesson_quizzes.passing_grade
                        ? 'Aprobaste el quiz'
                        : 'No aprobaste la evaluación'}{' '}
                      {data.lesson_quizzes?.title} con {counter}{' '}
                      {counter == 1
                        ? 'respuesta correcta'
                        : 'respuestas correctas'}
                    </p>
                  </div>
                  <div className='right'>
                    <p className='porcent'>{Math.floor(points)}%</p>
                    <p>
                      {counter}/{data.lesson_quizzes?.questions.length}{' '}
                      Correctas
                    </p>
                  </div>
                </div>
                <div className='quiz-bar-container'>
                  <div className='quiz-bar'>
                    {userQuizzes?.find((x: any) => x.lesson_id == data.id) && (
                      <div
                        className='quiz-bar-progress'
                        style={{
                          width: `${userQuizzes?.find((x: any) => x.lesson_id == data.id).grade}%`,
                        }}
                      >
                        <div className='line'>
                          <p className='max'>
                            {Math.floor(
                              userQuizzes?.find(
                                (x: any) => x.lesson_id == data.id,
                              ).grade,
                            )}{' '}
                            pts
                          </p>
                        </div>
                      </div>
                    )}
                    <div
                      className='passing-grade'
                      style={{
                        left: `calc(${data.lesson_quizzes.passing_grade}% - 58px)`,
                      }}
                    >
                      <p
                        style={{
                          color: userQuizzes?.find(
                            (x: any) => x.lesson_id == data.id,
                          )
                            ? '#FFB800'
                            : '#8628e2',
                        }}
                      >
                        {data.lesson_quizzes.passing_grade} pts
                      </p>
                      <div className='line'>
                        <p className='minimum'>MINIMO</p>
                      </div>
                    </div>
                  </div>
                  <div className='quiz-bar-points'>100 pts</div>
                </div>
                <button
                  onClick={() => {
                    finish();
                  }}
                >
                  FINALIZAR
                </button>
              </div>
            )}
          </div>
        )}
      </HomeWorkContain>
      <ImagePreview
        lesson={data.title}
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
  );
};
export default HomeWork;
