import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { addUserToLessonApi } from '../../../../../components/api/lessons';
import router, { useRouter } from 'next/router';
import { useCourse } from '../../../../../hooks/useLesson';
import {
  goToNextLesson,
  handleProgress,
  handleViewed,
} from '../../utils/functions';
import { getHomeworkUserApi } from '../../../../../components/api/homeworks';
import { IUserHomework } from '../../../../../interfaces/IUserHomeworks';
import { IUserInfoResult } from '../../../../../interfaces/IUser';
import { ILesson } from '../../../../../interfaces/ICourseNew';
import { getGenericQueryResponse } from '../../../../../components/api/admin';

interface IVideoProps {
  user: IUserInfoResult;
  actualLesson: ILesson;
  course: any;
  openModal: any;
}

const Video = ({ user, actualLesson, course, openModal }: IVideoProps) => {
  const params = useRouter();
  const { season, lesson }: any = params.query;
  const { reload } = useCourse();
  const [duration, setDuration] = useState<number>(0);
  const [homework, setHomework] = useState<IUserHomework | null>(null);
  const [isQuizApprove, setIsQuizApprove] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    getUserHomework();
    getUserQuiz();
  }, [actualLesson]);

  const getUserHomework = async () => {
    let homeworkUserParams = {
      lessonId: actualLesson.id,
      user_id: user.id,
    };
    try {
      const userHomeworksResponse =
        await getHomeworkUserApi(homeworkUserParams);
      const userHomework = userHomeworksResponse.data.data[0];
      if (userHomework !== undefined) {
        setHomework(userHomework);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.stack);
        console.error(error.message);
      }
    }
  };

  const getUserQuiz = async () => {
    try {
      const selectIsUserApprove = `select (grade / points) * 100 > passing_grade as is_approve
        from quizzes as q 
        inner join user_quizzes as uq on uq.quiz_id = q.id 
        where uq.user_id = ${user.id} and q.lessons_id = ${actualLesson.id};`;
      const isUserApproveResponse =
        await getGenericQueryResponse(selectIsUserApprove);
      if (isUserApproveResponse.data.data.length === 0) {
        setIsQuizApprove(undefined);
      } else {
        const isUserApprove = isUserApproveResponse.data.data[0]['is_approve'];
        setIsQuizApprove(isUserApprove === '1');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  };

  const takeNextLessonOrShowModal = async () => {
    if (actualLesson.quiz === 0 && actualLesson.homework === 0) {
      // Si no hay tarea o quiz, siguiente lección
      goToNextLesson(course, +season, +lesson);
    } else if (actualLesson.homework === 1) {
      if (homework === null) {
        // Si la lección tiene tarea, pero no se ha entregado, mostrar modal
        openModal();
      } else if (homework.status === 1 && homework.approved === 1) {
        // Si la lección tiene tarea, se ha entregado y esta aprobada, siguiente lección
        goToNextLesson(course, +season, +lesson);
      } else {
        // Si la lección tiene tarea, se ha entregado pero esta pendiente o rechazada, mostrar modal
        openModal();
      }
    } else if (actualLesson.quiz === 1) {
      // Si la lección tiene quiz, pero el usuario no ha realizado el quiz, mostrar
      if (isQuizApprove === undefined) {
        openModal();
      } else if (isQuizApprove === true) {
        // Si el usuario aprobo el quiz, ir a la siguiente lección
        goToNextLesson(course, +season, +lesson);
      } else {
        openModal();
      }
    }
  };

  const finishedLesson = async () => {
    if (!actualLesson.users.includes(user.user_id)) {
      let tempLesson = {
        lessonId: actualLesson.id,
        userId: user.user_id,
        points: actualLesson.points,
      };
      await addUserToLessonApi(tempLesson);
      reload(true);
    }
    takeNextLessonOrShowModal();
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  return (
    <ReactPlayer
      className='absolute'
      ref={(p) => p?.seekTo(handleViewed(user, actualLesson))}
      url={actualLesson.link}
      playing={true}
      playsinline={true}
      muted={false}
      controls
      width='100%'
      height='auto'
      style={{ position: 'relative' }}
      onEnded={finishedLesson}
      onDuration={(duration) => {
        handleDuration(duration);
      }}
      onProgress={(state) => {
        handleProgress(user, course, params, duration, state.playedSeconds);
      }}
    />
  );
};
export default Video;
