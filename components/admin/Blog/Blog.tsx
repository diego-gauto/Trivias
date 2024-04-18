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
import { UserLevelValue, Role } from '../../../components/GenericQueries/UserRoles/UserRolesInterfaces';
import { generateUserIdQuery, generateUserRoleAccessQuery, generateUserRolesLevelQuery } from '../../../components/GenericQueries/UserRoles/UserRolesQueries';
import { getGenericQueryResponse } from '../../../components/api/admin';

interface UserAccesss {
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canCreate: boolean;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<Array<any>>([]);
  const [loader, setLoader] = useState(false);
  const [userAccess, setUserAccess] = useState<UserAccesss>({ canView: false, canCreate: false, canDelete: false, canEdit: false });
  const [userLevel, setUserLevel] = useState<UserLevelValue>('user');

  const { canView, canCreate, canDelete, canEdit } = userAccess;

  const getUserData = async () => {
    try {
      const email = localStorage.getItem("email");
      if (email === null) {
        throw new Error('No existe un email establecido para el usuario');
      }
      const userIdQuery = generateUserIdQuery(email);
      const userIdResponse = await getGenericQueryResponse(userIdQuery);
      const userId = userIdResponse.data.data[0]['id'];
      // Roles request
      const userRolesQuery = generateUserRoleAccessQuery(userId);
      const userRolesResponse = await getGenericQueryResponse(userRolesQuery);
      const userRoles = userRolesResponse.data.data as Role[];
      const role = userRoles.find(role => role.role === 'blogs');
      setUserAccess({
        canView: role?.view === 1,
        canEdit: role?.edit === 1,
        canDelete: role?.delete === 1,
        canCreate: role?.create === 1
      });
      // Role level
      const userLevelQuery = generateUserRolesLevelQuery(userId);
      const userLevelResponse = await getGenericQueryResponse(userLevelQuery);
      const userRoleLevel = userLevelResponse.data.data[0]['role'];
      setUserLevel(userRoleLevel);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  const goToCreateBlog = () => {
    if (userLevel === "admin" && !canCreate) {
      alert("No tienes permisos para esta acción");
      return;
    }
    router.push({ pathname: "/admin/CreateBlog" })
  }

  const goToEditBlog = (blog: any) => {
    if (userLevel === "admin" && !(canEdit || canDelete)) {
      alert("No tienes permisos para esta acción");
      return;
    }
    router.push({ pathname: "/admin/CreateBlog/", query: { blogId: blog.id } })
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
          {
            canCreate && <button className="add-course" onClick={goToCreateBlog}>
              <p className="add-text">
                Agregar Blog
              </p>
            </button>
          }
        </div>
        {
          loader ?
            <div className="blogs">
              {
                canView && blogs.map((blog: any, index: any) => {
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