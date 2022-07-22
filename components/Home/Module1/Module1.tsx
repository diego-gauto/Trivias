import { Container, Col, Row, Button, Image } from "react-bootstrap";
import Img1 from "./MediaSources/Icon01.png"
import Img2 from "./MediaSources/Icon02.png"
import Img3 from "./MediaSources/Icon03.png"
import Img4 from "./MediaSources/Icon04.png"
import Img5 from "./MediaSources/Image01.png"
import { IModule1 } from "./IModule1";
import GradientCanvas from "../../GradientCanvas/GradientCanvas"

import {
  BackgroundWrapper, Left, Right, SectionA_01,
  RightImage, SectionB, SectionB_01, SectionB_02,
  SectionC, SectionA_02, LeftWrapper, Button01, Button02,
  Button01Content, Button02Content, SectionA_01Text01,
  SectionA_01Text02, SectionA_02Text01, SectionA_02Text02,
  SectionB_Text, IconElement, IconImageWrapper, BlurWindow,
  SectionB_TextALT1, ModuleContentWrapper, RightWrapper,
  RightImageElement, SectionA_01TextWrapper
} from "./Module1.styled";


export const Module1 = (props: IModule1) => {
  return (
    <Container fluid style={{ height: "100vh" }}>
      <BackgroundWrapper>
        <ModuleContentWrapper>
          <LeftWrapper>

            <Left>

              <SectionA_01>
                <Row>
                  <SectionA_01TextWrapper className="ms-0"> <SectionA_01Text01>APRENDE A APLICAR UÑAS </SectionA_01Text01>  <SectionA_01Text02>DESDE CERO</SectionA_01Text02></SectionA_01TextWrapper>
                </Row>
              </SectionA_01>
              <SectionA_02>
                <Row>
                  <p> <SectionA_02Text01>Descubre tu verdadero potencial a través nuestros <SectionA_02Text02>entrenamientos personalizados</SectionA_02Text02>
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
              <GradientCanvas id="gradient-canvas" />
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
    </Container >
  )
}
