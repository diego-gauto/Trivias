import { Button, Card, Col, Row } from "react-bootstrap";
import ReactPlayer from "react-player";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import { PREVIEW_PATH } from "../../../constants/paths";
import { PurpleButton } from "../../common/PurpleButton/PurpleButton";
import { WhiteButton } from "../../common/WhiteButton/WhiteButton";
import { CardContainer } from "./CourseModule.styled";
import { ICourseModuleProps } from "./ICourseModuleProps";
import Modal1 from "../../Catalogue/Module4/Modal/Modal1";
import { useEffect, useState } from "react";
declare let Hls: any

export const CourseModule = (props: ICourseModuleProps) => {
  const { data, num, user, loggedIn } = props;
  const responsive768 = useMediaQuery({ query: "(max-width: 784px)" });
  const responsive576 = useMediaQuery({ query: "(max-width: 576px)" });
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  }

  const doVideoStuff = () => {
    //@ts-ignore
    var video: HTMLMediaElement = document.getElementById(`video-${num}`) as HTMLMediaElement;
    var videoSrc = "https://video.gonvar.io/media/alineacion_sep/1/master.m3u8";
    videoSrc = videoSrc.slice(0, -11) + "stream_0" + videoSrc.slice(-5);
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);

    } else {
      video.src = `${videoSrc}`
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
        <Col sm={12} md={7} className="first-col">
          <Button className="new-btn">NAILS <span>ACADEMY</span></Button>
          <Card.Title>{data.courseTittle}</Card.Title>
          <Card.Subtitle>
            Aprende desde cero a aplicar <br />
            uñas acrílicas en técnica de Tips.
          </Card.Subtitle>
        </Col>
        <Col sm={12} md={5} className="second-col">
          {!responsive768 &&
            <Card.Text className="price">
              Curso individual <br />
              <span>por ${data.coursePrice}</span> <span className="lower">MXN</span>
            </Card.Text>}
          <PurpleButton text={responsive768 ? "Comprar" : "Comenzar ahora"} onClick={() => router.push(PREVIEW_PATH)} />
          <WhiteButton text={responsive768 ? "Información" : "Más información"} onClick={() => router.push(PREVIEW_PATH)} />
        </Col>
        {responsive768 && <Card.Text className="mobile-price">
          Desde ${data.coursePrice}.00
        </Card.Text>}
      </Row>
      <Modal1 show={show} setShow={setShow} course={data} user={user} />
    </CardContainer>
  )
}
