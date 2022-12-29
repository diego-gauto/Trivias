import React, { useEffect, useState } from 'react'
import ReactPlayer from "react-player";
import { Title, VideoContain, Segment } from './Video.styled';
import Courses from '../../LessonComponents/Courses/Courses';
import { addUserToLesson, updateLessonProgress } from '../../../../../store/actions/courseActions';
import Modules from '../Modules/Modules';
import { SeasonContainer, Episode, CoursesContainer, Container, UploadIcon } from '../Courses/Courses.styled';
import EveryCourse from '../Courses/Lessons/EveryCourse';
import CourseProgress from '../Progress/CourseProgress';
import { useMediaQuery } from 'react-responsive';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
declare let Hls: any

const Video = ({ data, title, id, course, user, season, lesson, handleComplete, comments }: any) => {
  const [current, setCurrent] = useState<any>();
  const [duration, setDuration] = useState<any>(0);
  const [viewed, setViewed] = useState<any>(0);
  const [menu, setMenu] = useState<boolean>(false);
  const [active, setActive] = useState(false);

  const [selected, setSelected] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const responsive1124 = useMediaQuery({ query: "(max-width: 1124px)" });
  const [quiz, setQuiz] = useState<any>([]);

  const finishedLesson = () => {
    let temp: any = { ...data };
    if (user) {
      if (temp.users.includes(user.id)) {
        console.log("user exist");
      } else {
        user.score = parseInt(user.score) + parseInt(data.points);
        addUserToLesson(data, id, data.seasonId, data.id, user);
        temp.users.push(user.id);
        setCurrent({ ...temp });
        handleComplete()
      }
    }
  }

  useEffect(() => {
    setCurrent(data)
    setQuiz([])
    if ("mandatory" in data && data) {
      let tempQuiz: any = []
      data.questions.forEach((element: any) => {
        if (tempQuiz.length <= data.questions.length) {
          tempQuiz.push([])
        }
      });
      setQuiz(tempQuiz)
    }
  }, [data])

  const handleClick = (value: boolean) => {
    setMenu(value);
  }

  const handleDuration = (duration: number) => {
    setDuration(duration);
  }
  const handleProgress = (seconds: number) => {
    let progress = (seconds * 100) / duration;
    if (user) {
      if (!("progress" in course.seasons[season].lessons[lesson])) {
        course.seasons[season].lessons[lesson].progress = [];
      }
      if (!course.seasons[season].lessons[lesson].progress.some((e: any) => e.id == user.id)) {
        course.seasons[season].lessons[lesson].progress.push({ id: user.id, time: progress, seconds: seconds, status: false })
      } else {
        let index = course.seasons[season].lessons[lesson].progress.findIndex((x: any) => x.id == user.id)
        course.seasons[season].lessons[lesson].progress[index].seconds = seconds;
        course.seasons[season].lessons[lesson].progress[index].time = progress;
      }

      // updateLessonProgress(course.seasons[season].lessons[lesson].progress, id, course.seasons[season].id, course.seasons[season].lessons[lesson].id)
      updateLessonProgress(user.id, progress, seconds, id, course.seasons[season].id, course.seasons[season].lessons[lesson].id)
    }
  }

  const handleViewed = () => {
    if (user) {
      if (("progress" in course.seasons[season].lessons[lesson])) {
        let index = course.seasons[season].lessons[lesson].progress.findIndex((x: any) => x.id == user.id)
        if (index == -1) {
          return 0
        } else {
          return course.seasons[season].lessons[lesson].progress[index].seconds
        }
      } else {
        return 0
      }
    } else {
      return 0
    }
  }

  useEffect(() => {
    let temp_selected: any = [];
    course?.seasons.forEach((element: any) => {
      temp_selected.push(false)
    });
    setSelected(temp_selected);

    let viewed = 0;
    course.lessons.forEach((element: any) => {
      if (element.users.includes(user.id)) {
        viewed++;
      }
    });
    setCount(viewed)
  }, [course])

  useEffect(() => {
    setOpen(menu)
  }, [menu])

  const toggleHandler = (index: any) => {
    let temp = [...selected]
    temp[index] = !temp[index];
    setSelected(temp)
  }

  const chooseAnswer = (indQ: number, indA: number) => {
    course.seasons[season].lessons[lesson].questions[indQ].answers.forEach((element: any, index: number) => {
      if (indA == index) {
        let actual = document.getElementById("q" + indQ + "a" + index) as HTMLInputElement;
        actual.checked = true;
        quiz[indQ] = indA
      } else {
        let other = document.getElementById("q" + indQ + "a" + index) as HTMLInputElement;
        other.checked = false;
      }
    });
    setQuiz(quiz);
  }

  const submit = () => {
    let temp: any = { ...data };
    if (user) {
      if (temp.users.includes(user.id)) {
        console.log("user exist");
      } else {
        const correct = 100 / data.questions.length;
        let tempPoints = 0;
        const score = parseInt(data.points) / data.questions.length;
        let tempScore = 0;
        data.questions.forEach((element: any, indQ: number) => {
          element.answers.forEach((answer: any, indA: number) => {
            if (quiz[indQ] == indA && answer.status) {
              tempPoints = tempPoints + correct
              tempScore = tempScore + score;
            }
          });
        });
        if (tempPoints >= data.passingGrade) {
          alert("aprobado")
          user.score = parseInt(user.score) + tempScore;
          addUserToLesson(data, id, data.seasonId, data.id, user);
          temp.users.push(user.id);
          setCurrent({ ...temp });
          handleComplete()
        } else {
          alert("reprobado")
        }
      }
    }
  }

  return (
    <Segment>
      <VideoContain>
        {"mandatory" in course.seasons[season].lessons[lesson] ?
          <div className='quiz-container'>
            <Title>
              Quiz: {course.seasons[season].lessons[lesson].title}
            </Title>
            {course.seasons[season].lessons[lesson].questions.map((question: any, index: number) => {
              return (
                <div className='question-container'>
                  <div className='question'>
                    <p>{index + 1}.</p>
                    <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
                  </div>
                  <div className='answers'>
                    {question.answers.map((answer: any, ind: number) => {
                      return (
                        <div style={{ display: "flex" }}>
                          <p>{answer.answer}</p>
                          <input type="radio" id={"q" + index + "a" + ind} onChange={() => {
                            chooseAnswer(index, ind)
                          }} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
            <button onClick={submit}>Responder</button>
          </div>
          :
          <ReactPlayer
            className='absolute'
            ref={p => p?.seekTo(handleViewed())}
            url={data.link}
            playing={true}
            muted={false}
            controls
            width="100%" height="100%"
            onEnded={finishedLesson}
            onDuration={(duration) =>
              handleDuration(duration)
            }
            onProgress={(state) => {
              handleProgress(state.playedSeconds)
            }}
          />
        }
        {
          responsive1124 && <div className='module-selector'>

          </div>
        }
        {/* {responsive1124 && course?.seasons.map((season: any, index: number) => {
          return (
            index == viewed && <SeasonContainer key={"course seasons " + index}>
              <Container onClick={() => { toggleHandler(index) }} active={selected[index]}>
                <div className='module'>
                  {selected[index] && <CourseProgress title={course?.courseTittle} season={index} lesson={lesson} course={course} userId={user.id} refresh={toggleHandler} />}
                  <div>
                    <p className='title'>Módulo {index + 1}</p>
                    <Episode>
                      {season.lessons.length > 1 ? `${season.lessons.length} Lecciones` : `${season.lessons.length} Lección`}
                    </Episode>
                  </div>
                </div>
                {!responsive1124 && <UploadIcon active={selected[index]} />}
              </Container>
              <CoursesContainer active={selected[index]} onClick={() => {
                setOpen(!open); handleClick(false)
              }}>
                <EveryCourse id={id} season={index} lessons={season.lessons} data={data} userId={user.id} course={course} />
              </CoursesContainer>
            </SeasonContainer>
          )
        })} */}
        <Modules data={data} user={user} comments={comments} season={season} lesson={lesson} teacherCreds={course.courseProfessor} />
      </VideoContain>
      <Courses menu={menu} handleClick={handleClick} id={id} course={course} data={current} userId={user?.id} season={season} lesson={lesson} />
    </Segment>
  )
}
export default Video;