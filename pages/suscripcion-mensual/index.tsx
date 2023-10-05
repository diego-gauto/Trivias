import { renderToString } from "react-dom/server";

import LandingSuscription from "../../components/Landings/LandingSuscription/LandingSuscription";
import { MainContain } from "../../screens/Styles.styled";

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
type Repo = {
  data: [],
}
//: GetServerSideProps<{ mensual: Repo }>
export const getServerSideProps = async ({ req, res }: any) => {
  // const result = await fetch("https://gonvar.inowu.dev/" + "courses/getCourses");
  // let mensual = await result.json();
  // let courses = await result.json();
  // const mensual = courses.data.filter((x: any) => {
  //   if (x.type === "Mensual") {
  //     return x
  //   }
  // })
  const html = [renderToString(<LandingSuscription price={"$249 MXN/mes"} isMonth={true} />)]
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  let mensual = html;
  return {
    props: { mensual }
  }
}
const termsConditions = ({ mensual }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const price = "$249 MXN/mes"
  const month = true;
  return (
    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <LandingSuscription price={price} isMonth={month} />
    </MainContain>
  )
}
export default termsConditions;