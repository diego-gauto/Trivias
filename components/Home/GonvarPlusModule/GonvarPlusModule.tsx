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
import { useEffect } from "react";
declare let videojs: any;
declare let Hls: any

export const GonvarPlusModule = () => {
  const responsive768 = useMediaQuery({ query: "(max-width: 784px)" });
  const responsive576 = useMediaQuery({ query: "(max-width: 576px)" });
  const router = useRouter();
  let player: any;
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)



  const doVideoStuff = () => {
    // //@ts-ignore
    // player = window.player = videojs('video', {
    //   html5: {
    //     hls: {
    //       overrideNative: false
    //     }
    //   }
    // }),
    //   player.src({
    //     src: "https://video.gonvar.io/media/alineacion_sep/1/master.m3u8",
    //     type: 'application/x-mpegURL',
    //     withCredentials: false
    //   });

    // player.on('loadedmetadata', () => {
    //   player.play();
    // });
    var video: HTMLMediaElement = document.getElementById('video') as HTMLMediaElement;
    var videoSrc = "https://video.gonvar.io/media/alineacion_sep/1/master.m3u8";
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
        <video id="video" muted autoPlay></video>
      </div>
      <Row>
        <Col sm={12} md={7} className="first-col">
          {/* <Button className="new-btn">Nuevo</Button> */}
          <Card.Title>Gonvar+</Card.Title>
          <Card.Subtitle>
            Adquiere ya Gonvar+ para acceder a todo nuestro contenido.
          </Card.Subtitle>
        </Col>
        <Col sm={12} md={5} className="second-col">
          {!responsive768 &&
            <Card.Text className="price">
              Desde $149.00
            </Card.Text>}
          <PurpleButton text={responsive768 ? "Comenzar" : "Comenzar ahora"} onClick={() => router.push(SIGNUP_PATH)} />
          <WhiteButton text={responsive768 ? "Información" : "Más información"} onClick={() => router.push(PREVIEW_PATH)} />
        </Col>
        {responsive768 && <Card.Text className="mobile-price">
          Desde $149.00
        </Card.Text>}
      </Row>
    </CardContainer>
  )
}
