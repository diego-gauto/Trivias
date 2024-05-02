import React from 'react';
import BlogView from '../../containers/Profile/Blog/BlogView/BlogView';
import router from 'next/router';
import { MainContain } from '../../screens/Styles.styled';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { IBlog } from '../../containers/Profile/Blog/IBlog';
type Repo = {
  data: any;
};
export const getServerSideProps: GetServerSideProps<{ blog: Repo }> = async (
  context: any,
) => {
  let tempBlog = [];
  const id = context.params.slug;
  const result = await fetch('https://gonvar.inowu.dev/blogs/getBlogs');
  const allBlogs = await result.json();
  let leave = '';
  tempBlog = allBlogs.data.filter((blog: IBlog) => blog.route === id);
  if (tempBlog.length === 0) {
    let tempTitle = id.replaceAll('-', ' ').replaceAll('%3F?', '?');
    // tempBlog = allBlogs.data.filter((blog: IBlog) => blog.title === tempTitle);
    // const sendBlog = await fetch("https://gonvar.inowu.dev/" + "blogs/" + tempBlog[0].id)
    const blog: any = [];
    return {
      props: { blog },
    };
  }
  const sendBlog = await fetch(
    'https://gonvar.inowu.dev/' + 'blogs/' + tempBlog[0].id,
  );
  const blog = await sendBlog.json();
  return {
    props: { blog, leave },
  };
};
const BlogScreen = ({
  blog,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <MainContain
      style={{
        width: '100%',
        padding: '0',
        maxWidth: '100% !important',
      }}
    >
      <BlogView></BlogView>
    </MainContain>
  );
};
export default BlogScreen;
