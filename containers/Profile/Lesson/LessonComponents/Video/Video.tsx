import React, { useEffect, useState } from 'react'
import ReactPlayer from "react-player";
import { Title, VideoContain, VideoImage, Segment, MenuIcon, TitleContain } from './Video.styled';
import Courses from '../../LessonComponents/Courses/Courses';
import { addUserToLesson, updateLessonProgress } from '../../../../../store/actions/courseActions';
import { EaselIcon } from '../Modules/Module.styled';
declare let Hls: any

const Video = ({ data, title, id, course, user, season, lesson, handleComplete }: any) => {
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

  // const doVideoStuff = () => {
  //   //@ts-ignore
  //   var video: HTMLMediaElement = document.getElementById('video') as HTMLMediaElement;
  //   var videoSrc = data.link;
  //   if (Hls.isSupported()) {
  //     var hls = new Hls();
  //     hls.loadSource(videoSrc);
  //     hls.attachMedia(video);
  //   } else {
  //     video.src = `${videoSrc}`
  //   }
  // }
  // useEffect(() => {
  //   doVideoStuff()
  // }, [])

  return (
    <Segment>
      <VideoContain>
        <TitleContain>
          <Title>
            {title}
          </Title>
          <EaselIcon onClick={() => { setMenu(!menu) }} />
          {/* <video id="video" controls playsInline preload="auto" width="100%"
          ></video> */}
        </TitleContain>
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
      </VideoContain>
      <Courses menu={menu} handleClick={handleClick} id={id} course={course} data={current} userId={user?.id} season={season} lesson={lesson} />
    </Segment>
  )
}
export default Video;