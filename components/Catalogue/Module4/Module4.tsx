import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import { Image, Row } from "react-bootstrap";

import { getPaidCourses } from "../../../store/actions/UserActions";
import Modal1 from "./Modal/Modal1";
import {
  Title,
} from "./Module4.styled";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/scrollbar';
import SwiperCore, { Mousewheel, Scrollbar } from "swiper";

import { Container } from "react-bootstrap";
import { SlideModuleContainer } from "../Module2/Module2.styled";
SwiperCore.use([Scrollbar, Mousewheel]);

const Module4 = ({ user, allCourses, isLoading, setFourthLoad }: any) => {
  const [show, setShow] = useState(false);
  const [courses, setCourses] = useState<any>([]);
  const [course, setCourse] = useState<any>({});
  const router = useRouter()
  const [userCourses, setUserCourses] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef<SwiperCore>();

  const onInit = (swiper: SwiperCore) => {
    swiperRef.current = swiper;
  };
  const handleShow = () => {
    setShow(true);
  }

  useEffect(() => {
    if (user) {
      let date = new Date().getTime() / 1000;
      getPaidCourses(user.id).then((paid) => {
        setUserCourses(paid);
        allCourses.forEach((element: any) => {
          element.courseAbout = element.courseAbout.slice(0, 100);
          element.courseSubtittle = element.courseSubtittle.slice(0, 30);
          element.courseTittle = element.courseTittle.slice(0, 15);
          if (paid.some((x: any) => x.id == element.id && date < x.finalDate)) {
            element.paid = true;
          } else {
            element.paid = false;
          }
        });
        setCourses(allCourses);
        setTimeout(() => {
          setLoading(false);
        }, 3500);
      })
    } else {
      allCourses.forEach((element: any) => {
        element.courseAbout = element.courseAbout.slice(0, 100);
        element.courseSubtittle = element.courseSubtittle.slice(0, 30);
        element.courseTittle = element.courseTittle.slice(0, 15);
      });
      setCourses(allCourses);
      setTimeout(() => {
        setLoading(false);
      }, 3500);
    }
  }, [user, isLoading])

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
    <>
      <Container fluid style={{ overflow: "hidden", padding: 0, margin: 0, paddingLeft: '10px' }}>
        {courses.length > 0 && <>
          <div className={loading ? "skeleton-product" : ""} style={{ 'width': '100%', position: "relative", display: "initial" }}>
            <div className="grey-field" style={{ maxWidth: "fit-content" }}>
              <Title>
                Cursos disponibles
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
              <div id="shadow-2" className="right-shadow"></div>
            </Swiper>

          </div>
        </>}
      </Container>
      <Modal1 show={show} setShow={setShow} course={course} user={user} />
    </>
  )
}
export default Module4;