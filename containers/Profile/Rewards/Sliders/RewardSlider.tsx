import React, { useRef, useEffect, useState } from 'react'
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import { BackgroundSlide, SlideContainer } from './RewardModuleSlider.styled';
import { reward_slider } from "./IRewardSlider";
SwiperCore.use([Autoplay]);

const RewardSlider = (props: reward_slider) => {

  let [counter, setCounter] = useState<any>(0);
  const { score, rewards, type, innerWidth, indexSlider } = props;
  const [slides, setSlides] = useState([]);
  const [texts, setTexts] = useState<any>({
    header: "",
    title: "",
  })

  const slider = document.querySelector(`.scroll-container-${indexSlider}`) as HTMLElement;
  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const getSliders = () => {
    let slides: any = [];
    if (type == "points") {
      slides = rewards.filter((val: any) => (val.type == "points"));
      slides.sort((a: any, b: any) => a.points - b.points)
      setTexts({
        header: "por Puntos Bloqueadas",
        title: "Recompensa bloqueda",
        scoreText: "hasta llegar a",
      })
    }
    if (type == "claim-points") {
      slides = rewards.filter((val: any) => (val.type == "points" && score >= val.points));
      slides.sort((a: any, b: any) => a.points - b.points)
      setTexts({
        header: "por Puntos Reclamadas",
        title: "Recompensa desbloqueda",
        scoreText: "desde los",
      })
    }
    if (type == "months") {
      slides = rewards.filter((val: any) => (val.type == "months"));
      slides.sort((a: any, b: any) => a.months - b.months)
      setTexts({
        header: "por Meses Bloqueadas",
        title: "Beneficio bloqueado",
        scoreText: "hasta cumplir",
      })
    }
    if (type == "claim-months") {
      slides = rewards.filter((val: any) => (val.type == "months"));
      slides.sort((a: any, b: any) => a.months - b.months)
      setTexts({
        header: "por Meses Reclamadas",
        title: "Beneficio desbloqueado",
        scoreText: "al cumplir",
      })
    }
    if (type == "certificates") {
      slides = rewards.filter((val: any) => (val.type == "certificates"));
      slides.sort((a: any, b: any) => a.certificates - b.certificates)
      setTexts({
        header: "por Certificados",
        title: "Beneficio bloqueado",
        scoreText: "al completar",
      })
    }
    setSlides(slides)
  }

  const mouseDownHandler = function (e: any) {
    e.preventDefault();
    pos = {
      // The current scroll
      left: slider.scrollLeft,
      top: slider.scrollTop,
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
        Recompensas {texts.header}
      </h1>
      {
        slides.length > 0
          ?
          <div id="scroll-container" className={`scroll-container-${indexSlider} scroll`} style={{ overflow: "scroll", overflowY: "hidden" }}>
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
                      <img src={reward?.path} className="image-container" />
                      <div className="text-container">
                        <p className="about-text">
                          {reward.title}
                        </p>
                      </div>

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