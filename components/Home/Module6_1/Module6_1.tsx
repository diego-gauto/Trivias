import { Col, Container, Row } from "react-bootstrap";
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
  People,
  BgColor,
  PeopleContainer,
  GeneralContainer,
  ContainerMain2,
  Line,
  MoreText,
  MoreText_1,
  MoreText_2,
  MoreText_3,
  FooterAText,
  FooterAText_1,
  FooterAText_2,
  FooterAText_3,
  FooterAIcons,
  FooterAIcons_1,
  FooterBIcons,
  FooterBIcons_1,
  FooterEnding,
  FooterEndText1,
  GonvarFooterLogo,
  SeparingLine,
  CenterFooterContent,
  LeftFooterContent,
  FooterTextLine,
  PineappleTextContainer,
} from "./Module6_1.styled";
import {
  BgColorMobile,
  CenterFooterContentMobile,
  ContainerMain2Mobile,
  ContainerMainMobile,
  FooterAIconsMobile,
  FooterAIcons_1Mobile,
  FooterATextMobile,
  FooterAText_1Mobile,
  FooterAText_2Mobile,
  FooterAText_3Mobile,
  FooterBIconsMobile,
  FooterBIcons_1Mobile,
  FooterEndingMobile,
  FooterEndText1Mobile,
  FooterTextLineMobile,
  GeneralContainerMobile,
  GonvarFooterLogoMobile,
  LeftFooterContentMobile,
  MoreTextMobile,
  MoreText_1Mobile,
  MoreText_2Mobile,
  MoreText_3Mobile,
  PeopleContainerMobile,
  PeopleMobile,
  SeparingLineMobile,
  SliderContainerMobile,
  SliderSectionTitleMobile,
  SwiperContainer,
  SwiperContainerMoreReduced,
  SwiperContainerReduced,
  TittleAMobile,
  TittleBMobile
} from "./Module6_1Mobile.styled";


import IMG1 from "./MediaSources/FondoPina.png";
import IMG8 from "./MediaSources/FondoPina2.png";
import IMG2 from "./MediaSources/Contactenos.png";
import IMG3 from "./MediaSources/LogosFooter1.png";
import IMG4 from "./MediaSources/LogosFooter2.png";
import IMG5 from "./MediaSources/LogosFooter3.png";
import IMG6 from "./MediaSources/LogosFooter4.png";
import IMG7 from "./MediaSources/GonvarFooter.png";

import "swiper/css/navigation";
//import { Navigation } from "swiper";
import { IModule6_1 } from "./IModule6_1";
import { downloadFileWithStoragePath } from "../../../store/actions/LandingActions";
import { SlideModule_1 } from "./SlideModule_1/SlideModule_2";
import Footer from "../../Footer/Footer";
SwiperCore.use([Autoplay]);

