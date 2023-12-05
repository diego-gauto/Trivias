import React, { useEffect, useState } from 'react'
import { AdminContain } from "../SideBar.styled";
import { BlogCard, BlogContainer } from './Blog.styled';
import router from "next/router";
import { getBlogs } from '../../../store/actions/AdminActions';
import { AiFillEdit } from 'react-icons/ai';
import { LoaderContain } from '../../../containers/Profile/User/User.styled';
import { IBlog } from './IBlog';
import { createBlogsApi, getBlogsApi, updateBlogImageApi, updateBlogsApi, updateSubTopicImageApi } from '../../api/blog';
import { updateBlogImage, updateSubTopicImage } from '../../../store/actions/FireBaseImages';
import { getUserApi } from '../../api/users';
import { formatBlogDate } from '../../../utils/functions';
import { IUserInfoResult } from '../../../interfaces/IUser';

const Blog = () => {
  const [blogs, setBlogs] = useState<Array<any>>([]);
  const [oldBlogs, setoldBlogs] = useState<any>([]);
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState<IUserInfoResult | null>(null);

  const goToCreateBlog = () => {
    if (userData === null) {
      return;
    }
    if (userData.role === "admin" && userData.roles[2].create === 0) {
      alert("No tienes permisos para esta acción");
      return;
    }
    router.push({ pathname: "/admin/CreateBlog" })
  }

  useEffect(() => {
    if (localStorage.getItem("email")) {
      getUserApi(localStorage.getItem("email")).then((res) => {
        setUserData(res);
      })
    }
  }, [])

  const goToEditBlog = (blog: any) => {
    // let blogText: any = blog.title.replaceAll(" ", "-");
    if (userData === null) {
      return;
    }
    if (userData.role === "admin" && userData.roles[2].edit === 0) {
      alert("No tienes permisos para esta acción");
      return;
    }
    router.push({ pathname: "/admin/CreateBlog/", query: { blogId: blog.id } })
  }
  // const addimages = () => {
  //   oldBlogs[7].subTopic.forEach((blog: any, index: any) => {
  //     if (blog.topicPath !== '') {
  //       updateSubTopicImage(blog.topicPath, 8, 31 + index).then((url_subtopic: any) => {
  //         let tempBlog = {
  //           image: url_subtopic,
  //           id: 31 + index,
  //         }
  //         console.log(tempBlog);
  //         updateSubTopicImageApi(tempBlog).then(() => {
  //           console.log('exito')
  //         })
  //       })
  //     }
  //   });
  // }
  // const creatNewBlog = () => {
  //   oldBlogs.forEach((old: any) => {
  //     let blogToAdd = {
  //       title: old.title,
  //       subtitle: old.subTitle,
  //       summary: old.summary,
  //       link: old.link,
  //       image: old.path,
  //       subTopic: old.subTopic.map((sbt: any) => {
  //         let newsbt = {
  //           title: sbt.topicTitle,
  //           text: sbt.topicText,
  //           image: '',
  //         }
  //         return newsbt
  //       })
  //     }
  //     console.log(blogToAdd);
  //     createBlogsApi(blogToAdd).then((res) => {
  //       console.log('exit')
  //     })
  //   })
  // }
  const getMonth = (month: any) => {
    if (month === 1) {
      return "ene"
    }
    else if (month === 2) {
      return "feb"
    }
    else if (month === 3) {
      return "mar"
    }
    else if (month === 4) {
      return "abr"
    }
    else if (month === 5) {
      return "may"
    }
    else if (month === 6) {
      return "jun"
    }
    else if (month === 7) {
      return "jul"
    }
    else if (month === 8) {
      return "ago"
    }
    else if (month === 9) {
      return "sep"
    }
    else if (month === 10) {
      return "oct"
    }
    else if (month === 11) {
      return "nov"
    }
    else if (month === 12) {
      return "dec"
    }
    else {
      return ''
    }
  }
  useEffect(() => {
    getBlogsApi().then((res) => {
      res.forEach((blog: IBlog, index: number) => {
        blog.date = formatBlogDate(blog.created_at)
      });
      setBlogs(res)
      setLoader(true);
    })
  }, [router])
  return (
    <AdminContain>
      <BlogContainer>
        <div className="title-contain">
          <p className="title">
            Blog
          </p>
          {/* <button onClick={creatNewBlog}>add blog sql</button> */}
          {/* <button onClick={addimages}>crear imagenes</button> */}
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
                        <img className="blog-image" src={blog.image} />
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