import React, { useEffect, useState } from "react";

import router from "next/router";

import { LOGIN_PATH } from "../../../../constants/paths";
import { PurpleButton } from "../../Module1/Module1.styled";
import {
  AboutContain,
  BackgroundOverlay,
  ButtonContain,
  Container,
  ContainerVideo,
  ContainVideo,
  CourseContain,
  Cross,
  Data,
  Datacontain,
  DataSpan,
  Description,
  DescriptionResp,
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
  Text,
  TextContainer,
  Title,
  Titles,
  VideoContain,
} from "../../Module3/Modal/Modal1.styled";
import SelectModule4 from "./SelectModule4";
import ReactPlayer from "react-player";

const Modal1 = ({ show, setShow, course, user }: any) => {

  const handleClose = () => setShow(false);
  const [lessons, setLessons] = useState<any>([]);
  const [isPlaying, setIsPlaying] = useState<any>(true);
  let today = new Date().getTime() / 1000;

  const handleClick = (value: any) => {
    setLessons(course.seasons[value].lessons);
  };

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
      setLessons(course.seasons[0].lessons);
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
                <Title>
                  {course.courseTittle}
                </Title>
                <ButtonContain>
                  {(course.courseType == 'Producto' && !course.paid) && <PurpleButton onClick={goTo}>
                    Comprar - ${course.coursePrice}.00
                  </PurpleButton>}
                  {(user && course.courseType == 'Mensual' && user.membership.finalDate > today || course.paid || course.courseType == 'Gratis') && <PurpleButton onClick={goTo}>
                    Ver curso
                  </PurpleButton>}
                  {(user && course.courseType == 'Mensual' && user.membership.finalDate < today || !user && course.courseType == 'Mensual') && <PurpleButton onClick={goTo}>
                    Comprar Gonvar +
                  </PurpleButton>}
                </ButtonContain>
              </TextContainer>
            </Container>
          </ModalBackground>

          <CourseContain>
            <AboutContain>
              <Titles>
                Sobre el curso:
              </Titles>
              <Text>
                {course.courseAbout}
              </Text>
            </AboutContain>
            <Datacontain>
              <Data>Profesor(es):
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
                Temporadas:
                {course.seasons?.length == 1 && <DataSpan>
                  1 temporada
                </DataSpan>}
                {course.seasons?.length > 1 && <DataSpan>
                  {course.seasons?.length} temporadas
                </DataSpan>}
              </Data>
              <Data>
                Tiempo estimado:
                <DataSpan>
                  {course.totalDuration}
                </DataSpan>
              </Data>
            </Datacontain>
          </CourseContain>
          <LessonContain>
            <SeasonContain>
              <LessonTitle>
                Lista de lecciones
              </LessonTitle>
              <SelectModule4 course={course} handleClick={handleClick} />
            </SeasonContain>
            {lessons.map((lesson: any, index: any) => {
              return (
                <ContainerVideo>
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
                  <DescriptionResp>
                    {lesson.about}
                  </DescriptionResp>
                </ContainerVideo>
              )
            })}
          </LessonContain>
        </ModalCont>
      </ModalMod>
    </ModalContain >
  )
}
export default Modal1;