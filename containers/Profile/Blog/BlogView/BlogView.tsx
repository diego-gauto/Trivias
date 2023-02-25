import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { getBlogs } from '../../../../store/actions/AdminActions';
import { LoaderContain } from '../../User/User.styled';
import { IBlog } from './IBlogView';
const BlogView = () => {
  const [loader, setLoader] = useState(false)
  const [blog, setBlog] = useState<IBlog>();
  const router = useRouter();
  const getBlog = () => {
    let tempTitle: any = router.query.blog;
    let titleSearch: string = tempTitle.replaceAll("-", " ");
    let tempBlog: any;
    getBlogs().then((res) => {
      tempBlog = res.filter((blog: IBlog) => blog.title === titleSearch);
      setBlog(tempBlog[0])
      setLoader(true);
    })
  }
  useEffect(() => {
    getBlog()
  }, [])

  return (
    <div>
      {
        loader
          ? <h1>hola {blog?.title}</h1>
          : <LoaderContain />
      }
    </div>
  )
}
export default BlogView;