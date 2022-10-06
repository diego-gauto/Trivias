import React, { useRef } from "react";

import { Container } from "react-bootstrap";

import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import { IModule4_Carousel } from "./IModule4_Carousel";
import { SlideModule } from "./SlideModule/SlideModule";

SwiperCore.use([Autoplay]);

export const Module4_Carousel = (props: IModule4_Carousel) => {
  const swiperRef = useRef<SwiperCore>();

  const { isInfinite, slideData } = props;

  let slideDataArr = [];
  slideDataArr = slideData;

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
      delay: 0,
    },
    speed: 7000,
    freeMode: true,
    slidesPerView: 2,
    spaceBetween: 0,
    breakpoints: {
      1024: {
        slidesPerView: 3.5,
        spaceBetween: 30,
      }
    }
  };

  return (
    <Container
      fluid
      style={{ overflow: "hidden", padding: 1 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Swiper {...settings} onInit={onInit}>
        {slideDataArr.map((element) => (
          <SwiperSlide key={element.title + "_ID"}  >
            <SlideModule
              isNew={element.isNew}
              title={element.title}
              subtitle={element.subtitle}
              imgURL={element.imgURL}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}
