import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { BackgroundLoader, LoaderImage, LoaderContain } from '../../../../screens/Login.styled';
import { getBlogs } from '../../../../store/actions/AdminActions';
import { BlogContainer, BottomSection, BoxSection, ContentContainer, FirstSection, RelatedArticles } from './BlogView.styled';
import { IBlog } from './IBlogView';
const BlogView = () => {
  const [loader, setLoader] = useState(false)
  const [blog, setBlog] = useState<IBlog>();
  const [month, setMonth] = useState<string>("");
  const router = useRouter();


  const moveTo = (index: number) => {
    let element = document.getElementById(`box-${index}`);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const getBlog = () => {
    let tempTitle: any = router.query.blog;
    let titleSearch: string = tempTitle.replaceAll("-", " ");
    let tempBlog: any;
    getBlogs().then((res) => {
      tempBlog = res.filter((blog: IBlog) => blog.title === titleSearch);
      tempBlog.forEach((element: IBlog) => {
        let tempDate: any = new Date(element.createdAt.seconds * 1000);
        let tempDay = tempDate.getDate();
        let tempMonth = tempDate.getMonth() + 1;
        getTextMonth(tempMonth);
        let tempYear = tempDate.getFullYear();
        element.date = {
          day: tempDay,
          month: tempMonth,
          year: tempYear,
        };
      })

      setBlog(tempBlog[0])
      setLoader(true);
    })
  }
  const getTextMonth = (tempMonth: any) => {
    let textMonth: string = ""
    if (tempMonth == 1) {
      textMonth = "enero"
    }
    if (tempMonth == 2) {
      textMonth = "febrero"
    }
    if (tempMonth == 3) {
      textMonth = "marzo"
    }
    if (tempMonth == 4) {
      textMonth = "abril"
    }
    if (tempMonth == 5) {
      textMonth = "mayo"
    }
    if (tempMonth == 6) {
      textMonth = "junio"
    }
    if (tempMonth == 7) {
      textMonth = "julio"
    }
    if (tempMonth == 8) {
      textMonth = "agosto"
    }
    if (tempMonth == 9) {
      textMonth = "septiembre"
    }
    if (tempMonth == 10) {
      textMonth = "octubre"
    }
    if (tempMonth == 11) {
      textMonth = "noviembre"
    }
    if (tempMonth == 12) {
      textMonth = "diciembre"
    }
    setMonth(textMonth)
  }
  useEffect(() => {
    getBlog()
  }, [])
  if (!loader) {
    return (
      <BackgroundLoader>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </BackgroundLoader>
    )
  }
  return (
    <BlogContainer>
      <FirstSection>
        <div className="title-container">
          <h1 className="title">
            {blog?.title}
          </h1>
          <p className="sub-title">
            {blog?.subTitle}
          </p>
          <p className="date">
            por Gonvar | {blog?.date.day} de {month} de {blog?.date.year}
          </p>
        </div>
        <div className="img-container">
          <img src={blog?.path} />
        </div>
      </FirstSection>
      <div className="content">
        <div className="left-content">
          <BoxSection>
            <div className="title-contain">
              <h1 className="title">
                En este artículo aprenderás
              </h1>
            </div>
            <div className="subtitle-container">
              {
                blog?.subTopic.map((topic, index: number) => {
                  return (
                    <div className="section-title" key={"topic-titles " + index}>
                      <p className="number">
                        {index + 1}.
                      </p>
                      <p className="topic-title" onClick={() => moveTo(index)}>
                        {topic.topicTitle}
                      </p>
                    </div>
                  )
                })
              }
            </div>
          </BoxSection>
          <ContentContainer>
            {
              blog?.subTopic.map((topic, index: number) => {
                return (
                  <div className="text-container" id={`box-${index}`} key={"topic-context" + index}>
                    <h3 className="topic-title">{topic.topicTitle}</h3>
                    <p dangerouslySetInnerHTML={{ __html: topic.topicText }} className="topic-subtitle" />
                    {
                      topic.topicPath &&
                      <div className="topic-image">
                        <img src={topic.topicPath} />
                      </div>
                    }
                  </div>
                )
              })
            }
          </ContentContainer>
        </div>
        <div className="right-content">
          <RelatedArticles>
            <p className="titles">ARTÍCULOS RELACIONADOS</p>
          </RelatedArticles>
        </div>
      </div>
      <BottomSection>
        <div className="title-contain">
          <p className="title">
            ARTÍCULOS RELACIONADOS
          </p>
        </div>
      </BottomSection>

    </BlogContainer>
  )
}
export default BlogView;