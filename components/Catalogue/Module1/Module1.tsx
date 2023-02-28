import { useEffect, useState } from "react";

import ReactPlayer from "react-player";
import { useMediaQuery } from "react-responsive";

import router from "next/router";

import { LOGIN_PATH, SIGNUP_PATH } from "../../../constants/paths";
import { getViewedCourses } from "../../../store/actions/courseActions";
import { getPaidCourses } from "../../../store/actions/UserActions";
import {
  ButtonContain,
  Container,
  Gradient,
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
import { BsTriangle } from "react-icons/bs";

const Module1 = ({ user, allCourses, isLoading, professor }: any) => {
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
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
        router.push(SIGNUP_PATH);
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
            if (allCourses && allCourses.length > 0) {
              if (paid.some((x: any) => x.id == allCourses.documentID && date < x.finalDate)) {
                allCourses.paid = true;
              } else {
                allCourses.paid = false;
              }

              setHistoryCourse(allCourses);
            }
            else {
              allCourses.lesson = 0;
              allCourses.season = 1;
              setHistoryCourse(allCourses);
            }
            setTimeout(() => {
              setLoading(false);
            }, 500);
          })
        })
      } else {
        allCourses.lesson = 0;
        allCourses.season = 1;
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
                url={
                  historyCourse?.seasons[historyCourse.season].lessons[historyCourse.lesson]?.link ?
                    historyCourse?.seasons[historyCourse.season].lessons[historyCourse.lesson]?.link.slice(0, -11) + "stream_0" + historyCourse?.seasons[historyCourse.season].lessons[historyCourse.lesson]?.link.slice(-5) :
                    historyCourse?.seasons[historyCourse.season].lessons[historyCourse.lesson - 1]?.link.slice(0, -11) + "stream_0" + historyCourse?.seasons[historyCourse.season].lessons[historyCourse.lesson - 1]?.link.slice(-5)
                }
                playing={true}
                muted={true}
                loop={true}
                width='100%'
                height='100%'
              />
            </VideoContain>
          </ImageContain>
          <TextContain>
            <div className="grey-field">
              <div className="top">
                <img style={{ margin: 0 }} src="../images/purchase/logo.png" alt="" />
                <p>Gonvar+</p>
              </div>
              <Title>
                {historyCourse.courseTittle}
              </Title>
            </div>
            <div className="grey-field">
              <SubText>
                de {historyCourse.courseProfessor[0]?.name}
              </SubText>
            </div>
            <ButtonContain>
              <div className="grey-field" style={{ maxWidth: "fit-content" }}>
                <PurpleButton onClick={goTo}>
                  <BsTriangle />
                  Reproducir
                </PurpleButton>
              </div>
              <div className="grey-field" style={{ maxWidth: "fit-content" }}>
                <TransparentButton onClick={handleShow}>
                  Más información
                </TransparentButton>
              </div>
            </ButtonContain>
          </TextContain>
          <Gradient></Gradient>
        </div>
      </>}
      <Modal show={show} setShow={setShow} course={historyCourse} user={user} />
    </Container >
  )
}
export default Module1;