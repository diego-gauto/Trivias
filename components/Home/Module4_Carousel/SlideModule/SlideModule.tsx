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
          <SlideImg

            style={{
              backgroundImage: 'url(' + imgURL + ')',
              width: "100%",
              height: "200px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "95% auto",
              padding: "0",
              marginLeft: "2.5%",
              marginRight: "2.5%",
            }}
          >

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
