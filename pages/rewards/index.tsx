import Rewards from "../../containers/Profile/Rewards/Rewards";
import { MainContain } from "../../screens/Styles.styled";
// import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
// type Repo = {
//   data: [],
// }
// export const getServerSideProps: GetServerSideProps<{ rewards: Repo }> = async ({ req, res }: any) => {
//   const result = await fetch("https://gonvar.inowu.dev/" + "rewards/getRewards");
//   res.setHeader(
//     'Cache-Control',
//     'public, s-maxage=10, stale-while-revalidate=59'
//   )
//   const rewards = await result.json();
//   return {
//     props: { rewards }
//   }
// }
// { rewards }: InferGetServerSidePropsType<typeof getServerSideProps>
const Landings = () => {
  return (
    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <Rewards></Rewards>
    </MainContain>
  )
}
export default Landings;