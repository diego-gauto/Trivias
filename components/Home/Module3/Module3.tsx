import { Container, Col, Button, Image, Row } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import Icon1 from "./MediaSources/Icon01.png"
import Icon2 from "./MediaSources/Icon02.png"
import Icon3 from "./MediaSources/Icon03.png"
import Icon4 from "./MediaSources/Icon04.png"

import TagA1 from "./MediaSources/TagA01.png"
import TagA2 from "./MediaSources/TagA02.png"
import TagA3 from "./MediaSources/TagA03.png"
import TagA4 from "./MediaSources/TagA04.png"
import TagA5 from "./MediaSources/TagA05.png"

import TagB1 from "./MediaSources/TagB01.png"
import TagB2 from "./MediaSources/TagB02.png"
import TagB3 from "./MediaSources/TagB03.png"
import TagB4 from "./MediaSources/TagB04.png"
import TagB5 from "./MediaSources/TagB05.png"

import Rectangle01 from "./MediaSources/Rectangle01.png"

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
  SectionRight04
} from "./Module3.styled";

import { IModule3 } from "./IModule3";

export const Module3 = (props: IModule3) => {
  const { button } = props;
  const { title } = props;
  const { subtitle } = props;
  const { type } = props;
  const { faved } = props;

  const [groupTag, setGroupTag] = useState("");
  const [isFaved, setIsFaved] = useState(faved);

  useEffect(
    () => {

      if (isFaved) {

        switch (type) {
          case 1:
            setGroupTag(TagA1.src)
            break;
          case 2:

            setGroupTag(TagA2.src)
            break;
          case 3:

            setGroupTag(TagA3.src)
            break;
          case 4:

            setGroupTag(TagA4.src)
            break;
          case 5:

            setGroupTag(TagA5.src)
            break;

          default:

            setGroupTag(TagA1.src)
            break;
        }
      } else {

        switch (type) {
          case 1:
            setGroupTag(TagB1.src)
            break;
          case 2:

            setGroupTag(TagB2.src)
            break;
          case 3:

            setGroupTag(TagB3.src)
            break;
          case 4:

            setGroupTag(TagB4.src)
            break;
          case 5:

            setGroupTag(TagB5.src)
            break;

          default:

            setGroupTag(TagB1.src)
            break;
        }
      }

    },
    [],
  );

  return (
    <Container>
      <ModuleImage
        style={{
          backgroundImage: 'url(' + Rectangle01.src + ')',
          backgroundRepeat: 'no-repeat',
          height: "625px",
          width: "auto",
        }}
      >
        <Row

        >
          <Col>
            <Left>
              <Row><ImageTag
                style={{
                  backgroundImage: 'url(' + groupTag + ')',
                  backgroundRepeat: 'no-repeat',
                  height: '158px',
                  width: '100%',
                  marginLeft: '12px',
                  marginTop: '-5px',
                  backgroundSize: '19.5% auto',
                }}


              ></ImageTag></Row>
              <Row>
                <SectionLeft01>{/* Empty space */}</SectionLeft01>
              </Row>
              <SectionLeft02
              >
                <Col>
                  <Row><span>{button}</span></Row>
                  <Row><h2>{title}</h2> </Row>
                  <Row><h3>{subtitle}</h3> </Row>
                </Col>
              </SectionLeft02>
            </Left>
          </Col>
          <Col>
            <Right>
              <Row>
                <SectionRight01><h4>Lo que aprenderas en este curso...</h4></SectionRight01>
              </Row>
              <Row>
                <SectionRight02>
                  <Row>
                    <SectionRight02_Wrapper>
                      <SectionRight02_01>
                        <Image src={Icon1.src}></Image>
                      </SectionRight02_01>

                      <SectionRight02_02>
                        <Row>Resultado 1</Row>
                        <Row>Lorem ipsum dolor sitamet, consecteur adipiscing elit ut aliquam</Row>
                      </SectionRight02_02>

                    </SectionRight02_Wrapper>
                  </Row>
                  <Row>
                    <SectionRight02_Wrapper>
                      <SectionRight02_01>
                        <Image src={Icon2.src}></Image>
                      </SectionRight02_01>

                      <SectionRight02_02>
                        <Row>Resultado 2</Row>
                        <Row>Lorem ipsum dolor sitamet, consecteur adipiscing elit ut aliquam</Row>
                      </SectionRight02_02>
                    </SectionRight02_Wrapper>
                  </Row>
                  <Row>
                    <SectionRight02_Wrapper>
                      <SectionRight02_01>
                        <Image src={Icon3.src}></Image>
                      </SectionRight02_01>

                      <SectionRight02_02>
                        <Row>Resultado 3</Row>
                        <Row>Lorem ipsum dolor sitamet, consecteur adipiscing elit ut aliquam</Row>
                      </SectionRight02_02>
                    </SectionRight02_Wrapper>
                  </Row>
                </SectionRight02>
              </Row>

              <Row>
                <SectionRight03>Desde $120.00</SectionRight03>
              </Row>

              <Row>
                <SectionRight04>
                  <Row>

                    <Col>Ve un adelanto</Col>
                    <Col>Más información</Col>
                  </Row>
                </SectionRight04>
              </Row>
            </Right>
          </Col>
        </Row >

      </ModuleImage >
    </Container >
  )
}
