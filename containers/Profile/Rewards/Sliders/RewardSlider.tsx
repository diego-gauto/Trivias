import React, { useRef } from 'react'
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { reward_slider } from "./RewardSlider.styled";
SwiperCore.use([Autoplay]);

const RewardSlider = (props: reward_slider) => {
  const swiperRef = useRef<SwiperCore>();

  const { isInfinite, slideData, type } = props;
  let slideDataArr = [];
  slideDataArr = slideData;
  if (slideDataArr) {

  }
  const onInit = (swiper: SwiperCore) => {
    swiperRef.current = swiper;
  };

  const onMouseEnter = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  };

  const onMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  };

  const settings = {
    loop: isInfinite,
    autoplay: {
      delay: 100,
    },
    speed: 7000,
    freeMode: true,
    slidesPerView: 2,
    spaceBetween: 0,
    breakpoints: {
      1024: {
        slidesPerView: 5,
        spaceBetween: 10,
      }
    }
  };

  return (
    <Swiper {...settings} onInit={onInit}>
      {slideDataArr?.map((element, idx) => (
        <SwiperSlide key={idx}>
          {/* <SlideModule
          type={type}
          isNew={element.isNew}
          title={element.title}
          subtitle={""}
          level={element.level}
          imgURL={element.imgURL}
          number={element.number}
          professor={element.professor}
        /> */}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
export default RewardSlider;