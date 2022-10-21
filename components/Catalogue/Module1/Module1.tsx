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

const Module1 = ({ user, allCourses, isLoading, }: any) => {
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const [course, setCourse] = useState<any>({});
  const [historyCourse, setHistoryCourse] = useState<any>({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const goTo = () => {
    if (user) {
      let today = new Date().getTime() / 1000;
      if (historyCourse.courseType == 'Mensual' && user.membership.finalDate > today || historyCourse.paid || historyCourse.courseType == 'Gratis') {
        router.push({
          pathname: 'Lesson',
          query: { id: historyCourse.documentID, season: historyCourse.season, lesson: historyCourse.lesson },
        });
      }
      if (historyCourse.courseType == 'Mensual' && user.membership.finalDate < today) {
        router.push(
          { pathname: 'Purchase', query: { type: 'subscription' } }
        )
      }
      if (historyCourse.courseType == 'Producto' && !historyCourse.paid) {
        router.push(
          { pathname: 'Purchase', query: { type: 'course', id: historyCourse.documentID } }
        )
      }
    } else {
      if (historyCourse.courseType == 'Gratis') {
        router.push({
          pathname: 'Lesson',
          query: { id: historyCourse.id, season: 0, lesson: 0 },
        });
      }
      if (!user && (historyCourse.courseType == 'Mensual' || historyCourse.courseType == 'Producto')) {
        router.push(LOGIN_PATH);
      }
    }
  }

  const handleShow = () => {
    setShow(true);
  }

  useEffect(() => {
    if (!isLoading) {
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
            setTimeout(() => {
              setLoading(false);
            }, 500);
          })
        })
      } else {
        allCourses.lesson = 0;
        allCourses.season = 0;
        setHistoryCourse(allCourses);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    }
  }, [user, isLoading])
  return (
    <Container>
      {(historyCourse.seasons && historyCourse.seasons.length > 0) && <>
        <div className={loading ? "skeleton-product" : ""} style={{ 'width': '100%', position: "relative", display: "initial" }}>
          <ImageContain>
            <VideoContain>
              <ReactPlayer
                className='absolute'
                url={historyCourse?.seasons[historyCourse.season].lessons[historyCourse.lesson]?.link}
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
            <div className="grey-field" style={{ 'width': '60%' }}>
              <Title>
                Curso {historyCourse.courseTittle}: “{historyCourse.seasons[historyCourse.season]?.lessons[historyCourse.lesson]?.title}”
              </Title>
            </div>
            <div className="grey-field" style={{ 'width': '60%' }}>
              <SubText>
                {historyCourse.courseAbout}
              </SubText>
            </div>
            <ButtonContain>
              <div className="grey-field" style={{ maxWidth: "fit-content" }}>
                <PurpleButton onClick={goTo}>
                  Reproducir
                  <PlayIcon />
                </PurpleButton>
              </div>
              <div className="grey-field" style={{ maxWidth: "fit-content" }}>
                <TransparentButton onClick={handleShow}>
                  Más información
                </TransparentButton>
              </div>
            </ButtonContain>
          </TextContain>
        </div>

      </>}
      <Modal show={show} setShow={setShow} course={historyCourse} user={user} />
    </Container >
  )
}
export default Module1;