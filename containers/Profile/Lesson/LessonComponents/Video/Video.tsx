import React, { useEffect, useState } from 'react'
import ReactPlayer from "react-player";
import { Title, VideoContain, VideoImage, Segment } from './Video.styled';
import { useMediaQuery } from "react-responsive";
import Courses from '../../LessonComponents/Courses/Courses';

const Video = ({ data, title, id, course, userId }: any) => {
  const [current, setCurrent] = useState<any>();

  const finishedLesson = () => {
    let temp: any = data;
    if ("users" in data) {
      if (temp.users.includes(userId)) {
        console.log("user exist");
      } else {
        temp.users.push(userId)
        setCurrent({ ...temp })
      }
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
      <Courses id={id} course={course} data={current} userId={userId} />
    </Segment>
  )
}
export default Video;