export const Module6_1 = (props: IModule6_1) => {
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
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {

      800: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      450: {
        slidesPerView: 20,
        spaceBetween: 20,
      }
    }
  };

  const sliderData = slideDataArr?.map((element) => {
    return (
      <>
        <SwiperSlide key={element.id + "_ID"}>
          <SliderItemLink >
            <SlideModule_1
              isNew={element.isNew}
              title={element.title}
              precio={element.precio}
              clickURL={element.clickURL}
              disponible={element.disponible}
              currency={element.currency}
              compraRapida={element.compraRapida}
              id={element.id}
              imgURL={downloadFileWithStoragePath(element.imgURL)}
            />
          </SliderItemLink>
        </SwiperSlide>

      </>
    )
  })

  return (
    <>
      <GeneralContainer
        fluid
        id="WebView"
      >
        <ContainerMain>
          <SliderContainer>

            <SliderSectionTitle>
              <TittleA>Visita nuestra </TittleA><TittleB> tienda</TittleB>

            </SliderSectionTitle>
            <div onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}>
              <Swiper  {...settings} onInit={onInit} style={{ paddingBottom: "50px" }}>
                {sliderData}
              </Swiper>
            </div>
          </SliderContainer>

          <PeopleContainer>
            <People style={{ backgroundImage: `url(${IMG1.src})` }}>
            </People>
            <BgColor  ></BgColor>
          </PeopleContainer>

          <PineappleTextContainer>
            <MoreText>
              <MoreText_1>Trabaja con nosotros</MoreText_1>
              <MoreText_2>Cursos</MoreText_2>
              <MoreText_3>Tienda</MoreText_3>
            </MoreText>

            <FooterAText >
              <FooterAText_1>Aviso de privacidad</FooterAText_1>
              <FooterAText_2>Términos y condiciones</FooterAText_2>
              <FooterAText_3>Políticas de cancelación</FooterAText_3>
            </FooterAText>

            <FooterAIcons >
              <FooterAIcons_1 style={{ backgroundImage: `url(${IMG2.src})` }}> </FooterAIcons_1>
            </FooterAIcons>

            <FooterBIcons >
              <FooterBIcons_1 style={{ backgroundImage: `url(${IMG3.src})` }}> </FooterBIcons_1>
              <FooterBIcons_1 style={{ backgroundImage: `url(${IMG4.src})` }}> </FooterBIcons_1>
              <FooterBIcons_1 style={{ backgroundImage: `url(${IMG5.src})` }}> </FooterBIcons_1>
              <FooterBIcons_1 style={{ backgroundImage: `url(${IMG6.src})` }}> </FooterBIcons_1>
            </FooterBIcons>

          </PineappleTextContainer>
        </ContainerMain >

        <ContainerMain2  ></ContainerMain2>
      </GeneralContainer >
      {/************************************************** */}
      <GeneralContainerMobile
        fluid
        style={{ padding: 0 }}
        id="MobileView"
      >
        <ContainerMainMobile  >
          {/* <SliderContainerMobile>

            <SliderSectionTitleMobile>
              <TittleAMobile>Visita nuestra </TittleAMobile><TittleBMobile> tienda</TittleBMobile>

            </SliderSectionTitleMobile>

            <SwiperContainer>
              <Swiper style={{}} {...settingsMobile} onInit={onInit}>
                {sliderData}
              </Swiper>
            </SwiperContainer>
            <SwiperContainerReduced>
              <Swiper style={{}} {...settingsMobileReduced} onInit={onInit}>
                {sliderData}
              </Swiper>
            </SwiperContainerReduced>
            <SwiperContainerMoreReduced>
              <Swiper style={{}}
                {...settingsMobileMoreReduced} onInit={onInit}
              >
                {sliderData}
              </Swiper>
            </SwiperContainerMoreReduced>
          </SliderContainerMobile>
          */}

          <PeopleContainerMobile>
            <PeopleMobile style={{ backgroundImage: `url(${IMG8.src})` }}>
            </PeopleMobile>
            <BgColorMobile  ></BgColorMobile>
          </PeopleContainerMobile>


          <MoreTextMobile>
            <MoreText_1Mobile>Trabaja con nosotros</MoreText_1Mobile>
            <MoreText_2Mobile>Cursos</MoreText_2Mobile>
            <MoreText_3Mobile>Tienda</MoreText_3Mobile>
          </MoreTextMobile>

          <FooterATextMobile >
            <FooterAText_1Mobile>Aviso de privacidad</FooterAText_1Mobile>
            <FooterAText_2Mobile>Términos y condiciones</FooterAText_2Mobile>
            <FooterAText_3Mobile>Políticas de cancelación</FooterAText_3Mobile>
          </FooterATextMobile>

          <FooterAIconsMobile >
            <FooterAIcons_1Mobile style={{ backgroundImage: `url(${IMG2.src})` }}> </FooterAIcons_1Mobile>
          </FooterAIconsMobile>

          <FooterBIconsMobile >
            <FooterBIcons_1Mobile style={{ backgroundImage: `url(${IMG3.src})` }}> </FooterBIcons_1Mobile>
            <FooterBIcons_1Mobile style={{ backgroundImage: `url(${IMG4.src})` }}> </FooterBIcons_1Mobile>
            <FooterBIcons_1Mobile style={{ backgroundImage: `url(${IMG5.src})` }}> </FooterBIcons_1Mobile>
            <FooterBIcons_1Mobile style={{ backgroundImage: `url(${IMG6.src})` }}> </FooterBIcons_1Mobile>
          </FooterBIconsMobile>
        </ContainerMainMobile >

        <ContainerMain2Mobile  ></ContainerMain2Mobile>
      </GeneralContainerMobile >
    </>
  )
}
