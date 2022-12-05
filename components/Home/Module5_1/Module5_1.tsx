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
  GeneralContainer,
} from "./Module5_1.styled";
import {
  ContainerMainMobile,
  SliderSectionTitleMobile,
  SliderContainerMobile,
  SliderItemLinkMobile,
  TittleAMobile,
  TittleBMobile,
  LinesMobile,
  PeopleMobile,
  BgColorMobile,
  PeopleContainerMobile,
  GeneralContainerMobile,
  SwiperContainer,
  SwiperContainerReduced,
  SwiperContainerMoreReduced,
} from "./Module5_1Mobile.styled";


import IMG1 from "./MediaSources/Lineas.png";
import IMG2 from "./MediaSources/Personas.png";
import IMG3 from "./MediaSources/LineMobile.png";

import "swiper/css/navigation";
//import { Navigation } from "swiper";
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
        spaceBetween: 80,
      }
    }
  };
  const settingsMobile = {
    loop: true,
    autoplay: {
      delay: 0,
    },
    speed: 4000,
    freeMode: true,
    slidesPerView: 3,
    spaceBetween: 120,
  };
  const settingsMobileReduced = {
    loop: true,
    autoplay: {
      delay: 0,
    },
    speed: 4000,
    freeMode: true,
    slidesPerView: 1.5,
    spaceBetween: 5,
  };
  const settingsMobileMoreReduced = {
    loop: true,
    autoplay: {
      delay: 2000,
    },
    centeredSlides: true,
    speed: 250,
    freeMode: true,
    spaceBetween: 70,

    //navigation: true,
  };
  const sliderData = slideDataArr?.map((element) => {


    return (
      <SwiperSlide key={element.username + "_ID"} >
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
    <>
      <GeneralContainer
        fluid
        id="WebView"
      >
        <ContainerMain  >
          <SliderContainer>

            <Lines style={{ backgroundImage: `url(${IMG1.src})` }}></Lines>
            <SliderSectionTitle>
              <TittleA>Experiencias de nuestras </TittleA><TittleB> #AlumnasGonvar</TittleB>

            </SliderSectionTitle>
            <div onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}>
              <Swiper style={{ paddingTop: "50px", paddingBottom: "50px" }} {...settings} onInit={onInit}>
                {sliderData}
              </Swiper>
            </div>
          </SliderContainer>

          <PeopleContainer>
            <People style={{ backgroundImage: `url(${IMG2.src})` }}>
            </People>
            <BgColor  ></BgColor>
          </PeopleContainer>
        </ContainerMain >
      </GeneralContainer >


    </>
  )
}
