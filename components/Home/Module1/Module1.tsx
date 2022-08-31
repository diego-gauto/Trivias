

import { useEffect, useState } from "react";

import { Col, Image, Row } from "react-bootstrap";

import DOMPurify from "dompurify";

import { downloadFileWithStoragePath } from "../../../store/actions/LandingActions";
import GradientCanvas from "../../GradientCanvas/GradientCanvas";
import { IModule1 } from "./IModule1";
import Img1 from "./MediaSources/Icon01.png";
import Img2 from "./MediaSources/Icon02.png";
import Img3 from "./MediaSources/Icon03.png";
import Img4 from "./MediaSources/Icon04.png";
import {
  ArrowDownContainer,
  ArrowDownIcon,
  BackgroundWrapper,
  BlurWindow,
  Button01,
  Button01Content,
  Button02,
  Button02Content,
  IconElement,
  IconImageWrapper,
  Left,
  LeftWrapper,
  ModuleContainer,
  ModuleContentWrapper,
  Right,
  RightImage,
  RightImageElement,
  RightWrapper,
  SectionA_01,
  SectionA_01Text01,
  SectionA_01TextWrapper,
  SectionA_02,
  SectionA_02Text01,
  SectionB,
  SectionB_01,
  SectionB_02,
  SectionB_Text,
  SectionB_TextALT1,
  SectionC,
} from "./Module1.styled";

export const Module1 = (props: IModule1) => {
  const {
    heroSectionData: {
      botonPrimario,
      botonSecundario,
      parrafoInicial,
      parrafoFinal,
      primerCaracteristica,
      segundaCaracteristica,
      terceraCaracteristica,
      tituloInicial,
      heroImage,
    }
  } = props;

  const [img, setImg] = useState("")

  const awaitImg = async () => {
    const resolvedImg = await downloadFileWithStoragePath(heroImage)
    setImg(resolvedImg)
  }
  useEffect(() => {
    awaitImg()
  }, [])

  const parseTitle = (text: string = "") => {
    const bold = /\*\*(.*?)\*\*/gm;
    const html = text.replace(bold, '<span>$1</span>');
    return <SectionA_01Text01 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
  }

  const parseText = (text: string = "") => {
    const bold = /\*\*(.*?)\*\*/gm;
    const html = text.replace(bold, '<span>$1</span>');
    return <SectionA_02Text01 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
  }

  const scrollToModule2 = () => {
    window.scrollTo(0, window.innerHeight * 0.75)
  }

  return (
    <ModuleContainer fluid>
      <ArrowDownContainer onClick={scrollToModule2}>
        <ArrowDownIcon className="down" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="none"></rect><path d="M36.63,18.37a1.37,1.37,0,0,1,2.15.37,1.7,1.7,0,0,1-.3,2.06L25.4,32.64a1.37,1.37,0,0,1-1.85,0l-13-11.84a1.71,1.71,0,0,1-.29-2.06,1.37,1.37,0,0,1,2.15-.37l12.11,11ZM24.25,31.42a.38.38,0,0,1,.46,0l-.23-.21ZM11.71,19.55s0,.06,0,0Zm25.61,0h0Z"></path></ArrowDownIcon>
      </ArrowDownContainer>
      <BackgroundWrapper>
        <ModuleContentWrapper>
          <LeftWrapper>

            <Left>
              <SectionA_01>
                <Row>
                  <SectionA_01TextWrapper className="ms-0">{parseTitle(tituloInicial)}</SectionA_01TextWrapper>
                </Row>
              </SectionA_01>
              <SectionA_02>
                <Row>
                  {parseText(parrafoInicial)}
                  {parseText(parrafoFinal)}
                </Row>

              </SectionA_02>
              <SectionB>
                <Col>
                  <SectionB_01>
                    <Button01>
                      <Button01Content>
                        <SectionB_Text>
                          {botonPrimario}
                        </SectionB_Text>
                      </Button01Content>
                    </Button01>
                  </SectionB_01>
                </Col>
                <Col>
                  <SectionB_02>
                    <Button02>
                      <Button02Content>
                        <SectionB_Text>
                          {botonSecundario} <Image src={Img1.src} ></Image>
                        </SectionB_Text>
                      </Button02Content>
                    </Button02>
                  </SectionB_02>
                </Col>
              </SectionB>
              <SectionC>
                <IconElement>
                  <IconImageWrapper>

                  </IconImageWrapper>
                  <SectionB_Text><Image style={{ paddingRight: "5px" }} src={Img2.src}></Image>{primerCaracteristica}</SectionB_Text>
                </IconElement>
                <IconElement>
                  <IconImageWrapper>

                  </IconImageWrapper>
                  <SectionB_Text><Image style={{ paddingRight: "5px" }} src={Img4.src}></Image>{segundaCaracteristica}</SectionB_Text>
                </IconElement>
                <IconElement>

                  <SectionB_TextALT1>
                    <Image style={{ paddingRight: "5px" }} src={Img3.src}></Image>
                    {terceraCaracteristica}</SectionB_TextALT1>
                </IconElement>
              </SectionC>
              <BlurWindow></BlurWindow>
              <GradientCanvas id="gradient-canvas" height="82.5%" />
            </Left>

          </LeftWrapper>
          <RightWrapper>
            <Right>
              <RightImage>
                <RightImageElement src={img}></RightImageElement>
              </RightImage>
            </Right>
          </RightWrapper>
        </ModuleContentWrapper>
      </BackgroundWrapper >
    </ModuleContainer>
  )
}
