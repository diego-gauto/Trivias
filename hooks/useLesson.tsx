import router, { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { getCourseApi } from '../components/api/lessons';
import { lessonGuard } from '../containers/Profile/LessonNew/utils/functions';
import { useAuth } from './useAuth';
import { LESSON_PATH } from '../constants/paths';
import { ICourseResponse, ILesson } from '../interfaces/ICourseNew';
import { IUserInfoResult } from '../interfaces/IUser';
export const CourseContext = createContext<any>(null);

export const useCourse = () => {
  return useContext(CourseContext);
};

export const CourseProvider = ({ children }: any) => {
  const [course, setCourse] = useState<ICourseResponse | null>(null);
  const params = useRouter();
  const { id, season: seasonId, lesson: lessonId }: any = params.query;
  const [isLoading, setIsLoading] = useState(true);
  const [tempLesson, setTempLesson] = useState<ILesson | null>(null);
  const user: IUserInfoResult = useAuth().user;
  const [open, setOpen] = useState(false);
  let today = new Date().getTime() / 1000;

  const canShowLesson = () => {
    const { final_date, method, level, role } = user;
    const haveRecurrentSubscription = [1, 4, 7].includes(level) && method === 'conekta';
    const TOLERANCE_DAYS = 10;
    const isSuperAdmin = role === 'superAdmin';

    if (isSuperAdmin) {
      return true;
    }

    return final_date < today - (TOLERANCE_DAYS * 24 * 60 * 60);
  }

  const prepareLessonInfoToRedirect = () => {
    const data = {
      course_id: parseInt(id),
      season_id: parseInt(seasonId),
      lesson_id: parseInt(lessonId)
    };
    const jsonString = JSON.stringify(data);
    localStorage.setItem('lesson-redirect-info', jsonString);
  }

  const reload = async (changeLesson?: boolean) => {
    let complete_nails = user.user_courses.filter(
      (val: any) => val.course_id === 57 && val.final_date > today,
    );
    try {
      const res = await getCourseApi(id);
      if (res !== undefined) {
        console.log({ res });
        console.log({ user: user });
        const { final_date, method, level } = user;
        const { seasons, type } = res;
        let lesson = seasons[+seasonId]!.lessons[+lessonId];
        if (lesson === undefined) {
          lesson = seasons[0]!.lessons[0];
          router.push({
            pathname: 'lessonTemp',
            query: { id: id, season: 0, lesson: 0 },
          });
        }
        if (user.role !== 'superAdmin') {
          if (type === 'Mensual' && !canShowLesson()) {
            prepareLessonInfoToRedirect();
            router.push({ pathname: '/planes' });
          }
          /*
          if (
            type === 'Mensual' &&
            user.final_date < today &&
            diff > 10 &&
            complete_nails.length === 0
          ) {
            router.push({ pathname: '/preview' });
          }
            */
          if (type === 'Producto') {
            let user_course = user.user_courses.filter(
              (x: any) => x.course_id === +id,
            );
            if (
              (user_course.length > 0 && user_course[0].final_date < today) ||
              user_course.length === 0
            ) {
              router.push({ pathname: '/preview' });
            }
          }
        }
        setCourse(res);
        if (!changeLesson) {
          setTempLesson(lesson || null);
        }
        setIsLoading(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        error.stack
          ? console.error(error.stack)
          : console.log(
            'No stack error in line 51, useLesson.tsx > CourseProvider',
          );
      }
    }

  };

  useEffect(() => {
    if (user !== null) {
      reload();
    } else {
      prepareLessonInfoToRedirect();
      router.push({ pathname: '/auth/login' });
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      if (course !== null) {
        let data = course.seasons[+seasonId]!.lessons[+lessonId];
        setTempLesson(data || null);
      }
    } else {
      prepareLessonInfoToRedirect();
      router.push({ pathname: '/auth/login' });
    }
  }, [seasonId, lessonId]);

  const values = {
    course,
    isLoading,
    tempLesson,
    open,
    setOpen,
    reload,
  };

  return (
    <CourseContext.Provider value={values}>{children}</CourseContext.Provider>
  );
};
