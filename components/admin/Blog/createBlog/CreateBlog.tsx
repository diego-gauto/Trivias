import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { BlogBackground, BlogInputs } from './CreateBlog.styled';
import 'react-quill/dist/quill.snow.css';
const CreateBlog = () => {
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
        // tempBlog.path = reader.result;
        setBlog({ ...blog, path: reader.result })
      };
    }

  }
  const addTheme = () => {
    let tempBlog: any = blog;
    tempBlog.subTopic.push(topic)
    setBlog({ ...tempBlog })
  }

  const changeTitle = (index: number, text: string) => {
    let tempBlog = blog;
    tempBlog.subTopic[index].topicTitle = text;
  }
  const addTextContent = (content: any, index: any) => {
    let tempBlog = blog;
    tempBlog.subTopic[index].topicText = content;
    setBlog(tempBlog)
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
          <button className="add-theme" onClick={addTheme}>
            <p className="theme-text">
              Agregar Subtema
            </p>
          </button>
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
            blog.subTopic?.map((topic: any, index: number) => {
              return (
                <div className="blog-column" key={"topic " + index}>
                  <BlogInputs>
                    <label className="blog-label">
                      Título {index + 1}
                    </label>
                    <input
                      className="blog-input"
                      placeholder="Título del Blog"
                      onChange={(e: any) => { changeTitle(index, e.target.value) }}
                    />
                  </BlogInputs>
                  <BlogInputs>
                    <label className="blog-label">
                      Texto
                    </label>
                    <ReactQuill
                      placeholder="Lorem ipsum dolor sit amet, consectetur 
                        adipiscing elit. Pharetra, cursus sapien ac magna. 
                        Consectetur amet eu tincidunt quis. Non habitasse viverra 
                        malesuada facilisi vel nunc." theme="snow" id='quill'
                      formats={formats} modules={modules}
                      defaultValue="" onChange={(content, delta, source, editor) => {
                        addTextContent(content, index);
                      }} />
                  </BlogInputs>
                </div>
              )
            })
          }
        </div>
      </div>
    </BlogBackground>
  )
}
export default CreateBlog;