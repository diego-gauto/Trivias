import { Container, Col, Row, Button, Image } from "react-bootstrap";
import { IModule5_Carousel } from "./IModule5_Carousel";
import SlideModule from "./SlideModule/SlideModule";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import 'swiper/css';

SwiperCore.use([Autoplay]);

export const Module5_Carousel = (props: IModule5_Carousel) => {
  const { slideData, reverseDirection } = props;
  let slideDataArr = [];
  slideDataArr = slideData;

  const settings = {
    loop: true,
    autoplay: {
      delay: 0,
      reverseDirection
    },
    speed: 7000,
    freeMode: true,
    slidesPerView: "auto",
    spaceBetween: 10,
    breakpoints: {
      1024: {
        slidesPerView: "auto",
        spaceBetween: 20,
      }
    }
  };

  return (
    <Container
      fluid
      style={{ height: "600px", overflow: "hidden", padding: "0" }}
    >
      <Swiper
        height={600}
        direction="vertical"
        {...settings}
      >
        {slideDataArr.map(({ title, imgURL }) => (
          <SwiperSlide key={title + "_ID"}  >
            <SlideModule
              title={title}
              imgURL={imgURL}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}
