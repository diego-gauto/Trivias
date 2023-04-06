import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { ICourse, ICourseData, IUserCourse } from './ISliders';
import { Image } from "react-bootstrap";
import { Title, Progress, SlideContain, SlideModuleContainer, ButtonContain } from './Sliders.styled';
import CourseModal from '../../CourseModal/CourseModal';
import { PurpleButton } from '../Courses.styled';
import Link from 'next/link';
import { LOGIN_PATH } from '../../../constants/paths';
import { useRouter } from 'next/router';

const Sliders = (props: ICourseData) => {
  const { slideNumber, slideType, innerWidth, allCourses, user } = props;
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  let today = new Date().getTime() / 1000;
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  let [counter, setCounter] = useState<any>(0);
  const [courses, setCourses] = useState<any>([]);
  const [course, setCourse] = useState<any>({});
  const router = useRouter();
  const [texts, setTexts] = useState({
    title: "",
    spanTitle: "",
  })
  const getCourseContent = () => {
    let tempTexts: any = {
      title: "",
      spanTitle: "",
    }
    let tempCourses: any = allCourses;
    let tempShowCourse: any = [];
    if (slideType === "continue-watching") {
      tempTexts.title = "Continua Viendo";
      tempTexts.spanTitle = "";
      setCourses(tempShowCourse);
      setTexts(tempTexts);
    }
    if (slideType === "my-courses") {
      tempTexts.title = "Tus Cursos";
      tempTexts.spanTitle = "";
      if (user) {
        tempCourses.forEach((course: ICourse) => {
          if (user.final_date >= today && course.type === "Mensual") {
            tempShowCourse.push(course);
          }
          if (user.user_courses.length > 0) {
            user.user_courses.forEach((courses: IUserCourse) => {
              if ((courses.final_date >= today) && (course.id === courses.course_id)) {
                tempShowCourse.push(course)
              }
            });
          }
        })
      }
      setCourses(tempShowCourse);
      setTexts(tempTexts);
    }
    if (slideType === "all-courses") {
      tempTexts.title = "Cursos disponibles";
      tempTexts.spanTitle = "";
      tempShowCourse = tempCourses;
      setCourses(tempShowCourse);
      setTexts(tempTexts);
    }
    if (slideType === "product-courses") {
      tempTexts.title = "Cursos especiales ";
      tempTexts.spanTitle = "de pago individual";
      tempCourses.forEach((course: ICourse) => {
        if (course.type === "Producto") {
          tempShowCourse.push(course);
        }
        if (user) {
          user.user_courses.forEach((courses: IUserCourse) => {
            if ((courses.final_date > today) && (course.id === courses.course_id)) {
              course.pay = true;
            }
            else {
              course.pay = false;
            }
          });
        }
        else {
          course.pay = false;
        }

      })
      setCourses(tempShowCourse);
      setTexts(tempTexts);
    }
    if (slideType === "monthly-courses") {
      tempTexts.title = "Cursos incluidos en ";
      tempTexts.spanTitle = "Gonvar+";
      tempCourses.forEach((course: ICourse) => {
        if (course.type === "Mensual") {
          tempShowCourse.push(course);
        }
      })
      setCourses(tempShowCourse);
      setTexts(tempTexts);
    }
  }
  let pos = { top: 0, left: 0, x: 0, y: 0 };
  let slider: any;
  const mouseDownHandler = function (e: any) {
    slider = document.querySelector(`.scroll-container${slideNumber}`) as HTMLElement;
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
  const goTo = (courseData: ICourse) => {
    router.push({
      pathname: 'Lesson',
      query: { id: courseData.id, season: 0, lesson: 0 },
    });
  }
  const openModal = (courseData: ICourse) => {
    if (counter < 2) {
      setShow(true);
    }
    setCounter(0)
    setCourse(courseData);
  }

  useEffect(() => {
    getCourseContent();
    // setLoading(false);
    setTimeout(() => {
      setLoading(false);
    }, 300 * slideNumber);
  }, [allCourses])

  return (
    <>
      {
        courses.length > 0 &&
        <Container fluid style={{ overflow: "hidden", padding: 0, margin: 0 }}>
          <div className={loading ? "skeleton-product" : "reveal-arrows"}>
            <div className="grey-field" style={{ maxWidth: "fit-content" }}>
              <Title>
                {texts.title}<span>{texts.spanTitle}</span>
              </Title>
            </div>
            <SlideContain className={`scroll-slide scroll-container` + slideNumber}>
              <div className="slide-mod" onMouseDown={mouseDownHandler}>
                {
                  courses.map((course: ICourse, index: number) => {
                    return (
                      <div key={"Course_" + index + slideNumber} id="grey-field" className="grey-field"
                        onClick={() => {
                          if (slideType === "continue-watching" || slideType === "my-courses") {
                            goTo(course)
                          }
                          if (slideType === "all-courses" || slideType === "product-courses" || slideType === "monthly-courses") {
                            openModal(course)
                          }
                        }}
                      >
                        <SlideModuleContainer
                          level={course.difficulty}
                          style={{ width: responsive1023 ? (innerWidth - 10) / 2.25 : (innerWidth - 60) / 5 }}
                        >
                          <Image src={course.image} fluid style={{ borderRadius: "10px", width: "calc(100% - 20px)" }} />
                          {
                            slideType === "continue-watching" &&
                            <Progress style={course.progress == null ? { 'width': 0 } : { 'width': `calc(${course.progress}% - 20px)` }} />
                          }
                          <p className="title">{course.title}</p>
                          <p className="sub">de <span>{course.professors[0]?.name}</span></p>
                          <p className="modules">{course.seasons.length} Módulos</p>
                          <div className="level-container">
                            {(course.difficulty == "Muy Fácil" || course.difficulty == "Fácil") && <img style={{ width: "auto" }} src="../images/Landing/blue.png" alt="" />}
                            {(course.difficulty == "Intermedio") && <img style={{ width: "auto" }} src="../images/Landing/green.png" alt="" />}
                            {(course.difficulty == "Avanzado" || course.difficulty == "Máster") && <img style={{ width: "auto" }} src="../images/Landing/red.png" alt="" />}
                            <p>{course.difficulty}</p>
                          </div>
                        </SlideModuleContainer>
                      </div>
                    )
                  })
                }
              </div>
            </SlideContain>
            <div className="line"></div>
            {
              slideType === "monthly-courses" &&
              <ButtonContain>
                {
                  (user && user.final_date < today) &&
                  <Link href={{ pathname: 'Purchase', query: { type: 'subscription' } }}>
                    <div className="grey-field" style={{ maxWidth: "fit-content", position: "relative" }}>
                      <PurpleButton>
                        Adquiere Gonvar+
                      </PurpleButton>
                    </div>
                  </Link>
                }
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
          <CourseModal show={show} setShow={setShow} course={course} user={user} />
        </Container>
      }
    </>

  )
}
export default Sliders;