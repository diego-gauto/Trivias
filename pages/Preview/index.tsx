import React from 'react'
import Courses from '../../components/Courses/Courses';
import { MainContain } from '../../screens/Styles.styled';
// import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
// type Repo = {
//   data: [],
// }
// export const getServerSideProps: GetServerSideProps<{ courses: Repo }> = async ({ req, res }: any) => {
//   const result = await fetch("https://gonvar.inowu.dev/" + "courses/getCourses");
//   res.setHeader(
//     'Cache-Control',
//     'public, s-maxage=10, stale-while-revalidate=59'
//   )
//   const courses = await result.json();
//   return {
//     props: { courses }
//   }
// }
// { courses }: InferGetServerSidePropsType<typeof getServerSideProps>
const PreviewScreen = () => {
  return (
    <MainContain>
      {/* <Preview></Preview> */}
      <Courses />
    </MainContain>
  )
}
export default PreviewScreen;