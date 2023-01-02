import DOMPurify from "dompurify"

import { PurpleModule2Button } from "./PurpleModule2Button/PurpleModule2Button";
import { PurpleEmptyButton } from "./PurpleEmptyButton/PurpleEmptyButton";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import {
  TitleCenter, ModuleContainer,
  Tittle,
  Subtittle1,
} from "../Module2_1/Module2_1.styled";
import { IModule2_1 } from "./IModule2_1";
import { useMediaQuery } from "react-responsive";


export const Module2_1 = (props: IModule2_1) => {
  const { data, img, user } = props;
  const [loading, setLoading] = useState(false);
  const responsive1023 = useMediaQuery({ query: "(max-width: 1023px)" });
  const responsive500 = useMediaQuery({ query: "(max-width: 500px)" });
  const parseTitle = (text: string = "") => {
    const bold = /\*\*(.*?)\*\*/gm;
    const html = text.replace(bold, '<span>$1</span>');
    return <TitleCenter dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
  }
  const router = useRouter();

  const scrollToModule2 = () => {
    window.scrollTo(0, window.innerHeight * 0.75)
  }


  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 3000);

  }, [data]);

  return (
    <>
      <ModuleContainer fluid id="webView" user={user}>
        {responsive1023 && <img className="bg-responsive" src="../images/Landing/mobileBG2.png" alt="" />}
        <img className="background" src="../images/Landing/bgSection1.png" alt="" />
        <img className="women" src="../images/Landing/mujeres_gonvar-min.png" alt="" />
        <div className="left-side">
          {!responsive1023 && <Tittle>Aprende a <br /> aplicar uñas <br /> desde cero</Tittle>}
          {responsive1023 && <Tittle>Aprende a aplicar <br /> uñas desde cero</Tittle>}
          {!responsive1023 && <Subtittle1  >Somos la plataforma de <br /> aprendizaje en línea que <br />
            te permite disfrutar de <br /> cientos de clases sobre uñas <br />
            <span>y más servicios de belleza.</span>
          </Subtittle1>}
          {responsive1023 && <Subtittle1  >Somos la plataforma de aprendizaje en línea <br />
            que te permite disfrutar de cientos de clases <br />
            sobre uñas <span>y más servicios de belleza.</span>
          </Subtittle1>}
          <div className="buttons">
            <PurpleModule2Button b1text={"Comienza desde $149"} n1text={" MXN/mes"}
              onClick={() => router.push("/auth/Register")} />
            <PurpleEmptyButton text={"Ver cursos"} onClick={() => router.push("/auth/Register")} />
          </div>
        </div>
        {responsive1023 && <img className="women-second" src="../images/Landing/infoWomen.png" alt="" />}
        {/* <FirstSectionContainer >
          <Row >
            <Col style={{ zIndex: "1" }}>

              <LeftImage >
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
                <ModuleContainerBG1alt id="mujeresGonvar" style={{ backgroundImage: `url(${BG1.src})`, opacity: `${loading ? 1 : 0}` }}></ModuleContainerBG1alt>


              </RightImage>
            </Col>
          </Row>

        </FirstSectionContainer > */}

      </ModuleContainer >
      {/* <ModuleContainer_Mobile id="mobileView">
        <FirstSectionContainer_Mobile >
          <Row>
            <RightImage_Mobile>


              <ModuleContainerBG2alt_Mobile style={{ backgroundImage: `url(${Background6.src})`, backgroundSize: "100%" }}>
                <ModuleContainerBG3alt_Mobile style={{ backgroundImage: `url(${BG5.src})`, backgroundSize: "100%" }}></ModuleContainerBG3alt_Mobile>
                <ModuleContainerBG1alt_Mobile style={{ backgroundImage: `url(${BG7.src})` }}></ModuleContainerBG1alt_Mobile>
              </ModuleContainerBG2alt_Mobile>



            </RightImage_Mobile>
          </Row>
          <Row >
            <Col style={{ zIndex: "1", paddingTop: "55px", marginBottom: `${responsive500 ? "60px" : ""}` }}>

              <LeftImage_Mobile id="textMobile" >
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
                  <ButtonsContainerMobile>
                    <ColContainerLeft>  <PurpleModule2Button b1text={"Comienza desde $149"} n1text={" MXN/mes"}
                      onClick={() => router.push("/auth/Register")} /></ColContainerLeft>
                    <ColContainerRight style={{ marginLeft: "33.3%" }}> <PurpleEmptyButton text={"Ver cursos"} onClick={() => router.push("/auth/Preview")} /></ColContainerRight>
                  </ButtonsContainerMobile>

                </Row>

              </LeftImage_Mobile>
            </Col>





          </Row>

        </FirstSectionContainer_Mobile >

      </ModuleContainer_Mobile > */}
    </>
  )
}
