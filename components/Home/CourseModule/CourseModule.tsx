

import { Button, Card, Col, Row } from "react-bootstrap";
import ReactPlayer from "react-player";
import { useMediaQuery } from "react-responsive";

import { PurpleButton } from "../../common/PurpleButton/PurpleButton";
import { WhiteButton } from "../../common/WhiteButton/WhiteButton";
import { CardContainer } from "./CourseModule.styled";
import { ICourseModuleProps } from "./ICourseModuleProps";

export const CourseModule = (props: ICourseModuleProps) => {
  const { data } = props;

  const responsive768 = useMediaQuery({ query: "(max-width: 784px)" });
  const responsive576 = useMediaQuery({ query: "(max-width: 576px)" });

  return (
    <CardContainer className="card-container">
      <div className="video">
        <ReactPlayer
          url="https://cadefivideo.com.mx/media/2022/JUNIO/COMPLIANCE/master.m3u8"
          muted={true}
          playing={true}
          width="100%"
          height={responsive576 ? "523px" : "600px"}
        />
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
          <PurpleButton text={responsive768 ? "Comprar" : "Ve un adelanto"} />
          <WhiteButton text={responsive768 ? "Información" : "Más información"} />
        </Col>
        {responsive768 && <Card.Text className="mobile-price">
          Desde ${data.coursePrice}.00
        </Card.Text>}
      </Row>
    </CardContainer>
  )
}
