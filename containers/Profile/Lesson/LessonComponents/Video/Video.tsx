import React, { useEffect, useState } from 'react'
import ReactPlayer from "react-player";
import { Title, VideoContain, VideoImage, Segment, MenuIcon, TitleContain } from './Video.styled';
import Courses from '../../LessonComponents/Courses/Courses';
import { addUserToLesson, updateLessonProgress } from '../../../../../store/actions/courseActions';

const Video = ({ data, title, id, course, user, season, lesson }: any) => {
  const [current, setCurrent] = useState<any>();
  const [duration, setDuration] = useState<any>(0);
  const [menu, setMenu] = useState<boolean>(false);
  const finishedLesson = () => {
    let temp: any = data;
    if (user) {
      if (temp.users.includes(user.id)) {
        console.log("user exist");
      } else {
        user.score = user.score + data.points;
        addUserToLesson(data, id, data.seasonId, data.id, user);
        temp.users.push(user.id);
        setCurrent({ ...temp });
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
    if (!("progress" in course.seasons[season].lessons[lesson])) {
      course.seasons[season].lessons[lesson].progress = 0;
    }
    updateLessonProgress(progress, id, course.seasons[season].id, course.seasons[season].lessons[lesson].id)
  }

  return (
    <Segment>
      <VideoContain>
        <TitleContain>
          <Title>
            Bienvenida y presentación del curso {title}
          </Title>
          <MenuIcon onClick={() => { setMenu(!menu) }} />
        </TitleContain>
        <ReactPlayer
          className='absolute'
          url={data.link}
          playing={false}
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
      </VideoContain>
      <Courses menu={menu} handleClick={handleClick} id={id} course={course} data={current} userId={user?.id} season={season} lesson={lesson} />
    </Segment>
  )
}
export default Video;