

import PayPlans from "../../components/PayPlans/PayPlans";
import { MainContain } from "../../screens/Styles.styled";

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
type Repo = {
  data: [],
}
export const getServerSideProps: GetServerSideProps<{ courses: Repo }> = async ({ req, res }: any) => {
  const result = await fetch("https://gonvar.inowu.dev/" + "courses/getCourses");
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const courses = await result.json();
  return {
    props: { courses }
  }
}
const PlanScreen = ({ courses }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (

    <MainContain>
      <PayPlans></PayPlans>
    </MainContain>
  )
}
export default PlanScreen;