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
  TitleCenter2,
  IconImagesContainer,
  TitleTextContainer,
  RibbonImage,
  ModuleContainer
} from "./Module2.styled";

export const Module2 = (props: IModule2) => {
  const iconImagesData = [{
    "text": "Lorem ipsum dolor sit",
    "source": Img5.src
  },
  {
    "text": "Lorem ipsum dolor sit",
    "source": Img2.src
  },
  {
    "text": "Lorem ipsum dolor sit",
    "source": Img6.src
  },
  {
    "text": "Lorem ipsum dolor sit",
    "source": Img3.src
  },
  {
    "text": "Lorem ipsum dolor sit",
    "source": Img4.src
  },
  {
    "text": "Lorem ipsum dolor sit",
    "source": Img1.src
  }]

  const iconImages = iconImagesData.map(({ text, source }) => {
    return (
      <Col>
        <Row>
          <IconImage>
            <Image src={source} ></Image>
          </IconImage>
        </Row>
        <Row>
          <IconText>
            <IconText_B>
              {text}
            </IconText_B>
          </IconText>
        </Row>
      </Col>
    )
  })

  return (
    <ModuleContainer fluid>
      <SectionCenteredBackground>
        <Col style={{ paddingLeft: 0, display: "flex" }}>
          <LeftImage>
            <Image src={BG3.src} style={{ width: "50%" }}></Image>
          </LeftImage>
        </Col>
        <Col style={{ display: "flex" }}>
          <RightImage>
            <Image src={BG2.src} style={{ width: "50%" }}></Image>
          </RightImage>
        </Col>
      </SectionCenteredBackground>
      <div>
        <SectionCenteredWrapper>
          <SectionCentered>
            <RibbonImage src={BG1.src} ></RibbonImage>
            <Row>
              <Col></Col>
              <SectionCenteredTopColumn>
                <TitleTextContainer>
                  <TitleCenter>
                    La mejor
                  </TitleCenter>
                  <TitleCenter2>
                    {" "}plataforma
                  </TitleCenter2>
                </TitleTextContainer>

              </SectionCenteredTopColumn>

              <Col></Col>
            </Row>
            <IconImagesContainer>
              {iconImages}
            </IconImagesContainer>
          </SectionCentered>
        </SectionCenteredWrapper>
      </div>
    </ModuleContainer>
  )
}
