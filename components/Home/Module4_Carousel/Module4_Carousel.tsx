import { Container, Col, Row, Navbar, Button, Image } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IModule4_Carousel } from "./IModule4_Carousel";
import { SlideModule } from "./SlideModule/SlideModule";
import React, { Component } from "react";
import Slider from "react-slick";

import A1 from "./MediaSources/A1.png"
import A2 from "./MediaSources/A2.png"
import A3 from "./MediaSources/A3.png"
import B1 from "./MediaSources/B1.png"
import B2 from "./MediaSources/B2.png"

export const Module4_Carousel = (props: IModule4_Carousel) => {

  const { isInfinite } = props;

  var settings = {
    dots: false,
    infinite: isInfinite,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  return (
    <Container>
      <Slider {...settings}>
        <div>

          <SlideModule isNew={true} title={"Manicure Avanzado"} subtitle={"27 Lecciones"} imgURL={A1.src}></SlideModule>
        </div>
        <div>

          <SlideModule isNew={false} title={"Uñas creativas"} subtitle={"12 Lecciones"} imgURL={A2.src}></SlideModule>
        </div>
        <div>

          <SlideModule isNew={false} title={"Introducción a la Manicure"} subtitle={"10 Lecciones"} imgURL={A3.src}></SlideModule>
        </div>
        <div>

          <SlideModule isNew={true} title={"Introducción a la Manicure 2"} subtitle={"5 Lecciones"} imgURL={A2.src}></SlideModule>
        </div>
        <div>

          <SlideModule isNew={false} title={"Uñas creativas 2"} subtitle={"9 Lecciones"} imgURL={A3.src}></SlideModule>
        </div>
      </Slider>
    </Container>

  )
}
