import React, { useState } from 'react'
import { BlogBackground, BlogInputs } from './CreateBlog.styled';

const CreateBlog = () => {
  const [image, setImage] = useState<any>("");
  const [blog, setBlog] = useState({
    title: "",
    subTitle: "",
    path: "",
    subTopic: [],
  });
  const [topic, setTopic] = useState<any>({
    topicTitle: "",
    topicSubTitle: "",
    topicPath: "",
  })

  const getImage = (file: any) => {
    console.log(file);
    if (file.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = (_event) => {
        setImage(reader.result);
      };
    }
  }
  const addTheme = () => {
    let tempBlog: any = blog;
    tempBlog.subTopic.push(topic)
    setBlog({ ...tempBlog })
  }
  console.log(blog)
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
              />
            </BlogInputs>
            <BlogInputs>
              <label className="blog-label">
                Subtítulo
              </label>
              <input
                className="blog-input"
                placeholder="Subtítulo del Blog"
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
            blog.subTopic.map(() => {
              return (
                <div className="blog-row">
                  Hola
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