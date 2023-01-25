import React, { useRef, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlideContainer } from './RewardModuleSlider.styled';
import { reward_slider } from "./IRewardSlider";
SwiperCore.use([Autoplay]);

const RewardSlider = (props: reward_slider) => {

  let [counter, setCounter] = useState<any>(0);
  const { rewards, isInfinite, title, innerWidth } = props;

  const slider = document.querySelector('.scroll-container') as HTMLElement;
  let pos = { top: 0, left: 0, x: 0, y: 0 };

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

  return (
    <div id="scroll-container" className="scroll-container" style={{ overflow: "scroll", overflowY: "hidden" }}>
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
  )
}
export default RewardSlider;