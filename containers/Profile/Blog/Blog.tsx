import React, { useEffect, useState } from 'react'
import { BlogContainer, BlogItems } from './Blog.styled';
import router from "next/router";
import { AiFillPlusCircle } from 'react-icons/ai';
import { IBlog } from './IBlog';
import { getBlogsApi } from '../../../components/api/blog';
import { BackgroundLoader, LoaderContain, LoaderImage } from '../../../components/Loader.styled';
import { formatBlogDateCase2 } from '../../../utils/functions';

const Blog = (props: any) => {
  const { blogs } = props;
  // const [blogs, setBlogs] = useState<Array<any>>([]);
  const [loader, setLoader] = useState(true);

  const goToBlog = (blog: any) => {
    router.push({ pathname: `/Blogs/${blog.route}` })
  }
  // useEffect(() => {
  //   getBlogsApi().then((res) => {
  //     res.forEach((blog: IBlog, index: number) => {
  //       blog.date = formatBlogDate(blog.created_at)
  //     });
  //     setBlogs(res)
  //     setLoader(true);
  //   })
  // }, [router])
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
                      <p className="blog-title">
                        {blog.title}
                      </p>
                      <div className="create-date-contain">
                        <p className="blog-create">by Academia Gonvar | </p>
                        <p className="blog-date">{formatBlogDateCase2(blog.created_at)}</p>
                        {/* <p className="blog-date">{blog.date.month} {blog.date.day}, {blog.date.year}</p> */}
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
          :
          <BackgroundLoader>
            <LoaderImage>
              <LoaderContain />
            </LoaderImage>
          </BackgroundLoader>
      }
    </BlogContainer>
  )

}
export default Blog;