import React, { useEffect, useState } from 'react'
import SideBar from "../SideBar";
import { AdminContain } from "../SideBar.styled";
import { BlogCard, BlogContainer } from './Blog.styled';
import router from "next/router";
import { getBlogs } from '../../../store/actions/AdminActions';
import { AiFillEdit } from 'react-icons/ai';
import { LoaderContain } from '../../../containers/Profile/User/User.styled';
import { IBlog } from './IBlog';

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
      res.forEach((element: IBlog) => {
        let tempDate: any = new Date(element.createdAt.seconds * 1000);
        let tempDay = tempDate.getDate();
        let tempMonth = tempDate.getMonth() + 1;
        let textMonth: string = ""
        if (tempMonth == 1) {
          textMonth = "ene"
        }
        if (tempMonth == 2) {
          textMonth = "feb"
        }
        if (tempMonth == 3) {
          textMonth = "mar"
        }
        if (tempMonth == 4) {
          textMonth = "abr"
        }
        if (tempMonth == 5) {
          textMonth = "may"
        }
        if (tempMonth == 6) {
          textMonth = "jun"
        }
        if (tempMonth == 7) {
          textMonth = "jul"
        }
        if (tempMonth == 8) {
          textMonth = "ago"
        }
        if (tempMonth == 9) {
          textMonth = "sep"
        }
        if (tempMonth == 10) {
          textMonth = "oct"
        }
        if (tempMonth == 11) {
          textMonth = "nov"
        }
        if (tempMonth == 12) {
          textMonth = "dec"
        }
        let tempYear = tempDate.getFullYear();
        element.date = {
          day: tempDay,
          month: textMonth,
          year: tempYear,
        };
      });
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
                          <p className="blog-date">{blog.date.month} {blog.date.day}, {blog.date.year}</p>
                        </div>
                        <div className="last-text">
                          <h3 className="blog-about">
                            {blog.summary}
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