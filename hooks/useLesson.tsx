import router, { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { getCourseApi } from "../components/api/lessons";
import { lessonGuard } from "../containers/Profile/LessonNew/utils/functions";
import { useAuth } from "./useAuth";
export const CourseContext = createContext<any>(null);

export const useCourse = () => {
  return useContext(CourseContext);
};

export const CourseProvider = ({ children }: any) => {
  const [course, setCourse] = useState<any>(null);
  const params = useRouter()
  const { id, season, lesson }: any = params.query;
  const [isLoading, setIsLoading] = useState(true);
  const [tempLesson, setTempLesson] = useState(null);
  const context = useAuth();
  const [open, setOpen] = useState(false)

  const reload = () => {
    getCourseApi(id).then((res) => {
      let data = res.seasons[+season].lessons[+lesson];

      if (res.type === "Mensual" && context.user.final_date < new Date().getTime() / 1000) {
        router.push({ pathname: "/preview" });
      }
      if (res.type === "Producto") {
        let user_course = context.user.user_courses.filter((x: any) => x.course_id === +id);
        if ((user_course.length > 0 && user_course[0].final_date < new Date().getTime() / 1000) || user_course.length === 0) {
          router.push({ pathname: "/preview" });
        }
      }

      setCourse(res);
      setTempLesson(data);
      setIsLoading(false);
    })
  }

  useEffect(() => {
    if (lessonGuard(context.user)) {
      reload()
    }
  }, [])

  useEffect(() => {
    if (lessonGuard(context.user)) {
      if (course) {
        let data = course.seasons[+season].lessons[+lesson];
        setTempLesson(data);
      }
    }
  }, [season, lesson])


  const values = {
    course,
    isLoading,
    tempLesson,
    open,
    setOpen,
    reload
  };

  return <CourseContext.Provider value={values}>{children}</CourseContext.Provider>;
};