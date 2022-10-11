import React, { useRef } from "react";

import { Container } from "react-bootstrap";

import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { DRY_MANICURE_COURSE_ID, EXPERTS_ESCULTURAL_COURSE_ID, NAILS_MASTER_COURSE_ID, SEP_COURSE_ID } from "../../../constants/gonvar";

import { IModule4_Carousel } from "./IModule4_Carousel";
import { SlideModule } from "./SlideModule/SlideModule";

SwiperCore.use([Autoplay]);

export const Module4_Carousel = (props: IModule4_Carousel) => {
  const swiperRef = useRef<SwiperCore>();

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
      delay: 0,
    },
    speed: 7000,
    freeMode: true,
    slidesPerView: 2,
    spaceBetween: 0,
    breakpoints: {
      1024: {
        slidesPerView: 3.5,
        spaceBetween: 0,
      }
    }
  };

  return (
    <Container
      fluid
      style={{ overflow: "hidden", padding: 0, margin: 0 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Swiper {...settings} onInit={onInit}>
        {slideDataArr?.slice(0, 12).map((element, idx) => (
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
