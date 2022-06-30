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

export const Module2 = (props: IModule2) => {
  return (
    <Container>
      <Row>
        <Col>
          <Image src={BG3.src} ></Image>
        </Col>
        <Col>
          <Image src={BG1.src} ></Image>
          <Row>
            <Col></Col>
            <Col>La mejor plataforma</Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <Row><Image src={Img5.src} ></Image></Row>
              <Row>Lorem ipsum dolor sit</Row>
            </Col>
            <Col>
              <Row><Image src={Img2.src} ></Image></Row>
              <Row>Lorem ipsum dolor sit</Row>
            </Col>
            <Col>
              <Row><Image src={Img6.src} ></Image></Row>
              <Row>Lorem ipsum dolor sit</Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row><Image src={Img3.src} ></Image></Row>
              <Row>Lorem ipsum dolor sit</Row>
            </Col>
            <Col>
              <Row><Image src={Img4.src} ></Image></Row>
              <Row>Lorem ipsum dolor sit</Row>
            </Col>
            <Col>
              <Row><Image src={Img1.src} ></Image></Row>
              <Row>Lorem ipsum dolor sit</Row>
            </Col>
          </Row>
        </Col>
        <Col>
          <Image src={BG2.src} ></Image>
        </Col>
      </Row >
    </Container >
  )
}
