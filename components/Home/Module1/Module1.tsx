import { Container, Col, Row, Navbar, Button, Image } from "react-bootstrap";
import Img1 from "./MediaSources/Icon01.png"
import Img2 from "./MediaSources/Icon02.png"
import Img3 from "./MediaSources/Icon03.png"
import Img4 from "./MediaSources/Icon04.png"
import Img5 from "./MediaSources/Image01.png"
import { IModule1 } from "./IModule1";
import { PurpleButton } from "./Module1.styled";

export const Module1 = (props: IModule1) => {
  const { title } = props;
  return (
    <Container>
      <Row>
        <Col>
          <Row>APRENDE A APLICAR UÑAS DESDE CERO</Row>
          <Row>Descubre tu verdadero potencial a través nuestros entrenamientos personalizados</Row>
          <Row>En Gonvar descubrirás la manera más fácil, rápida y divertida de convertirte en un aplicador profesional.
            Entrenamientos de primer nivel para lograr resultados extraordinarios</Row>
          <Row>
            <Col><Button>Comienza desde $49</Button></Col>
            <Col><Button>Ve más cursos <Image src={Img1.src} ></Image></Button></Col>
          </Row>
          <Row>
            <Col><Image src={Img2.src}></Image>+4700 Alumnos</Col>
            <Col><Image src={Img3.src}></Image>+250 Cursos</Col>
            <Col><Image src={Img4.src}></Image>+50 Presenciales</Col>
          </Row>
        </Col>
        <Col>
          <Image src={Img5.src}></Image>
        </Col>
      </Row>
    </Container>
  )
}
