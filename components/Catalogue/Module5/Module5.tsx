import React, { useEffect, useRef, useState } from "react";
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
  PurpleButton,
  Title,
} from "./Module5.styled";
import { SlideModuleContainer } from "../Module2/Module2.styled";

const Module5 = ({ user, course, isLoading, firstLoad }: any) => {
  const [courses, setCourses] = useState<any>([]);
  let today = new Date().getTime() / 1000;
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [course_1, setCourse] = useState<any>({});
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      }, 4500);
    }
  }, [course, isLoading])

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
    <Container fluid
      style={{ overflow: "hidden", padding: 0, margin: 0, paddingLeft: '10px' }}>
      {(courses.length > 0) && <>
        <div className={loading ? "skeleton-product" : ""} style={{ 'width': '100%', position: "relative", display: "initial" }}>
          <div className="grey-field" style={{ maxWidth: "fit-content" }}>
            <Title>
              Incluido con Gonvar+
            </Title>
          </div>
          <Swiper {...settings} onInit={onInit} id="card-container-3">
            {courses.map((element: any, idx: any) => (
              <SwiperSlide key={idx} onClick={() => {
                handleShow();
                setCourse(element);
              }}>
                <div className="grey-field" style={{ width: "calc(100% - 10px)" }}>
                  <SlideModuleContainer>
                    <Image src={element.coursePath} fluid style={{ borderRadius: "10px" }} />
                  </SlideModuleContainer>
                </div>
              </SwiperSlide>
            ))}
            <div id="shadow-3" className="right-shadow"></div>
          </Swiper>
          {
            <ButtonContain>
              {(user && user.membership.finalDate < today) && <Link href={{ pathname: 'Purchase', query: { type: 'subscription' } }}>
                <div className="grey-field" style={{ maxWidth: "fit-content", position: "relative" }}>
                  <PurpleButton>
                    Adquiere Gonvar+
                  </PurpleButton>
                </div>
              </Link>}
              {!user && <Link href={LOGIN_PATH}>
                <div className="grey-field" style={{ maxWidth: "fit-content", position: "relative" }}>
                  <PurpleButton>
                    Adquiere Gonvar+
                  </PurpleButton>
                </div>
              </Link>}
            </ButtonContain>
          }
        </div>
      </>}
      <Modal1 show={show} setShow={setShow} course={course_1} user={user} />
    </Container >
  )
}
export default Module5;
