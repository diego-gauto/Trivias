import React, { useEffect, useState } from 'react'
import ReactPlayer from "react-player";
import { addUserHistory, addUserToLessonApi, updateUserProgressApi } from '../../../../../components/api/lessons';
import { useRouter } from 'next/router';
import { LESSON_PATH } from '../../../../../constants/paths';

declare let Hls: any

const Video = ({ data, id, course, user, season, lesson, handleComplete, nextLesson, openActivityModal }: any) => {
  const [current, setCurrent] = useState<any>();
  const [duration, setDuration] = useState<any>(0);
  const [menu, setMenu] = useState<boolean>(false);

  const [selected, setSelected] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [quiz, setQuiz] = useState<any>([]);
  const router = useRouter();

  const finishedLesson = () => {
    if (!data.users.includes(user.user_id)) {
      let tempLesson = {
        lessonId: data.id,
        userId: user.user_id,
        points: parseInt(data.points)
      }
      addUserToLessonApi(tempLesson).then(() => {
        handleComplete();
        if (data.quiz === 0 && data.homework === 0) {
          router.push({
            pathname: LESSON_PATH,
            query: { id: course.id, season: nextLesson.seasonIndex, lesson: nextLesson.lessonIndex },
          })
        } else {
          openActivityModal();
        }
      })
    }
    else {
      if (data.quiz === 0 && data.homework === 0) {
        router.push({
          pathname: LESSON_PATH,
          query: { id: course.id, season: nextLesson.seasonIndex, lesson: nextLesson.lessonIndex },
        })
      } else {
        openActivityModal();
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

  const handleDuration = (duration: number) => {
    setDuration(duration);
  }
  const handleProgress = async (seconds: number) => {
    let progress = (seconds * 100) / duration;
    let tempProgress = {
      time: progress,
      seconds: seconds,
      lessonId: data.id,
      userId: user.user_id
    }
    if (user) {
      await updateUserProgressApi(tempProgress).then(() => {
        history();
      });
    }
  }

  const history = () => {
    if (user) {
      let temp = {
        courseId: course.id,
        seasonId: course.seasons[season].id,
        lessonId: course.seasons[season].lessons[lesson].id,
        userId: user.user_id
      }
      addUserHistory(temp)
    }
  }

  const handleViewed = () => {
    if (user) {
      let index = data.progress.findIndex((x: any) => x.user_id == user.user_id)
      if (data.progress[index] && data.progress[index].time >= 99) {
        return 0
      } else {
        if (index == -1) {
          return 0
        } else {
          return data.progress[index].seconds
        }
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
    // course.lessons.forEach((element: any) => {
    //   if (element.users.includes(user.id)) {
    //     viewed++;
    //   }
    // });
    setCount(viewed)
  }, [course])

  useEffect(() => {
    setOpen(menu)
  }, [menu])

  return (
    <ReactPlayer
      className='absolute'
      ref={p => p?.seekTo(handleViewed())}
      url={data.link}
      playing={true}
      playsinline={true}
      muted={false}
      controls
      width="100%" height="auto"
      style={{ position: "relative" }}
      onEnded={finishedLesson}
      onDuration={(duration) => {
        handleDuration(duration);
      }
      }
      onProgress={(state) => {
        handleProgress(state.playedSeconds)
      }}
    />
    // <Segment>
    //   <VideoContain>
    //     <div className='nav-course'>
    //       <img src="/images/Navbar/NavbarLogo2.png" alt="" />
    //       {!menu ? <GiHamburgerMenu onClick={() => {
    //         setMenu(!menu)
    //       }}></GiHamburgerMenu> :
    //         <AiOutlineClose onClick={() => {
    //           setMenu(!menu)
    //         }}></AiOutlineClose>}
    //     </div>
    //     {"mandatory" in course.seasons[season].lessons[lesson] ?
    //       <div className='quiz-container'>
    //         <Title>
    //           Quiz: {course.seasons[season].lessons[lesson].title}
    //         </Title>
    //         {course.seasons[season].lessons[lesson].questions.map((question: any, index: number) => {
    //           return (
    //             <div className='question-container'>
    //               <div className='question'>
    //                 <p>{index + 1}.</p>
    //                 <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
    //               </div>
    //               <div className='answers'>
    //                 {question.answers.map((answer: any, ind: number) => {
    //                   return (
    //                     <div style={{ display: "flex" }}>
    //                       <p>{answer.answer}</p>
    //                       <input type="radio" id={"q" + index + "a" + ind} onChange={() => {
    //                         chooseAnswer(index, ind)
    //                       }} />
    //                     </div>
    //                   )
    //                 })}
    //               </div>
    //             </div>
    //           )
    //         })}
    //         <button onClick={submit}>Responder</button>
    //       </div>
    //       :
    //       <ReactPlayer
    //         className='absolute'
    //         ref={p => p?.seekTo(handleViewed())}
    //         url={data.link}
    //         playing={true}
    //         muted={false}
    //         controls
    //         width="100%" height="auto"
    //         onEnded={finishedLesson}
    //         onDuration={(duration) =>
    //           handleDuration(duration)
    //         }
    //         onProgress={(state) => {
    //           handleProgress(state.playedSeconds)
    //         }}
    //       />
    //     }
    //     {
    //       responsive1124 && <div className='module-selector'>
    //         <p>{course.courseTittle}</p>
    //         <p><span>Un curso de</span> {course.courseProfessor[0]?.name}</p>
    //       </div>
    //     }
    //     {/* <Modules data={data} user={user} comments={comments} season={season} lesson={lesson} teacherCreds={course.courseProfessor} /> */}
    //   </VideoContain>
    //   {/* <Courses menu={menu} handleClick={handleClick} id={id} course={course} data={current} userData={user} season={season} lesson={lesson} /> */}
    // </Segment>
  )
}
export default Video;