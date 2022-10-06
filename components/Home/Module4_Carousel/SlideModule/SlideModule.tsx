import { Image, Row } from "react-bootstrap";

import { ISlideModule } from "./ISlideModule";
import { SlideModuleContainer, Text01, Text02, TextSectionWrapper } from "./SlideModule.styled";

export const SlideModule = (props: ISlideModule) => {
  const { imgURL, title, subtitle, isNew } = props;

  return (
    <SlideModuleContainer>
      {/* <SlideImg style={{ backgroundImage: 'url(' + imgURL + ')' }}>
        {isNew ?
          <NewTag>
            <TextNew>Nuevo</TextNew>
          </NewTag>
          : <></>}
      </SlideImg> */}
      <Image src={imgURL} fluid />

      <TextSectionWrapper>
        <Row>
          <Text01>{title} </Text01>
        </Row>
        <Row>
          <Text02>{subtitle} </Text02>
        </Row>
      </TextSectionWrapper>
    </SlideModuleContainer >
  )
}
