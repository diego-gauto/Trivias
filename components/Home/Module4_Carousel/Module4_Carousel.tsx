import React, { useRef } from 'react';

import { Container } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  DRY_MANICURE_COURSE_ID,
  EXPERTS_ESCULTURAL_COURSE_ID,
  NAILS_MASTER_COURSE_ID,
  SEP_COURSE_ID,
} from '../../../constants/gonvar';
import { IModule4_Carousel } from './IModule4_Carousel';
import { SlideModule } from './SlideModule/SlideModule';
SwiperCore.use([Autoplay]);

export const Module4_Carousel = (props: IModule4_Carousel) => {
  const swiperRef = useRef<SwiperCore>();
  const responsive768 = useMediaQuery({ query: '(max-width: 784px)' });
  const responsive1023 = useMediaQuery({ query: '(max-width: 1023px)' });

  const { isInfinite, slideData, type, title, user, courses } = props;
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
      },
    },
  };

  return (
    <Container
      fluid
      style={{
        overflow: 'hidden',
        padding: 0,
        margin: 0,
        backgroundColor: '#ede7f2',
        paddingTop: 40,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {type == 'subscription' ? (
        <h2
          style={{
            color: '#3F1168',
            fontWeight: 600,
            fontSize: '30px',
            paddingLeft: responsive768 ? '20px' : '80px',
          }}
        >
          Cursos incluidos en <span style={{ color: '#A733E4' }}>Gonvar+</span>
        </h2>
      ) : (
        <h2
          style={{
            color: '#3F1168',
            paddingLeft: responsive768 ? '20px' : '80px',
            fontWeight: 600,
            fontSize: '30px',
          }}
        >
          Lecciones de <span style={{ color: '#A733E4' }}>{title}</span>
        </h2>
      )}
      <Swiper {...settings} onInit={onInit}>
        {slideData?.map((element, idx) => (
          <SwiperSlide key={idx}>
            <SlideModule
              type={type}
              isNew={element.isNew}
              title={element.title}
              subtitle={''}
              level={type === 'subscription' ? element.difficulty : ''}
              imgURL={element.image ? element.image : element.banner}
              number={
                type === 'subscription'
                  ? element.seasons.length
                  : element.number
              }
              professors={element.professors}
              user={user}
              course={type === 'subscription' ? element : ''}
              responsive1023={responsive1023}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};
