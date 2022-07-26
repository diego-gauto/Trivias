import { Container, Col, Row, Button, Image } from "react-bootstrap";
import { ISlideModule } from "./ISlideModule";
import React, { Component, useEffect } from "react";

import { NewTag, SlideImg, Text01, Text02, TextNew, TextSectionWrapper } from "./SlideModule.styled";


export const SlideModule = (props: ISlideModule) => {



  const { isNew } = props;
  const { title } = props;
  const { subtitle } = props;
  const { imgURL } = props;


  return (
    <Container>
      <Col>
        <Row>
          <SlideImg style={{ backgroundImage: 'url(' + imgURL + ')' }}>
            {isNew ?
              <NewTag>
                <TextNew>Nuevo</TextNew>
              </NewTag>
              : <></>}
          </SlideImg>
        </Row>

        <TextSectionWrapper>
          <Row>
            <Text01>{title} </Text01>
          </Row>
          <Row>
            <Text02>{subtitle} </Text02>
          </Row>
        </TextSectionWrapper>
      </Col>
    </Container >

  )
}
