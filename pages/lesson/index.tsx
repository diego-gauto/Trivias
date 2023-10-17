import LessonNew from "../../containers/Profile/LessonNew/LessonNew";
import { CourseProvider } from "../../hooks/useLesson";
import { MainContain } from "../../screens/Styles.styled";

const LessonScreen = () => {

  return (
    <CourseProvider>
      <MainContain>
        <LessonNew></LessonNew>
      </MainContain>
    </CourseProvider>
  )
}
export default LessonScreen;