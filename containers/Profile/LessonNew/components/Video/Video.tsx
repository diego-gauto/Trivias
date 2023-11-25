import React, { useEffect, useState } from 'react'
import ReactPlayer from "react-player";
import { addUserToLessonApi } from '../../../../../components/api/lessons';
import router, { useRouter } from 'next/router';
import { useCourse } from '../../../../../hooks/useLesson';
import { goToNextLesson, handleProgress, handleViewed } from '../../utils/functions';
import { getHomeworkUserApi } from '../../../../../components/api/homeworks';
import { IUserHomework } from '../../../../../interfaces/IUserHomeworks';
import { IUserInfoResult } from '../../../../../interfaces/IUser';
import { ILesson } from '../../../../../interfaces/ICourseNew';

interface IVideoProps {
  user: IUserInfoResult,
  actualLesson: ILesson,
  course: any,
  openModal: any,
}

const Video = ({ user, actualLesson, course, openModal }: IVideoProps) => {
  const params = useRouter()
  const { season, lesson }: any = params.query;
  const { reload } = useCourse();
  const [duration, setDuration] = useState<any>(0);
  const [homework, setHomework] = useState<IUserHomework | null>(null);

  useEffect(() => {
    getUserHomework();
  }, []);

  const getUserHomework = async () => {
    let homeworkUserParams = {
      lessonId: actualLesson.id,
      user_id: user.id,
    }
    try {
      const userHomeworksResponse = await getHomeworkUserApi(homeworkUserParams);
      const userHomeworks = userHomeworksResponse.data.data[0];
      if (userHomeworks !== undefined) {
        setHomework(userHomeworks);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.stack);
        console.error(error.message);
      }
    }
  }

  const takeNextLessonOrShowModal = () => {
    if (actualLesson.quiz === 0 && actualLesson.homework === 0) {
      goToNextLesson(course, +season, +lesson);
    } else if (homework === null) {
      openModal();
    } else if (homework.status === 1 && homework.approved === 0) {
      openModal();
    } else {
      goToNextLesson(course, +season, +lesson);
    }
  }

  const finishedLesson = async () => {
    if (!actualLesson.users.includes(user.user_id)) {
      let tempLesson = {
        lessonId: actualLesson.id,
        userId: user.user_id,
        points: actualLesson.points
      }
      await addUserToLessonApi(tempLesson)
      reload(true)
    }
    takeNextLessonOrShowModal();
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