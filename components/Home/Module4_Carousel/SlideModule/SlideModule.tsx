import { Container, Col, Row, Button, Image } from "react-bootstrap";
import { ISlideModule } from "./ISlideModule";
import React, { Component, useEffect } from "react";

import { SlideImg } from "./SlideModule.styled";



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
              height: "250px",
              backgroundRepeat: "no-repeat"
            }}
          >

            {isNew ? <span>Nuevo</span> : <></>}

          </SlideImg>
        </Row>
        <Row>
          <h3>{title} </h3>
        </Row>
        <Row>
          <h5>{subtitle} </h5>
        </Row>
      </Col>
    </Container >

  )
}
