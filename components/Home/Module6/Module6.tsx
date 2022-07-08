import { Container, Col, Button, Image, Row } from "react-bootstrap";
import React, { useState, useEffect } from 'react';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Masonry from 'react-masonry-css'
import { AnimatedBackground, ContainerMain, Divisor, SliderContainer, SliderContainerChild } from "./Module6.styled";

import { IModule6 } from "./IModule6";
import { SlideModule } from "./SlideModule/SlideModule";

export const Module6 = (props: IModule6) => {

  const { slideData } = props;
  var slideDataArr = [];
  slideDataArr = slideData;





  var settings = {
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    focusOnSelect: true,
    infinite: true,
    pauseOnFocus: true,
    autoplay: true,
    autoplaySpeed: 1750,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ],
  };

  return (
    <Container>

      <ContainerMain id="MainSliderCentered">
        <div style={{ position: "relative", bottom: "-650px" }}>
          <Slider {...settings} >
            {slideDataArr.map((element) => (
              <div key={element.title + "_ID"}  >
                <SlideModule isNew={element.isNew} title={element.title} subtitle={element.subtitle} imgURL={element.imgURL}></SlideModule>
              </div>
            ))}



          </Slider>
        </div>

        <SliderContainerChild>
          <Divisor>


          </Divisor>
          <AnimatedBackground width="320" height="240" autoPlay muted loop >
            <source src="https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FAnimatedColors.mp4?alt=media&token=94a7f4cc-9efb-4a74-be52-67674970e026" type="video/mp4"></source>
          </AnimatedBackground>


        </SliderContainerChild>
      </ContainerMain >
    </Container>
  )
}
