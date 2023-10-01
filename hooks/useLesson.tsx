import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { getCourseApi } from "../components/api/lessons";
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

  useEffect(() => {
    getCourseApi(id).then((res) => {
      console.log(res);

      setCourse(res);
      console.log(season, lesson, id);

      let data = res.seasons[+season].lessons[+lesson];
      setTempLesson(data);
      setIsLoading(false);
    })
  }, [season, lesson])




  const values = {
    course,
    isLoading,
    tempLesson
  };

  return <CourseContext.Provider value={values}>{children}</CourseContext.Provider>;
};