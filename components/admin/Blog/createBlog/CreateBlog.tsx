import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { BlogBackground, BlogInputs } from './CreateBlog.styled';
import 'react-quill/dist/quill.snow.css';
import { text } from 'stream/consumers';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../../../firebase/firebaseConfig';
import { addBlog } from '../../../../store/actions/AdminActions';
import { AiOutlineClose } from 'react-icons/ai';
import { LoaderContain } from '../../../../containers/Profile/User/User.styled';
const CreateBlog = () => {
  const [loader, setLoader] = useState<boolean>(true);
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
            "blue"
          ]
        }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
          { align: [] }
        ],
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
    "align"
  ];
  const getImage = (file: any) => {
    if (file.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = (_event) => {
        setImage(reader.result);
        setBlog({ ...blog, path: reader.result })
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
    if (confirm(`¿Desea eliminar subtema ${index + 1}?, esto recorrera los otros subtemas`)) {
      //PENDIENTE REPARAR
      tempBlog.subTopic.splice(index, 1)
      setBlog({ ...tempBlog })
    } else {

    }
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
        tempTopic = { ...topicVal, topicPath: reader.result }
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
    console.log('entro')
    // // const addBlog = httpsCallable(functions, 'createBlogs');
    // await addBlog(blog).then(async (res: any) => {
    //   console.log(res);
    //   addBlog(res)
    // })
    console.log(blog)
    addBlog(blog)
  }
  console.log(blog)
  useEffect(() => {
  }, [quill])

  return (
    <BlogBackground>
      <div className="blog-container">
        <div className="title-contain">
          <p className="title">
            Creación de Blog
          </p>
          <div className="blog-buttons">
            <button className="add-theme" onClick={addTheme}>
              <p className="theme-text">
                Agregar Subtema
              </p>
            </button>
            <button className="create-blog" onClick={createNewBlog}>
              <p className="theme-text">
                Crear Blog
              </p>
            </button>
          </div>
        </div>
        <div className="blog-form">
          <div className="blog-row">
            <BlogInputs>
              <label className="blog-label">
                Título
              </label>
              <input
                className="blog-input"
                placeholder="Título del Blog"
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
                onChange={(e) => { getImage(e.target.files) }}
              />
            </BlogInputs>
          </div>
          {
            loader ?
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
                          onChange={(e: any) => { changeTopicTitle(topic, index, e.target.value) }}
                        />
                      </BlogInputs>
                      <BlogInputs>
                        <label className="blog-label">
                          Imagen del subtema {index + 1}
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
                        defaultValue="" onChange={(content, delta, source, editor) => {
                          changeTopicContent(topic, content, index);
                        }} />
                    </BlogInputs>
                  </div>
                )
              })
              : <LoaderContain />
          }
        </div>
      </div>
    </BlogBackground>
  )
}
export default CreateBlog;