import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { ICourse, ICourseData } from './ISliders';
import { Image } from "react-bootstrap";
import { Title, Progress, SlideContain, SlideModuleContainer, ButtonContain, ImageContent, Arrows } from './Sliders.styled';
import CourseModal from '../../Modals/CourseModal/CourseModal';
import { PurpleButton } from '../Courses.styled';
import Link from 'next/link';
import { ANUAL_FORM, LESSON_PATH, LOGIN_PATH, PLAN_PATH, PURCHASE_PATH } from '../../../constants/paths';
import { useRouter } from 'next/router';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { BsPlayCircle } from 'react-icons/bs';

const Sliders = (props: ICourseData) => {
  const { slideNumber, slideType, innerWidth, allCourses, user, containLoader } = props;
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [countdown, setCountdown] = useState(0);
  const [start, setStart] = useState("");
  let today = new Date().getTime() / 1000;
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  let [counter, setCounter] = useState<any>(0);
  const [courses, setCourses] = useState<any>([]);
  const [course, setCourse] = useState<any>({});
  const router = useRouter();
  const GonvarLogo = "../images/purchase/logo.png";
  const sendTo = () => {
    if (user && user.level === 0 && user.final_date < today) {
      router.push({
        pathname: PLAN_PATH
      })
    }
    else {
      localStorage.setItem("plan", "true");
      router.push({
        pathname: LOGIN_PATH
      })
    }
  }
  const [texts, setTexts] = useState({
    title: "",
    spanTitle: "",
    spanAditional: "",
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
      setCourses(tempCourses.continue_watching);
      setTexts(tempTexts);
    }
    if (slideType === "free-courses") {
      tempTexts.title = "Cursos Gratis";
      tempTexts.spanTitle = "";
      setCourses(tempCourses.free_courses);
      setTexts(tempTexts);
    }
    if (slideType === "art-courses") {
      tempTexts.title = "Cursos de Arte en Uñas, ";
      tempTexts.spanAditional = "Incluídos en "
      tempTexts.spanTitle = "";
      setCourses(tempCourses.art_courses);
      setTexts(tempTexts);
    }
    if (slideType === "structure-courses") {
      tempTexts.title = "Cursos de Estructura en Uñas, ";
      tempTexts.spanAditional = "Incluídos en "
      tempTexts.spanTitle = "";
      setCourses(tempCourses.structure_courses);
      setTexts(tempTexts);
    }
    if (slideType === "makeup-courses") {
      tempTexts.title = "Cursos de Maquillaje, ";
      tempTexts.spanAditional = "Incluídos en "
      tempTexts.spanTitle = "";
      setCourses(tempCourses.makeup_courses);
      setTexts(tempTexts);
    }
    if (slideType === "product-courses") {
      tempTexts.title = "Cursos especiales ";
      tempTexts.spanTitle = "de pago individual";
      setCourses(tempCourses.product_courses);
      setTexts(tempTexts);
    }
    if (slideType === "special-courses") {
      tempTexts.title = "Certificaciones ";
      tempTexts.spanTitle = "";
      // setCourses(tempCourses.special_courses);
      setTexts(tempTexts);
    }
  }
  let pos = { top: 0, left: 0, x: 0, y: 0 };
  let slider: any = document.querySelector(`.scroll-container${slideNumber}`) as HTMLElement;
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
  const goTo = (courseData: ICourse) => {
    if (slideType === "continue-watching") {
      router.push({
        pathname: LESSON_PATH,
        query: { id: courseData.id, season: courseData.currentSeason, lesson: courseData.currentLesson },
      });
    }
    if (slideType === "free-courses") {
      router.push({
        pathname: LESSON_PATH,
        query: { id: courseData.id, season: 0, lesson: 0 },
      });
    }
  }
  const openModal = (courseData: ICourse) => {
    if (counter < 2) {
      setShow(true);
    }
    setCounter(0)
    setCourse(courseData);
  }
  useEffect(() => {
    if (!containLoader) {
      getCourseContent();
      // setLoading(false);
      setTimeout(() => {
        setLoading(false);
      }, 300 * slideNumber);
    }
  }, [allCourses, containLoader])
  useEffect(() => {
    let timeout: any;
    if (start === "left") {
      if (countdown < innerWidth - 50) {
        timeout = setTimeout(() => {
          setCountdown(countdown + 5);
          --slider.scrollLeft;
          --slider.scrollLeft;
          --slider.scrollLeft;
          --slider.scrollLeft;
          --slider.scrollLeft;

        }, 10);
        return () => clearTimeout(timeout);
      }
    }
    if (start === "right") {
      if (countdown < innerWidth - 50) {
        timeout = setTimeout(() => {
          setCountdown(countdown + 5);
          ++slider.scrollLeft;
          ++slider.scrollLeft;
          ++slider.scrollLeft;
          ++slider.scrollLeft;
          ++slider.scrollLeft;
        }, 10);
        return () => clearTimeout(timeout);
      }
    }
    return
  }, [start, countdown]);
  return (
    <>
      {
        courses.length > 0 &&
        <Container fluid style={{ overflow: "hidden", padding: 0, margin: 0 }}>
          <div className={loading ? "skeleton-product" : "reveal-arrows"}>
            {
              courses.length >= 5 &&
              <div className="arrows">
                <Arrows side="left">
                  <MdArrowBackIosNew onClick={() => { setStart("left"); setCountdown(0) }} />
                </Arrows>
                <Arrows side="right">
                  <MdArrowForwardIos onClick={() => { setStart("right"); setCountdown(0) }} />
                </Arrows>
              </div>
            }
            <div className="grey-field" style={{ maxWidth: "fit-content" }}>
              <Title>
                {texts.title}{texts.spanAditional !== '' && <span className='span-additional'>{texts.spanAditional}</span>}<span className='span-title'>{texts.spanTitle}</span>
                {
                  (slideType === "art-courses" || slideType === "structure-courses" || slideType === "makeup-courses") &&
                  <img className='gonvar-logo' src={GonvarLogo} />
                }
              </Title>
            </div>
            <SlideContain className={`scroll-slide scroll-container` + slideNumber}>
              <div className="slide-mod" onMouseDown={mouseDownHandler}>
                {
                  courses.map((course: ICourse, index: number) => {
                    return (
                      <div key={"Course_" + index + slideNumber} id="grey-field" className="grey-field"
                        onClick={() => {
                          if (slideType === "continue-watching" || slideType === "free-courses") {
                            goTo(course)
                          }
                          if (slideType === "art-courses" || slideType === "product-courses" || slideType === "structure-courses" || slideType === "makeup-courses") {
                            openModal(course)
                          }
                        }}
                      >
                        <SlideModuleContainer
                          level={course.difficulty}
                          style={{ width: responsive1023 ? (innerWidth - 10) / 2.25 : (innerWidth - 60) / 5 }}
                        >
                          {
                            slideType === "my-courses" ?
                              <ImageContent>
                                {
                                  course.type === "Producto" &&
                                  <>
                                    <i className="band" />
                                    <div className="days-left">{course.days} días</div>
                                  </>
                                }

                                <Image src={course.image} fluid style={{ borderRadius: "10px", width: "calc(100% - 20px)", marginBottom: "10px", }} />
                              </ImageContent>
                              :
                              <ImageContent>
                                {
                                  slideType === "continue-watching" &&
                                  <BsPlayCircle className="play-icon" />
                                }
                                <Image src={course.image} fluid style={{ borderRadius: "10px", width: "calc(100% - 20px)" }} />
                                {
                                  slideType === "continue-watching" &&
                                  <Progress style={course.lessonProgress == null ? { 'width': 0 } : { 'width': `calc(${course.lessonProgress}% - 20px)` }} />
                                }
                              </ImageContent>
                          }


                          <p className="title">{course.title}</p>
                          <p className="sub">de <span>{course.professors[0]?.name}</span></p>
                          <p className="modules">{course.seasons.length} Módulos</p>
                          <div className="level-container">
                            {(course.difficulty == "Muy Fácil") && <img style={{ width: "auto" }} src="../images/iconoAzul.png" alt="" />}
                            {(course.difficulty == "Fácil") && <img style={{ width: "auto" }} src="../images/iconoLila.png" alt="" />}
                            {(course.difficulty == "Intermedio") && <img style={{ width: "auto" }} src="../images/iconoNaranja.png" alt="" />}
                            {(course.difficulty == "Avanzado") && <img style={{ width: "auto" }} src="../images/iconoVerde.png" alt="" />}
                            {(course.difficulty == "Máster") && <img style={{ width: "auto" }} src="../images/iconoRosa.png" alt="" />}
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
              slideType === "makeup-courses" &&
              <ButtonContain>
                {
                  (user && user.level === 0 && user.final_date < today) &&
                  // <Link href={{ pathname: PLAN_PATH }}>
                  <div className="grey-field" style={{ maxWidth: "fit-content", position: "relative" }} onClick={sendTo}>
                    <PurpleButton>
                      Adquiere Gonvar+
                    </PurpleButton>
                  </div>
                  // </Link>
                }
                {!user &&
                  <div className="grey-field" style={{ maxWidth: "fit-content", position: "relative" }} onClick={sendTo}>
                    <PurpleButton>
                      Adquiere Gonvar+
                    </PurpleButton>
                  </div>}
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