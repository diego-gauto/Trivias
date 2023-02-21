import React from 'react'
import SideBar from "../SideBar";
import { AdminContain } from "../SideBar.styled";
import { BlogContainer } from './Blog.styled';
import router from "next/router";

const Blog = () => {

  const goToCreateBlog = () => {
    router.push({ pathname: "/admin/CreateBlog" })
  }

  const goToEditBlog = () => {

  }

  return (
    <AdminContain>
      <SideBar />
      <BlogContainer>
        <div className="title-contain">
          <p className="title">
            Blog
          </p>
          <button className="add-course" onClick={goToCreateBlog}>
            <p className="add-text">
              Agregar Blog
            </p>
          </button>
        </div>
        <div className="blogs">
          hola
        </div>
      </BlogContainer>
    </AdminContain>
  )
}
export default Blog;