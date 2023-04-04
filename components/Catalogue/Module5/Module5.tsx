import React, { useEffect, useRef, useState } from "react";
import { Image, Row } from "react-bootstrap";

import Link from "next/link";
import { useRouter } from "next/router";

import { LOGIN_PATH } from "../../../constants/paths";
import Modal1 from "../Module4/Modal/Modal1";

import { Container } from "react-bootstrap";
import {
  ButtonContain,
  PurpleButton,
  Title,
} from "./Module5.styled";
import { SlideModuleContainer } from "../Module2/Module2.styled";
import { useMediaQuery } from "react-responsive";
import { getUserApi } from "../../api/users";

const Module5 = ({ user, course, isLoading, innerWidth }: any) => {
  const [courses, setCourses] = useState<any>([]);
  let today = new Date().getTime() / 1000;
  const router = useRouter();
  let [counter, setCounter] = useState<any>(0);
  const [show, setShow] = useState(false);
  const [course_1, setCourse] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
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
    if (course) {
      let temp_courses: any = [];
      course.forEach((element: any) => {
        if (element.type == 'Mensual') {
          temp_courses.push(element);
        }
      });
      setCourses(temp_courses);
      setTimeout(() => {
        setLoading(false);
      }, 4500);
    }
  }, [course, isLoading])

  useEffect(() => {
    if (localStorage.getItem("email")) {
      getUserApi(localStorage.getItem("email")).then((res) => {
        setUserData(res);
      })
    }
  }, [])



  return (
    <Container fluid
      style={{ overflow: "hidden", padding: 0, margin: 0 }}>
      {(courses.length > 0) && <>
        <div className={loading ? "skeleton-product" : ""} style={{ 'width': '100%', position: "relative", display: "initial" }}>
          <div className="grey-field" style={{ maxWidth: "fit-content" }}>
            <Title style={{ paddingLeft: responsive1023 ? "30px" : "60px" }}>
              Cursos incluidos en <span>Gonvar+</span>
            </Title>
          </div>
          <div id="scroll-container3" className="scroll-container3" style={{ cursor: "grab", overflow: "scroll", overflowY: "hidden", paddingBlockEnd: "10px" }}
          >
            <div style={{ display: "flex", paddingLeft: responsive1023 ? "30px" : "60px" }} onMouseDown={
              mouseDownHandler}>
              {courses.map((element: any, idx: any) => (
                <div className="grey-field" key={"mod5 " + idx} onClick={(e) => {
                  handleShow();
                  setCourse(element);
                }}>
                  <SlideModuleContainer
                    level={element.difficulty}
                    style={{ flexShrink: 0, width: responsive1023 ? (innerWidth - 10) / 2.25 : (innerWidth - 60) / 5 }}>
                    <Image src={element.image} fluid style={{ borderRadius: "10px", width: "calc(100% - 20px)", marginBottom: "10px", }} />
                    <p className="title">{element.title}</p>
                    <p className="sub">de <span>{element.professors[0]?.name}</span></p>
                    <p className="modules">{element.seasons.length} Módulos</p>
                    <div className="level-container">
                      {(element.difficulty == "Muy Fácil" || element.difficulty == "Fácil") && <img style={{ width: "auto" }} src="../images/Landing/blue.png" alt="" />}
                      {(element.difficulty == "Intermedio") && <img style={{ width: "auto" }} src="../images/Landing/green.png" alt="" />}
                      {(element.difficulty == "Avanzado" || element.difficulty == "Máster") && <img style={{ width: "auto" }} src="../images/Landing/red.png" alt="" />}
                      <p>{element.difficulty}</p>
                    </div>
                  </SlideModuleContainer>
                </div>
              ))}
            </div>
          </div>
          {
            <ButtonContain>
              {(userData && userData.final_date < today) && <Link href={{ pathname: 'Purchase', query: { type: 'subscription' } }}>
                <div className="grey-field" style={{ maxWidth: "fit-content", position: "relative" }}>
                  <PurpleButton>
                    Adquiere Gonvar+
                  </PurpleButton>
                </div>
              </Link>}
              {!userData && <Link href={LOGIN_PATH}>
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
