import { Button, Card, Col, Row } from "react-bootstrap";
import ReactPlayer from "react-player";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import { PREVIEW_PATH, SIGNUP_PATH } from "../../../constants/paths";
import { PurpleButton } from "../../common/PurpleButton/PurpleButton";
import { WhiteButton } from "../../common/WhiteButton/WhiteButton";
import { CardContainer } from "./CourseModule.styled";
import { ICourseModuleProps } from "./ICourseModuleProps";
import { useEffect, useState } from "react";
import { NAILS_MASTER_COURSE_ID } from "../../../constants/gonvar";
import { Text03 } from "../Module4_Carousel/SlideModule/SlideModule.styled";
import CourseModal from "../../CourseModal/CourseModal";
declare let Hls: any

export const CourseModule = (props: ICourseModuleProps) => {
  const { data, num, user, loggedIn } = props;
  const responsive768 = useMediaQuery({ query: "(max-width: 784px)" });
  const responsive576 = useMediaQuery({ query: "(max-width: 576px)" });
  let today = new Date().getTime() / 1000;
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  }

  const doVideoStuff = () => {
    //@ts-ignore
    var video: HTMLMediaElement = document.getElementById(`video-${num}`) as HTMLMediaElement;
    var videoSrc: any = ""

    if (num === 1) {
      videoSrc = "https://video.gonvar.io/media/Nails Master 2.0 reedición/NM 2.0 Bienvenida/master.m3u8";
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
    if (loggedIn && data.pay) {
      router.push({
        pathname: 'Lesson',
        query: { id: data.id, season: 0, lesson: 0 },
      });
    }
    if (loggedIn && !data.pay) {
      router.push(
        { pathname: 'Purchase', query: { type: 'course', id: data.id } }
      )
    }
    if (!loggedIn) {
      localStorage.setItem("course", `${data.id}`);
      router.push(SIGNUP_PATH)
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
          <Button className="new-btn">NAILS <span>ACADEMY</span></Button>
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
            uñas acrílicas en técnica de Tips.
          </Card.Subtitle>
        </Col>
        <Col sm={12} md={5} className="second-col">
          <Card.Text className="price">
            Curso individual <br />
            <span>por ${data.price}</span> <span className="lower">MXN</span>
          </Card.Text>
          <PurpleButton text={responsive768 ? "Comprar" : "Comenzar ahora"} onClick={() => { goTo() }
          } />
          <WhiteButton text={responsive768 ? "Información" : "Más información"} onClick={() => { handleShow() }} />
        </Col>
      </Row>
      <CourseModal show={show} setShow={setShow} course={data} user={user} />
    </CardContainer>
  )
}
