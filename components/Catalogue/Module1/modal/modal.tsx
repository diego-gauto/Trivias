import React, { useEffect, useState } from "react";

import router from "next/router";

import { LOGIN_PATH } from "../../../../constants/paths";
import { PlayIcon, PurpleButton } from "../../Module1/Module1.styled";
import {
  AboutContain,
  BackgroundOverlay,
  ButtonContain,
  Container,
  ContainVideo,
  CourseContain,
  Cross,
  Data,
  Datacontain,
  DataSpan,
  Description,
  EpisodeContain,
  EpisodeInfo,
  EpisodeTime,
  EpisodeTitle,
  ImageBack,
  LessonContain,
  LessonTitle,
  LoaderContain,
  ModalBackground,
  ModalCont,
  ModalContain,
  ModalMod,
  SeasonContain,
  Text,
  TextContainer,
  Title,
  Titles,
  VideoContain,
} from "../../Module3/Modal/Modal1.styled";
import SelectModule4 from "../../Module4/Modal/SelectModule4";
import ReactPlayer from "react-player";
import { getSeason } from "../../../../store/actions/courseActions";
import ModalMaterials from "../../Module4/Modal/ModalMaterials";
import { useMediaQuery } from "react-responsive";

const Modal = ({ show, setShow, course, user }: any) => {
  const handleClose = () => setShow(false);
  const [lessons, setLessons] = useState<any>([])
  const [isPlaying, setIsPlaying] = useState<any>(true);
  const [seasons, setSeasons] = useState<any>([]);
  const [material, setMaterial] = useState(false);
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });

  const handleClick = (value: any) => {
    setLessons(course.seasons[value].lessons)
  };
  const getCurrentSeason = () => {
    getSeason(course.id).then((res) => {
      setSeasons(res);
    })
  }
  const handleShow = () => {
    setMaterial(true);
  }

  const goTo = () => {
    if (user) {
      let today = new Date().getTime() / 1000;
      if (course.courseType == 'Mensual' && user.membership.finalDate > today || course.paid || course.courseType == 'Gratis') {
        router.push({
          pathname: 'Lesson',
          query: { id: course.documentID, season: 0, lesson: 0 },
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
          query: { id: course.id, season: 0, lesson: 0 },
        });
      }
      if (!user && (course.courseType == 'Mensual' || course.courseType == 'Producto')) {
        router.push(LOGIN_PATH);
      }
    }
  }
  useEffect(() => {
    if (Object.values(course).length > 0) {
      setLessons(course.seasons[0]?.lessons);
      getCurrentSeason();
      setIsPlaying(true);
      setTimeout(() => {
        setIsPlaying(false)
      }, 2000)
    }
  }, [course])

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
        /* right swipe */
      } else {
        /* left swipe */
      }
    } else {
      if (yDiff > 0) {
        /* down swipe */
      }
      if (yDiff < -250) {
        /* up swipe */
        handleClose()
      }
    }
  };

  return (
    <ModalContain>
      <ModalMod show={show} onHide={handleClose} size="lg" centered>
        <ModalCont>
          <ModalBackground>
            <ImageBack src={course.coursePath}
              width={1000}
              height={600}
            />
            <BackgroundOverlay />
            <Container>
              <Cross onClick={handleClose}>
                x
              </Cross>
              <TextContainer>
                <ButtonContain>
                  <PurpleButton onClick={goTo}>
                    Reproducir
                    <PlayIcon />
                  </PurpleButton>
                </ButtonContain>
              </TextContainer>
            </Container>
          </ModalBackground>

          <CourseContain>
            <AboutContain>
              <Titles>
                Título del curso:
              </Titles>
              <Text>
                {course.courseTittle}
              </Text>
              <Titles>
                Descripción:
              </Titles>
              <Text>
                {course.coursePhrase}
              </Text>
              <Titles>
                Objetivos:
              </Titles>
              <Text>
                {course.courseAbout}
              </Text>
              {!responsive1023 && <button onClick={handleShow}>Materiales</button>}
            </AboutContain>
            <Datacontain>
              <Data>Instructor(es):
                <DataSpan>
                  {course.courseProfessor?.name}
                </DataSpan>
              </Data>
              <Data>
                Categorías:
                <DataSpan>
                  {course.courseCategory > 1 ? course.courseCategory + '' : course.courseCategory}
                </DataSpan>
              </Data>
              <Data>
                Módulos:
                {course.seasons?.length == 1 && <DataSpan>
                  1 módulo
                </DataSpan>}
                {course.seasons?.length > 1 && <DataSpan>
                  {course.seasons?.length} módulos
                </DataSpan>}
              </Data>
              <Data>
                Tiempo estimado:
                <DataSpan>
                  {hms(course.totalDuration)}
                </DataSpan>
              </Data>
              {responsive1023 && <button onClick={handleShow}>Materiales</button>}
            </Datacontain>
          </CourseContain>
          <LessonContain>
            <SeasonContain>
              <LessonTitle>
                Lista de lecciones
              </LessonTitle>
              <SelectModule4 course={course} handleClick={handleClick} seasons={seasons} />
            </SeasonContain>
            {lessons?.map((lesson: any, index: any) => {
              return (
                <VideoContain key={"lesson " + index}>
                  <ContainVideo>
                    <EpisodeContain className={isPlaying ? "skeleton-product" : ""} >
                      <div className="grey-field" style={{ 'width': '100%', borderRadius: 10 }}>
                        <img src={lesson.image} style={{ width: "100%", height: "100%", borderRadius: 10 }} />
                      </div>
                    </EpisodeContain>
                  </ContainVideo>
                  <EpisodeInfo>
                    <EpisodeTitle>
                      {index + 1}: {lesson.title}
                    </EpisodeTitle>
                    <EpisodeTime>
                      {hms(lesson.duration)}
                    </EpisodeTime>
                    <Description>
                      {lesson.about}
                    </Description>
                  </EpisodeInfo>
                </VideoContain>
              )
            })}
          </LessonContain>
        </ModalCont>
      </ModalMod>
      <ModalMaterials show={material} setShow={setMaterial} materials={course.courseMaterial}></ModalMaterials>
    </ModalContain>
  )
}
export default Modal;