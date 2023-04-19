import React, { createContext, useEffect, useState } from 'react'
import { BlogContainer, BlogItems } from './Blog.styled';
import router from "next/router";
import { getBlogs } from '../../../store/actions/AdminActions';
import { AiFillPlusCircle } from 'react-icons/ai';
import { LoaderContain } from '../User/User.styled';
import { IBlog } from './IBlog';
import { getBlogsApi } from '../../../components/api/blog';

const Blog = () => {
  const [blogs, setBlogs] = useState<Array<any>>([]);
  const [loader, setLoader] = useState(false);


  const goToBlog = (blog: any) => {
    let blogText: any = blog.title.replaceAll("-", "&#45;").replaceAll(" ", "-");
    router.push({ pathname: `/Blogs/${blogText}` })
  }
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
    // getBlogs().then((res: any) => {
    //   res.forEach((element: IBlog) => {
    //     let tempDate: any = new Date(element.createdAt.seconds * 1000);
    //     let tempDay = tempDate.getDate();
    //     let tempMonth = tempDate.getMonth() + 1;
    //     let textMonth: string = ""
    //     if (tempMonth == 1) {
    //       textMonth = "ene"
    //     }
    //     if (tempMonth == 2) {
    //       textMonth = "feb"
    //     }
    //     if (tempMonth == 3) {
    //       textMonth = "mar"
    //     }
    //     if (tempMonth == 4) {
    //       textMonth = "abr"
    //     }
    //     if (tempMonth == 5) {
    //       textMonth = "may"
    //     }
    //     if (tempMonth == 6) {
    //       textMonth = "jun"
    //     }
    //     if (tempMonth == 7) {
    //       textMonth = "jul"
    //     }
    //     if (tempMonth == 8) {
    //       textMonth = "ago"
    //     }
    //     if (tempMonth == 9) {
    //       textMonth = "sep"
    //     }
    //     if (tempMonth == 10) {
    //       textMonth = "oct"
    //     }
    //     if (tempMonth == 11) {
    //       textMonth = "nov"
    //     }
    //     if (tempMonth == 12) {
    //       textMonth = "dec"
    //     }
    //     let tempYear = tempDate.getFullYear();
    //     element.date = {
    //       day: tempDay,
    //       month: textMonth,
    //       year: tempYear,
    //     };
    //   });
    //   setBlogs(res)
    //   setLoader(true);
    // })
    getBlogsApi().then((res) => {
      res.forEach((blog: IBlog, index: number) => {
        let date = new Date(blog.created_at)
        let tempDay = date.getDate();
        let tempMonth = date.getMonth() + 1;
        let textMonth: string = getMonth(tempMonth);
        let tempYear = date.getFullYear();
        blog.date = {
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
              blogs.map((blog: IBlog, index: any) => {
                return (
                  <BlogItems key={"blog-card " + index}>
                    <div className="img-contain" onClick={() => { goToBlog(blog) }}>
                      <img className="blog-image" src={blog.image} />
                      <p className="edit-icon"><AiFillPlusCircle /></p>
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