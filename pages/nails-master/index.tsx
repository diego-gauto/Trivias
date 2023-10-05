import { renderToString } from "react-dom/server";

import { type } from "os";

import LandingNailsMaster from "../../components/Landings/LandingNailsMaster/LandingNailsMaster";
import { MainContain } from "../../screens/Styles.styled";

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import LandingNailsMasterRevolution from "../../components/Landings/LandingNailsMasterRevolution/LandingNailsMasterRevolution";
type Repo = {
  data: [],
}
//: GetServerSideProps<{ nails: Repo }>
export const getServerSideProps = async ({ req, res }: any) => {
  const result = await fetch("https://gonvar.inowu.dev/" + "courses/getCourses");
  const html = [renderToString(<LandingNailsMaster />)]
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  // let nails = await result.json();
  let nails = html;
  return {
    props: { nails }
  }
}
const termsConditions = ({ nails }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (

    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <LandingNailsMaster />
    </MainContain>
  )
}
export default termsConditions;