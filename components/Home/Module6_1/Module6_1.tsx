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
  Lines,
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
  FooterBIcons_2,
  FooterBIcons_3,
  FooterBIcons_4,
  FooterEnding,
  FooterEndText1,
  GonvarFooterLogo,
  SeparingLine,
  CenterFooterContent,
  LeftFooterContent,
  FooterTextLine,
} from "./Module6_1.styled";
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
} from "./Module6_1Mobile.styled";


import IMG1 from "./MediaSources/FondoPina.png";
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
    slidesPerView: 2,
    spaceBetween: 20,
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
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

          <Line id="line"></Line>
        </SwiperSlide>

      </>
    )
  })

  return (
    <>
      <GeneralContainer
        fluid
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave} id="WebView"
      >
        <ContainerMain  >
          <SliderContainer>

            <SliderSectionTitle>
              <TittleA>Visita nuestra </TittleA><TittleB> tienda</TittleB>

            </SliderSectionTitle>
            <Swiper  {...settings} onInit={onInit}>
              {sliderData}
            </Swiper>
          </SliderContainer>

          <PeopleContainer>
            <People style={{ backgroundImage: `url(${IMG1.src})` }}>
            </People>
            <BgColor  ></BgColor>
          </PeopleContainer>

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
            <FooterBIcons_2 style={{ backgroundImage: `url(${IMG4.src})` }}> </FooterBIcons_2>
            <FooterBIcons_3 style={{ backgroundImage: `url(${IMG5.src})` }}> </FooterBIcons_3>
            <FooterBIcons_4 style={{ backgroundImage: `url(${IMG6.src})` }}> </FooterBIcons_4>
          </FooterBIcons>


          <FooterEnding id="FooterEnding">


            <LeftFooterContent>
              <GonvarFooterLogo style={{ backgroundImage: `url(${IMG7.src})` }}></GonvarFooterLogo>

            </LeftFooterContent>

            <CenterFooterContent>
              <FooterTextLine>
                <tr>
                  <th><FooterEndText1>Copyright © Gonvar Technologies SAPI de CV </FooterEndText1></th>
                  <th><SeparingLine> </SeparingLine></th>
                  <th><FooterEndText1> 2022 </FooterEndText1></th>
                  <th><SeparingLine> </SeparingLine></th>
                  <th><FooterEndText1> Todos los derechos reservados </FooterEndText1></th>
                </tr>
              </FooterTextLine>


            </CenterFooterContent>


          </FooterEnding>
        </ContainerMain >

        <ContainerMain2  ></ContainerMain2>
      </GeneralContainer >
      {/************************************************** */}
      <GeneralContainerMobile
        fluid
        style={{ padding: 0 }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave} id="MobileView"
      >
        <ContainerMainMobile  >
          <SliderContainerMobile>

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
              /* 
            navigation={true}
            modules={[Navigation]} */
              >
                {sliderData}
              </Swiper>
            </SwiperContainerMoreReduced>
          </SliderContainerMobile>

          <PeopleContainerMobile>
            <PeopleMobile style={{ backgroundImage: `url(${IMG1.src})` }}>
            </PeopleMobile>
            <BgColorMobile  ></BgColorMobile>
          </PeopleContainerMobile>
        </ContainerMainMobile >
      </GeneralContainerMobile >
    </>
  )
}
