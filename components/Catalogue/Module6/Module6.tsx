import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import { Image } from "react-bootstrap";

import { getPaidCourses } from "../../../store/actions/UserActions";
import Modal1 from "../Module4/Modal/Modal1";
import {
  Title,
} from "../Module4/Module4.styled";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/scrollbar';
import SwiperCore, { Mousewheel, Scrollbar } from "swiper";

import { Container } from "react-bootstrap";
import { useMediaQuery } from 'react-responsive';
import { SlideModuleContainer } from "../Module2/Module2.styled";
SwiperCore.use([Scrollbar, Mousewheel]);

const Module6 = ({ user, allCourses, isLoading, innerWidth }: any) => {
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const [show, setShow] = useState(false);
  const [courses, setCourses] = useState<any>([]);
  const [course, setCourse] = useState<any>({});
  const router = useRouter()
  const [userCourses, setUserCourses] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const slider = document.querySelector('.scroll-container5') as HTMLElement;

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
    console.log(pos);


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
    setShow(true);
  }
  useEffect(() => {
    let temp_courses: any = [];
    if (user) {
      let date = new Date().getTime() / 1000;
      getPaidCourses(user.id).then((paid) => {
        setUserCourses(paid);
        allCourses.forEach((element: any) => {
          if (element.courseType == 'Producto') {
            element.courseAbout = element.courseAbout
            element.courseSubtittle = element.courseSubtittle
            element.courseTittle = element.courseTittle
            if (paid.some((x: any) => x.id == element.id && date < x.finalDate)) {
              element.paid = true;
            } else {
              element.paid = false;
            }
            temp_courses.push(element);
          }
        });
        setCourses(temp_courses);
        setTimeout(() => {
          setLoading(false);
        }, 4000);
      })
    } else {
      allCourses.forEach((element: any) => {
        if (element.courseType == 'Producto') {
          element.courseAbout = element.courseAbout
          element.courseSubtittle = element.courseSubtittle
          element.courseTittle = element.courseTittle
          temp_courses.push(element);
        }
      });
      setCourses(temp_courses);
      setTimeout(() => {
        setLoading(false);
      }, 4000);
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
    <Container fluid
      style={{ overflow: "hidden", padding: 0, margin: 0 }}>
      {courses.length > 0 && <>
        <div className={loading ? "skeleton-product" : ""} style={{ 'width': '100%', position: "relative", display: "initial" }}>
          <div className="grey-field" style={{ maxWidth: "fit-content" }}>
            <Title style={{ paddingLeft: responsive1023 ? "30px" : "60px" }}>
              Cursos especiales <span>de pago individual</span>
            </Title>
          </div>
          <div className="scroll-container5" style={{ overflow: "scroll", overflowY: "hidden", paddingBlockEnd: "40px" }}>
            <div style={{ display: "flex", paddingLeft: responsive1023 ? "30px" : "60px" }} onMouseDown={mouseDownHandler}>
              {courses.map((element: any, idx: any) => (
                <div className="grey-field" key={"mod6 " + idx} onClick={() => {
                  handleShow();
                  setCourse(element);
                }}>
                  < SlideModuleContainer
                    level={element.courseDifficulty}
                    style={{ flexShrink: 0, width: responsive1023 ? (innerWidth - 10) / 2.25 : (innerWidth - 60) / 5 }}>
                    <Image src={element.coursePath} style={{ borderRadius: "10px", width: "calc(100% - 20px)", marginBottom: "10px", }} />
                    <p className="title">{element.courseTittle}</p>
                    <p className="sub">de <span>{element.courseProfessor[0]?.name}</span></p>
                    <p className="modules" style={{ color: "#12a071" }}>{element.seasons.length} Módulos</p>
                    <p className="price">$ {element.coursePrice.toLocaleString('en-US')}.°° MXN</p>
                  </SlideModuleContainer>
                </div>
              ))}
            </div>
          </div>
          <div className="line" style={{ marginRight: responsive1023 ? "30px" : "60px" }}></div>
        </div>
      </>}
      <Modal1 show={show} setShow={setShow} course={course} user={user} />
    </Container>

  )
}
export default Module6;