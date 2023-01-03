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
  FooterComplement,
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


import IMG1 from "./MediaSources/Personas.png";
import IMG8 from "./MediaSources/FondoPina2.png";
import IMG2 from "./MediaSources/Contactenos.png";
import IMG3 from "./MediaSources/LogosFooter1.png";
import IMG4 from "./MediaSources/LogosFooter2.png";
import IMG5 from "./MediaSources/LogosFooter3.png";
import IMG6 from "./MediaSources/LogosFooter4.png";
import IMG7 from "./MediaSources/GonvarFooter.png";

import "swiper/css/navigation";
import { IModule6_1 } from "./IModule6_1";
import { downloadFileWithStoragePath } from "../../../store/actions/LandingActions";
import { SlideModule_1 } from "./SlideModule_1/SlideModule_2";
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
        slidesPerView: 2,
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
        <People style={{ backgroundImage: `url(${IMG1.src})` }}>
        </People>
        <ContainerMain>
          <SliderContainer>

            <SliderSectionTitle>
              <TittleA>Visita nuestra </TittleA><TittleB> tienda</TittleB>

            </SliderSectionTitle>
            <div onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}>
              <Swiper  {...settings} onInit={onInit} >
                {sliderData}
              </Swiper>
            </div>
          </SliderContainer>
          <PeopleContainer>
            <img className="lines" src="../images/Landing/lines.png" alt="" />
            <div className="pineApple">
              <img src="../images/Landing/pineapple.png" alt="" />
              <div className="yellow"></div>
            </div>
            <MoreText>
              <MoreText_1>Trabaja con nosotros</MoreText_1>
              <MoreText_2>Cursos</MoreText_2>
              <MoreText_3>Tienda</MoreText_3>
            </MoreText>
          </PeopleContainer>
          <PineappleTextContainer>
            <FooterAText >
              <MoreTextMobile>
                <MoreText_1Mobile>Trabaja con nosotros</MoreText_1Mobile>
                <MoreText_2Mobile>Cursos</MoreText_2Mobile>
                <MoreText_3Mobile>Tienda</MoreText_3Mobile>
              </MoreTextMobile>
              <FooterAText_1>Aviso de privacidad</FooterAText_1>
              <FooterAText_2>Términos y condiciones</FooterAText_2>
              <FooterAText_3>Políticas de cancelación</FooterAText_3>
            </FooterAText>
            <FooterBIcons >
              <div className="content">
                <FooterBIcons_1 style={{ backgroundImage: `url(${IMG3.src})` }}> </FooterBIcons_1>
                <FooterBIcons_1 style={{ backgroundImage: `url(${IMG4.src})` }}> </FooterBIcons_1>
                <FooterBIcons_1 style={{ backgroundImage: `url(${IMG5.src})` }}> </FooterBIcons_1>
                <FooterBIcons_1 style={{ backgroundImage: `url(${IMG6.src})` }}> </FooterBIcons_1>
              </div>
              <FooterAIcons_1 style={{ backgroundImage: `url(${IMG2.src})` }}> </FooterAIcons_1>
              <img className="responsive-img" src={IMG2.src} alt="" />
            </FooterBIcons>
          </PineappleTextContainer>
        </ContainerMain >
      </GeneralContainer >
    </>
  )
}
