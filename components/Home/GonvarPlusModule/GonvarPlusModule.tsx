import { Card, Col, Image, Row } from "react-bootstrap";
import { isIOS, isSafari } from "react-device-detect";
import ReactPlayer from "react-player";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import { SIGNUP_PATH } from "../../../constants/paths";
import { PurpleButton } from "../../common/PurpleButton/PurpleButton";
import { PREVIEW_PATH } from "../../../constants/paths";
import { CardContainer } from "./GonvarPlusModule.styled";
import { WhiteButton } from "../../common/WhiteButton/WhiteButton";
import { useEffect, useState } from "react";
import Modal1 from "../../Catalogue/Module4/Modal/Modal1";
import { useFormState } from "react-hook-form";
declare let Hls: any

export const GonvarPlusModule = ({ loggedIn, user }: any) => {
  const responsive768 = useMediaQuery({ query: "(max-width: 784px)" });
  const responsive576 = useMediaQuery({ query: "(max-width: 576px)" });
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<any>([]);
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  }
  const router = useRouter();

  const doVideoStuff = () => {
    //@ts-ignore
    var video: HTMLMediaElement = document.getElementById('video') as HTMLMediaElement;
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
      <div className="course-container">
        <div className="info">
          <div className="top">
            <img style={{ margin: 0 }} src="../images/purchase/logo.png" alt="" />
            <p>Gonvar+</p>
            <button>Suscripción mensual</button>
          </div>
          <div className="middle">
            <h1>Empieza a cursar <br /> cientos de clases <br /> sobre uñas y belleza <br /> <span>en línea</span> </h1>
            <p>Diferentes niveles de dificultad <br />
              e instructores internacionales.
            </p>
          </div>
          <h1 className="price">Sólo $149 <span>MXN/mes</span></h1>
        </div>
        <div className="video">
          <video id="video" loop muted autoPlay playsInline preload="auto" width="100%" height={responsive576 ? "523px" : "600px"}
          ></video>
          <Row>
            {/* <Col sm={12} md={7} className="first-col">
              <Card.Title>Gonvar+</Card.Title>
              <Card.Subtitle>
                Adquiere ya Gonvar+ para acceder a todo nuestro contenido.
              </Card.Subtitle>
            </Col> */}
            <Col sm={12} md={5} className="second-col">
              {/* {!responsive768 &&
                <Card.Text className="price">
                  Desde $149.00
                </Card.Text>} */}
              <PurpleButton text={responsive768 ? "Comenzar" : "Comenzar ahora"} onClick={() => {
                loggedIn
                  ? router.push("/Purchase?type=subscription")
                  : router.push(SIGNUP_PATH)
              }} />
              <WhiteButton text={responsive768 ? "Información" : "Más información"} onClick={() => router.push(PREVIEW_PATH)} />
            </Col>
            {/* {responsive768 && <Card.Text className="mobile-price">
              Desde $149.00
            </Card.Text>} */}
          </Row>
        </div>
      </div>
    </CardContainer>
  )
}
