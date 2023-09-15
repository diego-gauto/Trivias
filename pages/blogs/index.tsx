
import Blog from "../../containers/Profile/Blog/Blog";
import { MainContain } from "../../screens/Styles.styled";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
type Repo = {
  data: [],
}
// export const getServerSideProps: GetServerSideProps<{ repo: Repo }> = async ({ req, res }: any) => {
//   const result = await fetch("https://gonvar.inowu.dev/" + "blogs/getBlogs");
//   res.setHeader(
//     'Cache-Control',
//     'public, s-maxage=10, stale-while-revalidate=59'
//   )
//   const repo = await result.json();
//   return {
//     props: { repo }
//   }
// }
// { repo }: InferGetServerSidePropsType<typeof getServerSideProps>
const BlogScreen = () => {
  return (
    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <Blog ></Blog>
      {/* <div dangerouslySetInnerHTML={{ __html: `${Blog(repo.data)}` }} style={{ display: "none" }} /> */}
    </MainContain>
  )
}
export default BlogScreen;