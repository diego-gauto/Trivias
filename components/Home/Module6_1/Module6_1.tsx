import React, { useRef, useState } from 'react';
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
  MoreText,
  MoreText_2,
  MoreText_3,
  FooterAText,
  FooterAText_1,
  FooterAText_2,
  FooterAIcons_1,
  FooterBIcons,
  FooterBIcons_1,
  PineappleTextContainer,
} from "./Module6_1.styled";
import {
  MoreTextMobile,
  MoreText_2Mobile,
  MoreText_3Mobile,
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
import Link from "next/link";
import About from "../../AboutModal/About";
import Terms from '../../TermsModal/Terms';
SwiperCore.use([Autoplay]);

export const Module6_1 = (props: IModule6_1) => {
  const swiperRef = useRef<SwiperCore>();
  const { slideData } = props;
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [showTerms, setShowTerms] = useState<boolean>(false);
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
              <Link href="/Preview">
                <MoreText_2>Cursos</MoreText_2>
              </Link>
              <a href="https://gonvarnails.mx/" target="_blank" style={{ textDecoration: "none", fontWeight: 600 }}>
                <MoreText_3>Tienda</MoreText_3>
              </a>
            </MoreText>
          </PeopleContainer>
          <PineappleTextContainer>
            <FooterAText >
              <MoreTextMobile>
                <Link href="/Preview">
                  <MoreText_2Mobile>Cursos</MoreText_2Mobile>
                </Link>
                <a href="https://gonvarnails.mx/" target="_blank" style={{ textDecoration: "none", fontWeight: 600 }}>
                  <MoreText_3Mobile>Tienda</MoreText_3Mobile>
                </a>
              </MoreTextMobile>
              <FooterAText_1 onClick={() => { setShowAbout(true) }}>Aviso de privacidad</FooterAText_1>
              <FooterAText_2>Términos y condiciones</FooterAText_2>
              {/* <FooterAText_3>Políticas de cancelación</FooterAText_3>
              <FooterAText_3>Trabaja con nosotros</FooterAText_3> */}
            </FooterAText>
            <FooterBIcons >
              <div className="content">
                <a href="https://wa.me/5491153137872">
                  <FooterBIcons_1 style={{ backgroundImage: `url(${IMG3.src})` }}></FooterBIcons_1>
                </a>
                <a href="mailto:soporte@gonvar.io">
                  <FooterBIcons_1 style={{ backgroundImage: `url(${IMG4.src})` }}> </FooterBIcons_1>
                </a>
                <a href="https://www.instagram.com/gonvarnails/">
                  <FooterBIcons_1 style={{ backgroundImage: `url(${IMG5.src})` }}> </FooterBIcons_1>
                </a>
                <a href="https://www.facebook.com/GonvarNails">
                  <FooterBIcons_1 style={{ backgroundImage: `url(${IMG6.src})` }}> </FooterBIcons_1>
                </a>
              </div>
              <FooterAIcons_1 style={{ backgroundImage: `url(${IMG2.src})` }}> </FooterAIcons_1>
              <img className="responsive-img" src={IMG2.src} alt="" />
            </FooterBIcons>
          </PineappleTextContainer>
        </ContainerMain >
        <Terms show={showTerms} setShow={setShowTerms} />
        <About show={showAbout} setShow={setShowAbout} />
      </GeneralContainer >
    </>
  )
}
