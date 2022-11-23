import { Container } from "react-bootstrap";
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import 'swiper/css';
import {
  ContainerMain,
  SliderSectionTitle,
  SliderContainer,
  SliderItemLink,
  TittleA,
  TittleB,
  Lines,
  People,
  BgColor,
  PeopleContainer,
} from "./Module5_1.styled";


import IMG1 from "./MediaSources/Lineas.png";
import IMG2 from "./MediaSources/Personas.png";

import { IModule5_1 } from "./IModule5_1";
import { downloadFileWithStoragePath } from "../../../store/actions/LandingActions";
import { SlideModule_1 } from "./SlideModule_1/SlideModule_1";
SwiperCore.use([Autoplay]);

export const Module5_1 = (props: IModule5_1) => {
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
  const sliderData = slideDataArr?.map((element) => {


    return (
      <SwiperSlide key={element.username + "_ID"}>
        <SliderItemLink >
          <SlideModule_1
            isNew={element.isNew}
            descripcion={element.descripcion}
            datePublication={element.convertedDate}
            usrFacebookURL={element.usrFacebookURL}
            username={element.username}
            imgURL={downloadFileWithStoragePath(element.imgURL)}
            usrImgURL={downloadFileWithStoragePath(element.usrImgURL)}
          />
        </SliderItemLink>
      </SwiperSlide>
    )
  })
  return (
    <Container
      fluid
      style={{ padding: 0 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ContainerMain id="ExperiencesContainer">
        <SliderContainer>

          <Lines style={{ backgroundImage: `url(${IMG1.src})` }}></Lines>
          <SliderSectionTitle>
            <TittleA>Experiencias de nuestras </TittleA><TittleB> #AlumnasGonvar</TittleB>

          </SliderSectionTitle>
          <Swiper style={{ paddingTop: "50px", paddingBottom: "50px" }} {...settings} onInit={onInit}>
            {sliderData}
          </Swiper>
        </SliderContainer>

        <PeopleContainer>
          <People style={{ backgroundImage: `url(${IMG2.src})` }}></People>
          <BgColor id="Bgcolor"></BgColor>
        </PeopleContainer>
      </ContainerMain >
    </Container >
  )
}
