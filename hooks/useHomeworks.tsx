import { Dispatch, SetStateAction, createContext, useState } from "react";
import { IReducedHomework } from "../interfaces/IHomeworkByUser";
import { getCourseHomeworksOfUser } from "../components/api/homeworks";

interface HomeworksContextValues {
  homeworks: IReducedHomework[] | null;
  setHomeworks: Dispatch<SetStateAction<IReducedHomework[] | null>>;
  isLoading: boolean;
  loadHomeworks: (homeworkParams: {
    user_id: number;
    course_id: number;
  }) => Promise<void>;
}

export const HomeworksContext = createContext<HomeworksContextValues>({} as HomeworksContextValues);

export const HomeworksProvider = ({ children }: any) => {
  const [homeworks, setHomeworks] = useState<IReducedHomework[] | null>(null);
  const [isLoading, setIsHomeworkLoading] = useState(true);

  const loadHomeworks = async (homeworkParams: { user_id: number, course_id: number }) => {
    try {
      const response = await getCourseHomeworksOfUser(homeworkParams);
      // console.log(response.data);
      setHomeworks(response.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        console.error('hooks\\useLesson.tsx => linea 70');
      }
    } finally {
      setIsHomeworkLoading(false);
    }
  }

  return (
    <HomeworksContext.Provider value={{ homeworks, setHomeworks, isLoading, loadHomeworks }}>
      {children}
    </HomeworksContext.Provider>
  );
}