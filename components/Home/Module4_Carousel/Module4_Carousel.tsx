import { Container, Col, Row, Button, Image } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IModule4_Carousel } from "./IModule4_Carousel";
import { SlideModule } from "./SlideModule/SlideModule";
import React, { Component } from "react";
import Slider, { Settings } from "react-slick";

export const Module4_Carousel = (props: IModule4_Carousel) => {
  const { isInfinite } = props;
  const { slideData } = props;
  let slideDataArr = [];
  slideDataArr = slideData;

  const settings: Settings = {
    infinite: isInfinite,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    swipeToSlide: true,
    pauseOnHover: true,
    touchThreshold: 5000,
  };

  return (
    <Container fluid style={{ overflow: "hidden" }}>
      <Slider {...settings}>
        {slideDataArr.map((element) => (
          <div key={element.title + "_ID"}  >
            <SlideModule isNew={element.isNew} title={element.title} subtitle={element.subtitle} imgURL={element.imgURL}></SlideModule>
          </div>
        ))}
      </Slider>
    </Container>

  )
}
