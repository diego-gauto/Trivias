import React, { useEffect, useState } from 'react'
import ReactPlayer from "react-player";
import { addUserToLessonApi } from '../../../../../components/api/lessons';
import router, { useRouter } from 'next/router';
import { useCourse } from '../../../../../hooks/useLesson';
import { goToNextLesson, handleProgress, handleViewed } from '../../utils/functions';

const Video = ({ user, actualLesson, course }: any) => {
  const params = useRouter()
  const { season, lesson }: any = params.query;
  const { reload } = useCourse();
  const [duration, setDuration] = useState<any>(0);

  const finishedLesson = () => {
    if (!actualLesson.users.includes(user.user_id)) {
      let tempLesson = {
        lessonId: actualLesson.id,
        userId: user.user_id,
        points: parseInt(actualLesson.points)
      }
      addUserToLessonApi(tempLesson).then(() => {
        reload()
        if (actualLesson.quiz === 0 && actualLesson.homework === 0) {
          goToNextLesson(course, +season, +lesson);
        } else {
          // openActivityModal();
        }
      })
    }
    else {
      if (actualLesson.quiz === 0 && actualLesson.homework === 0) {
        goToNextLesson(course, +season, +lesson);
      } else {
        // openActivityModal();
      }
    }
  }

  const handleDuration = (duration: number) => {
    setDuration(duration);
  }

  return (
    <ReactPlayer
      className='absolute'
      ref={p => p?.seekTo(handleViewed(user, actualLesson))}
      url={actualLesson.link}
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
        handleProgress(user, course, params, duration, state.playedSeconds)
      }}
    />
  )
}
export default Video;