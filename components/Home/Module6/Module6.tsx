import { Container, Col, Button, Image, Row } from "react-bootstrap";
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import 'swiper/css';
import Masonry from 'react-masonry-css'
import {
  AnimatedBackground,
  ContainerMain,
  Divisor,
  SliderContainerChild,
  SliderSectionTitle,
  SliderContainer,
  SliderItemLink,
} from "./Module6.styled";
import GradientCanvas from "../../GradientCanvas/GradientCanvas"

import { IModule6 } from "./IModule6";
import { SlideModule } from "./SlideModule/SlideModule";

SwiperCore.use([Autoplay]);

export const Module6 = (props: IModule6) => {
  const swiperRef = useRef<SwiperCore>();

  const { slideData } = props;
  var slideDataArr = [];
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
    loop: true,
    autoplay: {
      delay: 0,
    },
    speed: 4000,
    freeMode: true,
    slidesPerView: 2,
    spaceBetween: 20,
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      }
    }
  };

  return (
    <Container
      fluid
      style={{ padding: 0 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ContainerMain id="MainSliderCentered">
        <SliderContainer>
          <SliderSectionTitle>Visita nuestra tienda</SliderSectionTitle>
          <Swiper {...settings} onInit={onInit}>
            {slideDataArr.map((element) => (
              <SwiperSlide key={element.title + "_ID"}>
                <SliderItemLink href={element.clickURL} target="_blank" rel="noopener noreferrer">
                  <SlideModule
                    isNew={element.isNew}
                    title={element.title}
                    subtitle={element.subtitle}
                    imgURL={element.imgURL}
                  />
                </SliderItemLink>
              </SwiperSlide>
            ))}
          </Swiper>
        </SliderContainer>
        <SliderContainerChild>
          <GradientCanvas id="gradient-canvas2" />
        </SliderContainerChild>
      </ContainerMain >
    </Container >
  )
}
