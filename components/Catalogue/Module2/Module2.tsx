

import { DocumentData } from "firebase/firestore";
import { Image } from "react-bootstrap";
import router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
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
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { Arrows } from "../Preview.styled";
SwiperCore.use([Scrollbar, Mousewheel, EffectFlip]);

const Module2 = ({ user, allCourses, isLoading, innerWidth, professor }: any) => {
  const [courses, setCourses] = useState<any>([]);
  let [counter, setCounter] = useState<any>(0);
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
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const pushToRight = () => {
    slider.scrollLeft += innerWidth;
  }
  const pushToLeft = () => {
    slider.scrollLeft += -innerWidth;
  }
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
  useEffect(() => {
    if (user) {
      let tempCourses: any = [];
      getViewedCourses(user.id).then((res: any) => {
        res.forEach((element: DocumentData) => {
          let tempCourse;
          if (allCourses.some((x: any) => x.id == element.documentID)) {
            tempCourse = allCourses.filter((x: any) => x.documentID == element.documentID);
            element.coursePath = tempCourse[0].coursePath;
            if (tempCourse[0].seasons[element.season]?.lessons[element.lesson] && ("progress" in tempCourse[0].seasons[element.season].lessons[element.lesson])) {
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
    if (counter < 2) {
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
    setCounter(0)

  }



  return (
    <Container fluid style={{
      overflow: "hidden", padding: 0, margin: 0
    }}
    >
      {(courses.length > 0) && <>
        <div className={loading ? "skeleton-product" : "reveal-arrows"} style={{ 'width': '100%', position: "relative", display: "initial" }}>
          {/* {
            courses.length >= 5 &&
            <div className="arrows">
              <Arrows side="left">
                <MdArrowBackIosNew onClick={pushToLeft} />
              </Arrows>
              <Arrows side="right">
                <MdArrowForwardIos onClick={pushToRight} />
              </Arrows>
            </div>
          } */}
          <div className="grey-field" style={{ maxWidth: "fit-content" }}>
            <ContinueText style={{ paddingLeft: responsive1023 ? "30px" : "60px" }}>
              Continua viendo
            </ContinueText>
          </div>
          <div
            id="scroll-container"
            className="scroll-container"
            style={{ overflow: "scroll", overflowY: "hidden", paddingBlockEnd: "40px" }}
          >
            <div style={{ display: "flex", paddingLeft: responsive1023 ? "30px" : "60px" }} onMouseDown={mouseDownHandler}>
              {courses.map((element: any, idx: any) => (
                <div key={"Mod2 " + idx} id="grey-field" className="grey-field" onClick={() => { goTo(element) }}>
                  < SlideModuleContainer
                    level={element.courseDifficulty}
                    style={{ cursor: "grab", flexShrink: 0, width: responsive1023 ? (innerWidth - 10) / 2.25 : (innerWidth - 60) / 5 }}
                  >
                    <Image src={element.coursePath} fluid style={{ borderRadius: "10px", width: "calc(100% - 20px)" }} />
                    <Progress style={element.progress == null ? { 'width': 0 } : { 'width': `calc(${element.progress}% - 20px)` }}></Progress>
                    <p className="title">{element.courseTittle}</p>
                    <p className="sub">de <span>{element.courseProfessor[0]?.name}</span></p>
                    <p className="modules">{element.seasons.length} Módulos</p>
                    <div className="level-container">
                      {(element.courseDifficulty == "Muy Fácil" || element.courseDifficulty == "Fácil") && <img style={{ width: "auto" }} src="../images/Landing/blue.png" alt="" />}
                      {(element.courseDifficulty == "Intermedio") && <img style={{ width: "auto" }} src="../images/Landing/green.png" alt="" />}
                      {(element.courseDifficulty == "Avanzado" || element.courseDifficulty == "Máster") && <img style={{ width: "auto" }} src="../images/Landing/red.png" alt="" />}
                      <p>{element.courseDifficulty}</p>
                    </div>
                  </SlideModuleContainer>
                </div>
              ))}
            </div>
          </div>
          <div className="line" style={{ marginRight: responsive1023 ? "30px" : "30px" }}></div>
        </div>
      </>
      }
    </Container >
  )
}
export default Module2;