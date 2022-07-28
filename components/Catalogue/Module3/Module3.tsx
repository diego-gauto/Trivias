import React, { useState } from "react";

import Modal1 from "./Modal/Modal1";
import {
  Cardcontent,
  CardContain,
  CardImage,
  ImageContent,
  InsideContent,
  InsideText,
  Maincontainer,
  Text1,
  Text2,
  Text3,
  TextContain,
  Title,
  VideoInfo,
  ViewCourse,
} from "./Module3.styled";

const Module3 = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  }
  return (
    <Maincontainer>
      <Title>
        Cursos en poseción
      </Title>
      <CardContain>
        <Cardcontent>
          <ImageContent>
            <CardImage
              src="/images/Preview/card3.png"
              width={400}
              height={210}
            />
            <InsideContent>
              <InsideText>
                Unica Lección
              </InsideText>
            </InsideContent>
          </ImageContent>
          <VideoInfo>
            <TextContain>
              <Text1>
                Curso 1: Lorem Ipsum
                <Text2>
                  Subtítulo de categoría
                </Text2>
              </Text1>
              <Text3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam est tempor, egestas mauris pulvinar.
              </Text3>
            </TextContain>
            <ViewCourse onClick={handleShow}>
              Ver el Curso
            </ViewCourse>
          </VideoInfo>
        </Cardcontent>

        <Cardcontent>
          <ImageContent>
            <CardImage
              src="/images/Preview/card4.png"
              width={400}
              height={210}
            />
            <InsideContent>
              <InsideText>
                7 Lecciones
              </InsideText>
            </InsideContent>
          </ImageContent>
          <VideoInfo>
            <TextContain>
              <Text1>
                Curso 2: Lorem Ipsum
                <Text2>
                  Subtítulo de categoría
                </Text2>
              </Text1>
              <Text3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam est tempor, egestas mauris pulvinar.
              </Text3>
            </TextContain>
            <ViewCourse>
              Ver el Curso
            </ViewCourse>
          </VideoInfo>
        </Cardcontent>
      </CardContain>
      <Modal1 setShow={setShow} show={show} />
    </Maincontainer>
  )
}
export default Module3;