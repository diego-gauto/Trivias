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
import { useMediaQuery } from "react-responsive";
SwiperCore.use([Scrollbar, Mousewheel]);

const Module4 = ({ user, allCourses, isLoading, innerWidth }: any) => {
  const [show, setShow] = useState(false);
  const [material, setMaterial] = useState(false);
  let [counter, setCounter] = useState<any>(0);
  const [courses, setCourses] = useState<any>([]);
  const [course, setCourse] = useState<any>({});
  const router = useRouter()
  const [userCourses, setUserCourses] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const slider = document.querySelector('.scroll-container2') as HTMLElement;

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const mouseDownHandler = function (e: any) {
    e.preventDefault();
    pos = {
      // The current scroll
      left: slider?.scrollLeft,
      top: slider?.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };


    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = function (e: any) {
    setCounter(counter++);
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    slider.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  const handleShow = () => {
    if (counter < 2) {
      setShow(true);
    }
    setCounter(0)
  }

  useEffect(() => {
    if (user) {
      let date = new Date().getTime() / 1000;
      getPaidCourses(user.id).then((paid) => {
        setUserCourses(paid);
        allCourses.forEach((element: any) => {
          console.log(element);

          element.courseAbout = element.courseAbout
          element.courseSubtittle = element.courseSubtittle
          element.courseTittle = element.courseTittle;
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
        element.courseAbout = element.courseAbout
        element.courseSubtittle = element.courseSubtittle
        element.courseTittle = element.courseTittle
      });
      setCourses(allCourses);
      setTimeout(() => {
        setLoading(false);
      }, 3500);
    }
  }, [user, isLoading])

  return (
    <>
      <Container fluid style={{ overflow: "hidden", padding: 0, margin: 0, paddingLeft: responsive1023 ? "10px" : "20px" }}>
        {courses.length > 0 && <>
          <div className={loading ? "skeleton-product" : ""} style={{ 'width': '100%', position: "relative", display: "initial" }}>
            <div className="grey-field" style={{ maxWidth: "fit-content" }}>
              <Title>
                Cursos disponibles
              </Title>
            </div>
            <div id="scroll-container2" className="scroll-container2" style={{ cursor: "grab", overflow: "scroll", overflowY: "hidden", paddingBlockEnd: "10px" }}
            >
              <div className="scollx" style={{ display: "flex" }} onMouseDown={mouseDownHandler}>
                {courses.map((element: any, idx: any) => (
                  <div className="grey-field" key={"mod4 " + idx} onClick={() => {
                    handleShow();
                    setCourse(element);
                  }}>
                    < SlideModuleContainer style={{ cursor: "grab", flexShrink: 0, width: responsive1023 ? (innerWidth - 10) / 2.25 : (innerWidth - 30) / 5 }}>

                      <Image src={element.coursePath} style={{ borderRadius: "10px", width: "calc(100% - 10px)" }} />

                    </SlideModuleContainer>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>}
      </Container>
      <Modal1 show={show} setShow={setShow} course={course} user={user} />
    </>
  )
}
export default Module4;