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
  }

  useEffect(() => {
    doVideoStuff()
  }, [])

  return (
    <CardContainer className="card-container">
      <div className="video">
        {/* {isSafari && isIOS ? (
          <Image src="https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/courses%2FDise%C3%B1o%20y%20decoraci%C3%B3n%203D-db0763ae-9541-4943-aaca-056ab49cdba3?alt=media&token=7657f788-5c0f-4be4-b659-f93fe691f586" fluid />
        ) : (
          //       <video
          //         id="video"
          //         className="video-js vjs-16-9"
          //         data-setup='{"autoplay": true,"muted": true, "preload": "auto","loop":true,"html5": {
          // "hls": {
          //   "overrideNative": false
          // }}'
          //       >
          //         <source
          //           src="https://video.gonvar.io/media/alineacion_sep/1/master.m3u8"
          //           type="application/x-mpegURL"
          //         />
          //       </video>
          <ReactPlayer
            url="https://video.gonvar.io/media/alineacion_sep/1/master.m3u8"
            muted={true}
            playing={true}
            width="100%"
            playsInline={true}
            height={responsive576 ? "523px" : "600px"}
          />
        )} */}
        <ReactPlayer
          url="https://video.gonvar.io/media/alineacion_sep/1/master.m3u8"
          muted={true}
          playing={true}
          width="100%"
          playsInline={true}
          height={responsive576 ? "523px" : "600px"}
          config={{
            file: {
              forceHLS: true,
              forceVideo: true,
              hlsVersion: '0.12.4',
              attributes: {
                preload: "auto",
              }
            }
          }}
        />
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
