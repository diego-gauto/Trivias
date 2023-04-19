import React, { useRef, useEffect, useState } from 'react'
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import { BackgroundSlide, SlideContainer } from './RewardModuleSlider.styled';
import { reward_slider } from "./IRewardSlider";
import { createRequestApi } from '../../../../components/api/rewards';
import { LoaderButton } from '../../../../components/admin/CoursesNew/Courses.styled';
SwiperCore.use([Autoplay]);

const RewardSlider = (props: reward_slider) => {

  let [counter, setCounter] = useState<any>(0);
  const {
    score,
    months,
    certificates,
    rewards,
    type,
    innerWidth,
    indexSlider,
    user,
    userReward,
    getRewardData,
    courses,
    completeCertificates,
    router
  } = props;
  const [slides, setSlides] = useState([]);
  const [openRewardInfo, setOpenRewardInfo] = useState<any>();
  const [loader, setLoader] = useState<boolean>(false);
  const [texts, setTexts] = useState<any>({
    header: "",
    title: "",
  })
  let pos = { top: 0, left: 0, x: 0, y: 0 };
  const getSliders = () => {
    let slides: any = [];
    let tempFilter: any = [];
    if (type == "claim-points") {
      tempFilter = rewards.filter((val: any) => (val.type == "points"));
      tempFilter.forEach((element: any) => {
        if (userReward.find((x: any) => x.reward_id == element.id && x.status)) {
          slides.push(element);
        }
      });
      setTexts({
        header: "Recompensas acumuladas",
        title: "Recompensa desbloqueda",
        scoreText: "desde los ",
      })
    }
    if (type == "points") {
      tempFilter = rewards.filter((val: any) => (val.type === "points" && val.published === "publicado"));
      tempFilter.sort((a: any, b: any) => a.points - b.points)
      tempFilter.forEach((element: any) => {
        if (userReward.find((x: any) => x.reward_id == element.id && !x.status)) {
          slides.push(element);
        }
        if (!userReward.find((x: any) => x.reward_id == element.id)) {
          slides.push(element);
        }
      });
      setTexts({
        header: "Recompensas por desbloquear",
        title: "Recompensa bloqueda",
        scoreText: "hasta llegar a ",
      })
    }
    if (type == "claim-months") {
      tempFilter = rewards.filter((val: any) => (val.type == "months"));
      tempFilter.sort((a: any, b: any) => a.month - b.month);
      tempFilter.forEach((element: any) => {
        if (userReward.find((x: any) => x.reward_id == element.id && x.status)) {
          slides.push(element);
        }
      });
      setTexts({
        header: "Beneficios Acumulados",
        title: "Beneficio desbloqueado",
        scoreText: "por cumplir ",
      })
    }
    if (type == "months") {
      tempFilter = rewards.filter((val: any) => (val.type == "months" && val.published === "publicado"));
      tempFilter.sort((a: any, b: any) => a.month - b.month)
      tempFilter.forEach((element: any) => {
        if (userReward.find((x: any) => x.reward_id == element.id && !x.status)) {
          slides.push(element);
        }
        if (!userReward.find((x: any) => x.reward_id == element.id)) {
          slides.push(element);
        }
      });
      setTexts({
        header: "Beneficios por desbloquear",
        title: "Beneficio bloqueado",
        scoreText: "hasta cumplir ",
      })
    }
    if (type == "claim-certificates") {
      tempFilter = completeCertificates;
      slides = tempFilter;
      setTexts({
        header: "Certificados Acumulados",
        title: "Curso completado",
        scoreText: "Obtener Certificado",
      })
    }
    if (type == "certificates") {
      tempFilter = courses;
      tempFilter.sort((a: any, b: any) => a.total - b.total);
      slides = tempFilter;
      setTexts({
        header: "Certificados por desbloquear",
        title: "Certificado bloqueado",
        scoreText: "hasta completar ",
      })
      console.log(slides);
    }
    setSlides(slides)
  }

  const moveToCertificate = (course: any) => {
    router.push({
      pathname: `/Certificates`,
      query: {
        name: user.name,
        lastName: user.last_name,
        title: course.title,
        professor: course.professor.name,
        id: user.user_id,
        color: course.color,
        courseId: course.courseId,
        teacherSignature: course.professor.sign,
      }
    });
  }
  const showRewardData = (index: any, rewardPoints: any) => {
    if (index == openRewardInfo) {
      setOpenRewardInfo(undefined);
    } else {
      setOpenRewardInfo(index);
    }
  }
  const sendRequest = async (reward: any) => {
    setLoader(true);
    let tempRequest: any = {
      user_id: user.user_id,
      reward_id: reward.id,
      status: false,
    }
    createRequestApi(tempRequest).then(() => {
      alert("Recompensa reclamada con éxito")
      getSliders();
      getRewardData();
      setLoader(false);
    })
  }

  let slider: any;
  const mouseDownHandler = function (e: any) {
    slider = document.querySelector(`.scroll-container-${indexSlider}`) as HTMLElement;
    e.preventDefault();
    pos = {
      left: slider?.scrollLeft,
      top: slider?.scrollTop,
      x: e.clientX,
      y: e.clientY,
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = function (e: any) {
    setCounter(counter++);
    const dx = e.clientX - pos.x;
    slider.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };
  useEffect(() => {
    getSliders();
  }, [rewards, type])
  return (
    <BackgroundSlide type={type}>
      <h1>
        {texts.header}
      </h1>
      {
        slides.length > 0
          ?
          <div className={`scroll-container-${indexSlider} scroll`} style={{ overflow: "scroll", overflowY: "hidden" }}>
            <div className="slide-container" onMouseDown={mouseDownHandler}>
              {
                slides.map((reward: any, index: number) => {
                  return (
                    <SlideContainer
                      innerWidth={innerWidth}
                      className="scroll-container"
                      key={index + "Slider"}
                      type={type}
                    >
                      <div className="text-container">
                        <p className="title-text">
                          <span>{texts.title}</span><br />
                          {texts.scoreText}
                          {reward.points && reward.points + " puntos"}
                          {reward.month ? (reward.month == 1 ? reward.month + " mes" : reward.month + " meses") : ""}
                          {reward.lessonsLeft ? (reward.lessonsLeft == 1 ? reward.lessonsLeft + " certificado" : reward.lessonsLeft + " lecciones") : ""}
                        </p>
                        {/* {
                          reward.total &&
                          <div className="progress-bar">
                            <div className="progress-complete">

                            </div>
                          </div>
                        } */}
                      </div>
                      <div className='img-complete' style={(type == "claim-certificates" || type == "certificates") ? { height: 150, borderRadius: 10 } : {}}>
                        <img src={reward?.image} className="image-container" style={(type == "claim-certificates" || type == "certificates") ? { borderRadius: 10 } : {}} />
                        <div className="btn-contain">
                          {
                            type == "claim-certificates" &&
                            <button className="btn-info" onClick={() => moveToCertificate(reward)}>
                              <p className='text'>
                                Ver certificado
                              </p>
                            </button>
                          }
                          {
                            (type == "claim-months" || type == "claim-points" || type == "certificates"
                              || (score < reward.points) || months < reward.month) &&
                            <button className="btn-info" onClick={() => showRewardData(index, reward.points)}>
                              <p className='text'>
                                Más información
                              </p>
                            </button>
                          }
                          {
                            ((reward.type === "points" && score >= reward.points && !userReward.find((x: any) => x.reward_id == reward.id)) ||
                              (reward.type === "months" && months >= reward.month && !userReward.find((x: any) => x.reward_id == reward.id))) &&
                            <>
                              {
                                !loader ?
                                  <button className="btn-info"
                                    onClick={() => {
                                      // AddUserRewards(reward);
                                      sendRequest(reward);
                                    }}
                                  >
                                    <p className='text' >
                                      Hacer Pedido
                                    </p>
                                  </button>
                                  : <LoaderButton />
                              }
                            </>
                          }
                          {
                            ((userReward.find((x: any) => x.reward_id === reward.id && !x.status))) &&
                            <button className="btn-info">
                              <p className='text'>
                                En proceso..
                              </p>
                            </button>
                          }
                        </div>
                      </div>
                      {
                        openRewardInfo == index
                          ?
                          <div className='reward-info-container'>
                            <div className='top'>
                              <p>{reward.title} <span>de Gonvar Nails</span></p>

                              <p className='about'>{reward.about}</p>
                            </div>
                            <div className='bottom'>

                              {reward.type === "points" &&
                                <>
                                  <p>Beneficio por completar</p>
                                  <p><span className="rewards">{reward.points} puntos</span> en Gonvar</p>
                                </>
                              }
                              {
                                reward.type === "months" &&
                                <>
                                  <p>Beneficio por completar</p>
                                  <p><span className="months">{reward.month} meses</span> en Gonvar</p>
                                </>
                              }
                              {reward.type === "certificates" &&
                                <>
                                  <p>Certificado por completar</p>
                                  <p><span className="certificates">{reward.totalLessons} lecciones</span> en Gonvar</p>
                                </>
                              }
                            </div>
                          </div>
                          :
                          <div className="text-container">
                            <p className="about-text">
                              {reward.title}
                            </p>
                          </div>
                      }
                    </SlideContainer>
                  )
                })
              }
            </div>
          </div>
          : <p className="un-claimed">Sin Recompensas Reclamadas...</p>
      }
    </BackgroundSlide>
  )
}
export default RewardSlider;