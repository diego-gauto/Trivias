

import { DocumentData } from "firebase/firestore";
import { Image, Row } from "react-bootstrap";
import router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/scrollbar';
import { getViewedCourses } from "../../../store/actions/courseActions";
import SwiperCore, { Mousewheel, Scrollbar, EffectFlip } from "swiper";
import {
  ContinueText,
  Progress,
  SlideModuleContainer,
} from "./Module2.styled";
import { Container } from "react-bootstrap";
import { LOGIN_PATH } from "../../../constants/paths";
import "swiper/css/effect-flip";
import { useMediaQuery } from "react-responsive";
SwiperCore.use([Scrollbar, Mousewheel, EffectFlip]);

const Module2 = ({ user, allCourses, isLoading, innerWidth }: any) => {
  const [courses, setCourses] = useState<any>([]);
  const swiperRef = useRef<SwiperCore>();
  const [loading, setLoading] = useState(true);
  let today = new Date().getTime() / 1000;
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const slider = document.querySelector('.scroll-container') as HTMLElement;

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

  useEffect(() => {
    if (user) {
      let tempCourses: any = [];
      getViewedCourses(user.id).then((res: any) => {
        res.forEach((element: DocumentData) => {
          let tempCourse;
          if (allCourses.some((x: any) => x.id == element.documentID)) {
            tempCourse = allCourses.filter((x: any) => x.documentID == element.documentID);
            element.coursePath = tempCourse[0].coursePath;
            if (("progress" in tempCourse[0].seasons[element.season].lessons[element.lesson])) {
              element.progress = tempCourse[0].seasons[element.season].lessons[element.lesson].progress.filter((x: any) => x.id == user.id)
              element.progress = element.progress[0]?.time
            }
            tempCourses.push(element)
          }
        });
        setCourses(tempCourses);
        setTimeout(() => {
          setLoading(false)
        }, 1500);
      });
    }
  }, [user, isLoading]);

  const goTo = (course: any) => {
    if (user) {
      if (course.courseType == 'Mensual' && user.membership.finalDate > today || course.paid || course.courseType == 'Gratis') {
        router.push({
          pathname: 'Lesson',
          query: { id: course.documentID, season: course.season, lesson: course.lesson },
        });
      }
      if (course.courseType == 'Mensual' && user.membership.finalDate < today) {
        router.push(
          { pathname: 'Purchase', query: { type: 'subscription' } }
        )
      }
      if (course.courseType == 'Producto' && !course.paid) {
        router.push(
          { pathname: 'Purchase', query: { type: 'course', id: course.documentID } }
        )
      }
    } else {
      if (course.courseType == 'Gratis') {
        router.push({
          pathname: 'Lesson',
          query: { id: course.documentID, season: 0, lesson: 0 },
        });
      }
      if (!user && course.courseType !== 'Gratis') {
        router.push(LOGIN_PATH)
      }
    }
  }



  return (
    <Container fluid style={{
      overflow: "hidden", padding: 0, margin: 0, paddingLeft: responsive1023 ? "10px" : "20px"
    }}
    >
      {(courses.length > 0) && <>
        <div className={loading ? "skeleton-product" : ""} style={{ 'width': '100%', position: "relative", display: "initial" }}>
          <div className="grey-field" style={{ maxWidth: "fit-content", paddingLeft: 20 }}>
            <ContinueText>
              Continua viendo
            </ContinueText>
          </div>
          <div id="scroll-container" className="scroll-container" style={{ overflow: "scroll", overflowY: "hidden", paddingBlockEnd: "10px" }}>
            <div style={{ display: "flex" }} onMouseDown={mouseDownHandler}>
              {courses.map((element: any, idx: any) => (
                <div key={"Mod2 " + idx} id="grey-field" className="grey-field" onClick={() => { goTo(element) }}
                >
                  < SlideModuleContainer style={{ cursor: "grab", flexShrink: 0, width: responsive1023 ? (innerWidth - 10) / 2.25 : (innerWidth - 30) / 5 }}>
                    <Image src={element.coursePath} fluid style={{ borderRadius: "10px", width: "calc(100% - 10px)" }} />
                    <Progress style={element.progress == null ? { 'width': 0 } : { 'width': `calc(${element.progress}% - 10px)` }}></Progress>
                  </SlideModuleContainer>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
      }
    </Container >
  )
}
export default Module2;