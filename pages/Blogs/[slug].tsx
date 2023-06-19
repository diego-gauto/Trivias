import React from 'react'
import BlogView from '../../containers/Profile/Blog/BlogView/BlogView';
import { MainContain } from "../../screens/Styles.styled";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
type Repo = {
  data: [],
}
export const getServerSideProps: GetServerSideProps<{ repo: Repo }> = async ({ req, res }: any) => {
  const result = await fetch("https://gonvar.inowu.dev/" + "blogs/getBlogs");
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const repo = await result.json();

  return {
    props: { repo }
  }
}
const BlogScreen = () => {
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