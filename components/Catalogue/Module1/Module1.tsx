import router from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useMediaQuery } from "react-responsive";
import { getWholeCourses } from "../../../store/actions/courseActions";

import {
  ButtonContain,
  Container,
  ImageContain,
  PlayIcon,
  PurpleButton,
  SubText,
  TextContain,
  Title,
  TransparentButton,
  VideoContain,
} from "./Module1.styled";

const Module1 = ({ user }: any) => {
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const [course, setCourse] = useState<any>({});
  const [historyCourse, setHistoryCourse] = useState<any>({});

  const goTo = () => {
    if (user) {
      if (course.courseType == 'Mensual' && user.membership.level == 1 || course.paid) {
        router.push({
          pathname: 'Lesson',
          query: { id: course.id, season: 0, lesson: 0 },
        });
      }
      if (course.courseType == 'Mensual' && user.membership.level == 0) {
        router.push(
          { pathname: 'Purchase', query: { type: 'subscription' } }
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
        router.push(
          { pathname: 'auth/Login' }
        )
      }
    }
  }

  useEffect(() => {
    if (user) {
      setCourse({})
    } else {
      getWholeCourses().then((response) => {
        setCourse(response[0]);
      })
    }
  }, [user])

  return (
    <Container>
      {(Object.values(course).length > 0 && !user) && <>
        <ImageContain>

          <VideoContain>
            <ReactPlayer
              className='absolute'
              url='https://cadefivideo.com.mx/media/2022/JUNIO/COMPLIANCE/master.m3u8'
              playing={true}
              muted={true}
              //controls
              width='100%'
              height='180%'
              style={{ position: "absolute", top: responsive1023 ? "-95px" : "-170px", }}
            />
          </VideoContain>
        </ImageContain>

        <TextContain>
          <Title style={{ textShadow: "1px 1px 5px black" }}>
            Curso {course.courseTittle}: Episodio 1 “{course.seasons[0]?.lessons[0].title}”
          </Title>
          <SubText style={{ textShadow: "1px 1px 5px black" }}>
            {course.courseAbout}
          </SubText>
          <ButtonContain>
            <PurpleButton onClick={goTo}>
              Reproducir
              <PlayIcon />
            </PurpleButton>
            <TransparentButton>
              Más información
            </TransparentButton>
          </ButtonContain>
        </TextContain>
      </>}
      {(Object.values(historyCourse).length > 0 && user) && <>
        <ImageContain>

          <VideoContain>
            <ReactPlayer
              className='absolute'
              url='https://cadefivideo.com.mx/media/2022/JUNIO/COMPLIANCE/master.m3u8'
              playing={true}
              muted={true}
              //controls
              width='100%'
              height='180%'
              style={{ position: "absolute", top: responsive1023 ? "-95px" : "-170px", }}
            />
          </VideoContain>
        </ImageContain>

        <TextContain>
          <Title style={{ textShadow: "1px 1px 5px black" }}>
            Curso {course.courseTittle}: Episodio 1 “{course.seasons[0]?.lessons[0].title}”
          </Title>
          <SubText style={{ textShadow: "1px 1px 5px black" }}>
            {course.courseAbout}
          </SubText>
          <ButtonContain>
            <PurpleButton onClick={goTo}>
              Reproducir
              <PlayIcon />
            </PurpleButton>
            <TransparentButton>
              Más información
            </TransparentButton>
          </ButtonContain>
        </TextContain>
      </>}
    </Container>
  )
}
export default Module1;