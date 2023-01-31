import React, { useRef, useEffect, useState } from 'react'
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import { BackgroundSlide, SlideContainer } from './RewardModuleSlider.styled';
import { reward_slider } from "./IRewardSlider";
import { addRequest, addUserReward, getUserRewards } from '../../../../store/actions/RewardActions';
SwiperCore.use([Autoplay]);

const RewardSlider = (props: reward_slider) => {

  let [counter, setCounter] = useState<any>(0);
  const { score, months, certificates, rewards, type, innerWidth, indexSlider, user, userReward } = props;
  const [slides, setSlides] = useState([]);
  const [openRewardInfo, setOpenRewardInfo] = useState<any>();

  const [texts, setTexts] = useState<any>({
    header: "",
    title: "",
  })

  let pos = { top: 0, left: 0, x: 0, y: 0 };
  const getSliders = () => {
    let slides: any = [];
    let tempFilter: any = [];
    let tempUserRewards: any = [];
    if (type == "claim-points") {
      tempFilter = rewards.filter((val: any) => (val.type == "points"));
      tempFilter.forEach((element: any) => {
        if (userReward.find((x: any) => x.id == element.id && x.status)) {
          slides.push(element);
        }
      });
      // tempFilter.sort((a: any, b: any) => a.points - b.points);
      setTexts({
        header: "Recompensas acumuladas",
        title: "Recompensa desbloqueda",
        scoreText: "desde los",
      })
    }
    if (type == "points") {
      tempFilter = rewards.filter((val: any) => (val.type == "points"));
      tempFilter.sort((a: any, b: any) => a.points - b.points)
      tempUserRewards = userReward.map((val: any) => { return val.id });
      tempFilter.map((pointReward: any, index: any) => {
        userReward.map((res: any) => {
          if ((pointReward.id == res.id) && res.status == false) {
            slides.push(pointReward);
          }
        })
        if (!pointReward.id.includes(tempUserRewards[index])) {
          slides.push(pointReward);
        }

      })
      setTexts({
        header: "Recompensas por desbloquear",
        title: "Recompensa bloqueda",
        scoreText: "hasta llegar a",
      })
    }
    if (type == "claim-months") {
      slides = rewards.filter((val: any) => (val.type == "months"));
      slides.sort((a: any, b: any) => a.months - b.months)
      setTexts({
        header: "Beneficios Acumulados",
        title: "Beneficio desbloqueado",
        scoreText: "por cumplir",
      })
    }
    if (type == "months") {
      slides = rewards.filter((val: any) => (val.type == "months"));
      slides.sort((a: any, b: any) => a.months - b.months)
      setTexts({
        header: "Beneficios por desbloquear",
        title: "Beneficio bloqueado",
        scoreText: "hasta cumplir",
      })
    }
    if (type == "claim-certificates") {
      slides = rewards.filter((val: any) => (val.type == "certificates"));
      slides.sort((a: any, b: any) => a.certificates - b.certificates);
      setTexts({
        header: "Certificados Acumulados",
        title: "Beneficio desbloqueado",
        scoreText: "por completar",
      })
    }
    if (type == "certificates") {
      slides = rewards.filter((val: any) => (val.type == "certificates"));
      slides.sort((a: any, b: any) => a.certificates - b.certificates)
      setTexts({
        header: "Certificados por desbloquear",
        title: "Beneficio bloqueado",
        scoreText: "al completar",
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
  const AddUserRewards = async (reward: any) => {
    let tempReward = {
      id: reward.id,
      status: false,
      title: reward.title,
      type: reward.type
    }
    addUserReward(tempReward, user.id).then((res: any) => {
    }).then(() => {
      alert("Recompensa reclamada con éxito")
    })
  }
  const sendRequest = async (rewardTitle: any, rewardProductType: any) => {
    let tempRequest: any
    if (type == "points") {
      tempRequest = {
        userId: user.id,
        user: user.name,
        userPhoto: user.photoURL,
        points: user.score,
        createAt: new Date(),
        phoneNumber: user.phoneNumber,
        type: type,
        title: rewardTitle,
        productType: rewardProductType,
        status: false,
      }
    }
    if (type == "months") {
      tempRequest = {
        userId: user.id,
        user: user.name,
        userPhoto: user.photoURL,
        months: 1,
        createAt: new Date(),
        phoneNumber: user.phoneNumber,
        type: type,
        title: rewardTitle,
        productType: rewardProductType,
        status: false,
      }
    }
    if (type == "certificates") {
      tempRequest = {
        userId: user.id,
        user: user.name,
        userPhoto: user.photoURL,
        certificates: 2,
        createAt: new Date(),
        phoneNumber: user.phoneNumber,
        type: type,
        title: rewardTitle,
        productType: rewardProductType,
        status: false,
      }
    }
    addRequest(tempRequest).then((res: any) => {
    })
  }

  let slider: any;
  const mouseDownHandler = function (e: any) {
    slider = document.querySelector(`.scroll-container-${indexSlider}`) as HTMLElement;
    e.preventDefault();
    pos = {
      // The current scroll
      left: slider?.scrollLeft,
      top: slider?.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = function (e: any) {
    setCounter(counter++);
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    slider.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  useEffect(() => {
    getSliders();
  }, [rewards])

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
                          {texts.scoreText} {reward.points && reward.points + " puntos"}
                          {reward.months ? (reward.months == 1 ? reward.months + " mes" : reward.months + " meses") : ""}
                          {reward.certificates ? (reward.certificates == 1 ? reward.certificates + " certificado" : reward.certificates + " certificados") : ""}
                        </p>
                      </div>
                      <div className='img-complete'>
                        <img src={reward?.path} className="image-container" />
                        <div className="btn-contain">
                          {
                            (type == "claim-months" || type == "claim-points" || type == "claim-certificates"
                              || (score < reward.points)) &&
                            <button className="btn-info" onClick={() => showRewardData(index, reward.points)}>
                              <p className='text'>
                                Más información
                              </p>
                            </button>
                          }
                          {
                            ((score >= reward.points && !userReward.find((x: any) => x.id == reward.id))) &&
                            <button className="btn-info"
                              onClick={() => {
                                AddUserRewards(reward);
                                sendRequest(reward.title, reward.productType);
                              }}
                            >
                              <p className='text' >
                                Hacer Pedido
                              </p>
                            </button>
                          }
                          {

                            ((userReward.find((x: any) => x.id == reward.id && !x.status))) &&
                            <button className="btn-info">
                              <p className='text'>
                                En proceso..
                              </p>
                            </button>
                          }
                          {/* {
                            (type == "months" || score >= reward.points || type == "certificates") &&
                            <>
                              {
                                userReward.map((val: any, index: number,) => {
                                  return (
                                    <React.Fragment key={index + " RewardCompare"}>
                                      {
                                        (val.id == reward.id && val.status == false)
                                        &&
                                        <button className="btn-info">
                                          <p className='text' >
                                            En proceso...
                                          </p>
                                        </button>
                                      }
                                      {
                                        (val.id == reward.id && val.status == true)
                                        &&
                                        <button className="btn-info"
                                          onClick={() => showRewardData(index, reward.points)}
                                        >
                                          <p className='text'>
                                            Más información
                                          </p>
                                        </button>
                                      }
                                      {
                                        ((!reward.id.includes(val.id)) && val.status == false && type == "points")
                                        &&
                                        <button className="btn-info"
                                          onClick={() => {
                                            AddUserRewards(reward),
                                              sendRequest(reward.title, reward.productType);
                                          }}
                                        >
                                          <p className='text' >
                                            Hacer Pedido
                                          </p>
                                        </button>
                                      }
                                    </React.Fragment>
                                  )
                                })
                              }
                            </>
                          } */}
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
                              <p>Beneficio por completar</p>
                              {reward.type == "points" &&
                                <p>{reward.points} puntos en Gonvar</p>}
                              {reward.type == "months" &&
                                <p>{reward.months} meses en Gonvar</p>}
                              {reward.type == "certificates" &&
                                <p>{reward.certificates} certificados en Gonvar</p>}
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