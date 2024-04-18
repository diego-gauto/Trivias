import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import { BlogBackground, BlogInputs } from './CreateBlog.styled';
import 'react-quill/dist/quill.snow.css';
import { addBlog, deleteBlog, getBlogs, updateBlog } from '../../../../store/actions/AdminActions';
import { AiOutlineClose } from 'react-icons/ai';
import { LoaderContain } from '../../../../containers/Profile/User/User.styled';
import router, { useRouter } from "next/router";
import { GiExitDoor } from 'react-icons/gi';
import { createBlogsApi, deleteBlogsApi, getBlogsApi, getSingleBlogApi, updateBlogImageApi, updateBlogsApi, updateSubTopicImageApi } from '../../../api/blog';
import { updateBlogImage, updateSubTopicImage } from '../../../../store/actions/FireBaseImages';
import { getUserApi } from '../../../api/users';
import { Role, UserLevelValue } from '../../../GenericQueries/UserRoles/UserRolesInterfaces';
import { generateUserIdQuery, generateUserRoleAccessQuery, generateUserRolesLevelQuery } from '../../../GenericQueries/UserRoles/UserRolesQueries';
import { getGenericQueryResponse } from '../../../api/admin';

interface UserAccesss {
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canCreate: boolean;
}

const CreateBlog = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [processLoader, setProcessLoader] = useState<boolean>(false);
  const routerState = useRouter().query
  const [image, setImage] = useState<any>("");
  const [quill, setQuill] = useState("");
  const [blogs, setBlogs] = useState<any>([]);
  const [blog, setBlog] = useState<any>({
    title: "",
    subtitle: "",
    summary: "",
    image: "",
    link: "",
    route: "",
    subTopic: [],
  });
  const [topic, setTopic] = useState<any>({
    title: "",
    text: "",
    image: "",
    newImage: "",
  })
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ size: ["small", "normal", "large", "huge"] }, {
          color: [
            "red",
            "blue",
            "#6717cd",
            "black",
          ]
        }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
          { align: [] }
        ],
        ['link', 'image', 'video'],
        ["clean"]
      ],
    },
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "size",
    "color",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align"
  ];
  const { blogId } = routerState;
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
      console.log({ role });
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
  }, [])

  const goToBlog = () => {
    router.push({ pathname: "/admin/Blog" })
  }
  const getImage = (file: any) => {
    if (file.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = (_event) => {
        setImage(reader.result);
        setBlog({ ...blog, image: reader.result })
      };
    }
  }
  const addTheme = () => {
    if (userLevel === "admin" && !canCreate) {
      alert("No tienes permisos para esta acción");
      return;
    }
    let tempBlog: any = blog;
    tempBlog.subTopic.push(topic)
    setBlog({ ...tempBlog })
  }
  const removeTheme = (index: number) => {
    let tempBlog: any = blog;
    setLoader(false);
    if (confirm(`¿Desea eliminar subtema ${index + 1}?, esto recorrera los otros subtemas`)) {
      tempBlog.subTopic.splice(index, 1)
      setBlog({ ...tempBlog })
      setTimeout(() => {
        setLoader(true);
      }, 1000)
    } else {
    }

  }
  const removeImage = (index: any) => {
    let tempBlog: any = blog;
    tempBlog.subTopic[index].image = ""
    setBlog({ ...tempBlog })
  }
  const changeTopicTitle = (topicVal: any, index: number, text: string) => {
    let tempTopic: any = { ...topicVal, title: text };
    let tempBlog: any = blog;
    tempBlog.subTopic[index] = tempTopic;
    setBlog({ ...tempBlog })
  }
  const changeTopicImage = (topicVal: any, file: any, index: any) => {
    let tempTopic: any
    let tempBlog: any = blog;
    if (file.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = (_event) => {
        tempTopic = { ...topicVal, image: reader.result }
        tempTopic = { ...topicVal, image: reader.result }
        if (blogId) {
          tempTopic = { ...topicVal, newImage: reader.result }
        }
        tempBlog.subTopic[index] = tempTopic;
        setBlog({ ...tempBlog })
      };
    }
  }
  const changeTopicContent = (topicVal: any, content: any, index: any) => {
    let tempTopic: any = { ...topicVal, text: content };
    let tempBlog: any = blog;
    tempBlog.subTopic[index] = tempTopic;
    setBlog({ ...tempBlog })
  }
  const createNewBlog = async () => {
    if (userLevel === "admin" && !canCreate) {
      alert("No tienes permisos para esta acción");
      return;
    }
    // setProcessLoader(true);
    let checkRoutes: number = 0;
    blog.route = blog.route.replaceAll(" ", "-");
    blogs.forEach((element: any) => {
      if (element.route === blog.route) {
        checkRoutes++;
      }
    });
    if (blog.image === "") {
      alert("Seleccione una imagen");
      setProcessLoader(false);
    }
    else {
      if (checkRoutes > 0) {
        alert("Ruta repedita, elija uno diferente")
        setProcessLoader(false);
      }
      else {
        let tempImage = blog.image;
        blog.image = "";
        let blogsImages = blog.subTopic;
        blog.subTopic = blog.subTopic.map((b: any) => {
          let tempBlog = {
            title: b.title,
            text: b.text,
            image: '',
          }
          return tempBlog
        })
        createBlogsApi(blog).then((response) => {
          blog.id = response.data.data;
          updateBlogImage(tempImage, blog.id).then((url) => {
            blog.image = url;
            updateBlogImageApi(blog);
            if (blogsImages.length > 0) {
              blogsImages.forEach((subtpc: any, index: number) => {
                subtpc.id = response.data.subTopic[index];
                if (subtpc.image !== "") {
                  let tempSubTopicImg = subtpc.image;
                  subtpc.image = "";
                  updateSubTopicImage(tempSubTopicImg, blog.id, subtpc.id).then((url_subtopic: any) => {
                    subtpc.image = url_subtopic;
                    updateSubTopicImageApi(subtpc).then(() => {
                      console.log('exito')
                    })
                  })
                }
                if (blogsImages.length === index + 1) {
                  router.push({ pathname: "/admin/Blog" })
                  setProcessLoader(false);
                }
              })
            }
            else {
              router.push({ pathname: "/admin/Blog" })
              setProcessLoader(false);
            }

          })
        })
      }
    }
  }
  const editBlog = async () => {
    if (userLevel === "admin" && !canEdit) {
      alert("No tienes permisos para esta acción");
      return;
    }
    setProcessLoader(true);
    let checkRoutes: number = 0;
    blog.route = blog.route.replaceAll(" ", "-");
    blogs.forEach((element: any) => {
      if (element.route === blog.route) {
        checkRoutes++;
      }
    });
    if (checkRoutes > 0) {
      alert("Ruta Repetida")
      setProcessLoader(false);
    }
    else {
      if (image !== '') {
        updateBlogImage(image, blog.id).then(async (url) => {
          blog.image = url;
          updateFinalProcess();
        })
      }
      else {
        updateFinalProcess();
      }
    }
  }
  const updateFinalProcess = async () => {
    let subTopicWithNoId: any = [];
    await Promise.all(blog.subTopic.map(async (b: any) => {
      if (b.newImage && b.id) {
        await updateSubTopicImage(b.newImage, blog.id, b.id).then((subUrl) => {
          b.image = subUrl;
        })
        delete b.newImage
      }
      if (!b.id) {
        let subTopic = JSON.parse(JSON.stringify({
          title: b.title,
          text: b.text,
          image: '',
          imageUpdate: b.image
        }));
        subTopicWithNoId.push(subTopic);
        b.image = "";
        b.newImage = "";
      }
    }))
    await updateBlogsApi(blog).then(async (newSubTopicId) => {
      if (subTopicWithNoId.length > 0) {
        await Promise.all(subTopicWithNoId.map((subTpc: any, index: number) => {
          if (subTpc.imageUpdate !== '') {
            updateSubTopicImage(subTpc.imageUpdate, blog.id, newSubTopicId[index]).then((subUrl) => {
              subTpc.image = subUrl;
              updateSubTopicImageApi(subTpc).then(() => {
                console.log('exito')
              })
            })
          }
        }))
        router.push({ pathname: "/admin/Blog" })
        setProcessLoader(false);
      }
      else {
        router.push({ pathname: "/admin/Blog" })
        setProcessLoader(false);
      }
    })
  }
  const deleteBlogSql = async () => {
    if (userLevel === "admin" && !canDelete) {
      alert("No tienes permisos para esta acción");
      return;
    }
    if (confirm("¿Quieres eliminar este blog?, Esta acción no tiene marcha atrás.")) {
      deleteBlogsApi(blog).then(() => {
        router.push({ pathname: "/admin/Blog" })
      })
    }
    else {

    }
  }
  const getNewBlog = () => {
    let tempAllBlogs: any;
    getBlogsApi().then((res) => {
      if (blogId) {
        tempAllBlogs = res.filter((allBlogs: any) => allBlogs.id !== +blogId)
        getSingleBlogApi(blogId).then((response) => {
          setBlog(response)
          setLoader(true);
        })
        setBlogs(tempAllBlogs);
      }
      else {
        setBlogs(res);
        setLoader(true);
      }
    })
  }
  useEffect(() => {
    getNewBlog();
  }, [quill])

  return (
    <BlogBackground>
      <div className="blog-container">
        <div className="title-contain">
          <div className="title-container">
            <GiExitDoor className="return-icon" onClick={goToBlog} />
            <p className="title">
              {!blogId ? "Creación de Blog" : "Edición de Blog"}
            </p>
          </div>
          <div className="blog-buttons">
            {
              canEdit && <button className="add-theme" onClick={addTheme}>
                <p className="theme-text">
                  Agregar Subtema
                </p>
              </button>
            }
            {
              !processLoader
                ?
                <button className="create-blog" onClick={!blogId ? createNewBlog : editBlog}>
                  <p className="theme-text">
                    {!blogId ? "Crear Blog" : "Editar Blog"}
                  </p>
                </button>
                : <LoaderContain />
            }
            {
              (blogId && canDelete) &&
              <button className="delete-blog" onClick={deleteBlogSql}>
                <p className="theme-text">
                  Eliminar blog
                </p>
              </button>
            }
          </div>
        </div>
        {
          loader
            ?
            <div className="blog-form">
              <div className="blog-third-part-responsive">
                <BlogInputs>
                  <label className="blog-label">
                    Título
                  </label>
                  <input
                    className="blog-input"
                    placeholder="Título del Blog"
                    defaultValue={blog.title}
                    onChange={(e: any) => {
                      setBlog({
                        ...blog, title: e.target.value
                      })
                    }}
                  />
                </BlogInputs>
                <BlogInputs>
                  <label className="blog-label">
                    Subtítulo
                  </label>
                  <input
                    className="blog-input"
                    placeholder="Subtítulo del Blog"
                    defaultValue={blog.subtitle}
                    onChange={(e: any) => {
                      setBlog({
                        ...blog, subtitle: e.target.value
                      })
                    }}
                  />
                </BlogInputs>
                <BlogInputs>
                  <label className="blog-label">
                    Portada del blog
                  </label>
                  <input
                    className="blog-input"
                    type="file"
                    style={{ minWidth: '0', width: '100%' }}
                    onChange={(e) => { getImage(e.target.files) }}
                  />
                </BlogInputs>
              </div >
              <div className='blog-row'>
                <BlogInputs>
                  <label className="blog-label">
                    Ruta del blog (Solo usar textos sin acento y separar con "-", evitar usar espacios o los siguientes caracteres: @#$%^&*?``"",./)
                  </label>
                  <input
                    className="blog-input"
                    placeholder="unas-francesas-3d"
                    defaultValue={blog.route}
                    onChange={(e: any) => {
                      setBlog({
                        ...blog, route: e.target.value
                      })
                    }}
                  />
                </BlogInputs>
              </div>
              <div className="blog-row">
                <BlogInputs>
                  <label className="blog-label">
                    Resumen
                  </label>
                  <input
                    className="blog-input"
                    placeholder="Resumen del blog"
                    defaultValue={blog.summary}
                    onChange={(e: any) => {
                      setBlog({
                        ...blog, summary: e.target.value
                      })
                    }}
                  />
                </BlogInputs>
              </div>
              <div className="blog-row">
                <BlogInputs>
                  <label className="blog-label">
                    Link de Video ( Opcional )
                  </label>
                  <input
                    className="blog-input"
                    placeholder="https://video.gonvar.io/media/alineacion_sep/1/master.m3u8"
                    defaultValue={blog.link}
                    onChange={(e: any) => {
                      setBlog({
                        ...blog, link: e.target.value
                      })
                    }}
                  />
                </BlogInputs>
              </div>
              {
                blog.subTopic?.map((topic: any, index: number) => {
                  return (
                    <div className="blog-column" key={"topic " + index}>
                      <div className="close-container" >
                        <AiOutlineClose onClick={() => { removeTheme(index) }} className="close" />
                      </div>
                      <div className="blog-row">
                        <BlogInputs>
                          <label className="blog-label">
                            Título {index + 1}
                          </label>
                          <input
                            className="blog-input"
                            placeholder="Título del Blog"
                            defaultValue={topic.title}
                            onChange={(e: any) => { changeTopicTitle(topic, index, e.target.value) }}
                          />
                        </BlogInputs>
                        <BlogInputs>
                          <label className="blog-label">
                            Imagen del subtema {index + 1}
                            {
                              topic.image &&
                              <AiOutlineClose
                                style={{ cursor: "pointer", marginLeft: 20 }}
                                onClick={() => removeImage(index)}
                              />
                            }
                          </label>
                          <input
                            className="blog-input"
                            type="file"
                            onChange={(e) => { changeTopicImage(topic, e.target.files, index) }}
                          />
                        </BlogInputs>
                      </div>
                      <BlogInputs style={{ marginTop: 20 }}>
                        <label className="blog-label">
                          Texto {index + 1}
                        </label>
                        <ReactQuill
                          placeholder="Lorem ipsum dolor sit amet, consectetur 
                        adipiscing elit. Pharetra, cursus sapien ac magna. 
                        Consectetur amet eu tincidunt quis. Non habitasse viverra 
                        malesuada facilisi vel nunc." theme="snow" id='quill'
                          formats={formats} modules={modules}
                          defaultValue={topic.text} onChange={(content, delta, source, editor) => {
                            changeTopicContent(topic, content, index);
                          }} />
                      </BlogInputs>
                    </div>
                  )
                })
              }
            </div>
            : <LoaderContain />
        }

      </div>
    </BlogBackground>
  )
}
export default CreateBlog;