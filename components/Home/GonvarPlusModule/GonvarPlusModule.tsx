import { Card, Col, Image, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import { SIGNUP_PATH } from "../../../constants/paths";
import { PurpleButton } from "../../common/PurpleButton/PurpleButton";
import { CardContainer } from "./GonvarPlusModule.styled";
import { WhiteButton } from "../../common/WhiteButton/WhiteButton";
import { useEffect, useState } from "react";
import { ModalGonvarPlus } from "../../ModalGonvarPlus/ModalGonvarPlus";
import { getWholeCourses } from "../../../store/actions/courseActions";
declare let Hls: any

export const GonvarPlusModule = ({ loggedIn, user, courses }: any) => {
  const responsive1140 = useMediaQuery({ query: "(max-width: 1140px)" });
  const responsive768 = useMediaQuery({ query: "(max-width: 784px)" });
  const responsive576 = useMediaQuery({ query: "(max-width: 576px)" });
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  let today = new Date().getTime() / 1000;
  const handleShow = () => {
    setOpenModal(true);
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
  const hms = (totalSeconds: any) => {
    if (typeof totalSeconds == 'string') return totalSeconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    let result = `${minutes
      .toString()
      .padStart(1, '0')} min`;
    if (!!hours) {
      result = `${hours.toString()} hr ${minutes} min`;
    }
    return result;
  }
  const goTo = () => {
    if (loggedIn) {
      if ((user.level === 1 && user.final_date > today) || (user.level === 0 && user.final_date > today)) {
        router.push("/Preview")
      }
      if (user.level === 0 && user.final_date < today) {
        router.push({
          pathname: 'Purchase',
          query: { type: 'subscription' }
        });
      }
    } else {
      router.push(SIGNUP_PATH)
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
            <button style={{ cursor: "initial" }}>Suscripción mensual</button>
          </div>
          <div className="middle">
            <h1>Empieza a cursar <br /> cientos de clases <br /> sobre uñas y belleza <br /> <span>en línea</span> </h1>
            <p>Diferentes niveles de dificultad <br />
              e instructores internacionales.
            </p>
          </div>
          <h1 className="price">Sólo $149 <span>MXN/mes</span></h1>
          {responsive1140 && <Row>
            <Col sm={12} md={5} className="second-col">
              <PurpleButton text={responsive768 ? "Comenzar" : "Comenzar ahora"} onClick={() => { goTo() }} />
              <WhiteButton text={responsive768 ? "Información" : "Más información"} onClick={() => { handleShow() }} />
            </Col>
            <ModalGonvarPlus openModal={openModal} setOpenModal={setOpenModal} course={courses} user={user} loggedIn={loggedIn} />
          </Row>}
        </div>
        <div className="video">
          <video id="video" loop muted autoPlay playsInline preload="auto" width="100%" height={responsive576 ? "523px" : "600px"}
          ></video>
          {!responsive1140 && <Row>
            <Col sm={12} md={5} className="second-col">
              <PurpleButton text={responsive768 ? "Comenzar" : "Comenzar ahora"} onClick={() => { goTo() }} />
              <WhiteButton text={responsive768 ? "Información" : "Más información"} onClick={() => { handleShow() }} />
            </Col>
            <ModalGonvarPlus openModal={openModal} setOpenModal={setOpenModal} course={courses} user={user} loggedIn={loggedIn} />
          </Row>}
        </div>
      </div>
    </CardContainer>
  )
}
