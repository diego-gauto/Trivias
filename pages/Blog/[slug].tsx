import React from 'react'
import BlogView from '../../containers/Profile/Blog/BlogView/BlogView';
import { MainContain } from "../../screens/Styles.styled";
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