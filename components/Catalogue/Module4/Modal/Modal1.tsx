import React, { useEffect, useState } from "react";
import router from "next/router";

import { LOGIN_PATH } from "../../../../constants/paths";
import { PurpleButton } from "../../Module1/Module1.styled";
import {
  Container,
  ContainerVideo,
  ContainVideo,
  CourseContain,
  Cross,
  Description,
  EpisodeContain,
  EpisodeInfo,
  EpisodeTime,
  EpisodeTitle,
  ImageBack,
  LessonContain,
  LessonTitle,
  ModalBackground,
  ModalCont,
  ModalContain,
  ModalMod,
  SeasonContain,
  TextContainer,
  VideoContain,
} from "../../Module3/Modal/Modal1.styled";
import SelectModule4 from "./SelectModule4";
import { getSeason } from "../../../../store/actions/courseActions";
import ModalMaterials from "./ModalMaterials";
import { useMediaQuery } from "react-responsive";
import { Rating } from 'react-simple-star-rating'
import { AiFillStar } from "react-icons/ai";

const Modal1 = ({ show, setShow, course, user }: any) => {
  const [material, setMaterial] = useState(false);
  const handleClose = () => setShow(false);
  const [lessons, setLessons] = useState<any>([]);
  const [isPlaying, setIsPlaying] = useState<any>(true);
  const [seasons, setSeasons] = useState<any>([]);
  const responsive990 = useMediaQuery({ query: "(max-width: 990px)" });
  const DEFAULT_PROFESSOR_IMAGE = "/images/teachers/iker.jpg";
  let today = new Date().getTime() / 1000;
  const handleClick = (value: any) => {
    setLessons(course.seasons[value].lessons);
  };
  const handleShow = () => {
    setMaterial(true);
  }
  const getCurrentSeason = () => {
    getSeason(course.id).then((res) => {
      setSeasons(res);
    })
  }

  const goTo = () => {
    if (user) {
      if (course.courseType == 'Mensual' && user.membership.finalDate > today || course.paid || course.courseType == 'Gratis') {
        router.push({
          pathname: 'Lesson',
          query: { id: course.id, season: 0, lesson: 0 },
        });
      }
      if (course.courseType == 'Mensual' && user.membership.finalDate < today) {
        router.push(
          { pathname: 'Purchase', query: { type: 'subscription' } }
        )
      }
      if (course.courseType == 'Producto' && !course.paid) {
        router.push(
          { pathname: 'Purchase', query: { type: 'course', id: course.id } }
        )
      }
    } else {
      if (course.courseType == 'Gratis') {
        router.push({
          pathname: 'Lesson',
          query: { id: course.id, season: 0, lesson: 0 },
        });
      }
      if (!user && course.courseType !== 'Gratis') {
        router.push(LOGIN_PATH)
      }
    }
  }

  useEffect(() => {
    if (Object.values(course).length > 0) {
      setLessons(course?.seasons[0]?.lessons);
      setIsPlaying(true);
      getCurrentSeason();
      setTimeout(() => {
        setIsPlaying(false)
      }, 2000)
    }
  }, [course]);

  const hms = (totalSeconds: any) => {
    if (typeof totalSeconds == 'string') return totalSeconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    let result = `${minutes
      .toString()
      .padStart(1, '0')} min`;
    if (!!hours) {
      result = `${hours.toString()} hr ${minutes} min`;
    }
    return result;
  }

  var xDown: any = null;
  var yDown: any = null;
  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);
  function getTouches(evt: any) {
    return evt.touches ||             // browser API
      evt.originalEvent.touches; // jQuery
  }
  function handleTouchStart(evt: any) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };
  function handleTouchMove(evt: any) {
    if (!xDown || !yDown) {
      return;
    }
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
      if (xDiff > 0) {
      }
    } else {
      if (yDiff < -250) {
        handleClose()
      }
    }
  };
  return (
    <ModalContain >
      <ModalMod show={show} onHide={handleClose} size="lg" centered>
        <ModalCont >
          <ModalBackground>
            <ImageBack src={course.coursePath}
              width={1000}
              height={600}
            />
            <Container>
              <div className="top">
                <div className="tag">NAILS <span>ACADEMY</span></div>
                <Cross onClick={handleClose}>
                  x
                </Cross>
              </div>
              <TextContainer>
                {/* <p className="course">CURSO</p>
                <p className="title">{course.courseTittle}</p> */}
                {course.courseType == "Producto" && <p className="price">por ${course.coursePrice?.toLocaleString('en-US')} <span>MXN</span></p>}
                <button onClick={goTo}>
                  Comenzar ahora
                </button>
              </TextContainer>
            </Container>
          </ModalBackground>
          <CourseContain level={course.courseDifficulty}>
            {!responsive990 && <div className="left">
              <p className="title">{course.courseTittle}.</p>
              <div className="level-container">
                {(course.courseDifficulty == "Muy Fácil" || course.courseDifficulty == "Fácil") && <img style={{ width: "auto" }} src="../images/Landing/blue.png" alt="" />}
                {(course.courseDifficulty == "Intermedio") && <img style={{ width: "auto" }} src="../images/Landing/green.png" alt="" />}
                {(course.courseDifficulty == "Avanzado" || course.courseDifficulty == "Máster") && <img style={{ width: "auto" }} src="../images/Landing/red.png" alt="" />}
                <p>{course.courseDifficulty}</p>
              </div>
              <p className="time">Duración estimada</p>
              <p className="duration">{hms(course.totalDuration)}</p>
              <button onClick={handleShow}>Materiales</button>
            </div>}
            {responsive990 && <div className="responsive-top-info">
              <div className="left">
                <p className="title">{course.courseTittle}.</p>
                <div className="level-container">
                  {(course.courseDifficulty == "Muy Fácil" || course.courseDifficulty == "Fácil") && <img style={{ width: "auto" }} src="../images/Landing/blue.png" alt="" />}
                  {(course.courseDifficulty == "Intermedio") && <img style={{ width: "auto" }} src="../images/Landing/green.png" alt="" />}
                  {(course.courseDifficulty == "Avanzado" || course.courseDifficulty == "Máster") && <img style={{ width: "auto" }} src="../images/Landing/red.png" alt="" />}
                  <p>{course.courseDifficulty}</p>
                </div>
                <div className="professor-container">
                  <img src={course.courseProfessor?.length ? (course.courseProfessor[0].path ? course.courseProfessor[0].path : DEFAULT_PROFESSOR_IMAGE) : DEFAULT_PROFESSOR_IMAGE} alt="" />
                  <p>CONOCE A <span>TU INSTRUCTOR</span> <br />
                    <span className="name">{course.courseProfessor?.length > 0 ? course.courseProfessor[0].name : "Iker Robles García"}</span></p>
                </div>
              </div>
              <div className="right">
                <div className="rating">
                  <p>{course.courseRating ? (course.courseRating / 20) : 0}</p>
                  <Rating allowHover={false} readonly={true} ratingValue={course.courseRating ? (course.courseRating) : 0}
                    emptyColor="#3f1168" emptyIcon={<AiFillStar></AiFillStar>}
                    fullIcon={<AiFillStar></AiFillStar>} fillColor="#ff9b00"></Rating>
                </div>
                <p className="time">Duración estimada</p>
                <p className="duration">{hms(course.totalDuration)}</p>
                <button onClick={handleShow}>Materiales</button>
              </div>
            </div>}
            <div className="right">
              {!responsive990 && <div className="top">
                <div className="rating">
                  <p>{course.courseRating ? (course.courseRating / 20) : 0}</p>
                  <Rating allowHover={false} readonly={true} ratingValue={course.courseRating ? (course.courseRating) : 0}
                    emptyColor="#3f1168" emptyIcon={<AiFillStar></AiFillStar>}
                    fullIcon={<AiFillStar></AiFillStar>} fillColor="#ff9b00"></Rating>
                </div>
                <div className="professor-container">
                  <img src={course.courseProfessor?.length ? (course.courseProfessor[0].path ? course.courseProfessor[0].path : DEFAULT_PROFESSOR_IMAGE) : DEFAULT_PROFESSOR_IMAGE} alt="" />
                  <p>CONOCE A <span>TU INSTRUCTOR</span> <br />
                    <span className="name">{course.courseProfessor?.length > 0 ? course.courseProfessor[0].name : "Iker Robles García"}</span></p>
                </div>
              </div>}
              <div className="bottom">
                <p>{course.courseAbout}</p>
              </div>
            </div>
          </CourseContain>
          <LessonContain>
            <SeasonContain>
              <LessonTitle>
                Lista de <span>lecciones</span>
              </LessonTitle>
              {
                !isPlaying &&
                <SelectModule4 course={course} handleClick={handleClick} seasons={seasons} />
              }
            </SeasonContain>
            {lessons.map((lesson: any, index: any) => {
              return (
                <ContainerVideo key={"lesson " + index}>
                  <VideoContain >
                    <ContainVideo>
                      <EpisodeContain className={isPlaying ? "skeleton-product" : ""} >
                        <div className="grey-field" style={{ 'width': '100%', borderRadius: 10 }}>
                          <img src={lesson.image ? lesson.image : "/images/admin/Courses/Quiz.PNG"} style={{ width: "100%", height: "100%", borderRadius: 10 }} />
                        </div>
                      </EpisodeContain>
                    </ContainVideo>
                    <EpisodeInfo>
                      {"mandatory" in lesson ? <EpisodeTitle>
                        Quiz: {lesson.title}
                      </EpisodeTitle> :
                        <EpisodeTitle>
                          Lección {index + 1}
                        </EpisodeTitle>}
                      <Description>
                        {lesson.title}
                      </Description>
                      {!("mandatory" in lesson) &&
                        <EpisodeTime>
                          {hms(lesson.duration)}.
                        </EpisodeTime>}
                    </EpisodeInfo>
                  </VideoContain>
                </ContainerVideo>
              )
            })}
          </LessonContain>
        </ModalCont>
      </ModalMod>
      <ModalMaterials show={material} setShow={setMaterial} materials={course.courseMaterial}></ModalMaterials>
    </ModalContain >
  )
}
export default Modal1;