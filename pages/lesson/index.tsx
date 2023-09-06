

import Lesson from "../../containers/Profile/Lesson/Lesson";
import { MainContain } from "../../screens/Styles.styled";

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
type Repo = {
  data: [],
}
// export const getServerSideProps: GetServerSideProps<{ sentLesson: Repo }> = async (context: any) => {
//   const id = context.query.id;
//   const lesson = await fetch("https://gonvar.inowu.dev/" + "lessons/" + id)
//   let sentLesson = await lesson.json();
//   //Filtrar los id de usuarios
//   sentLesson.data.map((x: any) => {
//     x.lessons = x.lessons.length
//     x.seasons.forEach((y: any) => {
//       y.users = []
//       y.progress = []
//       y.lessons.forEach((w: any) => {
//         w.progress = []
//         w.users = []
//       })
//     })
//   })
//   return {
//     props: { sentLesson }
//   }
// }
const LessonScreen = () => {

  return (

    <MainContain>
      <Lesson></Lesson>
    </MainContain>
  )
}
export default LessonScreen;