import React, { createContext, useEffect, useState } from 'react'
import { BlogContainer, BlogItems } from './Blog.styled';
import router from "next/router";
import { getBlogs } from '../../../store/actions/AdminActions';
import { AiFillPlusCircle } from 'react-icons/ai';
import { LoaderContain } from '../User/User.styled';

const Blog = () => {
  const [blogs, setBlogs] = useState<Array<any>>([]);
  const [loader, setLoader] = useState(false);

  const goToBlog = (blog: any) => {
    let blogText: any = blog.title.replaceAll(" ", "-");
    router.push({ pathname: `/${blogText}` })
  }
  useEffect(() => {
    getBlogs().then((res: any) => {
      setBlogs(res)
      setLoader(true);
    })
  }, [router])
  return (
    <BlogContainer>
      <div className="title-contain">
        <p className="title">
          Blog
        </p>
      </div>
      {
        loader ?
          <div className="blogs">
            {
              blogs.map((blog: any, index: any) => {
                return (
                  <BlogItems key={"blog-card " + index}>
                    <div className="img-contain" onClick={() => { goToBlog(blog) }}>
                      <img className="blog-image" src={blog.path} />
                      <p className="edit-icon"><AiFillPlusCircle /></p>
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
                        <a className="read-more" onClick={() => { goToBlog(blog) }}>
                          Leer mas...
                        </a>
                      </div>
                    </div>
                  </BlogItems>
                )
              })
            }
          </div>
          : <LoaderContain />
      }
    </BlogContainer>
  )

}
export default Blog;