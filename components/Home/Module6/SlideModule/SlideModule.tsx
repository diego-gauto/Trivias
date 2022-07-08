import { Container, Col, Row, Button, Image } from "react-bootstrap";
import { ISlideModule } from "./ISlideModule";
import React, { Component, useEffect } from "react";

import { ContainerMain, NewTag, SlideImg, Text01, Text02, TextNew, TextSectionWrapper } from "./SlideModule.styled";


export const SlideModule = (props: ISlideModule) => {



  const { isNew } = props;
  const { title } = props;
  const { subtitle } = props;
  const { imgURL } = props;


  return (
    <Container>
      <ContainerMain>
        <Col>
          <Row>
            <SlideImg

              style={{
                backgroundImage: 'url(' + imgURL + ')',
                width: "350px",
                height: "350px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "95% auto",
                padding: "0",
                marginLeft: "5%",
                marginRight: "5%",
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
      </ContainerMain >
    </Container >

  )
}
