import { Container, Col, Row, Button, Image } from "react-bootstrap";
import { ISlideModule } from "./ISlideModule";
import React, { Component, useEffect } from "react";

import { NewTag, SlideImg, TextSectionWrapper } from "./SlideModule.styled";


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
              height: "210px",
              backgroundRepeat: "no-repeat",
              backgroundSize: "95% auto",
              padding: "0",
              marginLeft: "2.5%",
              marginRight: "2.5%",
            }}
          >

            {isNew ?
              <NewTag>
                <span>Nuevo</span>
              </NewTag>
              : <></>}

          </SlideImg>
        </Row>

        <TextSectionWrapper>
          <Row>
            <h4>{title} </h4>
          </Row>
          <Row>
            <h6>{subtitle} </h6>
          </Row>
        </TextSectionWrapper>
      </Col>
    </Container >

  )
}
