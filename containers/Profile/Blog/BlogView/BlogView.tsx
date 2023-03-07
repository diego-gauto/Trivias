import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { AiFillStar } from 'react-icons/ai';
import { BsFacebook, BsLinkedin, BsPrinterFill, BsTwitter } from 'react-icons/bs';
import ReactPlayer from 'react-player';
import { db } from '../../../../firebase/firebaseConfig';
import { useAuth } from '../../../../hooks/useAuth';
import { BackgroundLoader, LoaderImage, LoaderContain } from '../../../../screens/Login.styled';
import { getBlogs } from '../../../../store/actions/AdminActions';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { BlogContainer, BottomSection, BoxSection, ContentContainer, FirstSection, GonvarAd, RelatedArticles, VideoBlog } from './BlogView.styled';
import { IBlog } from './IBlogView';
import ReactToPrint from 'react-to-print';
import HelmetMetaTags from './HelmetMetaTags/HelmetMetaTags'
const BlogView = () => {
  const [loader, setLoader] = useState(false)
  const [userData, setUserData] = useState<any>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [blogs, setBlogs] = useState<any>();
  const [blog, setBlog] = useState<IBlog>();
  const [month, setMonth] = useState<string>("");
  const [topicLength, setTopicLength] = useState(0);
  const url = window.location.href;
  const getGonvarAdImage = "/images/Navbar/NavbarLogo.png"
  const router = useRouter();
  const ref = useRef<any>(null);
  let topicTitleCount: any = 0
  const fetchDB_data = async () => {
    try {
      const query_1 = query(collection(db, "users"), where("uid", "==", userDataAuth.user.id));
      return onSnapshot(query_1, (response) => {

        response.forEach((e: any) => {
          setUserData({ ...e.data(), id: e.id });
        });
      })
    } catch (error) {
      return false
    }
  }
  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
        router.push("auth/Login")
      }
    }, [])

  } catch (error) {
    console.log(error);
    setLoggedIn(false);
  }
  const moveTo = (index: number) => {
    let element = document.getElementById(`box-${index}`);
    element?.scrollIntoView({ behavior: "smooth" });
  };
  const goToBlog = (blog: any) => {
    setLoader(true);
    let blogText: any = blog.title.replaceAll(" ", "-");
    router.push({ pathname: `/${blogText}` }).then(() => {
      window.location.reload();
    })
  }
  const goToCourses = () => {
    let userDate = userData.membership.finalDate;
    let curentTime = new Date().getTime() / 1000;
    if (userData) {
      if ((userDate > curentTime)) {
        router.push("/Preview")
      }
      else {
        router.push("/Purchase?type=subscription")
      }
    }
    else {
      router.push("/Register")
    }

  }
  const getBlog = () => {
    let tempTitle: any = router.query.slug;
    let titleSearch: string = tempTitle.replaceAll("-", " ");
    let tempBlog: any;
    let allBlogs: any;
    getBlogs().then((res) => {
      allBlogs = res.filter((blog: IBlog) => blog.title !== titleSearch);
      if (allBlogs.length > 4) {
        let shuffleBlog = allBlogs.sort((a: any, b: any) => 0.5 - Math.random());
        shuffleBlog.splice(4);
        setBlogs(shuffleBlog);
      }
      else {
        setBlogs(allBlogs);
      }
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
      setTopicLength(tempBlog[0].subTopic.length)
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
    fetchDB_data();
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
      <HelmetMetaTags
        title={blog?.title}
        image={blog?.path}
        description={blog?.subTitle ? blog?.subTitle : "Gonvar Nails Academy"}
        quote={"gonvar - " + blog?.title}
      />
      <div className="content">
        <div className="left-content" ref={(e) => { ref.current = e }}>
          <FirstSection >
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
              <div className="socials">
                <FacebookShareButton
                  url={url}
                  quote={"gonvar - " + blog?.title}
                  hashtag={"#Gonvar"}
                  openShareDialogOnClick={true}
                >
                  <BsFacebook className="icon" />
                </FacebookShareButton>
                <TwitterShareButton
                  url={url}
                  title={blog?.subTitle}
                >
                  <BsTwitter className="icon" />
                </TwitterShareButton>
                <LinkedinShareButton
                  url={url}
                  title={blog?.title}

                >
                  <BsLinkedin className="icon" />
                </LinkedinShareButton>
                <ReactToPrint
                  trigger={() => {
                    return <BsPrinterFill className="icon" style={{ alignSelf: "center" }} />
                  }
                  }
                  content={() => ref.current}
                  documentTitle="Gonvar"
                  pageStyle="print"
                >
                </ReactToPrint>
              </div>
            </div>
            <div className="img-container" key="remove" id="remove">
              <img src={blog?.path} />
            </div>
          </FirstSection>
          <BoxSection>
            <div className="title-contain">
              <h1 className="title">
                En este artículo aprenderás
              </h1>
            </div>
            <div className="subtitle-container">
              {

                blog?.subTopic.map((topic, index: number) => {
                  if (topic.topicTitle) {
                    topicTitleCount++
                    return (
                      <div className="section-title" key={"topic-titles " + index}>
                        <p className="number">
                          {topicTitleCount}.
                        </p>
                        <p className="topic-title" onClick={() => moveTo(index)}>
                          {topic.topicTitle}
                        </p>
                      </div>
                    )
                  }

                })
              }
              <div className="section-title">
                <p className="number">
                  {topicTitleCount + 1}.
                </p>
                <p className="topic-title" onClick={() => moveTo(topicLength + 1)}>
                  Artículos relacionados
                </p>
              </div>
            </div>
          </BoxSection>
          <ContentContainer style={{ marginTop: 20 }}>
            {
              blog?.subTopic.map((topic, index: number) => {
                return (
                  <div className="text-container" id={`box-${index}`} key={"topic-context" + index}>
                    <h2 className="topic-title">{topic.topicTitle}</h2>
                    <p dangerouslySetInnerHTML={{ __html: topic.topicText }} className="topic-subtitle" />
                    {
                      topic.topicPath &&
                      <div className="topic-image">
                        <img src={topic.topicPath} />
                      </div>
                    }
                    {
                      index == 0 &&
                      <GonvarAd>
                        <div className="img">
                          <p className="title">GONVAR +</p>
                          <img className="img-display" src={getGonvarAdImage} />
                        </div>
                        <div className="all-texts">
                          <p className="space">Instructores internacionales</p>
                          <p className="space">Aprende 24/7 desde donde quieras, y
                            accede a +180 clases ya disponibles.
                          </p>
                          <p className="text-style space">(47 calificaciones)
                            <span><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /></span>
                          </p>
                          <p className="space">
                            Aprende paso a paso y desde cero, las mejores técnicas de uñas,
                            por instructores 100% capacitados.
                          </p>
                          <p>Diseño y decoración</p>
                          <p>Técnicas en tendencias</p>
                          <p className="space">¡Mano alzada, 3D, Stamping, micro-pintura,
                            one Stroke, Uñas esculturales, Polygel, técnica
                            express, técnica de tips, pedicure y mucho más!
                          </p>
                          <div className="button-contain">
                            <button className="button-gonvar" onClick={goToCourses}>
                              Inscríbete a solo $149 MXN al mes
                            </button>
                          </div>
                        </div>
                      </GonvarAd>
                    }
                  </div>
                )
              })
            }
          </ContentContainer>
          {
            blog?.link &&
            <VideoBlog>
              <ReactPlayer
                url={blog.link}
                playing={false}
                muted={false}
                controls
                width="100%" height="100%"
              />
            </VideoBlog>
          }

        </div>
        <div className="right-content">
          <div className="img-container" key="remove" id="remove">
            <img src={blog?.path} />
          </div>
          <RelatedArticles>
            <p className="titles">ARTÍCULOS RELACIONADOS</p>
            {
              blogs.map((blogVar: IBlog, index: number) => {
                return (
                  <div key={"extra text 1" + index} className="cards" >
                    <img src={blogVar.path} className="img" onClick={() => goToBlog(blogVar)} />
                    <p className="title">                {blogVar.title}</p>
                    {
                      blogVar.summary &&
                      <p className="sub-title">{blogVar.summary}</p>
                    }
                  </div>
                )
              })
            }
          </RelatedArticles>
        </div>
      </div>
      <BottomSection>
        <div className="title-contain" id={`box-${topicLength + 1}`}>
          <p className="title">
            Artículos relacionados
          </p>
        </div>
        <div className="all-cards">
          {
            blogs.map((blogVar: IBlog, index: any) => {
              return (
                <div key={"extra text 1" + index} className="cards" >
                  <img src={blogVar.path} className="img" onClick={() => goToBlog(blogVar)} />
                  <p className="title">                {blogVar.title}</p>
                  {
                    blogVar.summary &&
                    <p className="sub-title">{blogVar.summary}</p>
                  }
                </div>
              )
            })
          }
        </div>
      </BottomSection>

    </BlogContainer>
  )
}
export default BlogView;