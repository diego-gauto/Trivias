import React, { useEffect, useState } from "react";

import router from "next/router";

import { LOGIN_PATH } from "../../../../constants/paths";
import { PurpleButton, TransparentButton } from "../../Module1/Module1.styled";
import {
  AboutContain,
  BackgroundOverlay,
  ButtonContain,
  CardImage,
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
  InsideContent,
  InsideText,
  LessonContain,
  LessonTitle,
  Lock,
  ModalBackground,
  ModalCont,
  ModalContain,
  ModalMod,
  PlayIcon,
  SeasonContain,
  SubTitle,
  Text,
  TextContainer,
  Title,
  Titles,
  VideoContain,
} from "../../Module3/Modal/Modal1.styled";
import SelectModule4 from "./SelectModule4";

const Modal1 = ({ show, setShow, course, user }: any) => {
  const handleClose = () => setShow(false);
  const [lessons, setLessons] = useState<any>([])

  const handleClick = (value: any) => {
    setLessons(course.seasons[value].lessons)
  };

  const goTo = () => {
    if (user) {
      router.push(
        { pathname: 'Purchase', query: { type: 'course', id: course.id } }
      )
    } else {
      router.push(LOGIN_PATH)
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
            <ImageBack src="/images/Preview/modalf2.png"
              width={1000}
              height={600}
            />
            <BackgroundOverlay />
            <Container>
              <Cross onClick={handleClose}>
                x
              </Cross>
              <TextContainer>
                <InsideContent>
                  <InsideText>
                    Nuevo
                  </InsideText>
                </InsideContent>
                <Title>
                  Curso de {course.courseTittle}
                </Title>
                <SubTitle>
                  Descubre un nuevo método para tus uñas este San Valentín
                </SubTitle>
                <ButtonContain>
                  <PurpleButton onClick={goTo}>
                    Comprar - ${course.coursePrice}.00
                  </PurpleButton>
                  <TransparentButton>
                    Ver un Adelanto
                    <PlayIcon />
                  </TransparentButton>
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
                  {course.Category}
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
                Año de publicación:
                <DataSpan>
                  {course.coursePublishYear}
                </DataSpan>
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
                      <CardImage src="/images/Preview/card8.png" width={350} height={200} />
                      <Lock />
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
export default Modal1;