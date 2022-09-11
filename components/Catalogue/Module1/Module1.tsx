import { useEffect, useState } from "react";

import ReactPlayer from "react-player";
import { useMediaQuery } from "react-responsive";

import router from "next/router";

import { LOGIN_PATH } from "../../../constants/paths";
import { getViewedCourses, getWholeCourses } from "../../../store/actions/courseActions";
import { getPaidCourses } from "../../../store/actions/UserActions";
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
import Modal from "./modal/modal";

const Module1 = ({ user, allCourses }: any) => {
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const [course, setCourse] = useState<any>({});
  const [historyCourse, setHistoryCourse] = useState<any>({});
  const [show, setShow] = useState(false);

  const goTo = () => {
    if (user) {
      let today = new Date().getTime() / 1000;
      if (historyCourse.courseType == 'Mensual' && user.membership.finalDate > today || historyCourse.paid || historyCourse.courseType == 'Gratis') {
        router.push({
          pathname: 'Lesson',
          query: { id: historyCourse.documentID, season: 0, lesson: 0 },
        });
      }
      if (historyCourse.courseType == 'Mensual' && user.membership.level == 0) {
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
        router.push(LOGIN_PATH)
      }
    }
  }

  const handleShow = () => {
    setShow(true);
  }

  useEffect(() => {
    if (user) {
      let date = new Date().getTime() / 1000;
      getPaidCourses(user.id).then((paid: any) => {
        getViewedCourses(user.id).then((res) => {
          if (res && res.length > 0) {
            if (paid.some((x: any) => x.id == res[0].documentID && date < x.finalDate)) {
              res[0].paid = true;
            } else {
              res[0].paid = false;
            }
            setHistoryCourse(res[0]);
          }
        })
      })
    } else {
      setCourse(allCourses);
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
            Curso {course.courseTittle}: Episodio 1 “{course.seasons[0]?.lessons[0]?.title}”
          </Title>
          <SubText style={{ textShadow: "1px 1px 5px black" }}>
            {course.courseAbout}...
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
            Curso {historyCourse.courseTittle}: Episodio 1 “{historyCourse.seasons[0]?.lessons[0].title}”
          </Title>
          <SubText style={{ textShadow: "1px 1px 5px black" }}>
            {historyCourse.courseAbout}
          </SubText>
          <ButtonContain>
            <PurpleButton onClick={goTo}>
              Reproducir
              <PlayIcon />
            </PurpleButton>
            <TransparentButton onClick={handleShow}>
              Más información
            </TransparentButton>
          </ButtonContain>
        </TextContain>
      </>}
      <Modal show={show} setShow={setShow} course={historyCourse} user={user} />
    </Container>
  )
}
export default Module1;