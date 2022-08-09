import { useEffect, useState } from "react";
import { Container, Col, Row, Button, Image } from "react-bootstrap";
import Img1 from "./MediaSources/Icon01.png"
import Img2 from "./MediaSources/Icon02.png"
import Img3 from "./MediaSources/Icon03.png"
import Img4 from "./MediaSources/Icon04.png"
import Img5 from "./MediaSources/Image01.png"
import { IModule1 } from "./IModule1";
import GradientCanvas from "../../GradientCanvas/GradientCanvas"
import { collection, doc, setDoc, getDocs, onSnapshot, getDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

import {
  BackgroundWrapper, Left, Right, SectionA_01,
  RightImage, SectionB, SectionB_01, SectionB_02,
  SectionC, SectionA_02, LeftWrapper, Button01, Button02,
  Button01Content, Button02Content, SectionA_01Text01,
  SectionA_01Text02, SectionA_02Text01, SectionA_02Text02,
  SectionB_Text, IconElement, IconImageWrapper, BlurWindow,
  SectionB_TextALT1, ModuleContentWrapper, RightWrapper,
  RightImageElement, SectionA_01TextWrapper, ArrowDownIcon,
  ArrowDownContainer, ModuleContainer,
} from "./Module1.styled";
import { AnyObject } from "yup/lib/types";
import { LoaderContain, LoaderImage, Background } from "../../../screens/Login.styled";


export const Module1 = (props: any) => {
  const scrollToModule2 = () => {
    window.scrollTo(0, window.innerHeight * 0.75)
  }
  const [landing, setLanding] = useState<any>()
  const [loading, setLoading] = useState(true);


  const getHeroSection = async () => {
    const heroSectionRef = doc(db, "landingPage", "heroSection")
    const heroSectionDoc = await getDoc(heroSectionRef)
    if (heroSectionDoc.exists()) {
      setLanding(heroSectionDoc.data())
      setLoading(false)
    }
  }
  useEffect(() => {
    getHeroSection();
  }, []);


  if (loading) {
    return (
      <Background>
        <LoaderImage>
          <LoaderContain />
        </LoaderImage>
      </Background>
    )
  }

  return (
    <ModuleContainer fluid>
      <ArrowDownContainer onClick={scrollToModule2}>
        <ArrowDownIcon className="down" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="none"></rect><path d="M36.63,18.37a1.37,1.37,0,0,1,2.15.37,1.7,1.7,0,0,1-.3,2.06L25.4,32.64a1.37,1.37,0,0,1-1.85,0l-13-11.84a1.71,1.71,0,0,1-.29-2.06,1.37,1.37,0,0,1,2.15-.37l12.11,11ZM24.25,31.42a.38.38,0,0,1,.46,0l-.23-.21ZM11.71,19.55s0,.06,0,0Zm25.61,0h0Z"></path></ArrowDownIcon>
      </ArrowDownContainer>
      <BackgroundWrapper>
        <ModuleContentWrapper>
          <LeftWrapper>

            <Left>
              <SectionA_01>
                <Row>
                  <SectionA_01TextWrapper className="ms-0"> <SectionA_01Text01>{landing.tituloInicial} </SectionA_01Text01>  <SectionA_01Text02>DESDE CERO</SectionA_01Text02></SectionA_01TextWrapper>
                </Row>
              </SectionA_01>
              <SectionA_02>
                <Row>
                  <p> <SectionA_02Text01>{landing.parrafoInicial} <SectionA_02Text02>entrenamientos personalizados</SectionA_02Text02>
                    <br />
                    <br />
                    En Gonvar descubrirás la manera más fácil, rápida y divertida de convertirte en un <SectionA_02Text02>aplicador profesional. </SectionA_02Text02>
                    Entrenamientos de primer nivel para lograr resultados extraordinarios </SectionA_02Text01></p>
                </Row>

              </SectionA_02>
              <SectionB>
                <Col>
                  <SectionB_01>
                    <Button01>
                      <Button01Content>
                        <SectionB_Text>
                          Comienza desde $49
                        </SectionB_Text>
                      </Button01Content>
                    </Button01>
                  </SectionB_01>
                </Col>
                <Col>
                  <SectionB_02>
                    <Button02>
                      <Button02Content>
                        <SectionB_Text>
                          Ve más cursos <Image src={Img1.src} ></Image>
                        </SectionB_Text>
                      </Button02Content>
                    </Button02>
                  </SectionB_02>
                </Col>
              </SectionB>
              <SectionC>
                <IconElement>
                  <IconImageWrapper>

                  </IconImageWrapper>
                  <SectionB_Text><Image style={{ paddingRight: "5px" }} src={Img2.src}></Image>+4700 Alumnos</SectionB_Text>
                </IconElement>
                <IconElement>
                  <IconImageWrapper>

                  </IconImageWrapper>
                  <SectionB_Text><Image style={{ paddingRight: "5px" }} src={Img4.src}></Image>+250 Cursos</SectionB_Text>
                </IconElement>
                <IconElement>

                  <SectionB_TextALT1>
                    <Image style={{ paddingRight: "5px" }} src={Img3.src}></Image>
                    +50 Presenciales</SectionB_TextALT1>
                </IconElement>
              </SectionC>
              <BlurWindow></BlurWindow>
              <GradientCanvas id="gradient-canvas" height="82.5%" />
            </Left>

          </LeftWrapper>
          <RightWrapper>
            <Right>
              <RightImage>
                <RightImageElement src={Img5.src}></RightImageElement>
              </RightImage>
            </Right>
          </RightWrapper>
        </ModuleContentWrapper>
      </BackgroundWrapper >
    </ModuleContainer>
  )
}
