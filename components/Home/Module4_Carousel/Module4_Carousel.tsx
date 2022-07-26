import { Container, Col, Row, Button, Image } from "react-bootstrap";
import { IModule4_Carousel } from "./IModule4_Carousel";
import { SlideModule } from "./SlideModule/SlideModule";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import 'swiper/css';

SwiperCore.use([Autoplay]);

export const Module4_Carousel = (props: IModule4_Carousel) => {
  const swiperRef = useRef<SwiperCore>();

  const { isInfinite } = props;
  const { slideData } = props;
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
    slidesPerView: 3.5,
    spaceBetween: 30,
  };

  return (
    <Container
      fluid
      style={{ overflow: "hidden" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Swiper {...settings} onInit={onInit}>
        {slideDataArr.map((element) => (
          <SwiperSlide key={element.title + "_ID"}  >
            <SlideModule isNew={element.isNew} title={element.title} subtitle={element.subtitle} imgURL={element.imgURL}></SlideModule>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}
