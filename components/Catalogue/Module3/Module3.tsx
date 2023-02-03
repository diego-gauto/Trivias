import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import { Image } from "react-bootstrap";

import { getPaidCourses } from "../../../store/actions/UserActions";
import {
  Title,
} from "../Module4/Module4.styled";
import {
  Band,
  DaysLeft,
  Maincontainer,
} from "./Module3.styled";
import { ImageContent } from "../Module5/Module5.styled";

import "swiper/css";
import 'swiper/css/scrollbar';
import SwiperCore, { Mousewheel, Scrollbar } from "swiper";

import { Container } from "react-bootstrap";
import { SlideModuleContainer } from "../Module2/Module2.styled";
import { useMediaQuery } from "react-responsive";
SwiperCore.use([Scrollbar, Mousewheel]);

const Module3 = ({ user, allCourses, isLoading, innerWidth }: any) => {
  const [courses, setCourses] = useState<any>([]);
  const [course, setCourse] = useState<any>({});
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const slider = document.querySelector('.scroll-container6') as HTMLElement;

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

  useEffect(() => {
    if (user) {
      let temp_courses: any = [];
      let date = new Date().getTime() / 1000;
      let temp_final_date: any;
      getPaidCourses(user.id).then((paid: any) => {
        allCourses.forEach(async (element: any) => {
          if (paid.some((x: any) => x.id == element.id && date < x.finalDate)) {
            element.paid = true;
            element.courseAbout = element.courseAbout
            element.courseSubtittle = element.courseSubtittle
            element.courseTittle = element.courseTittle
            temp_final_date = paid.find((courePaid: any) => courePaid.id == element.id);
            element.date = Math.ceil((temp_final_date.finalDate - date) / (3600 * 24));
            temp_courses.push(element);
          }
        });
        setCourses(temp_courses);
        setTimeout(() => {
          setLoading(false);
        }, 2500);
      })
    }
  }, [user, isLoading])

  const goTo = (data: any) => {
    let today = new Date().getTime() / 1000;
    if (data.courseType == 'Mensual' && user.membership.finalDate > today || data.paid) {
      router.push({
        pathname: 'Lesson',
        query: { id: data.id, season: 0, lesson: 0 },
      });
    }
    setCourse(data)
  }

  return (
    <Maincontainer>
      {courses.length > 0 && <>
        <div className={loading ? "skeleton-product" : ""} style={{ 'width': '100%', position: "relative", display: "initial" }}>
          <Container fluid
            style={{ overflow: "hidden", padding: 0, margin: 0 }}>
            <div className="grey-field" style={{ maxWidth: "fit-content" }}>
              <Title style={{ paddingLeft: responsive1023 ? "30px" : "60px" }}>
                Tus Cursos
              </Title>
            </div>
            <div className="scroll-container" style={{ overflow: "scroll", overflowY: "hidden", paddingBlockEnd: "40px" }}>
              <div style={{ display: "flex", paddingLeft: responsive1023 ? "30px" : "60px" }}>
                {courses.map((element: any, idx: any) => (
                  <div className="grey-field" key={"mod3 " + idx} onClick={() => { goTo(element) }}>
                    < SlideModuleContainer
                      level={element.courseDifficulty}
                      style={{ flexShrink: 0, width: responsive1023 ? (innerWidth - 10) / 2.25 : (innerWidth - 60) / 5 }}>
                      <ImageContent>
                        <Band />
                        <DaysLeft>{element.date} días</DaysLeft>
                        <Image src={element.coursePath} fluid style={{ borderRadius: "10px", width: "calc(100% - 20px)", marginBottom: "10px", }} />
                      </ImageContent>
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
          </Container>
        </div>
      </>}
    </Maincontainer>
  )
}
export default Module3;