import { Col, Image, Row } from "react-bootstrap";
import DOMPurify from "dompurify"

import { PurpleModule2Button } from "./PurpleModule2Button/PurpleModule2Button";
import { PurpleEmptyButton } from "./PurpleEmptyButton/PurpleEmptyButton";
import { useEffect, useState } from "react";

import BG1 from "./MediaSources/mujeres_gonvar.png";
import BG2 from "./MediaSources/bgSection1.png";
import BG3 from "./MediaSources/bgSection1_c1.png";
import BG4 from "./MediaSources/bgSection1_c2.png";

import { useRouter } from "next/router";
import { ColContainerLeft, ColContainerRight, FirstSectionContainer, FirstSectionContainer_Mobile, ModuleContainerBG1alt, ModuleContainerBG1alt_Mobile, ModuleContainerBG2alt, ModuleContainerBG2alt_Mobile, ModuleContainerBG3alt_Mobile, ModuleContainerBGColor_Mobile, Subtittles, Subtittles_Mobile, TittleContainer, TittleContainer_Mobile } from "../Module2_1/Module2_1.styled";
import {
  TitleCenter, ModuleContainer,
  LeftImage,
  RightImage,
  Tittle,
  Subtittle1,
  Subtittle2,

  ModuleContainer_Mobile,
  TitleCenter_Mobile,
  LeftImage_Mobile,
  RightImage_Mobile,
  Tittle_Mobile,
  Subtittle1_Mobile,
  Subtittle2_Mobile,
} from "../Module2_1/Module2_1.styled";
import { IModule2_1 } from "./IModule2_1";


export const Module2_1 = (props: IModule2_1) => {
  const [iconImagesData, setIconImagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const parseTitle = (text: string = "") => {
    const bold = /\*\*(.*?)\*\*/gm;
    const html = text.replace(bold, '<span>$1</span>');
    return <TitleCenter dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
  }
  const router = useRouter();

  const { data, img } = props;
  const scrollToModule2 = () => {
    window.scrollTo(0, window.innerHeight * 0.75)
  }


  useEffect(() => {

  }, [data]);


  return (
    <>
      <ModuleContainer id="tag1">
        <FirstSectionContainer >
          <Row >
            <Col style={{ zIndex: "1" }}>

              <LeftImage   >
                <Row xs={12} sm={6} md={6} lg={7}>
                  <TittleContainer  >
                    <Tittle  >Aprende a aplicar uñas desde cero</Tittle>
                  </TittleContainer>
                </Row>
                <Row xs={12} sm={6} md={6} lg={7}>
                  <Subtittles  >
                    <Subtittle1  >Somos la plataforma de aprendizaje en línea que
                      te permite disfrutar de cientos de clases sobre uñas</Subtittle1>

                    <Subtittle2> y más servicios de belleza.</Subtittle2>

                  </Subtittles>
                </Row>

                <Row xs={12} sm={6} md={6} lg={7}>

                  <PurpleModule2Button b1text={"Comienza desde $149"} n1text={" MXN/mes"}
                    onClick={() => router.push("/auth/Register")} />

                </Row>
                <Row xs={12} sm={6} md={6} lg={7}>

                  <PurpleEmptyButton text={"Ver cursos"} onClick={() => router.push("/auth/Register")} />

                </Row>

              </LeftImage>
            </Col>

            <Col>

              <RightImage>

                <ModuleContainerBG2alt style={{ backgroundImage: `url(${BG2.src})`, backgroundSize: "100%" }}></ModuleContainerBG2alt>
                <ModuleContainerBG1alt style={{ backgroundImage: `url(${BG1.src})` }}></ModuleContainerBG1alt>


              </RightImage>
            </Col>
          </Row>

        </FirstSectionContainer >

      </ModuleContainer >
      <ModuleContainer_Mobile id="tag2">
        <FirstSectionContainer_Mobile >
          <Row>
            <RightImage_Mobile>

              {/*  <ModuleContainerBGColor_Mobile ></ModuleContainerBGColor_Mobile> */}

              <ModuleContainerBG2alt_Mobile style={{ backgroundImage: `url(${BG3.src})`, backgroundSize: "100%" }}>
                <ModuleContainerBG3alt_Mobile style={{ backgroundImage: `url(${BG4.src})`, backgroundSize: "100%" }}></ModuleContainerBG3alt_Mobile>
                <ModuleContainerBG1alt_Mobile style={{ backgroundImage: `url(${BG1.src})` }}></ModuleContainerBG1alt_Mobile>
              </ModuleContainerBG2alt_Mobile>



            </RightImage_Mobile>
          </Row>
          <Row >
            <Col style={{ zIndex: "1" }}>

              <LeftImage_Mobile   >
                <Row xs={12} sm={6} md={6} lg={7}>
                  <TittleContainer_Mobile  >
                    <Tittle_Mobile  >Aprende a aplicar uñas desde cero</Tittle_Mobile>
                  </TittleContainer_Mobile>
                </Row>
                <Row xs={12} sm={6} md={6} lg={7}>
                  <Subtittles_Mobile  >
                    <Subtittle1_Mobile  >Somos la plataforma de aprendizaje en línea que
                      te permite disfrutar de cientos de clases sobre uñas</Subtittle1_Mobile>

                    <Subtittle2_Mobile> y más servicios de belleza.</Subtittle2_Mobile>

                  </Subtittles_Mobile>
                </Row>

                <Row xs={12} sm={6} md={6} lg={7}>

                  <ColContainerLeft>  <PurpleModule2Button b1text={"Comienza desde $149"} n1text={" MXN/mes"}
                    onClick={() => router.push("/auth/Register")} /></ColContainerLeft>
                  <ColContainerRight style={{ marginLeft: "33.3%" }}> <PurpleEmptyButton text={"Ver cursos"} onClick={() => router.push("/auth/Preview")} /></ColContainerRight>


                </Row>

              </LeftImage_Mobile>
            </Col>





          </Row>

        </FirstSectionContainer_Mobile >

      </ModuleContainer_Mobile >
    </>
  )
}
