import { Container, Col, Row, Button, Image } from "react-bootstrap";
import Img1 from "./MediaSources/Icon01.png"
import Img2 from "./MediaSources/Icon02.png"
import Img3 from "./MediaSources/Icon03.png"
import Img4 from "./MediaSources/Icon04.png"
import Img5 from "./MediaSources/Icon05.png"
import Img6 from "./MediaSources/Icon06.png"
import BG1 from "./MediaSources/BG01.png"
import BG2 from "./MediaSources/BG02.png"
import BG3 from "./MediaSources/BG03.png"
import { IModule2 } from "./IModule2";
import {
  IconImage,
  IconText,
  IconText_B,
  LeftImage,
  RightImage,
  SectionCentered,
  SectionCenteredBackground,
  SectionCenteredTopColumn,
  SectionCenteredWrapper,
  TitleCenter,
  TitleCenter2
} from "./Module2.styled";

export const Module2 = (props: IModule2) => {
  return (
    <Container fluid>
      <SectionCenteredBackground>
        <Col style={{ paddingLeft: 0, display: "flex" }}>

          <LeftImage>
            <Image src={BG3.src} style={{width: "50%"}}></Image>
          </LeftImage>
        </Col>
        <Col style={{ display: "flex" }}>

          <RightImage>
            <Image src={BG2.src} style={{width: "50%"}}></Image>
          </RightImage>
        </Col>
      </SectionCenteredBackground>
      <div>
        <SectionCenteredWrapper>
          <SectionCentered>
            <Image src={BG1.src} ></Image>
            <Row>
              <Col></Col>
              <SectionCenteredTopColumn>
                <IconText>
                  <TitleCenter>
                    La mejor
                  </TitleCenter>
                  <TitleCenter2>
                    {" "}plataforma
                  </TitleCenter2>
                </IconText>

              </SectionCenteredTopColumn>

              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <IconImage>
                    <Image src={Img5.src} ></Image>
                  </IconImage>
                </Row>
                <Row>
                  <IconText>
                    <IconText_B>
                      Lorem ipsum dolor sit
                    </IconText_B>
                  </IconText></Row>
              </Col>
              <Col>
                <Row>
                  <IconImage>
                    <Image src={Img2.src} ></Image>
                  </IconImage>
                </Row>
                <Row>
                  <IconText>
                    <IconText_B>
                      Lorem ipsum dolor sit
                    </IconText_B>
                  </IconText></Row>
              </Col>
              <Col>
                <Row>
                  <IconImage>
                    <Image src={Img6.src} ></Image>
                  </IconImage>
                </Row>
                <Row>
                  <IconText>
                    <IconText_B>
                      Lorem ipsum dolor sit
                    </IconText_B>
                  </IconText></Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <IconImage>
                    <Image src={Img3.src} ></Image>
                  </IconImage>
                </Row>
                <Row>
                  <IconText>
                    <IconText_B>
                      Lorem ipsum dolor sit
                    </IconText_B>
                  </IconText></Row>
              </Col>
              <Col>
                <Row>
                  <IconImage>
                    <Image src={Img4.src} ></Image>
                  </IconImage>
                </Row>
                <Row>
                  <IconText>
                    <IconText_B>
                      Lorem ipsum dolor sit
                    </IconText_B>
                  </IconText></Row>
              </Col>
              <Col>
                <Row>
                  <IconImage>
                    <Image src={Img1.src} ></Image>
                  </IconImage>
                </Row>
                <Row><IconText>
                  <IconText_B>
                    Lorem ipsum dolor sit
                  </IconText_B>
                </IconText></Row>
              </Col>
            </Row>
          </SectionCentered>
        </SectionCenteredWrapper>
      </div>
    </Container>
  )
}
