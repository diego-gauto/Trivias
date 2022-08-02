import React, { useState } from "react";

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
} from "../Module3/Module3.styled";
import Modal1 from "./Modal/Modal1";
import { Viewpay } from "./Module4.styled";

const Module4 = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  }
  return (
    <Maincontainer>
      <Title>
        Cursos disponibles
      </Title>
      <CardContain>
        <Cardcontent>
          <ImageContent>
            <CardImage
              src="/images/Preview/card5.png"
              width={400}
              height={210}
            />
            <InsideContent>
              <InsideText>
                24 Lecciones
              </InsideText>
            </InsideContent>
          </ImageContent>
          <VideoInfo>
            <TextContain>
              <Text1>
                Curso 3: Lorem Ipsum
                <Text2>
                  Subtítulo de categoría
                </Text2>
              </Text1>
              <Text3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam est tempor, egestas mauris pulvinar.
              </Text3>
            </TextContain>
            <Viewpay onClick={handleShow}>
              Comprar - $2,149.00
            </Viewpay>
          </VideoInfo>
        </Cardcontent>

        <Cardcontent>
          <ImageContent>
            <CardImage
              src="/images/Preview/card6.png"
              width={400}
              height={210}
            />
            <InsideContent>
              <InsideText>
                12 Lecciones
              </InsideText>
            </InsideContent>
          </ImageContent>
          <VideoInfo>
            <TextContain>
              <Text1>
                Curso 4: Lorem Ipsum
                <Text2>
                  Subtítulo de categoría
                </Text2>
              </Text1>
              <Text3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam est tempor, egestas mauris pulvinar.
              </Text3>
            </TextContain>
            <Viewpay>
              Comprar - $559.00
            </Viewpay>
          </VideoInfo>
        </Cardcontent>

        <Cardcontent>
          <ImageContent>
            <CardImage
              src="/images/Preview/card7.png"
              width={400}
              height={210}
            />
            <InsideContent>
              <InsideText>
                5 Lecciones
              </InsideText>
            </InsideContent>
          </ImageContent>
          <VideoInfo>
            <TextContain>
              <Text1>
                Curso 5: Lorem Ipsum
                <Text2>
                  Subtítulo de categoría
                </Text2>
              </Text1>
              <Text3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam est tempor, egestas mauris pulvinar.
              </Text3>
            </TextContain>
            <Viewpay>
              Gratis
            </Viewpay>
          </VideoInfo>
        </Cardcontent>
      </CardContain>
      <Modal1 show={show} setShow={setShow} />
    </Maincontainer>
  )
}
export default Module4;