import React, { useEffect, useState } from 'react'
import ReactPlayer from "react-player";
import { Title, VideoContain, VideoImage, Segment, MenuIcon, TitleContain } from './Video.styled';
import Courses from '../../LessonComponents/Courses/Courses';
import { addUserToLesson, updateLessonProgress } from '../../../../../store/actions/courseActions';
import { EaselIcon } from '../Modules/Module.styled';
import Modules from '../Modules/Modules';
declare let Hls: any

const Video = ({ data, title, id, course, user, season, lesson, handleComplete, comments }: any) => {
  const [current, setCurrent] = useState<any>();
  const [duration, setDuration] = useState<any>(0);
  const [viewed, setViewed] = useState<any>(0);
  const [menu, setMenu] = useState<boolean>(false);

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
                    {question.answers.map((answer: any) => {
                      return (
                        <p></p>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          :
          <ReactPlayer
            className='absolute'
            ref={p => p?.seekTo(handleViewed())}
            url={data.link}
            playing={true}
            muted={false}
            controls
            width="100%" height="auto"
            onEnded={finishedLesson}
            onDuration={(duration) =>
              handleDuration(duration)
            }
            onProgress={(state) => {
              handleProgress(state.playedSeconds)
            }}
          />
        }
        <Modules data={data} user={user} comments={comments} season={season} lesson={lesson} teacherCreds={course.courseProfessor} />
      </VideoContain>
      <Courses menu={menu} handleClick={handleClick} id={id} course={course} data={current} userId={user?.id} season={season} lesson={lesson} />
    </Segment>
  )
}
export default Video;