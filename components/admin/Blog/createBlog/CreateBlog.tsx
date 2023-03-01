import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import { BlogBackground, BlogInputs } from './CreateBlog.styled';
import 'react-quill/dist/quill.snow.css';
import { text } from 'stream/consumers';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../../../firebase/firebaseConfig';
import { addBlog, deleteBlog, getBlogs, updateBlog } from '../../../../store/actions/AdminActions';
import { AiOutlineClose } from 'react-icons/ai';
import { LoaderContain } from '../../../../containers/Profile/User/User.styled';
import router, { useRouter } from "next/router";
import { GiExitDoor } from 'react-icons/gi';
const CreateBlog = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [processLoader, setProcessLoader] = useState<boolean>(false);
  const routerState = useRouter().query
  const [image, setImage] = useState<any>("");
  const [quill, setQuill] = useState("");
  const [blog, setBlog] = useState<any>({
    title: "",
    subTitle: "",
    path: "",
    subTopic: [],
  });
  const [topic, setTopic] = useState<any>({
    topicTitle: "",
    topicText: "",
    topicPath: "",
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

  const goToBlog = () => {
    router.push({ pathname: "/admin/Blog" })
  }
  const getImage = (file: any) => {
    if (file.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = (_event) => {
        setImage(reader.result);
        if (blogId) {
          setBlog({ ...blog, path: reader.result, format: reader.result })
        }
        else {
          setBlog({ ...blog, path: reader.result })
        }
      };
    }

  }
  const addTheme = () => {
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
    tempBlog.subTopic[index].topicPath = ""
    tempBlog.subTopic[index].topicFormat = ""
    setBlog({ ...tempBlog })
  }
  const changeTopicTitle = (topicVal: any, index: number, text: string) => {
    let tempTopic: any = { ...topicVal, topicTitle: text };
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
        if (blogId) {
          tempTopic = { ...topicVal, topicPath: reader.result, topicFormat: reader.result }
        }
        else {
          tempTopic = { ...topicVal, topicPath: reader.result }
        }
        tempBlog.subTopic[index] = tempTopic;
        setBlog({ ...tempBlog })
      };
    }
  }
  const changeTopicContent = (topicVal: any, content: any, index: any) => {
    let tempTopic: any = { ...topicVal, topicText: content };
    let tempBlog: any = blog;
    tempBlog.subTopic[index] = tempTopic;
    setBlog({ ...tempBlog })
  }
  const createNewBlog = async () => {
    setProcessLoader(true);
    // // const addBlog = httpsCallable(functions, 'createBlogs');
    // await addBlog(blog).then(async (res: any) => {
    //   console.log(res);
    //   addBlog(res)
    // })
    addBlog(blog).then(() => {
      router.push({ pathname: "/admin/Blog" })
      setProcessLoader(false);
    })
  }
  const editBlog = async () => {
    setProcessLoader(true);
    updateBlog(blog, blog.id).then(() => {
      router.push({ pathname: "/admin/Blog" })
      setProcessLoader(false);
    })
  }
  const deleteBlock = async () => {
    if (confirm("¿Quieres eliminar este blog?, Esta acción no tiene marcha atrás.")) {
      deleteBlog(blog).then(() => {
        router.push({ pathname: "/admin/Blog" })
      });
    }
    else {

    }
  }
  const getNewBlog = () => {
    let tempBlog: any;
    getBlogs().then((res) => {
      tempBlog = res.filter((allBlogs: any) => allBlogs.id == blogId)
      setBlog(tempBlog[0]);
      setLoader(true);
    })
  }
  useEffect(() => {
    if (blogId) {
      getNewBlog();
    }
    else {
      setLoader(true);
    }
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
            <button className="add-theme" onClick={addTheme}>
              <p className="theme-text">
                Agregar Subtema
              </p>
            </button>
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
              blogId &&
              <button className="delete-blog" onClick={deleteBlock}>
                <p className="theme-text">
                  Eliminar blog
                </p>
              </button>
            }
          </div>
        </div>
        {
          loader
            ? <div className="blog-form">
              <div className="blog-row">
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
                    defaultValue={blog.subTitle}
                    onChange={(e: any) => {
                      setBlog({
                        ...blog, subTitle: e.target.value
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
                    style={{ width: "90%" }}
                    onChange={(e) => { getImage(e.target.files) }}
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
                            defaultValue={topic.topicTitle}
                            onChange={(e: any) => { changeTopicTitle(topic, index, e.target.value) }}
                          />
                        </BlogInputs>
                        <BlogInputs>
                          <label className="blog-label">
                            Imagen del subtema {index + 1}
                            {
                              topic.topicPath &&
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
                          defaultValue={topic.topicText} onChange={(content, delta, source, editor) => {
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