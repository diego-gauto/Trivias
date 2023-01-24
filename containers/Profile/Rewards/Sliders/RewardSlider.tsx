import React, { useRef, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import RewardModuleSlider from './RewardModuleSlider';
import { reward_slider } from "./RewardSlider.styled";
SwiperCore.use([Autoplay]);

const RewardSlider = (props: reward_slider) => {
  const swiperRef = useRef<SwiperCore>();
  const { rewards, isInfinite, title } = props;

  let allSlider: any = [];
  let slideMonths: any = [];
  let slideCertificates: any = [];

  rewards.map((val) => {
    if (val.type == title) {
      allSlider.push(val);
    }
  })

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
    <Container
      fluid
      style={{ overflow: "hidden", padding: 0, margin: 0, backgroundColor: "#ede7f2", paddingTop: 40 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {
        allSlider?.length > 0 ?
          <Swiper {...settings} onInit={onInit}>
            {
              allSlider?.map((element: any, idx: any) => {
                return (
                  <SwiperSlide key={"sliderReward" + idx}>
                    <RewardModuleSlider
                      rewards={element}
                    // type={type}
                    // isNew={element.isNew}
                    // title={element.title}
                    // subtitle={""}
                    // level={element.level}
                    // imgURL={element.imgURL}
                    // number={element.number}
                    // professor={element.professor}
                    />
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
          : <p>hola</p>
      }
    </Container>

  )
}
export default RewardSlider;