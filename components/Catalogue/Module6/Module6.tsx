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
  const swiperRef = useRef<SwiperCore>();

  const onInit = (swiper: SwiperCore) => {
    swiperRef.current = swiper;
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
            element.courseAbout = element.courseAbout.slice(0, 100);
            element.courseSubtittle = element.courseSubtittle.slice(0, 30);
            element.courseTittle = element.courseTittle.slice(0, 15);
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
          element.courseAbout = element.courseAbout.slice(0, 100);
          element.courseSubtittle = element.courseSubtittle.slice(0, 30);
          element.courseTittle = element.courseTittle.slice(0, 15);
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
      style={{ overflow: "hidden", padding: 0, margin: 0, paddingLeft: responsive1023 ? "10px" : "20px", marginTop: responsive1023 ? "-20px" : "-40px", }}>
      {courses.length > 0 && <>
        <div className={loading ? "skeleton-product" : ""} style={{ 'width': '100%', position: "relative", display: "initial" }}>
          <div className="grey-field" style={{ maxWidth: "fit-content" }}>
            <Title>
              Productos Individuales
            </Title>
          </div>
          <div className="scroll-container" style={{ overflow: "scroll", overflowY: "hidden", paddingBlockEnd: "10px" }}>
            <div style={{ display: "flex" }}>
              {courses.map((element: any, idx: any) => (
                <div className="grey-field" key={idx} onClick={() => {
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
        </div>
      </>}
      <Modal1 show={show} setShow={setShow} course={course} user={user} />
    </Container>

  )
}
export default Module6;