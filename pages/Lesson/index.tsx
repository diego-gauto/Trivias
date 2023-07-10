import React from 'react'
import Lesson from '../../containers/Profile/Lesson/Lesson';
import { MainContain } from '../../screens/Styles.styled';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
type Repo = {
  data: [],
}
export const getServerSideProps: GetServerSideProps<{ sentLesson: Repo }> = async (context: any) => {
  const id = context.query.id;
  const lesson = await fetch("https://gonvar.inowu.dev/" + "lessons/" + id)
  const sentLesson = await lesson.json();
  return {
    props: { sentLesson }
  }
}
const LessonScreen = ({ sentLesson }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (

    <MainContain>
      <Lesson></Lesson>
    </MainContain>
  )
}
export default LessonScreen;