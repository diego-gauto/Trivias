import { Container, Col, Row, Button, Image } from "react-bootstrap";
import Img1 from "./MediaSources/Icon01.png"
import Img2 from "./MediaSources/Icon02.png"
import Img3 from "./MediaSources/Icon03.png"
import Img4 from "./MediaSources/Icon04.png"
import Img5 from "./MediaSources/Image01.png"
import { IModule1 } from "./IModule1";

import {
  BackgroundWrapper, Left, Right, SectionA_01,
  RightImage, SectionB, SectionB_01, SectionB_02,
  SectionC, SectionA_02, LeftWrapper, Button01, Button02, Button01Content, Button02Content,
} from "./Module1.styled";


export const Module1 = (props: IModule1) => {
  return (
    <Container>
      <BackgroundWrapper>
        <Row>
          <LeftWrapper>
            <Left>

              <SectionA_01>
                <Row>
                  <h1>APRENDE A APLICAR UÑAS DESDE CERO</h1>
                </Row>
              </SectionA_01>
              <SectionA_02>
                <Row>
                  <h5>Descubre tu verdadero potencial a través nuestros entrenamientos personalizados
                    <br />
                    <br />
                    En Gonvar descubrirás la manera más fácil, rápida y divertida de convertirte en un aplicador profesional.
                    Entrenamientos de primer nivel para lograr resultados extraordinarios</h5>
                </Row>

              </SectionA_02>
              <SectionB>
                <Col>
                  <SectionB_01>
                    <Button01>
                      <Button01Content>
                        Comienza desde $49
                      </Button01Content>
                    </Button01>
                  </SectionB_01>
                </Col>
                <Col>
                  <SectionB_02>
                    <Button02>
                      <Button02Content>
                        Ve más cursos <Image src={Img1.src} ></Image>
                      </Button02Content>
                    </Button02>
                  </SectionB_02>
                </Col>
              </SectionB>
              <SectionC>
                <Col><Image src={Img2.src}></Image>+4700 Alumnos</Col>
                <Col><Image src={Img3.src}></Image>+250 Cursos</Col>
                <Col><Image src={Img4.src}></Image>+50 Presenciales</Col>
              </SectionC>
            </Left>
          </LeftWrapper>
          <Col>
            <Right>
              <RightImage>
                <Image style={{
                  height: "auto",
                  width: "100%",
                  marginTop: "75px"
                }}
                  src={Img5.src}></Image>
              </RightImage>
            </Right>
          </Col>
        </Row>
      </BackgroundWrapper >
    </Container >
  )
}
