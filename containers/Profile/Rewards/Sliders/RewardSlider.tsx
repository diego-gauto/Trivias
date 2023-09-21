import React, { useEffect, useState } from 'react'
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import { BackgroundSlide, SlideContainer } from './RewardModuleSlider.styled';
import { reward_slider } from "./IRewardSlider";
import { createRequestApi } from '../../../../components/api/rewards';
import { LoaderButton } from '../../../../components/admin/CoursesNew/Courses.styled';
import { goToCertificate } from '../../../../constants/redirects';
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
  } = props;
  const [slides, setSlides] = useState([]);
  const [openRewardInfo, setOpenRewardInfo] = useState<any>();
  const [loader, setLoader] = useState<boolean>(false);
  let today = new Date().getTime() / 1000;
  const [texts, setTexts] = useState<any>({
    header: "",
    title: "",
  })
  let pos = { top: 0, left: 0, x: 0, y: 0 };
  const getSliders = () => {
    let slides: any = [];
    let tempFilter: any = [];
    if (type == "claim-points") {
      tempFilter = rewards.filter((val: any) => { return (val.type === "points" && val.published === "publicado" && user.score >= val.points) });
      tempFilter.sort((a: any, b: any) => a.points - b.points)
      tempFilter.forEach((element: any) => {
        if (!userReward.find((x: any) => x.reward_id === element.id && x.status)) {
          slides.push(element);
        }
      });
      setTexts({
        header: "Recompensas acumuladas",
        title: "Recompensa desbloqueda",
        scoreText: "desde los ",
        bottomText: "Sin Recompensas Reclamadas..."
      })
    }
    if (type == "points") {
      tempFilter = rewards.filter((val: any) => { return (val.type === "points" && val.published === "publicado" && user.score < val.points) });
      tempFilter.sort((a: any, b: any) => a.points - b.points)
      slides = tempFilter;
      setTexts({
        header: "Recompensas por desbloquear",
        title: "Recompensa bloqueda",
        scoreText: "hasta llegar a ",
        bottomText: "Próximamente podrás desbloquear nuevas recompensas"
      })
    }
    if (type == "claim-months") {
      tempFilter = rewards.filter((val: any) => { return ((val.type == "months" && val.published === "publicado" && months >= val.month) || ((user.level === 5 && today < user.final_date) && val.type == "months" && val.published === "publicado")) });
      tempFilter.sort((a: any, b: any) => a.month - b.month);
      tempFilter.forEach((element: any) => {
        if (!userReward.find((x: any) => x.reward_id == element.id && x.status)) {
          slides.push(element);
        }
      });
      setTexts({
        header: "Beneficios Acumulados",
        title: "Beneficio desbloqueado",
        scoreText: "por cumplir ",
        bottomText: "Sin Beneficios Reclamados..."
      })
    }
    if (type == "months") {
      tempFilter = rewards.filter((val: any) => { return (val.type === "months" && val.published === "publicado" && months < val.month) && !((user.level === 5 || user.level === 4) && user.final_date > today) });
      tempFilter.sort((a: any, b: any) => a.month - b.month)
      slides = tempFilter;
      // tempFilter.forEach((element: any) => {
      //   if (userReward.find((x: any) => x.reward_id == element.id && !x.status)) {
      //     slides.push(element);
      //   }
      //   if (!userReward.find((x: any) => x.reward_id == element.id)) {
      //     slides.push(element);
      //   }
      // });
      setTexts({
        header: "Beneficios por desbloquear",
        title: "Beneficio bloqueado",
        scoreText: "hasta cumplir ",
        bottomText: "Próximamente podrás desbloquear nuevos beneficios ",
      })
    }
    if (type == "claim-certificates") {
      tempFilter = completeCertificates;
      slides = tempFilter;
      setTexts({
        header: "Certificados Acumulados",
        title: "Curso completado",
        scoreText: "Obtener Certificado",
        bottomText: "Finaliza un curso para obtener un certificado",
      })
    }
    if (type == "certificates") {
      tempFilter = courses;
      slides = tempFilter;
      setTexts({
        header: "Certificados por desbloquear",
        title: "Certificado bloqueado",
        scoreText: "hasta completar ",
        bottomText: "Comienza un curso para obtener un certificado",
      })
    }
    setSlides(slides)
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
    let notification = {
      userId: user.user_id,
      message: reward.type === "points" ? 'Recompensa reclamada' : 'Beneficio reclamado',
      type: 'reward',
      subType: "request",
      notificationId: '',
      score: 0,
      title: reward.title,
    }
    // createNotification(notification);
    createRequestApi(tempRequest).then(() => {
      alert("Recompensa reclamada con éxito")
      getSliders();
      getRewardData(user);
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
  console.log(slides);
  return (
    <BackgroundSlide type={type}>
      <h2>
        {texts.header}
      </h2>
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
                          <span className='span-1'>{texts.title}</span><br />
                          {texts.scoreText}
                          {
                            (reward.type === "points" || reward.type === "claim-points") &&
                            reward.points && reward.points + " puntos"
                          }
                          {
                            (reward.type === "months" || reward.type === "claim-months") &&
                            reward.month && (reward.month === 1 ? reward.month + " mes" : reward.month + " meses")
                          }
                          {reward.lessonsLeft ? (reward.lessonsLeft == 1 ? reward.lessonsLeft + " lección" : reward.lessonsLeft + " lecciones") : (reward.type === "certificates" && "las tareas faltantes")}
                        </p>
                        {
                          reward.type === "points" &&
                          <p className="title-text">Precio real:  <span className='span-2'> $ {reward.price}.00 MXN </span></p>
                        }

                        {/* {
                          reward.total &&
                          <div className="progress-bar">
                            <div className="progress-complete">

                            </div>
                          </div>
                        } */}
                      </div>
                      <div
                        className='img-complete' style={(type == "claim-certificates" || type == "certificates") ? { height: 150, borderRadius: 10, width: 250 } : {}}>
                        <img src={reward?.image} className="image-container" style={(type == "claim-certificates" || type == "certificates") ? { borderRadius: 10 } : {}} />
                        <div className="btn-contain">
                          {
                            type == "claim-certificates" &&
                            <button className="btn-info" onClick={() => goToCertificate(reward)}>
                              <p className='text'>
                                Ver certificado
                              </p>
                            </button>
                          }
                          {
                            (type === "months" || type === "points" || type === "certificates") &&
                            <button className="btn-info" onClick={() => showRewardData(index, reward.points)}>
                              <p className='text'>
                                Más información
                              </p>
                            </button>
                          }
                          {
                            ((reward.type === "points" && score >= reward.points && !userReward.find((x: any) => x.reward_id == reward.id)) ||
                              (reward.type === "months" && months >= reward.month && !userReward.find((x: any) => x.reward_id == reward.id)) ||
                              ((reward.type === "months") && (user.level === 5 || user.level === 4) && user.final_date > today))
                            &&
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
                          {!('totalLessons' in reward) &&
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
          : <p className="un-claimed">{texts.bottomText}</p>
      }
    </BackgroundSlide>
  )
}
export default RewardSlider;