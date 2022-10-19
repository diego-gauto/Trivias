import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Image, Row } from "react-bootstrap";

import Link from "next/link";
import { useRouter } from "next/router";

import { LOGIN_PATH } from "../../../constants/paths";
import Modal1 from "../Module4/Modal/Modal1";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/scrollbar';
import SwiperCore, { Mousewheel, Scrollbar } from "swiper";

import { Container } from "react-bootstrap";
SwiperCore.use([Scrollbar, Mousewheel]);

import {
  ButtonContain,
  MainContainer,
  PurpleButton,
  Title,
} from "./Module5.styled";
import { SlideModuleContainer } from "../Module2/Module2.styled";

const Module5 = ({ user, course }: any) => {
  const [courses, setCourses] = useState<any>([]);
  let today = new Date().getTime() / 1000;
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [course_1, setCourse] = useState<any>({});
  const swiperRef = useRef<SwiperCore>();

  const onInit = (swiper: SwiperCore) => {
    swiperRef.current = swiper;
  };
  const handleShow = () => {
    setShow(true);
  }

  useEffect(() => {
    if (course) {
      let temp_courses: any = [];
      course.forEach((element: any) => {
        if (element.courseType == 'Mensual') {
          element.courseAbout = element.courseAbout.slice(0, 50);
          element.courseSubtittle = element.courseSubtittle.slice(0, 30);
          element.courseTittle = element.courseTittle.slice(0, 15);
          temp_courses.push(element);
        }
      });
      setCourses(temp_courses);
      setTimeout(() => {

      }, 500);
    }
  }, [course])

  const goTo = (data: any) => {
    if (user) {
      let today = new Date().getTime() / 1000;
      if (data.courseType == 'Mensual' && user.membership.finalDate > today) {
        router.push({
          pathname: 'Lesson',
          query: { id: data.id, season: 0, lesson: 0 },
        });
      }
      if (data.courseType == 'Mensual' && user.membership.finalDate < today) {
        router.push(
          { pathname: 'Purchase', query: { type: 'subscription' } }
        )
      }
    } else {
      router.push(LOGIN_PATH);
    }
  }

  const settings = {
    mousewheel: {
      forceToAxis: true
    },
    slidesPerView: 2,
    freeMode: true,
    spaceBetween: 0,
    breakpoints: {
      1024: {
        slidesPerView: 5,
        spaceBetween: 0,
      },
      300: {
        slidesPerView: 2.25,
        spaceBetween: 0,
      }
    }
  };
  return (
    <MainContainer fluid>
      <Container fluid
        style={{ overflow: "hidden", padding: 0, margin: 0 }}>
        <Title>
          Incluido con Gonvar+
        </Title>
        <Swiper {...settings} onInit={onInit} id="card-container-3">
          {courses.map((element: any, idx: any) => (
            <SwiperSlide key={idx} onClick={() => {
              handleShow();
              setCourse(element);
            }}>
              <SlideModuleContainer>
                <Image src={element.coursePath} fluid style={{ borderRadius: "10px" }} />
              </SlideModuleContainer>
            </SwiperSlide>
          ))}
          <div id="shadow-3" className="right-shadow"></div>
        </Swiper>
        {<ButtonContain>
          {(user && user.membership.finalDate < today) && <Link href={{ pathname: 'Purchase', query: { type: 'subscription' } }}>
            <PurpleButton>
              Adquiere Gonvar+
            </PurpleButton>
          </Link>}
          {!user && <Link href={LOGIN_PATH}>
            <PurpleButton>
              Adquiere Gonvar+
            </PurpleButton>
          </Link>}
        </ButtonContain>}
      </Container>
      <Modal1 show={show} setShow={setShow} course={course_1} user={user} />
    </MainContainer>
  )
}
export default Module5;
