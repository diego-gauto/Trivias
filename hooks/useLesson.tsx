import router, { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import { getCourseApi } from '../components/api/lessons';
import { lessonGuard } from '../containers/Profile/LessonNew/utils/functions';
import { useAuth } from './useAuth';
import { LESSON_PATH } from '../constants/paths';
import { ICourseResponse, ILesson } from '../interfaces/ICourseNew';
import lesson from '../pages/lesson';
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
  const context = useAuth();
  const [open, setOpen] = useState(false);
  let today = new Date().getTime() / 1000;

  const reload = (changeLesson?: boolean) => {
    let complete_nails = context.user!.user_courses.filter(
      (val: any) => val.course_id === 57 && val.final_date > today,
    );
    getCourseApi(id)
      .then((res) => {
        if (res !== undefined) {
          console.log({ res });
          let lesson = res.seasons[+seasonId]!.lessons[+lessonId];
          if (lesson === undefined) {
            lesson = res.seasons[0]!.lessons[0];
            router.push({
              pathname: 'lessonTemp',
              query: { id: id, season: 0, lesson: 0 },
            });
          }
          if (context.user!.role !== 'superAdmin') {
            let diff = Math.round((today - context.user!.final_date) / 86400);
            if (
              res.type === 'Mensual' &&
              context.user!.final_date < today &&
              diff > 6 &&
              complete_nails.length === 0
            ) {
              router.push({ pathname: '/preview' });
            }
            if (res.type === 'Producto') {
              let user_course = context.user!.user_courses.filter(
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
      })
      .catch((reason) => {
        if (reason instanceof Error) {
          console.error(reason.message);
          reason.stack
            ? console.error(reason.stack)
            : console.log(
              'No stack error in line 51, useLesson.tsx > CourseProvider',
            );
        }
      });
  };

  useEffect(() => {
    if (lessonGuard(context.user)) {
      reload();
    }
  }, []);

  useEffect(() => {
    if (lessonGuard(context.user)) {
      if (course !== null) {
        let data = course.seasons[+seasonId]!.lessons[+lessonId];
        setTempLesson(data || null);
      }
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
