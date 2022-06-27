import { Container, Col, Row, Navbar, Button, Image } from "react-bootstrap";
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
      <Row>
        <Col>
          <Row><Image src={groupTag}></Image></Row>
          <Row>{/* Empty space */}
            <div></div>
          </Row>
          <Row>
            <Col>
              <Row><span>{button}</span></Row>
              <Row><h1>{title}</h1> </Row>
              <Row><h2>{subtitle}</h2> </Row>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row>Lo que aprenderas en este curso</Row>

          <Row>
            <Col>
              <Image src={Icon1.src}></Image>
            </Col>
            <Col>
              <Row>Resultado 1</Row>
              <Row>Lorem ipsum dolor sitamet, consecteur adipiscing elit ut aliquam</Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Image src={Icon2.src}></Image>
            </Col>
            <Col>
              <Row>Resultado 2</Row>
              <Row>Lorem ipsum dolor sitamet, consecteur adipiscing elit ut aliquam</Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Image src={Icon3.src}></Image>
            </Col>
            <Col>
              <Row>Resultado 3</Row>
              <Row>Lorem ipsum dolor sitamet, consecteur adipiscing elit ut aliquam</Row>
            </Col>
          </Row>
          <Row>Desde $120.00</Row>
          <Row>
            <Col>Ve un adelanto</Col>
            <Col>Más información</Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
