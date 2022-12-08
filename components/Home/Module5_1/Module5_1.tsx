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
import IMG4 from "./MediaSources/Personas2.png";
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
    swiperRef?.current?.autoplay.stop();
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
      waitForTransition: false,
      pauseOnMouseEnter: true
    },
    speed: 4000,
    freeMode: true,
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      1250: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      850: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      550: {
        slidesPerView: 2,
        spaceBetween: 30,
      }
    }
  };

  const sliderData = slideDataArr?.map((element, index) => {
    return (
      <SwiperSlide id={"slide" + index} key={element.username + "_ID"} onMouseEnter={(e) => {
        // onMouseEnter();
      }}
        onMouseLeave={onMouseLeave}
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
            <div>
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

      {/* <GeneralContainerMobile
        fluid
        style={{ padding: 0 }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave} id="MobileView"
      >
        <ContainerMainMobile  >
          <SliderContainerMobile>

            <LinesMobile style={{ backgroundImage: `url(${IMG3.src})` }}></LinesMobile>
            <SliderSectionTitleMobile>
              <TittleAMobile>Experiencias de nuestras </TittleAMobile><TittleBMobile> #AlumnasGonvar</TittleBMobile>

            </SliderSectionTitleMobile>

            <SwiperContainer>
              <Swiper style={{ paddingTop: "50px", paddingBottom: "50px" }} {...settingsMobile} onInit={onInit}>
                {sliderData}
              </Swiper>
            </SwiperContainer>
            <SwiperContainerReduced>
              <Swiper style={{ paddingTop: "50px", paddingBottom: "50px" }} {...settingsMobileReduced} onInit={onInit}>
                {sliderData}
              </Swiper>
            </SwiperContainerReduced>
            <SwiperContainerMoreReduced>
              <Swiper style={{
                paddingTop: "50px",
                paddingBottom: "50px"
              }}
                {...settingsMobileMoreReduced} onInit={onInit}
              >
                {sliderData}
              </Swiper>
            </SwiperContainerMoreReduced>
          </SliderContainerMobile>

          <PeopleContainerMobile>
            <PeopleMobile style={{ backgroundImage: `url(${IMG4.src})` }}>
            </PeopleMobile>
            <BgColorMobile  ></BgColorMobile>
          </PeopleContainerMobile>
        </ContainerMainMobile >
      </GeneralContainerMobile > */}
    </>
  )
}
