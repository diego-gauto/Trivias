
import { renderToString } from "react-dom/server";

import LandingSuscription from "../../components/Landings/LandingSuscription/LandingSuscription";
import { MainContain } from "../../screens/Styles.styled";

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

type Repo = {
  data: [],
}
export const getServerSideProps = async ({ req, res }: any) => {
  // const result = await fetch("https://gonvar.inowu.dev/" + "courses/getCourses");
  const html = renderToString(<LandingSuscription price={"$1,599 MXN/anual"} type={"anual"} />)
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  // let anual = await result.json();
  let anual = html;
  return {
    props: { anual }
  }
}
const termsConditions = ({ anual }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const price = "$3,497 MXN/anual"
  const type = "anual"
  return (
    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <LandingSuscription price={price} type={type} isFacebook={true} />
    </MainContain>
  )
}
export default termsConditions;