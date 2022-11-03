import { Button, Card, Col, Row } from "react-bootstrap";
import ReactPlayer from "react-player";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import { PREVIEW_PATH } from "../../../constants/paths";
import { PurpleButton } from "../../common/PurpleButton/PurpleButton";
import { WhiteButton } from "../../common/WhiteButton/WhiteButton";
import { CardContainer } from "./CourseModule.styled";
import { ICourseModuleProps } from "./ICourseModuleProps";
import { useEffect } from "react";
declare let Hls: any

export const CourseModule = (props: ICourseModuleProps) => {
  const { data, num } = props;
  const responsive768 = useMediaQuery({ query: "(max-width: 784px)" });
  const responsive576 = useMediaQuery({ query: "(max-width: 576px)" });
  const router = useRouter();

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
          <Button className="new-btn">Nuevo</Button>
          <Card.Title>{data.courseTittle}</Card.Title>
          <Card.Subtitle>
            {data.courseSubtittle}
          </Card.Subtitle>
        </Col>
        <Col sm={12} md={5} className="second-col">
          {!responsive768 &&
            <Card.Text className="price">
              Desde ${data.coursePrice}.00
            </Card.Text>}
          <PurpleButton text={responsive768 ? "Comprar" : "Ve un adelanto"} onClick={() => router.push(PREVIEW_PATH)} />
          <WhiteButton text={responsive768 ? "Información" : "Más información"} onClick={() => router.push(PREVIEW_PATH)} />
        </Col>
        {responsive768 && <Card.Text className="mobile-price">
          Desde ${data.coursePrice}.00
        </Card.Text>}
      </Row>
    </CardContainer>
  )
}
