import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { ICourse, ICourseData, IUserCourse, IUserHistory, IUserProgress } from './ISliders';
import { Image } from "react-bootstrap";
import { Title, Progress, SlideContain, SlideModuleContainer, ButtonContain, ImageContent, Arrows } from './Sliders.styled';
import CourseModal from '../../CourseModal/CourseModal';
import { PurpleButton } from '../Courses.styled';
import Link from 'next/link';
import { LOGIN_PATH } from '../../../constants/paths';
import { useRouter } from 'next/router';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { BsPlayCircle } from 'react-icons/bs';

const Sliders = (props: ICourseData) => {
  const { slideNumber, slideType, innerWidth, allCourses, user } = props;
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
      if (user) {
        if (user.user_history.length > 0) {
          user.user_history.forEach((courses: IUserHistory) => {
            tempCourses.forEach((course: ICourse) => {
              if (course.id === courses.course_id) {
                course.seasons.forEach((season: any, index: number) => {
                  if (season.id === courses.season_id) {
                    course.seasonId = index;
                    season.lessons.forEach((lesson: any, index: number) => {
                      if (lesson.id === courses.lesson_id) {
                        course.lessonId = index;
                      }
                    });
                  }
                });
              }
              if ((course.id === courses.course_id)) {
                if (course.type === "Producto") {
                  user.user_courses.forEach((userCourse: IUserCourse) => {
                    if (userCourse.final_date >= today) {
                      user.user_progress.forEach((progress: IUserProgress) => {
                        if (courses.lesson_id === progress.lessons_id) {
                          course.lessonProgress = progress.time;
                        }
                      });
                      tempShowCourse.push(course)
                    }
                  })
                }
                if (course.type === "Mensual" && user.level === 1) {
                  user.user_progress.forEach((progress: IUserProgress) => {
                    if (courses.lesson_id === progress.lessons_id) {
                      course.lessonProgress = progress.time;
                    }
                  });
                  tempShowCourse.push(course)
                }
              }
            })
          });
        }
      }
      setCourses(tempShowCourse);
      setTexts(tempTexts);
    }
    if (slideType === "my-courses") {
      tempTexts.title = "Tus Cursos";
      tempTexts.spanTitle = "";
      if (user) {
        tempCourses.forEach((course: ICourse) => {
          // if (user.level === 1 && course.type === "Mensual") {
          //   tempShowCourse.push(course);
          // }
          if (user.user_courses.length > 0) {
            user.user_courses.forEach((courses: IUserCourse) => {
              if ((courses.final_date >= today) && (course.id === courses.course_id)) {
                course.days = Math.round((courses.final_date - today) / 86400)
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
        pathname: 'Lesson',
        query: { id: courseData.id, season: courseData.seasonId, lesson: courseData.seasonId },
      });
    }
    if (slideType === "my-courses") {
      router.push({
        pathname: 'Lesson',
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
    getCourseContent();
    // setLoading(false);
    setTimeout(() => {
      setLoading(false);
    }, 300 * slideNumber);
  }, [allCourses])
  useEffect(() => {
    let timeout: any;
    if (start === "left") {
      if (countdown <= innerWidth) {
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
      if (countdown <= innerWidth) {
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
                              </ImageContent>
                          }
                          {
                            slideType === "continue-watching" &&
                            <Progress style={course.lessonProgress == null ? { 'width': 0 } : { 'width': `calc(${course.lessonProgress}% - 20px)` }} />
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
                  (user && user.level === 0) &&
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