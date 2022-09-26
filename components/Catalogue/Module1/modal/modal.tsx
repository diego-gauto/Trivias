import React, { useEffect, useState } from "react";

import router from "next/router";

import { LOGIN_PATH } from "../../../../constants/paths";
import { PlayIcon, PurpleButton } from "../../Module1/Module1.styled";
import {
  AboutContain,
  BackgroundOverlay,
  ButtonContain,
  CardImageUnlock,
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
  ModalBackground,
  ModalCont,
  ModalContain,
  ModalMod,
  SeasonContain,
  SubTitle,
  Text,
  TextContainer,
  Title,
  Titles,
  VideoContain,
} from "../../Module3/Modal/Modal1.styled";
import SelectModule4 from "../../Module4/Modal/SelectModule4";

const Modal = ({ show, setShow, course, user }: any) => {
  const handleClose = () => setShow(false);
  const [lessons, setLessons] = useState<any>([])

  const handleClick = (value: any) => {
    setLessons(course.seasons[value].lessons)
  };

  const goTo = () => {
    if (user) {
      let today = new Date().getTime() / 1000;
      if (course.courseType == 'Mensual' && user.membership.finalDate > today || course.paid || course.courseType == 'Gratis') {
        router.push({
          pathname: 'Lesson',
          query: { id: course.documentID, season: 0, lesson: 0 },
        });
      }
      if (course.courseType == 'Mensual' && user.membership.level == 0) {
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
      setLessons(course.seasons[0].lessons)
    }

  }, [course])

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
                  Curso de {course.courseTittle}
                </Title>
                <SubTitle>
                  Descubre un nuevo método para tus uñas este San Valentín
                </SubTitle>
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
              {/* <Data>
                Categorías:
                <DataSpan>
                  {course.Category}
                </DataSpan>
              </Data> */}
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
                  {course.courseDuration} horas
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
                <VideoContain>
                  <ContainVideo>
                    <EpisodeContain>
                      <CardImageUnlock src={lesson.image} width={350} height={200} />
                    </EpisodeContain>
                  </ContainVideo>
                  <EpisodeInfo>
                    <EpisodeTitle>
                      Epidosio {index + 1}: {lesson.title}
                    </EpisodeTitle>
                    <EpisodeTime>
                      24 minutos
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
    </ModalContain>
  )
}
export default Modal;