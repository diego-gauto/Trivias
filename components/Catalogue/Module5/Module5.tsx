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
import { useMediaQuery } from "react-responsive";

const Module5 = ({ user, course, isLoading, innerWidth }: any) => {
  const [courses, setCourses] = useState<any>([]);
  let today = new Date().getTime() / 1000;
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [course_1, setCourse] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [mouse, setMouse] = useState(false);
  const swiperRef = useRef<SwiperCore>();
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const slider = document.querySelector('.scroll-container3') as HTMLElement;

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const mouseDownHandler = function (e: any) {
    e.preventDefault();
    pos = {
      // The current scroll
      left: slider.scrollLeft,
      top: slider.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = function (e: any) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    slider.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };
  const handleShow = () => {
    if (!mouse) {
      setShow(true);
    }
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

  return (
    <Container fluid
      style={{ overflow: "hidden", padding: 0, margin: 0, paddingLeft: responsive1023 ? "10px" : "20px" }}>
      {(courses.length > 0) && <>
        <div className={loading ? "skeleton-product" : ""} style={{ 'width': '100%', position: "relative", display: "initial" }}>
          <div className="grey-field" style={{ maxWidth: "fit-content" }}>
            <Title>
              Incluido con Gonvar+
            </Title>
          </div>
          <div id="scroll-container3" className="scroll-container3" style={{ cursor: "grab", overflow: "scroll", overflowY: "hidden", paddingBlockEnd: "10px" }}
          // onScroll={() => {
          //   setMouse(true)
          // }}
          >
            <div style={{ display: "flex" }} onMouseDown={mouseDownHandler}>
              {courses.map((element: any, idx: any) => (
                <div className="grey-field" key={"mod5 " + idx} onClick={(e) => {
                  handleShow();
                  setCourse(element);
                }}>
                  < SlideModuleContainer style={{ flexShrink: 0, width: responsive1023 ? (innerWidth - 10) / 2.25 : (innerWidth - 30) / 5 }}>
                    <SlideModuleContainer>
                      <Image src={element.coursePath} fluid style={{ borderRadius: "10px", width: "calc(100% - 10px)" }} />
                    </SlideModuleContainer>
                  </SlideModuleContainer>
                </div>
              ))}
            </div>
          </div>
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
