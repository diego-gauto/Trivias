import { Container, Col, Button, Image, Row } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import Icon1 from "./MediaSources/Icon01.png"
import Icon2 from "./MediaSources/Icon02.png"
import Icon3 from "./MediaSources/Icon03.png"
import Icon4 from "./MediaSources/Icon04.png"


import {
  ImageTag, Left, ModuleImage,
  Right,
  SectionLeft01,
  SectionLeft02,
  SectionRight01,
  SectionRight02,
  SectionRight02_01,
  SectionRight02_02,
  SectionRight02_Wrapper,
  SectionRight03,
  SectionRight04,
  Button01,
  Button02,
  Newtag,
  Text02,
  Text01,
  Text03,
  Text04,
  Text05,
  Text06,
  TextNew,
} from "./Module3.styled";

import { IModule3 } from "./IModule3";

export const Module3 = (props: IModule3) => {
  const { button } = props;
  const { title } = props;
  const { subtitle } = props;
  const { type } = props;
  const { faved } = props;
  const { courseImg } = props;

  const [groupTag, setGroupTag] = useState("");
  const [isFaved, setIsFaved] = useState(faved);

  useEffect(
    () => {

      if (isFaved) {

        switch (type) {
          case 1:
            setGroupTag("https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FGroupTags%2FTagA01.png?alt=media&token=26c467cd-25c9-479a-ba06-770ce4ee7f7d")
            break;
          case 2:

            setGroupTag("https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FGroupTags%2FTagA02.png?alt=media&token=858354ca-7bb0-48bb-84c0-8d6c122a221d")
            break;
          case 3:

            setGroupTag("https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FGroupTags%2FTagA03.png?alt=media&token=23439e38-b20e-4c20-b507-ec63423cbb75")
            break;
          case 4:

            setGroupTag("https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FGroupTags%2FTagA04.png?alt=media&token=2ea3a978-a739-40cf-876a-1f004f357090")
            break;
          case 5:

            setGroupTag("https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FGroupTags%2FTagA05.png?alt=media&token=8d52b678-4c06-4581-82bb-6a314cb2d553")
            break;

          default:

            setGroupTag("https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FGroupTags%2FTagA01.png?alt=media&token=26c467cd-25c9-479a-ba06-770ce4ee7f7d")
            break;
        }
      } else {

        switch (type) {
          case 1:
            setGroupTag("https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FGroupTags%2FTagB01.png?alt=media&token=7d82eca6-9ec7-47c5-9218-b49f08be922e")
            break;
          case 2:

            setGroupTag("https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FGroupTags%2FTagB02.png?alt=media&token=156a955a-e43c-4c19-9105-9ec9be83ed4b")
            break;
          case 3:

            setGroupTag("https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FGroupTags%2FTagB03.png?alt=media&token=19b52e60-e5ec-4157-b81b-6385bb8efcf1")
            break;
          case 4:

            setGroupTag("https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FGroupTags%2FTagB04.png?alt=media&token=cef38edb-d29c-4627-850d-3122ada3fe8c")
            break;
          case 5:

            setGroupTag("https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FGroupTags%2FTagB05.png?alt=media&token=e8a5686a-1fb0-4cf0-b359-e03484a81308")
            break;

          default:

            setGroupTag("https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/DevAssets%2FSlideCarousel%2FGroupTags%2FTagB01.png?alt=media&token=7d82eca6-9ec7-47c5-9218-b49f08be922e")
            break;
        }
      }

    },
    [],
  );

  return (
    <Container fluid style={{ paddingLeft: 0 }}>
      <ModuleImage
        style={{
          backgroundImage: 'url(' + courseImg + ')',
          backgroundRepeat: 'no-repeat',
          height: "625px",
          width: "auto",
          paddingLeft: 0,
          marginLeft: 0,
        }}
      >
        <Row
        
        >
          <Col>
            <Left>
              <Row style={{ padding: 0 }}><ImageTag
                style={{
                  backgroundImage: 'url(' + groupTag + ')',
                  backgroundRepeat: 'no-repeat',
                  height: '158px',
                  width: '100%',
                  marginTop: '-5px',
                  backgroundSize: '19.5% auto',
                  padding: 0,
                }}


              ></ImageTag></Row>
              <Row>
                <SectionLeft01>{/* Empty space */}</SectionLeft01>
              </Row>
              <SectionLeft02
              >
                <Col style={{ padding: 0 }}>
                  <Row>
                    <Newtag>
                      <TextNew>{button}</TextNew>
                    </Newtag>


                  </Row>
                  <Row><Text02>{title}</Text02> </Row>
                  <Row><Text01>{subtitle}</Text01> </Row>
                </Col>
              </SectionLeft02>
            </Left>
          </Col>
          <Col style={{ background: "linear-gradient(270deg, #000000 9%, rgba(0, 0, 0, 0) 100%)" }}>
            <Right>
              <Row>
                <SectionRight01><Text01>Lo que aprenderas en este curso...</Text01></SectionRight01>
              </Row>
              <>
                <SectionRight02>
                  <>
                    <SectionRight02_Wrapper>
                      <SectionRight02_01>
                        <Image src={Icon1.src}></Image>
                      </SectionRight02_01>

                      <SectionRight02_02>
                        <Row><Text03>Resultado 1</Text03> </Row>
                        <Row><Text04> Lorem ipsum dolor sitamet, consecteur adipiscing elit ut aliquam</Text04></Row>
                      </SectionRight02_02>

                    </SectionRight02_Wrapper>
                  </>
                  <>
                    <SectionRight02_Wrapper>
                      <SectionRight02_01>
                        <Image src={Icon2.src}></Image>
                      </SectionRight02_01>

                      <SectionRight02_02>
                        <Row><Text03>Resultado 2</Text03> </Row>
                        <Row><Text04> Lorem ipsum dolor sitamet, consecteur adipiscing elit ut aliquam</Text04></Row>
                      </SectionRight02_02>
                    </SectionRight02_Wrapper>
                  </>
                  <>
                    <SectionRight02_Wrapper>
                      <SectionRight02_01>
                        <Image src={Icon3.src}></Image>
                      </SectionRight02_01>

                      <SectionRight02_02>
                        <Row><Text03>Resultado 3</Text03> </Row>
                        <Row><Text04>Lorem ipsum dolor sitamet, consecteur adipiscing elit ut aliquam</Text04> </Row>
                      </SectionRight02_02>
                    </SectionRight02_Wrapper>
                  </>
                </SectionRight02>
              </>

              <SectionRight03><Text05>Desde $120.00</Text05></SectionRight03>

              <Row>
                <SectionRight04>
                  <Row>

                    <Col>
                      <Button01>
                        <Text06 style={{ marginLeft: "10px" }} >Ve un adelanto</Text06>
                      </Button01>
                    </Col>
                    <Col>
                      <Button02>
                        <Text06>Más información</Text06>
                      </Button02>
                    </Col>
                  </Row>
                </SectionRight04>
              </Row>
            </Right>
          </Col>
        </Row >

      </ModuleImage >
    </Container>
  )
}
