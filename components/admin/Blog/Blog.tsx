import React, { useEffect, useState } from 'react'
import SideBar from "../SideBar";
import { AdminContain } from "../SideBar.styled";
import { BlogCard, BlogContainer } from './Blog.styled';
import router from "next/router";
import { getBlogs } from '../../../store/actions/AdminActions';
import { AiFillEdit, AiFillPlusCircle } from 'react-icons/ai';
import { LoaderContain } from '../../../containers/Profile/User/User.styled';

const Blog = () => {
  const [blogs, setBlogs] = useState<Array<any>>([]);
  const [loader, setLoader] = useState(false);
  const goToCreateBlog = () => {
    router.push({ pathname: "/admin/CreateBlog" })
  }

  const goToEditBlog = (blog: any) => {
    // let blogText: any = blog.title.replaceAll(" ", "-");
    router.push({ pathname: "/admin/CreateBlog/", query: { blogId: blog.id } })
  }
  useEffect(() => {
    getBlogs().then((res: any) => {
      setBlogs(res)
      setLoader(true);
    })
  }, [router])

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
        {
          loader ?
            <div className="blogs">
              {
                blogs.map((blog: any, index: any) => {
                  return (
                    <BlogCard key={"blog-card " + index}>
                      <div className="img-contain" onClick={() => { goToEditBlog(blog) }}>
                        <img className="blog-image" src={blog.path} />
                        {/* <p className="edit-icon"><AiFillPlusCircle /></p> */}
                        <p className="edit-icon"><AiFillEdit /></p>
                      </div>
                      <div className="text-contain">
                        <h1 className="blog-title">
                          {blog.title}
                        </h1>
                        <div className="create-date-contain">
                          <p className="blog-create">by Academia Gonvar | </p>
                          <p className="blog-date">Feb 7, 2023</p>
                        </div>
                        <div className="last-text">
                          <h3 className="blog-about">
                            {blog.subTitle}
                          </h3>
                          <a className="read-more" onClick={() => { goToEditBlog(blog) }}>
                            Editar
                          </a>
                        </div>
                      </div>
                    </BlogCard>
                  )
                })
              }
            </div>
            : <LoaderContain />
        }

      </BlogContainer>
    </AdminContain>
  )
}
export default Blog;