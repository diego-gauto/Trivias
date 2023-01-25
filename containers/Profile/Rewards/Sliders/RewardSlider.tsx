import React, { useRef, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlideContainer } from './RewardModuleSlider.styled';
import { reward_slider } from "./IRewardSlider";
import { title } from 'process';
SwiperCore.use([Autoplay]);

const RewardSlider = (props: reward_slider) => {

  let [counter, setCounter] = useState<any>(0);
  const { rewards, title, innerWidth, indexSlider } = props;

  const slider = document.querySelector(`.scroll-container-${indexSlider}`) as HTMLElement;
  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const getSliders = () => {
    let slideBlock: any = []
    if (rewards) {
      slideBlock = rewards
      console.log(slideBlock)
    }
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
    <div className="background-color">
      <h1>
        Recompensas
        {title == "points" ? " Bloqueadas " :
          title == "claim-points" ? " Reclamadas" :
            ""
        }
      </h1>
      <div id="scroll-container" className={`scroll-container-${indexSlider} scroll`} style={{ overflow: "scroll", overflowY: "hidden" }}>
        <div className="slide-container" onMouseDown={mouseDownHandler}>
          {
            rewards.map((reward: any, index: number) => {
              return (
                <SlideContainer
                  style={{ flexShrink: 0, width: (innerWidth - 40) / 5 }}
                  className="scroll-container"
                  key={index + "Slider"}
                >
                  <div className="text-container">
                    <p className="title-text">
                      <span>Recompensa bloqueada</span><br />
                      hasta llegar a {reward.points} puntos
                    </p>
                  </div>
                  <img src={reward?.path} className="image-container" />
                  <div className="text-container">
                    <p className="about-text">
                      {reward.about}
                    </p>
                  </div>

                </SlideContainer>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
export default RewardSlider;