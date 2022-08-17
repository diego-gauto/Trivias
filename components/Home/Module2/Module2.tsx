import { Col, Image, Row } from "react-bootstrap";
import DOMPurify from "dompurify"
import { IModule2 } from "./IModule2";
import BG1 from "./MediaSources/BG01.png";
import BG2 from "./MediaSources/BG02.png";
import BG3 from "./MediaSources/BG03.png";
import Img1 from "./MediaSources/Icon01.png";
import Img2 from "./MediaSources/Icon02.png";
import Img3 from "./MediaSources/Icon03.png";
import Img4 from "./MediaSources/Icon04.png";
import Img5 from "./MediaSources/Icon05.png";
import Img6 from "./MediaSources/Icon06.png";
import {
  IconImage,
  IconImagesContainer,
  IconText,
  IconText_B,
  LeftImage,
  ModuleContainer,
  RibbonImage,
  RightImage,
  SectionCentered,
  SectionCenteredBackground,
  SectionCenteredTopColumn,
  SectionCenteredWrapper,
  TitleCenter,
  TitleTextContainer,
} from "./Module2.styled";

export const Module2 = (props: IModule2) => {
  const {
    featureShowcaseSectionData: { title, features }
  } = props

  const parseTitle = (text: string = "") => {
    const bold = /\*\*(.*?)\*\*/gm;
    const html = text.replace(bold, '<span>$1</span>');
    return <TitleCenter dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
  }

  const featureImagesOrder = [Img5.src, Img2.src, Img6.src, Img3.src, Img4.src, Img1.src]
  const iconImagesData = features.map((feature, i) => {
    return { text: feature, source: featureImagesOrder[i] }
  })

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
        <Col style={{ paddingLeft: 0, display: "flex", height: "75%" }}>
          <LeftImage>
            <Image src={BG3.src} style={{ width: "50%" }}></Image>
          </LeftImage>
        </Col>
        <Col style={{ display: "flex", height: "75%" }}>
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
                  {parseTitle(title)}
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
