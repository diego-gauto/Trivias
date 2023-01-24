import React, { useRef, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlideContainer } from './RewardModuleSlider.styled';
import { reward_slider } from "./IRewardSlider";
SwiperCore.use([Autoplay]);

const RewardSlider = (props: reward_slider) => {
  const swiperRef = useRef<SwiperCore>();
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
    <div className="slide-container">
      {
        rewards.map((reward: any, index: number) => {
          return (
            <SlideContainer
              style={{ width: (innerWidth - 40) / 5 }}
              id="scroll-container" className="scroll-container"
              onMouseDown={mouseDownHandler}
            >
              <div className="text-container">
                <p className="title-text">
                  <span>Recompensa bloqueada</span><br />
                  hasta llegar a {reward.points} puntos
                </p>
              </div>
              <img src={reward?.path} className="image-container" />

              <div className="text-container">
                {reward.about}
              </div>
            </SlideContainer>
          )
        })
      }
    </div>
  )
}
export default RewardSlider;