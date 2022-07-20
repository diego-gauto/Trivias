import { Container, Col, Row, Button, Image } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IModule4_Carousel } from "./IModule4_Carousel";
import { SlideModule } from "./SlideModule/SlideModule";
import React, { Component } from "react";
import Slider from "react-slick";



export const Module4_Carousel = (props: IModule4_Carousel) => {

  const { isInfinite } = props;
  const { slideData } = props;
  var slideDataArr = [];
  slideDataArr = slideData;




  var settings = {
    dots: false,
    infinite: isInfinite,
    speed: 200,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 1750,
    pauseOnFocus: true,
    swipeToSlide: true,

    centerMode: true,
    centerPadding: '40px',
  };
  return (
    <Container fluid style={{ overflow: "hidden" }}>
      <Slider {...settings} >
        {slideDataArr.map((element) => (
          <div key={element.title + "_ID"}  >
            <SlideModule isNew={element.isNew} title={element.title} subtitle={element.subtitle} imgURL={element.imgURL}></SlideModule>
          </div>
        ))}



      </Slider>
    </Container>

  )
}
