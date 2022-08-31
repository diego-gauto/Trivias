import React, { useEffect, useState } from 'react'
import ReactPlayer from "react-player";
import { Title, VideoContain, VideoImage, Segment } from './Video.styled';
import { useMediaQuery } from "react-responsive";
import Courses from '../../LessonComponents/Courses/Courses';
import { addUserToLesson } from '../../../../../store/actions/courseActions';

const Video = ({ data, title, id, course, user }: any) => {
  const [current, setCurrent] = useState<any>();

  const finishedLesson = () => {
    let temp: any = data;
    if (temp.users.includes(user.id)) {
      console.log("user exist");
    } else {
      user.score = user.score + data.points;
      addUserToLesson(data, id, data.seasonId, data.id, user);
      temp.users.push(user.id);
      setCurrent({ ...temp });
    }
  }

  useEffect(() => {
    setCurrent(data)
  }, [data])

  return (
    <Segment>
      <VideoContain>
        <Title>
          Bienvenida y presentación del curso {title}
        </Title>
        <ReactPlayer
          className='absolute'
          url={data.link}
          playing={false}
          muted={false}
          controls
          width={900} height={500}
          onEnded={finishedLesson}
        />
      </VideoContain>
      <Courses id={id} course={course} data={current} userId={user?.id} />
    </Segment>
  )
}
export default Video;