import { Col, Image, Row } from "react-bootstrap";
import DOMPurify from "dompurify"
import BG1 from "./MediaSources/BG01.png";
import BG2 from "./MediaSources/BG02.png";
import BG3 from "./MediaSources/BG03.png";
import Img1 from "./MediaSources/Icon01.svg";
import Img2 from "./MediaSources/Icon02.svg";
import Img3 from "./MediaSources/Icon03.svg";
import Img4 from "./MediaSources/Icon04.svg";
import Img5 from "./MediaSources/Icon05.svg";
import Img6 from "./MediaSources/Icon06.svg";
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

export const Module2 = ({ featureShowcaseSectionData, loading }: any) => {
  let iconImagesData;
  const parseTitle = (text: string = "") => {
    const bold = /\*\*(.*?)\*\*/gm;
    const html = text.replace(bold, '<span>$1</span>');
    return <TitleCenter dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
  }
  const featureImagesOrder = [Img5.src, Img2.src, Img6.src, Img3.src, Img4.src, Img1.src]
  if (featureShowcaseSectionData) {
    iconImagesData = featureShowcaseSectionData.features?.map((feature: any, i: number) => {
      return { text: feature, source: featureImagesOrder[i] }
    })
  }

  const iconImages = iconImagesData?.map((x: any, index: number) => {
    return (
      <Col key={x.text + index}>
        <Row>

          <IconImage>
            <div className="grey-field">
              <Image src={x.source} ></Image>
            </div>
          </IconImage>
        </Row>
        <Row>
          <IconText>
            <div className="grey-field" style={{ maxWidth: "fit-content", margin: 'auto' }}>
              <IconText_B>
                {x.text}
              </IconText_B>
            </div>
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
            <div className={loading ? "skeleton-product" : ''} style={{ 'width': '100%' }}>
              <RibbonImage src={BG1.src} ></RibbonImage>
              <Row>
                <Col></Col>
                <SectionCenteredTopColumn>
                  <div className="grey-field">
                    <TitleTextContainer>
                      {parseTitle(featureShowcaseSectionData?.title)}
                    </TitleTextContainer>
                  </div>

                </SectionCenteredTopColumn>

                <Col></Col>
              </Row>
              <IconImagesContainer>
                {iconImages}
              </IconImagesContainer>
            </div>
          </SectionCentered>
        </SectionCenteredWrapper>
      </div>
    </ModuleContainer>
  )
}
