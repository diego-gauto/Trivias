import { useRouter } from "next/router";
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
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (lessonGuard(context.user)) {
      getCourseApi(id).then((res) => {
        console.log(res);

        setCourse(res);
        let data = res.seasons[+season].lessons[+lesson];
        setTempLesson(data);
        setIsLoading(false);
      })
    }
  }, [season, lesson])

  const values = {
    course,
    isLoading,
    tempLesson,
    open,
    setOpen
  };

  return <CourseContext.Provider value={values}>{children}</CourseContext.Provider>;
};