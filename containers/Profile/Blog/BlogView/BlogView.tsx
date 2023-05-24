import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { AiFillCheckCircle, AiFillStar } from 'react-icons/ai';
// import Share from 'react-native-share';
import { BsFacebook, BsInstagram, BsLinkedin, BsPrinterFill, BsTwitter } from 'react-icons/bs';
import ReactPlayer from 'react-player';
import { db } from '../../../../firebase/firebaseConfig';
import { useAuth } from '../../../../hooks/useAuth';
import { BackgroundLoader, LoaderImage, LoaderContain } from '../../../../screens/Login.styled';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { BlogContainer, BottomSection, BoxSection, ContentContainer, FirstSection, GonvarAd, RelatedArticles, VideoBlog } from './BlogView.styled';
import { IBlog, ISubTopic } from './IBlogView';
import ReactToPrint from 'react-to-print';
import HelmetMetaTags from './HelmetMetaTags/HelmetMetaTags'
import { getBlogsApi, getSingleBlogApi } from '../../../../components/api/blog';
import { FaCopy } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
const BlogView = () => {
  const [loader, setLoader] = useState(false)
  const [userData, setUserData] = useState<any>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [blogs, setBlogs] = useState<any>();
  const [blog, setBlog] = useState<IBlog>();
  const [topicLength, setTopicLength] = useState(0);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const [linkToCopy, setLinkToCopy] = useState<string>("");
  const [demoLink, setDemoLink] = useState<any>("");
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const url = window.location.href;
  const getGonvarAdImage = "/images/Navbar/NavbarLogo.png"
  const router = useRouter();
  const ref = useRef<any>(null);
  let topicTitleCount: any = 0
  const shareToInstagram = async (url: any, imageUrl: any, title: any) => {
    // try {
    //   const shareOptions = {
    //     social: Share.Social.INSTAGRAM,
    //     url: imageUrl,
    //     title: title,
    //     message: title + '\n\n' + url,
    //   };
    //   await Share.shareSingle(shareOptions);
    // } catch (error) {
    //   console.error(error);
    // }
  };
  // function InstagramPost() {
  //   const id = '123456789';
  //   const image = 'https://www.w3schools.com/images/w3schools_green.jpg';
  //   const text = 'Hello%20World';
  //   const access_token = 'TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST';
  //   const container = 'https://graph.facebook.com/v11.0/' + id + '/media?image_url=' + image + '&caption=' + text + '&access_token=' + access_token;

  //   const response = UrlFetchApp.fetch(container);
  //   const creation = response.getContentText();

  //   Logger.log(creation);
  // }
  // const InstagramPost = (user:any) => {
  //   return axios
  //   .post("https://graph.facebook.com/v16.0/17841400008460056/" + "media_publish?creation_id=" + user.id, user)
  //   .then((res) => {
  //     return res
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     return error
  //   });
  // }
  const handleShareToInstagram = () => {
    // const url_forinstagram = 'https://www.instagram.com/share?url=' + encodeURIComponent(url);
    // window.open(url_forinstagram, '_blank');
    let fields = "quota_usage,rate_limit_settings";
    let since = "1609969714";
    // let access = "3010100615906804";
    return axios
      .get(`https://graph.facebook.com/oauth/access_token?client_id=${3010100615906804}&client_secret=${`93751b6a3c36c698587147cc4b9c531c`}&grant_type=client_credentials`)
      .then((res) => {
        console.log(res)
        return res
      })
      .catch((error) => {
        console.log(error);
        return error
      });
    // return axios
    //   .get("https://graph.facebook.com/v9.0/{ig-user-id}/content_publishing_limit?fields=" + fields + "&since=" + since + "&access_token=" + access)
    //   .then((res) => {
    //     console.log(res)
    //     return res
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     return error
    //   });
  };
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
    let blogText: any = blog.title.replaceAll("-", "&#45;").replaceAll(" ", "-");
    router.push({ pathname: `/Blogs/${blogText}` }).then(() => {
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
  const getMonth = (month: any) => {
    if (month === 1) {
      return "enero"
    }
    else if (month === 2) {
      return "febrero"
    }
    else if (month === 3) {
      return "marzo"
    }
    else if (month === 4) {
      return "abril"
    }
    else if (month === 5) {
      return "mayo"
    }
    else if (month === 6) {
      return "junio"
    }
    else if (month === 7) {
      return "julio"
    }
    else if (month === 8) {
      return "agosto"
    }
    else if (month === 9) {
      return "septiembre"
    }
    else if (month === 10) {
      return "octubre"
    }
    else if (month === 11) {
      return "noviembre"
    }
    else if (month === 12) {
      return "diciembre"
    }
    else {
      return ''
    }
  }
  const getBlog = () => {
    let tempTitle: any = router.query.slug;
    setLinkToCopy('gonvar.io/Blogs/' + tempTitle);
    let titleSearch: string = tempTitle.replaceAll("-", " ").replaceAll("&#45;", "-");
    let tempBlog: any;
    let allBlogs: any;
    getBlogsApi().then((res) => {
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
      getSingleBlogApi(tempBlog[0].id).then((res) => {
        let date = new Date(res.created_at)
        let tempDay = date.getDate();
        let tempMonth = date.getMonth() + 1;
        let textMonth: string = getMonth(tempMonth);
        let tempYear = date.getFullYear();
        res.date = {
          day: tempDay,
          month: textMonth,
          year: tempYear,
        };
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
    console.log('hola')
    if (router.query.slug) {
      console.log('entro')
      fetchDB_data();
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
        description={blog?.subtitle ? blog?.subtitle : "Gonvar Nails Academy"}
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
                  <BsInstagram className='icon' onClick={handleShareToInstagram} />
                  <p className='text-display'>
                    Compartir en Instagram
                  </p>
                </div>
                <div className='content'>
                  <FaCopy className='icon' onClick={() => { navigator.clipboard.writeText(linkToCopy); showLinkCopyMessage() }} />
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