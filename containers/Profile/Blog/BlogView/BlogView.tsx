import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { AiFillCheckCircle, AiFillStar } from 'react-icons/ai';
// import Share from 'react-native-share';
import { BsFacebook, BsInstagram, BsLinkedin, BsPrinterFill, BsTwitter, BsWhatsapp } from 'react-icons/bs';
import ReactPlayer from 'react-player';
import { db } from '../../../../firebase/firebaseConfig';
import { useAuth } from '../../../../hooks/useAuth';
import { BackgroundLoader, LoaderImage, LoaderContain } from '../../../../screens/Login.styled';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { BlogContainer, BottomSection, BoxSection, ContentContainer, FirstSection, GonvarAd, RelatedArticles, VideoBlog } from './BlogView.styled';
import { IBlog, ISubTopic } from './IBlogView';
import ReactToPrint from 'react-to-print';
import HelmetMetaTags from '../../../../components/HelmetMetaTags/HelmetMetaTags'
import { getBlogsApi, getSingleBlogApi } from '../../../../components/api/blog';
import { FaCopy } from 'react-icons/fa';
import { getUserApi } from '../../../../components/api/users';
import { formatBlogDate } from '../../../../utils/functions';
import { ANUAL_FORM, BLOGS_PATH, PLAN_PATH, PREVIEW_PATH, PURCHASE_PATH, SIGNUP_PATH } from '../../../../constants/paths';
const BlogView = () => {
  const [loader, setLoader] = useState(false)
  const [userData, setUserData] = useState<any>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [blogs, setBlogs] = useState<any>();
  const [blog, setBlog] = useState<any>();
  const [topicLength, setTopicLength] = useState(0);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const url = window.location.href;
  const getGonvarAdImage = "/images/Navbar/NavbarLogo.png"
  const router = useRouter();
  const ref = useRef<any>(null);
  let topicTitleCount: any = 0
  try {
    var userDataAuth = useAuth();
    useEffect(() => {
      if (userDataAuth.user !== null) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
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
  const goToBlog = (blog: IBlog) => {
    setLoader(true);
    router.push({ pathname: `${BLOGS_PATH}/${blog.route}` }).then(() => {
      window.location.reload();
    })
  }
  const goToCourses = () => {
    let curentTime = new Date().getTime() / 1000;
    if (userData) {
      if ((userData.final_date > curentTime || userData.level === 1)) {
        router.push(PREVIEW_PATH)
      }
      else {
        // router.push(`${PURCHASE_PATH}?type=subscription`)
        router.push({ pathname: ANUAL_FORM });
      }
    }
    else {
      router.push(SIGNUP_PATH)
      localStorage.setItem("sub", "true");
    }
  }
  const getBlog = async () => {
    let tempRoute: any = router.query.slug;
    let tempBlog: any;
    let allBlogs: any;
    getBlogsApi().then(async (res) => {
      allBlogs = res.filter((blog: IBlog) => blog.route !== tempRoute);
      if (allBlogs.length > 4) {
        let shuffleBlog = allBlogs.sort((a: any, b: any) => 0.5 - Math.random());
        shuffleBlog.splice(4);
        setBlogs(shuffleBlog);
      }
      else {
        setBlogs(allBlogs);
      }
      tempBlog = res.filter((blog: IBlog) => blog.route === tempRoute);
      if (tempBlog.length === 0) {
        let tempTitle = tempRoute.replaceAll("-", " ").replaceAll("%3F?", "?");
        tempBlog = res.filter((blog: IBlog) => blog.title === tempTitle);
        router.push({ pathname: `/Blogs/${tempBlog[0].route}` })
        return
      }
      getSingleBlogApi(tempBlog[0].id).then((res) => {
        res.date = formatBlogDate(res.created_at);
        setTopicLength(res.subTopic.length)
        setBlog(res)
        setLoader(true);
      })
    })
  }
  const showLinkCopyMessage = () => {
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 1500);
  }
  useEffect(() => {
    if (localStorage.getItem("email")) {
      getUserApi(localStorage.getItem("email")).then((res) => {
        setUserData(res);
      })
    }
    if (router.query.slug) {
      getBlog()
    }
  }, [router.query.slug])

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
        image={blog?.image}
        description={blog?.subtitle}
        hashtag={"#gonvar"}
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
                {blog?.subtitle}
              </p>
              <p className="date">
                por Gonvar | {blog?.date.day} de {blog?.date.month} de {blog?.date.year}
              </p>
              <div className="socials">
                <div className='content'>
                  <FacebookShareButton
                    url={url}
                    quote={"gonvar - " + blog?.title}
                    hashtag={"#Gonvar"}
                    openShareDialogOnClick={true}
                  >
                    <BsFacebook className="icon" />
                  </FacebookShareButton>
                  <p className='text-display'>
                    Compartir en Facebook
                  </p>
                </div>
                <div className='content'>
                  <WhatsappShareButton
                    url={url}
                    title={blog?.title}
                    separator=' --- '
                    openShareDialogOnClick={true}
                  >
                    <BsWhatsapp className="icon" />
                  </WhatsappShareButton>
                  <p className='text-display'>
                    Compartir en Whatsapp
                  </p>
                </div>
                {/* <div className='content'>
                  <BsInstagram className='icon' onClick={handleShareToInstagram} />
                  <p className='text-display'>
                    Compartir en Instagram
                  </p>
                </div> */}
                <div className='content'>
                  <FaCopy className='icon' onClick={() => { navigator.clipboard.writeText(window.location.href); showLinkCopyMessage() }} />
                  <p className='text-display'>
                    Copiar Link
                  </p>
                  {
                    linkCopied &&
                    <div className='copy-link-text'>
                      <AiFillCheckCircle className='icon-check' />
                      Link Copiado
                    </div>
                  }

                </div>
                {/* <TwitterShareButton
                  url={url}
                  title={blog?.subtitle}
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
                </ReactToPrint> */}
              </div>
            </div>
            <div className="img-container" key="remove" id="remove">
              <img src={blog?.image} />
            </div>
          </FirstSection>
          {
            blog?.link &&
            <VideoBlog >
              <ReactPlayer
                url={blog.link}
                playing={false}
                muted={false}
                controls
                width="100%" height="300px"
              />
            </VideoBlog>
          }
          <BoxSection>
            <div className="title-contain">
              <p className="title">
                En este artículo aprenderás
              </p>
            </div>
            <div className="subtitle-container">
              {
                blog?.subTopic.map((topic: ISubTopic, index: number) => {
                  if (topic.title) {
                    topicTitleCount++
                    return (
                      <div className="section-title" key={"topic-titles " + index}>
                        <p className="number">
                          {topicTitleCount}.
                        </p>
                        <p className="topic-title" onClick={() => moveTo(index)}>
                          {topic.title}
                        </p>
                      </div>
                    )
                  }
                  else {
                    return <React.Fragment key={"topicCase_" + index}></React.Fragment>
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
              blog?.subTopic.map((topic: ISubTopic, index: number) => {
                return (
                  <div className="text-container" id={`box-${index}`} key={"topic-context" + index}>
                    <h2 className="topic-title">{topic.title}</h2>
                    <p dangerouslySetInnerHTML={{ __html: topic.text }} className="topic-subtitle" />
                    {
                      topic.image &&
                      <div className="topic-image">
                        <img src={topic.image} />
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
                              Inscríbete a solo $1599 MXN al año
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
        </div>
        <div className="right-content">
          <div className="img-container" key="remove" id="remove">
            <img src={blog?.image} alt={blog?.title} />
          </div>
          <RelatedArticles>
            <p className="titles">ARTÍCULOS RELACIONADOS</p>
            {
              blogs.map((blogVar: IBlog, index: number) => {
                return (
                  <div key={"extra text 1_" + index} className="cards" >
                    <img src={blogVar.image} className="img" onClick={() => goToBlog(blogVar)} />
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
                <div key={"extra text 2_" + index} className="cards" >
                  <img src={blogVar.image} className="img" onClick={() => goToBlog(blogVar)} />
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