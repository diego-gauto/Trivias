import React, { useRef } from "react";

import { Container } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { DRY_MANICURE_COURSE_ID, EXPERTS_ESCULTURAL_COURSE_ID, NAILS_MASTER_COURSE_ID, SEP_COURSE_ID } from "../../../constants/gonvar";
import { IModule4_Carousel } from "./IModule4_Carousel";
import { SlideModule } from "./SlideModule/SlideModule";
SwiperCore.use([Autoplay]);

export const Module4_Carousel = (props: IModule4_Carousel) => {
  const swiperRef = useRef<SwiperCore>();
  const responsive768 = useMediaQuery({ query: "(max-width: 784px)" });

  const { isInfinite, slideData, type } = props;
  let slideDataArr = [];
  slideDataArr = slideData;
  if (slideDataArr) {
    if (type == 'subscription') {
      slideDataArr = slideDataArr.filter((course: any) =>
        course.documentID !== NAILS_MASTER_COURSE_ID
        && course.documentID !== EXPERTS_ESCULTURAL_COURSE_ID
        && course.documentID !== DRY_MANICURE_COURSE_ID
        && course.documentID !== SEP_COURSE_ID
      ).map((course: any) => {
        return (
          { isNew: false, title: course.courseTittle, subtitle: "", imgURL: course.coursePath, duration: '' }
        )
      })
    } else {
      slideDataArr = slideDataArr.map((lesson: any) => {
        return (
          { isNew: false, title: lesson.title, subtitle: "", imgURL: lesson.image, duration: lesson.duration }
        )
      })
    }
  }

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
    loop: isInfinite,
    autoplay: {
      delay: 100,
    },
    speed: 7000,
    freeMode: true,
    slidesPerView: 2,
    spaceBetween: 0,
    breakpoints: {
      1024: {
        slidesPerView: 5,
        spaceBetween: 10,
      }
    }
  };

  return (
    <Container
      fluid
      style={{ overflow: "hidden", padding: 0, margin: 0, backgroundColor: "#ede7f2", paddingTop: 40 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {type == 'subscription' ? <h1 style={{ color: "#3F1168", fontSize: "30px", paddingLeft: responsive768 ? '20px' : '80px' }}>Cursos incluidos en <span
        style={{ color: "#A733E4" }}>Gonvar+</span></h1> :
        <h1 style={{ color: "#3F1168", paddingLeft: responsive768 ? '20px' : '80px', fontSize: "30px" }}>Lecciones de <span
          style={{ color: "#A733E4" }}>Nails Master 2.0</span></h1>
      }
      <Swiper {...settings} onInit={onInit}>
        {slideDataArr?.map((element, idx) => (
          <SwiperSlide key={idx}>
            <SlideModule
              isNew={element.isNew}
              title={element.title}
              subtitle={""}
              imgURL={element.imgURL}
              duration={element.duration}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container >
  )
}
