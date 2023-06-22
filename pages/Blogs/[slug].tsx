import React from 'react'
import BlogView from '../../containers/Profile/Blog/BlogView/BlogView';
import { MainContain } from "../../screens/Styles.styled";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
type Repo = {
  data: [],
}
export const getServerSideProps: GetServerSideProps<{ blog: Repo }> = async (context: any) => {
  let tempBlog = [];
  const id = context.params.slug;
  const result = await fetch("https://gonvar.inowu.dev/blogs/getBlogs");
  const allBlogs = await result.json();
  tempBlog = allBlogs.data.filter((blog: any) => blog.route === id);
  const sendBlog = await fetch("https://gonvar.inowu.dev/" + "blogs/" + tempBlog[0].id)
  const blog = await sendBlog.json();
  return {
    props: { blog }
  }
}
const BlogScreen = ({ blog }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <MainContain
      style={{
        width: "100%",
        padding: "0",
        maxWidth: "100% !important",
      }}>
      <BlogView></BlogView>
    </MainContain>
  )
}
export default BlogScreen;