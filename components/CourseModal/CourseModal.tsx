import React, { useEffect, useState } from "react";

import { AiFillStar } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
import { Rating } from "react-simple-star-rating";

import router from "next/router";

import { ANUAL_FORM, LESSON_PATH, LOGIN_PATH, NAILS_FORM, NAILS_LANDING_REDIRECT, PLAN_PATH, PROFILE_PATH, PURCHASE_PATH } from "../../constants/paths";
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
  InformationIcon,
  LessonContain,
  LessonTitle,
  ModalBackground,
  ModalCont,
  ModalContain,
  ModalMod,
  SeasonContain,
  TextContainer,
  VideoContain,
} from "./CourseModal.styled";
import { ICourseModal } from "./ICourseModal";
import ModalMaterials from "./Materials/ModalMaterials";
import SelectModule4 from "./Select/SelectModule";

const CourseModal = (props: ICourseModal) => {
  const { show, setShow, course, user } = props;
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
  const goTo = () => {
    if (user) {
      //New condition subscription flow
      if ((course.type === "Mensual" && user.final_date > today) || user.role === 'superAdmin') {
        router.push({
          pathname: LESSON_PATH,
          query: { id: course.id, season: 0, lesson: 0 },
        });
      }
      if (course.type === "Mensual" && user.level === 0 && user.final_date < today) {
        router.push(`${PLAN_PATH}`)
      }
      if ((course.type === "Mensual") && user.role === 'user' && (user.final_date < today && (user.level === 1 || user.level > 2))) {
        router.push(`${PROFILE_PATH}`)
      }
      if (course.type === "Producto" && course.pay) {
        router.push({
          pathname: LESSON_PATH,
          query: { id: course.id, season: 0, lesson: 0 },
        });
      }
      if (course.type === 'Producto' && !course.pay) {
        router.push({ pathname: PURCHASE_PATH, query: { type: 'course', id: course.id } })
      }
    }
    else {
      if (course.type === "Producto") {
        localStorage.setItem("course", `${course.id}`);
      }
      if (course.type === "Mensual") {
        localStorage.setItem("plan", `true`);
      }
      router.push({ pathname: LOGIN_PATH })
    }
  }

  useEffect(() => {
    if (Object.values(course).length > 0) {
      setLessons(course?.seasons[0]?.lessons);
      setIsPlaying(true);
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
            <ImageBack src={course.image}
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
                {course.type == "Producto" && <p className="price">por ${course.price?.toLocaleString('en-US')} <span>MXN</span></p>}
                <button onClick={goTo}>
                  Comenzar ahora
                </button>
              </TextContainer>
            </Container>
          </ModalBackground>
          <CourseContain level={course.difficulty}>
            {!responsive990 && <div className="left">
              <p className="title">{course.title}</p>
              <div className="level-container">
                {(course.difficulty == "Muy Fácil") && <img style={{ width: "auto" }} src="../images/iconoAzul.png" alt="" />}
                {(course.difficulty == "Fácil") && <img style={{ width: "auto" }} src="../images/iconoLila.png" alt="" />}
                {(course.difficulty == "Intermedio") && <img style={{ width: "auto" }} src="../images/iconoNaranja.png" alt="" />}
                {(course.difficulty == "Avanzado") && <img style={{ width: "auto" }} src="../images/iconoVerde.png" alt="" />}
                {(course.difficulty == "Máster") && <img style={{ width: "auto" }} src="../images/iconoRosa.png" alt="" />}
                <div className="difficulty-word">
                  {course.difficulty}
                  <InformationIcon>
                    i
                    <label className="info-box" style={{ left: 210, borderRadius: "10px 10px 10px 0" }}>
                      {course.difficulty === "Muy Fácil" && "Recomendado para personas principiantes"}
                      {course.difficulty === "Fácil" && "Recomendado para personas a partir de 3 meses de experiencia"}
                      {course.difficulty === "Intermedio" && "Recomendado para personas a partir de 6 meses de experiencia"}
                      {course.difficulty === "Avanzado" && "Recomendado para personas a partir de un año de experiencia"}
                      {course.difficulty === "Máster" && "Recomendado para personas a partir de un año de experiencia y con capacitación constante"}
                    </label>
                  </InformationIcon>
                </div>
              </div>
              <p className="time">Duración estimada</p>
              <p className="duration">{hms(course.totalDuration)}</p>
              <button onClick={handleShow}>Materiales</button>
            </div>}
            {responsive990 && <div className="responsive-top-info">
              <div className="left">
                <p className="title">{course.title}.</p>
                <div className="level-container">
                  {(course.difficulty == "Muy Fácil") && <img style={{ width: "auto" }} src="../images/iconoAzul.png" alt="" />}
                  {(course.difficulty == "Fácil") && <img style={{ width: "auto" }} src="../images/iconoLila.png" alt="" />}
                  {(course.difficulty == "Intermedio") && <img style={{ width: "auto" }} src="../images/iconoNaranja.png" alt="" />}
                  {(course.difficulty == "Avanzado") && <img style={{ width: "auto" }} src="../images/iconoVerde.png" alt="" />}
                  {(course.difficulty == "Máster") && <img style={{ width: "auto" }} src="../images/iconoRosa.png" alt="" />}
                  <div className="difficulty-word">
                    {course.difficulty}
                    <InformationIcon>
                      i
                      <label className="info-box">
                        {course.difficulty === "Muy Fácil" && "Recomendado para personas principiantes"}
                        {course.difficulty === "Fácil" && "Recomendado para personas a partir de 3 meses de experiencia"}
                        {course.difficulty === "Intermedio" && "Recomendado para personas a partir de 6 meses de experiencia"}
                        {course.difficulty === "Avanzado" && "Recomendado para personas a partir de un año de experiencia"}
                        {course.difficulty === "Máster" && "Recomendado para personas a partir de un año de experiencia y con capacitación constante"}
                      </label>
                    </InformationIcon>
                  </div>
                </div>
                <div className="professor-container">
                  <img src={course.professors?.length ? (course.professors[0].image ? course.professors[0].image : DEFAULT_PROFESSOR_IMAGE) : DEFAULT_PROFESSOR_IMAGE} alt="" />
                  <p>CONOCE A <span>TU INSTRUCTOR</span> <br />
                    <span className="name">
                      {course.professors?.length > 0 ? course.professors[0].name : "Iker Robles García"}
                    </span>
                    <InformationIcon    >
                      i
                      <label className="info-box">
                        {course.professors?.length > 0 ? (course.professors[0].about ? course.professors[0].about : "Lorem ipsum") : "Lorem ipsum"}
                      </label>
                    </InformationIcon>
                  </p>
                </div>
              </div>
              <div className="right">
                <div className="rating">
                  <p>{course.rating ? (course.rating / 20) : 0} <span className="review-count">({course.reviews})</span></p>
                  <Rating allowHover={false} readonly={true} ratingValue={course.rating ? (course.rating) : 0}
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
                  <p>{course.rating ? (course.rating / 20) : 0} <span className="review-count">({course.reviews})</span></p>
                  <Rating allowHover={false} readonly={true} ratingValue={course.rating ? (course.rating) : 0}
                    emptyColor="#3f1168" emptyIcon={<AiFillStar></AiFillStar>}
                    fullIcon={<AiFillStar></AiFillStar>} fillColor="#ff9b00"></Rating>
                </div>
                <div className="professor-container">
                  <img src={course.professors?.length ? (course.professors[0].image ? course.professors[0].image : DEFAULT_PROFESSOR_IMAGE) : DEFAULT_PROFESSOR_IMAGE} alt="" />
                  <p>CONOCE A <span>TU INSTRUCTOR</span> <br />
                    <span className="name">
                      {
                        course.professors?.length > 0
                          ? <>{course.professors[0].name} </>
                          : <>Iker Robles García</>
                      }
                    </span>
                    <InformationIcon style={{ left: -7 }}>
                      i
                      <label className="info-box">
                        {course.professors?.length > 0 ? (course.professors[0].about ? course.professors[0].about : "Lorem ipsum") : "Lorem ipsum"}
                      </label>
                    </InformationIcon>
                  </p>
                </div>
              </div>}
              <div className="bottom">
                <p>{course.about}</p>
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
            {lessons?.map((lesson: any, index: any) => {
              return (
                <ContainerVideo key={"lesson " + index}>
                  <VideoContain >
                    <ContainVideo>
                      <EpisodeContain className={isPlaying ? "skeleton-product" : ""} >
                        <div className="grey-field" style={{ 'width': '100%', borderRadius: 10 }}>
                          <img src={lesson.banner ? lesson.banner : "/images/admin/Courses/Quiz.PNG"} style={{ width: "100%", height: "100%", borderRadius: 10 }} />
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
      <ModalMaterials
        show={material}
        setShow={setMaterial}
        materials={course.materials}
        route={course.material_route}
      />
    </ModalContain >
  )
}
export default CourseModal;