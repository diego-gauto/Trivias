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

  TittleAMobile,
  TittleBMobile,
  LinesMobile,
  PeopleMobile,
  BgColorMobile,
  PeopleContainerMobile,
  GeneralContainerMobile,
  SwiperContainer,
} from "./Module5_1Mobile.styled";


import IMG1 from "./MediaSources/Lineas.png";
import IMG4 from "./MediaSources/Personas2.png";
import IMG3 from "./MediaSources/LineMobile.png";

import "swiper/css/navigation";
//import { Navigation } from "swiper";
import { IModule5_1 } from "./IModule5_1";
import { downloadFileWithStoragePath } from "../../../store/actions/LandingActions";
import { SlideModule_1 } from "./SlideModule_1/SlideModule_1";
import { ref } from "yup";
import swiper from "swiper";
SwiperCore.use([Autoplay]);

export const Module5_1 = (props: IModule5_1) => {

  const swiperRef2 = useRef<any>(null)

  const { slideData } = props;
  var slideDataArr = [];
  slideDataArr = slideData;

  const onMouseEnter = () => {
    try {

      swiperRef2?.current?.swiper.autoplay.stop();
    } catch (error) {

    }

  };
  const onMouseLeave = () => {
    try {

      swiperRef2?.current?.swiper.autoplay.start();
    } catch (error) {

    }

  };
  const settings = {
    loop: true,

    autoplay: {
      delay: 0,
    },
    speed: 4000,
    freeMode: true,
    slidesPerView: 1.2,
    spaceBetween: 20,
    breakpoints: {
      1250: {
        slidesPerView: 3.75,
        spaceBetween: 50,
      },
      850: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      420: {
        slidesPerView: 1.5,
        spaceBetween: 30,
      }
    }
  };

  const sliderData = slideDataArr?.map((element, index) => {
    return (
      <SwiperSlide id={"slide" + index} key={element.username + "_ID"}

      // onPointerEnter={() => {
      //   console.log(document.getElementById("slide" + index));
      // }}
      >
        <SliderItemLink >
          <SlideModule_1
            index={index}
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
        fluid id="WebView"
      >
        <ContainerMain  >
          <SliderContainer>

            <Lines style={{ backgroundImage: `url(${IMG1.src})` }}></Lines>
            <SliderSectionTitle>
              <TittleA>Experiencias de nuestras </TittleA><TittleB> #AlumnasGonvar</TittleB>

            </SliderSectionTitle>
            <div
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}>
              <Swiper style={{ paddingTop: "50px", paddingBottom: "50px" }}
                {...settings}
                ref={swiperRef2}>
                {sliderData}
              </Swiper>
            </div>
          </SliderContainer>
        </ContainerMain >
      </GeneralContainer >

      <GeneralContainerMobile
        fluid
        style={{ padding: 0 }} id="MobileView"
      >
        <ContainerMainMobile  >
          <SliderContainerMobile>

            <LinesMobile style={{ backgroundImage: `url(${IMG3.src})` }}></LinesMobile>
            <SliderSectionTitleMobile>
              <TittleAMobile>Experiencias de nuestras </TittleAMobile><TittleBMobile> #AlumnasGonvar</TittleBMobile>

            </SliderSectionTitleMobile>

            <SwiperContainer

              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}>
              <Swiper style={{ paddingTop: "50px", paddingBottom: "50px" }}
                {...settings}
              >
                {sliderData}
              </Swiper>
            </SwiperContainer>
          </SliderContainerMobile>
        </ContainerMainMobile >
      </GeneralContainerMobile >
    </>
  )
}
