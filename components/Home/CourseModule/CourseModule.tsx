import { Button, Card, Col, Row } from "react-bootstrap";
import ReactPlayer from "react-player";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import { LESSON_PATH, NAILS_FORM, NAILS_LANDING_REDIRECT, NAILS_REVOLUTION_REDIRECT, PLAN_PATH, PREVIEW_PATH, PURCHASE_PATH, SIGNUP_PATH } from "../../../constants/paths";
import { PurpleButton } from "../../common/PurpleButton/PurpleButton";
import { WhiteButton } from "../../common/WhiteButton/WhiteButton";
import { CardContainer } from "./CourseModule.styled";
import { ICourseModuleProps } from "./ICourseModuleProps";
import { useEffect, useState } from "react";
import { Text03 } from "../Module4_Carousel/SlideModule/SlideModule.styled";
import CourseModal from "../../Modals/CourseModal/CourseModal";
declare let Hls: any
const gPlus = "/images/purchase/logo.png"
export const CourseModule = (props: ICourseModuleProps) => {
  const { data, num, user, loggedIn } = props;
  const responsive768 = useMediaQuery({ query: "(max-width: 784px)" });
  const responsive576 = useMediaQuery({ query: "(max-width: 576px)" });
  let today = new Date().getTime() / 1000;
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleShow = () => {
    // setShow(true);
    router.push({ pathname: NAILS_REVOLUTION_REDIRECT })
  }

  const doVideoStuff = () => {
    //@ts-ignore
    var video: HTMLMediaElement = document.getElementById(`video-${num}`) as HTMLMediaElement;
    var videoSrc: any = ""

    if (num === 1) {
      // nails-master-revolution/landing
      videoSrc = "https://video.gonvar.io/media/nails_master_revolution/landing/master.m3u8";
    }
    if (num === 2) {
      videoSrc = "https://video.gonvar.io/media/alineacion_sep/1/master.m3u8";
    }

    videoSrc = videoSrc.slice(0, -11) + "stream_0" + videoSrc.slice(-5);
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);

    } else {
      video.src = `${videoSrc}`
    }

  }
  const goTo = () => {
    if (user.level > 0 || user.final_date > today) {
      router.push(PREVIEW_PATH)
    }
    else {
      if (loggedIn) {
        router.push(PLAN_PATH)
      }
      if (!loggedIn) {
        localStorage.setItem("plan", 'true');
        router.push(SIGNUP_PATH)
      }
    }
  }
  useEffect(() => {
    doVideoStuff()
  }, [])
  return (
    <CardContainer className="card-container">
      <div className="video">
        <video id={`video-${num}`} loop muted autoPlay playsInline preload="auto" width="100%" height={responsive576 ? "523px" : "600px"}
        ></video>
      </div>
      <Row>
        <Col sm={12} md={5} className="first-col">
          <img src={gPlus} className="logo" />
          <p className="text-logo">Incluído en tu suscripción Gonvar+</p>
          <Card.Title>{data.title}</Card.Title>
          <Row className="level">
            {(data.difficulty == "Muy Fácil") && <img style={{ width: "auto" }} src="../images/iconoAzul.png" alt="" />}
            {(data.difficulty == "Fácil") && <img style={{ width: "auto" }} src="../images/iconoLila.png" alt="" />}
            {(data.difficulty == "Intermedio") && <img style={{ width: "auto" }} src="../images/iconoNaranja.png" alt="" />}
            {(data.difficulty == "Avanzado") && <img style={{ width: "auto" }} src="../images/iconoVerde.png" alt="" />}
            {(data.difficulty == "Máster") && <img style={{ width: "auto" }} src="../images/iconoRosa.png" alt="" />}
            <Text03 style={{ padding: 0 }} level={data.difficulty}><span>{data.difficulty}</span></Text03>
          </Row>
          <Card.Subtitle>
            Aprende desde cero a aplicar <br />
            uñas acrílicas en técnica de Tips y Escultural.
          </Card.Subtitle>
        </Col>
        <Col sm={12} md={5} className="second-col">
          {
            data.id &&
            <PurpleButton text={responsive768 ? "Comprar" : "Comenzar ahora"} onClick={() => { goTo() }
            } />
          }
          <WhiteButton text={responsive768 ? "Información" : "Más información"} onClick={() => { handleShow() }} />
        </Col>
      </Row>
      <CourseModal show={show} setShow={setShow} course={data} user={user} />
    </CardContainer>
  )
}
